from app import db
from . import TimestampMixin


class AIPrediction(db.Model, TimestampMixin):
    __tablename__ = "ai_predictions"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id", ondelete="CASCADE"), nullable=False, index=True)
    target_semester = db.Column(db.String(32), nullable=True)
    predicted_gpa = db.Column(db.Float, nullable=False)
    confidence = db.Column(db.Float, nullable=True)
    insights = db.Column(db.JSON, nullable=True)


