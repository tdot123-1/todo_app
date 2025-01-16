from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from passlib.context import CryptContext
from pydantic import BaseModel
import jwt
from jwt.exceptions import InvalidTokenError
from datetime import timedelta, datetime, timezone
from config import SECRET_KEY, ALGORITHM
from db import SessionDep
from models import User

# OAuth dependency
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

AuthDep = Annotated[str, Depends(oauth2_scheme)]

# token class
class Token(BaseModel):
    access_token: str
    token_type: str
    

class TokenData(BaseModel):
    username: str | None = None
    user_id: str | None = None


# get current user
# decode token

# verify password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# get user
# authenticate user


# generate token
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: AuthDep, session: SessionDep):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        username: str = payload.get("name")
        if user_id is None:
            raise credentials_exception
        if username is None: 
            raise credentials_exception
        token_data = TokenData(username=username, user_id=user_id)
    except InvalidTokenError:
        raise credentials_exception
    user = session.get(User, user_id)
    if user is None: 
        raise credentials_exception
    return user