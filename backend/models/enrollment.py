from app import db
from . import TimestampMixin


class Enrollment(db.Model, TimestampMixin):
    __tablename__ = "enrollments"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id", ondelete="CASCADE"), nullable=False, index=True)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id", ondelete="CASCADE"), nullable=False, index=True)
    semester = db.Column(db.String(32), nullable=False)  # e.g., 2024-2025 S1
    academic_year = db.Column(db.String(32), nullable=True)
    status = db.Column(db.String(32), nullable=False, default="enrolled")

    student = db.relationship("Student", back_populates="enrollments")
    course = db.relationship("Course", back_populates="enrollments")
    grades = db.relationship("Grade", back_populates="enrollment", cascade="all, delete-orphan")

    __table_args__ = (
        db.UniqueConstraint("student_id", "course_id", "semester", name="uq_enrollment_unique"),
    )


