from datetime import datetime
from enum import Enum
from sqlmodel import SQLModel, Field
import uuid

class Priority(int, Enum):
    VERY_LOW = 5
    LOW = 4
    MEDIUM = 3
    HIGH = 2
    VERY_HIGH = 1


# base model with all fields shared across other models
class TaskBase(SQLModel):
    title: str
    description: str 
    priority: Priority = Field(default=Priority.VERY_LOW)
    deadline: datetime | None = Field(default=None, index=True)


# sql table (including id and timestamps)
class Task(TaskBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created: datetime = Field(default_factory=datetime.now)
    updated: datetime = Field(default_factory=datetime.now)
    

# create task (has only base model fields)
class TaskCreate(TaskBase):
    pass


# update task (all fields optional, timestamp automatically added)
class TaskUpdate(TaskBase):
    title: str | None = None
    description: str | None = None
    priority: Priority | None = None
    deadline: datetime | None = None