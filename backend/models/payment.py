from app import db
from . import TimestampMixin


class Payment(db.Model, TimestampMixin):
    __tablename__ = "payments"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id", ondelete="CASCADE"), nullable=False, index=True)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    currency = db.Column(db.String(8), nullable=False, default="KES")
    status = db.Column(db.String(32), nullable=False, default="pending")
    method = db.Column(db.String(32), nullable=False, default="mpesa")
    mpesa_receipt = db.Column(db.String(64), nullable=True, unique=True)
    purpose = db.Column(db.String(64), nullable=False)  # e.g., report, prediction

    student = db.relationship("Student", back_populates="payments")


