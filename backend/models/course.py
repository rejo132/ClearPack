from app import db
from . import TimestampMixin


class Course(db.Model, TimestampMixin):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(32), unique=True, nullable=False, index=True)
    name = db.Column(db.String(255), nullable=False)
    department = db.Column(db.String(128), nullable=True)
    credits = db.Column(db.Integer, nullable=False)
    level = db.Column(db.Integer, nullable=True)

    enrollments = db.relationship("Enrollment", back_populates="course", cascade="all, delete-orphan")


