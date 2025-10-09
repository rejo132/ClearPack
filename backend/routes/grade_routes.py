from flask import request, jsonify
from functools import wraps

from app import db
from models import Grade, Enrollment, Student, Course
from routes import grade_bp
from utils.jwt_utils import decode_jwt


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


def calculate_gpa_letter(marks):
    """Convert marks to GPA letter grade"""
    if marks is None:
        return None
    
    if marks >= 70:
        return "A"
    elif marks >= 60:
        return "B"
    elif marks >= 50:
        return "C"
    elif marks >= 40:
        return "D"
    else:
        return "F"


def calculate_gpa_points(grade_letter):
    """Convert letter grade to GPA points"""
    grade_points = {
        "A": 4.0,
        "B": 3.0,
        "C": 2.0,
        "D": 1.0,
        "F": 0.0
    }
    return grade_points.get(grade_letter, 0.0)


@grade_bp.get("/gpa")
@require_auth
def get_gpa(student_id: int):
    """Get student's GPA calculation"""
    try:
        # Get all submitted grades for the student
        grades_data = db.session.query(Grade, Enrollment, Course).join(
            Enrollment, Grade.enrollment_id == Enrollment.id
        ).join(
            Course, Enrollment.course_id == Course.id
        ).filter(
            Enrollment.student_id == student_id,
            Grade.is_submitted == True,
            Grade.marks.isnot(None)
        ).all()
        
        if not grades_data:
            return jsonify({
                "gpa": 0.0,
                "total_credits": 0,
                "graded_credits": 0,
                "grades": [],
                "message": "No submitted grades found"
            })
        
        total_points = 0.0
        total_credits = 0
        graded_credits = 0
        grades_list = []
        
        for grade, enrollment, course in grades_data:
            # Calculate GPA letter if not already set
            if not grade.grade_letter and grade.marks is not None:
                grade.grade_letter = calculate_gpa_letter(grade.marks)
                db.session.commit()
            
            if grade.grade_letter:
                gpa_points = calculate_gpa_points(grade.grade_letter)
                total_points += gpa_points * course.credits
                graded_credits += course.credits
                grades_list.append({
                    "course_code": course.code,
                    "course_name": course.name,
                    "credits": course.credits,
                    "marks": grade.marks,
                    "grade_letter": grade.grade_letter,
                    "gpa_points": gpa_points,
                    "semester": enrollment.semester
                })
            
            total_credits += course.credits
        
        # Calculate overall GPA
        gpa = total_points / graded_credits if graded_credits > 0 else 0.0
        
        return jsonify({
            "gpa": round(gpa, 2),
            "total_credits": total_credits,
            "graded_credits": graded_credits,
            "grades": grades_list,
            "gpa_classification": get_gpa_classification(gpa)
        })
        
    except Exception as e:
        return jsonify({"error": "Failed to calculate GPA"}), 500


def get_gpa_classification(gpa):
    """Get GPA classification"""
    if gpa >= 3.7:
        return "First Class Honours"
    elif gpa >= 3.3:
        return "Second Class Honours (Upper Division)"
    elif gpa >= 3.0:
        return "Second Class Honours (Lower Division)"
    elif gpa >= 2.7:
        return "Third Class Honours"
    else:
        return "Pass"


@grade_bp.post("/<int:enrollment_id>")
def upsert_grade(enrollment_id: int):
    data = request.get_json() or {}
    marks = data.get("marks")
    grade_letter = data.get("grade_letter")
    is_submitted = data.get("is_submitted", False)

    # Validate input
    if marks is not None and (marks < 0 or marks > 100):
        return jsonify({"error": "Marks must be between 0 and 100"}), 400
    
    if grade_letter and grade_letter not in ["A", "B", "C", "D", "F"]:
        return jsonify({"error": "Invalid grade letter. Must be A, B, C, D, or F"}), 400

    grade = Grade.query.filter_by(enrollment_id=enrollment_id).first()
    if not grade:
        grade = Grade(enrollment_id=enrollment_id)
        db.session.add(grade)
    
    grade.marks = marks
    grade.grade_letter = grade_letter
    grade.is_submitted = bool(is_submitted)
    
    # Auto-calculate grade letter if marks provided but no letter
    if marks is not None and not grade_letter:
        grade.grade_letter = calculate_gpa_letter(marks)
    
    db.session.commit()
    return jsonify({"id": grade.id})


