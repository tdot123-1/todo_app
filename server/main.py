from fastapi import FastAPI, Query, HTTPException, status, Form, Depends
from db import create_db_and_tables, SessionDep
from models import Task, TaskCreate, TaskUpdate, User, UserSignup
from typing import Annotated
from sqlmodel import select, delete
from uuid import UUID
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from auth import (
    AuthDep,
    Token,
    PasswordDep,
    ACCESS_TOKEN_EXPIRES,
    create_access_token,
    authenticate_user,
    get_password_hash,
    get_current_user,
)
from config import CLIENT_URL


# create app instance
app = FastAPI()

# set middlewares
origins = [
    CLIENT_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
def root():
    return {"message": "Hello World"}


# test
@app.get("/items/")
async def read_items(token: AuthDep):
    return {"message": "authorized"}


# users


# signup
@app.post("/signup")
def signup(
    user_data: Annotated[UserSignup, Form()],
    session: SessionDep,
):
    # check if username exists
    existing_user = session.exec(
        select(User).where(User.username == user_data.username)
    ).one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Username already taken"
        )

    if user_data.password != user_data.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password confirmation failed",
        )

    if len(user_data.username) < 3 or len(user_data.username) > 25:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username must be between 3 and 25 characters.",
        )

    if len(user_data.password) < 5 or len(user_data.password) > 25:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be between 5 and 25 characters.",
        )

    # hash password, add new user to db
    hashed_password = get_password_hash(user_data.password)

    new_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hashed_password,
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return {"message": "User created succesfully."}


# login
@app.post("/token")
def login_for_access_token(form_data: PasswordDep, session: SessionDep) -> Token:

    # find user by username
    user = authenticate_user(session, form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # set expiry time, generate token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRES)
    access_token = create_access_token(
        data={"sub": str(user.id), "name": user.username},
        expires_delta=access_token_expires,
    )
    return Token(access_token=access_token, token_type="bearer")


# logout


# tasks
## change to only retrieve tasks assosciated with current user
@app.get("/tasks")
def read_all_tasks(
    session: SessionDep,
    current_user: User = Depends(get_current_user),
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
    sort_by: str = Query(default="updated", regex="^(priority|updated|deadline)$"),
    order: str = Query(default="desc", regex="^(asc|desc)$"),
) -> dict:

    # map sort fields to Task model attributes
    sort_field_map = {
        "updated": Task.updated,
        "deadline": Task.deadline,
        "priority": Task.priority,
    }

    # dynamically build sorting query
    sort_field = sort_field_map.get(sort_by, Task.updated)

    order_by_clause = sort_field.asc() if order == "asc" else sort_field.desc()

    task_query = session.exec(
        select(Task)
        .where(Task.user_id == current_user.id)
        .order_by(order_by_clause)
        .offset(offset)
        .limit(limit)
    )

    tasks = task_query.all()

    total_count = session.exec(
        select(func.count(Task.id)).where(Task.user_id == current_user.id)
    ).one()

    return {"tasks": tasks, "total_count": total_count}


@app.get("/tasks/count")
def read_tasks_count(session: SessionDep) -> dict:
    total_count = session.exec(select(func.count(Task.id))).one()
    return {"total": total_count}


@app.get("/tasks/{task_id}")
def read_one_task(
    task_id: UUID, session: SessionDep, current_user: User = Depends(get_current_user)
) -> Task:
    # task = session.get(Task, task_id)

    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    ).one_or_none()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@app.post("/tasks")
def create_task(
    task: TaskCreate,
    session: SessionDep,
    current_user: User = Depends(get_current_user),
) -> Task:
    new_task = Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        deadline=task.deadline,
        user_id=current_user.id,
    )
    session.add(new_task)
    session.commit()
    session.refresh(new_task)
    return new_task


@app.patch("/tasks/{task_id}")
def update_task(
    task_id: UUID,
    taskUpdate: TaskUpdate,
    session: SessionDep,
    current_user: User = Depends(get_current_user),
):
    task_db = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    ).one_or_none()

    if not task_db:
        raise HTTPException(status_code=404, detail="Task not found")

    # convert model into dict, include only provided fields
    task_data = taskUpdate.model_dump(exclude_unset=True)

    # manually set updated timestamp
    task_data["updated"] = datetime.now()

    # update existing db object woth values from dict
    task_db.sqlmodel_update(task_data)

    # save updated task
    session.add(task_db)
    session.commit()
    session.refresh(task_db)
    return task_db


@app.delete("/tasks/bulk-delete")
def bulk_delete_tasks(
    task_ids: list[UUID],
    session: SessionDep,
    current_user: User = Depends(get_current_user),
):
    try:

        # retrieve tasks that belong to the current user
        tasks_to_delete = session.exec(
            select(Task.id).where(
                Task.user_id == current_user.id, Task.id.in_(task_ids)
            )
        ).all()

        if not tasks_to_delete:
            raise HTTPException(
                status_code=404, detail="No tasks found to delete for the current user."
            )

        # delete every task in received list
        session.exec(delete(Task).where(Task.id.in_(tasks_to_delete)))
        session.commit()
        return {"success": True}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/tasks/{task_id}")
def delete_task(
    task_id: UUID, session: SessionDep, current_user: User = Depends(get_current_user)
):
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    ).one_or_none()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(task)
    session.commit()
    return {"success": True}
