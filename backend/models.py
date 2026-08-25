from sqlalchemy import Column, Integer, String, Date , DateTime
from database import Base
from sqlalchemy.sql import func

class User(Base):
    __tablename__="users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(50), nullable=True)
    last_name = Column(String(50), nullable=True)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, server_default = func.now())
    date_of_birth = Column(Date, nullable=True)

class JobRun(Base):
    __tablename__ = "job_runs"

    id = Column(Integer, primary_key=True)
    started_at = Column(DateTime, nullable=False)
    finished_at = Column(DateTime, nullable=True)
    status = Column(String, nullable=True)
    message = Column(String, nullable=True)