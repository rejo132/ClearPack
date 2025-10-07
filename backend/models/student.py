from app import db
from . import TimestampMixin


class Student(db.Model, TimestampMixin):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)
    admission_number = db.Column(db.String(64), unique=True, nullable=False, index=True)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    full_name = db.Column(db.String(255), nullable=False)
    program = db.Column(db.String(128), nullable=True)
    year_of_study = db.Column(db.Integer, nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)

    enrollments = db.relationship("Enrollment", back_populates="student", cascade="all, delete-orphan")
    payments = db.relationship("Payment", back_populates="student", cascade="all, delete-orphan")


