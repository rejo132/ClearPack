from datetime import datetime

from app import db


class TimestampMixin:
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )


# Import individual models for Alembic discovery and package exports
from .student import Student  # noqa: E402,F401
from .course import Course  # noqa: E402,F401
from .enrollment import Enrollment  # noqa: E402,F401
from .grade import Grade  # noqa: E402,F401
from .payment import Payment  # noqa: E402,F401

# New tables aligned with blueprint
from .session import Session  # noqa: E402,F401
from .audit_log import AuditLog  # noqa: E402,F401
from .ai_prediction import AIPrediction  # noqa: E402,F401


