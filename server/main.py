from fastapi import FastAPI, Query, HTTPException
from db import create_db_and_tables, SessionDep
from models import Task, TaskCreate, TaskUpdate
from typing import Annotated
from sqlmodel import select, delete
from uuid import UUID
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from auth import AuthDep
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
    allow_headers=["*"]
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
async def root():
    return {"message": "Hello World"}

# test
@app.get("/items/")
async def read_items(token: AuthDep):
    return {"token": token}


# users

# signup

# login

# logout


# tasks
@app.get("/tasks")
def read_all_tasks(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
    sort_by: str = Query(default="updated", regex="^(priority|updated|deadline)$"),
    order: str = Query(default="desc", regex="^(asc|desc)$")
) -> dict:
    
    # map sort fields to Task model attributes
    sort_field_map = {
        "updated": Task.updated,
        "deadline": Task.deadline,
        "priority": Task.priority
    }
    
    # dynamically build sorting query
    sort_field = sort_field_map.get(sort_by, Task.updated)
    
    order_by_clause = sort_field.asc() if order == "asc" else sort_field.desc()
    
    task_query = (
        session.exec(
            select(Task)
            .order_by(order_by_clause)
            .offset(offset)
            .limit(limit)
        )
    )
    
    tasks = task_query.all()
    
    total_count = session.exec(select(func.count(Task.id))).one()
    
    return {"tasks": tasks, "total_count": total_count}


@app.get("/tasks/count")
def read_tasks_count(session: SessionDep) -> dict:
    total_count = session.exec(select(func.count(Task.id))).one()
    return {"total": total_count}


@app.get("/tasks/{task_id}")
def read_one_task(
    task_id: UUID,
    session: SessionDep
) -> Task:
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@app.post("/tasks")
def create_task(task: TaskCreate, session: SessionDep) -> Task:
    new_task = Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        deadline=task.deadline
    )
    session.add(new_task)
    session.commit()
    session.refresh(new_task)
    return new_task


@app.patch("/tasks/{task_id}")
def update_task(task_id: UUID, taskUpdate: TaskUpdate, session: SessionDep):
    task_db = session.get(Task, task_id)
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
def bulk_delete_tasks(task_ids: list[UUID], session: SessionDep):
    try:
        # delete every task in received list
        session.exec(delete(Task).where(Task.id.in_(task_ids)))
        session.commit()
        return {"success": True}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    

@app.delete("/tasks/{task_id}")
def delete_task(task_id: UUID, session: SessionDep):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(task)
    session.commit()
    return {"success": True}
