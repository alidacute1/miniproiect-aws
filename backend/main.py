from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import text
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt, JWTError, ExpiredSignatureError
from dotenv import load_dotenv

from datetime import datetime, timedelta, timezone
import os

from database import engine, Base, Sessionlocal
import models

from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware



load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM= "HS256"

security = HTTPBearer() 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


class RegisterRequest(BaseModel):
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        ) 

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Token invalid"
            )

    except ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token expired"
        )
    
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Token invalid"
        )
    
    db=Sessionlocal()

    try:
        user = db.query(models.User).filter(
            models.User.id == int(user_id)
        ).first()

        if not user:
            raise HTTPException(
                status_code=401,
                detail="User not found"
            )
        
        return user
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"status": "ok"}


@app.get("/health")
def health():
    db = Sessionlocal()

    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok", "db": "connected"}

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Database connection failed"
        )

    finally:
        db.close()


@app.post("/auth/register")
def register(data: RegisterRequest):
    db = Sessionlocal()

    try:
        existing_user = db.query(models.User).filter(
            models.User.email == data.email
        ).first()

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

        hashed_password = pwd_context.hash(data.password)

        new_user = models.User(
            email=data.email,
            password_hash=hashed_password
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "id": new_user.id,
            "email": new_user.email,
            "message": "User registered successfully"
        }

    finally:
        db.close()

@app.post("/auth/login")
def login(data: LoginRequest):
    db = Sessionlocal()

    try:
        user = db.query(models.User).filter(
            models.User.email == data.email
        ).first()

        if not user:
            raise HTTPException(
                status_code=401,
                detail="Email sau parola gresita"
            )

        password_ok = pwd_context.verify(
            data.password,
            user.password_hash
        )

        if not password_ok:
            raise HTTPException(
                status_code=401,
                detail="Email sau parola gresita"
            )

        expiration = datetime.now(timezone.utc) + timedelta(hours=24)

        payload = {
            "sub": str(user.id),
            "exp": expiration
        }

        token = jwt.encode(
            payload,
            SECRET_KEY,
            algorithm=ALGORITHM
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }

    finally:
        db.close()

@app.get("/me")
def me(current_user = Depends(get_current_user)):
    return{
        "id":current_user.id,
        "email":current_user.email,
        "first_name":current_user.first_name,
        "last_name":current_user.last_name,
        "created_at":current_user.created_at,
        "date_of_birth":current_user.date_of_birth,
    }

@app.post("/auth/logout")
def logout(current_user = Depends(get_current_user)):
    return{
        "message": "Logout successful"
    }