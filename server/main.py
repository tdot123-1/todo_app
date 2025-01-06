from fastapi import FastAPI, Query
from db import create_db_and_tables, SessionDep
from models import TaskSchema, TaskCreate
from typing import Annotated
from sqlmodel import select

app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}


@app.get("/tasks")
def read_all_tasks(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100
) -> list[TaskSchema]:
    tasks = session.exec(select(TaskSchema).offset(offset).limit(limit)).all()
    return tasks
    


@app.post("/tasks/create")
def create_task(task: TaskCreate, session: SessionDep) -> TaskSchema:
    new_task = TaskSchema(
        title=task.title,
        description=task.description,
        priority=task.priority,
        deadline=task.deadline
    )
    session.add(new_task)
    session.commit()
    session.refresh(new_task)
    return new_task
