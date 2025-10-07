from app import db
from . import TimestampMixin


class Session(db.Model, TimestampMixin):
    __tablename__ = "sessions"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id", ondelete="CASCADE"), nullable=False, index=True)
    jti = db.Column(db.String(64), unique=True, nullable=False, index=True)
    user_agent = db.Column(db.String(256), nullable=True)
    ip_address = db.Column(db.String(64), nullable=True)
    revoked = db.Column(db.Boolean, nullable=False, default=False)


