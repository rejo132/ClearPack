from app import db
from . import TimestampMixin


class Grade(db.Model, TimestampMixin):
    __tablename__ = "grades"

    id = db.Column(db.Integer, primary_key=True)
    enrollment_id = db.Column(db.Integer, db.ForeignKey("enrollments.id", ondelete="CASCADE"), nullable=False, index=True)
    marks = db.Column(db.Float, nullable=True)
    grade_letter = db.Column(db.String(2), nullable=True)
    is_submitted = db.Column(db.Boolean, nullable=False, default=False)

    enrollment = db.relationship("Enrollment", back_populates="grades")


