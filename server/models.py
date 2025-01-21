from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
import uuid
from pydantic import EmailStr

# add foreign key relationship between user and task

# user model
class UserBase(SQLModel):
    username: str = Field(unique=True, index=True)
    email: EmailStr


class UserSignup(UserBase):
    password: str
    confirm_password: str


class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    hashed_password: str
    tasks: list["Task"] = Relationship(back_populates="user")


# base model with all fields shared across other models
class TaskBase(SQLModel):
    title: str
    description: str
    priority: int | None = Field(default=5, le=5, ge=1, index=True)
    deadline: datetime | None = Field(default=None, index=True)
    completed: bool = Field(default=False)


# sql table (including id and timestamps)
class Task(TaskBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    created: datetime = Field(default_factory=datetime.now)
    updated: datetime = Field(default_factory=datetime.now, index=True)
    user_id: uuid.UUID = Field(foreign_key="user.id")
    user: User = Relationship(back_populates="tasks")


# create task (has only base model fields)
class TaskCreate(TaskBase):
    pass


# update task (all fields optional, timestamp automatically added)
class TaskUpdate(TaskBase):
    title: str | None = None
    description: str | None = None
    completed: bool | None = None
