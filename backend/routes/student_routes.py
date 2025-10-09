from flask import request, jsonify
from functools import wraps

from app import db
from models import Enrollment, Student, Course, Grade
from routes import student_bp
from utils.jwt_utils import decode_jwt


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


def require_auth(f):
    """Decorator to require JWT authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"error": "Missing or invalid authorization header"}), 401
        
        try:
            token = auth_header.split(' ')[1]
            payload = decode_jwt(token)
            student_id = payload.get('sub')
            if not student_id:
                return jsonify({"error": "Invalid token payload"}), 401
            return f(int(student_id), *args, **kwargs)
        except Exception as e:
            return jsonify({"error": "Invalid token"}), 401
    return decorated_function


@student_bp.get("/me/summary")
@require_auth
def get_student_summary(student_id: int):
    """Get current student's summary with enrollments and recent grades"""
    try:
        student = Student.query.get(student_id)
        if not student:
            return jsonify({"error": "Student not found"}), 404
        
        # Get current semester enrollments
        current_enrollments = db.session.query(Enrollment, Course).join(
            Course, Enrollment.course_id == Course.id
        ).filter(
            Enrollment.student_id == student_id,
            Enrollment.status == "enrolled"
        ).all()
        
        # Get recent grades
        recent_grades = db.session.query(Grade, Enrollment, Course).join(
            Enrollment, Grade.enrollment_id == Enrollment.id
        ).join(
            Course, Enrollment.course_id == Course.id
        ).filter(
            Enrollment.student_id == student_id
        ).order_by(Grade.updated_at.desc()).limit(5).all()
        
        # Calculate basic stats
        total_courses = len(current_enrollments)
        completed_courses = len([g for g, e, c in recent_grades if g.is_submitted])
        
        return jsonify({
            "student": {
                "id": student.id,
                "admission_number": student.admission_number,
                "full_name": student.full_name,
                "email": student.email,
                "program": student.program,
                "year_of_study": student.year_of_study
            },
            "summary": {
                "total_courses": total_courses,
                "completed_courses": completed_courses,
                "current_enrollments": [
                    {
                        "id": enrollment.id,
                        "course_code": course.code,
                        "course_name": course.name,
                        "credits": course.credits,
                        "semester": enrollment.semester,
                        "status": enrollment.status
                    }
                    for enrollment, course in current_enrollments
                ],
                "recent_grades": [
                    {
                        "id": grade.id,
                        "course_code": course.code,
                        "course_name": course.name,
                        "marks": grade.marks,
                        "grade_letter": grade.grade_letter,
                        "is_submitted": grade.is_submitted,
                        "semester": enrollment.semester
                    }
                    for grade, enrollment, course in recent_grades
                ]
            }
        })
    except Exception as e:
        return jsonify({"error": "Failed to fetch student summary"}), 500


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


