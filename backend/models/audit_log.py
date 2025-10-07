from app import db
from . import TimestampMixin


class AuditLog(db.Model, TimestampMixin):
    __tablename__ = "audit_logs"

    id = db.Column(db.Integer, primary_key=True)
    actor_student_id = db.Column(db.Integer, db.ForeignKey("students.id", ondelete="SET NULL"), nullable=True, index=True)
    entity_type = db.Column(db.String(64), nullable=False)
    entity_id = db.Column(db.Integer, nullable=False)
    action = db.Column(db.String(32), nullable=False)  # create/update/delete
    diff = db.Column(db.JSON, nullable=True)


