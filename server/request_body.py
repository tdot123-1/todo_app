from pydantic import BaseModel
from datetime import datetime
from enum import Enum
from sqlmodel import SQLModel, Field

class Priority(int, Enum):
    VERY_LOW = 5
    LOW = 4
    MEDIUM = 3
    HIGH = 2
    VERY_HIGH = 1


class Task(BaseModel):
    title: str
    description: str | None = None
    priority: Priority = Priority.VERY_LOW
    created: datetime = datetime.now()
    deadline: datetime | None = None
    
class TaskSchema(Task, SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)