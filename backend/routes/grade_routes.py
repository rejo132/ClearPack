from flask import request, jsonify

from app import db
from models import Grade, Enrollment
from routes import grade_bp


@grade_bp.post("/<int:enrollment_id>")
def upsert_grade(enrollment_id: int):
    data = request.get_json() or {}
    marks = data.get("marks")
    grade_letter = data.get("grade_letter")
    is_submitted = data.get("is_submitted", False)

    grade = Grade.query.filter_by(enrollment_id=enrollment_id).first()
    if not grade:
        grade = Grade(enrollment_id=enrollment_id)
        db.session.add(grade)
    grade.marks = marks
    grade.grade_letter = grade_letter
    grade.is_submitted = bool(is_submitted)
    db.session.commit()
    return jsonify({"id": grade.id})


