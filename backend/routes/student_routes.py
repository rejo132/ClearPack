from flask import request, jsonify

from app import db
from models import Enrollment, Student, Course
from routes import student_bp


@student_bp.get("/<int:student_id>")
def get_student(student_id: int):
    student = Student.query.get_or_404(student_id)
    return jsonify(
        {
            "id": student.id,
            "admission_number": student.admission_number,
            "email": student.email,
            "full_name": student.full_name,
            "program": student.program,
            "year_of_study": student.year_of_study,
        }
    )


@student_bp.post("/<int:student_id>/enroll")
def enroll_course(student_id: int):
    data = request.get_json() or {}
    course_code = data.get("course_code")
    semester = data.get("semester")
    if not course_code or not semester:
        return jsonify({"error": "course_code and semester are required"}), 400
    course = Course.query.filter_by(code=course_code).first()
    if not course:
        return jsonify({"error": "Course not found"}), 404
    enrollment = Enrollment(student_id=student_id, course_id=course.id, semester=semester)
    db.session.add(enrollment)
    db.session.commit()
    return jsonify({"id": enrollment.id}), 201


