from typing import Annotated
from sqlmodel import create_engine, SQLModel, Session
from fastapi import Depends
from config import DB_URL

# create db engine
connect_args = {"check_same_thread": False}
engine = create_engine(DB_URL, connect_args=connect_args)


# create tables
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


# create session dependency
def get_session():
    with Session(engine) as session:
        yield session


# 'Annotated' is used to add metadata to type hints
SessionDep = Annotated[Session, Depends(get_session)]
