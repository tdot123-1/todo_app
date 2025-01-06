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
    
    
class TaskSchema(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str
    description: str | None = None
    priority: Priority = Field(default=Priority.VERY_LOW)
    created: datetime = Field(default_factory=datetime.now)
    deadline: datetime | None = None
    

class TaskCreate(SQLModel):
    title: str
    description: str
    priority: Priority = Priority.VERY_LOW
    deadline: datetime | None = None
    