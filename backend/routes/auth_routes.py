from flask import request, jsonify
from passlib.hash import argon2

from app import db
from models import Student
from routes import auth_bp
from utils.jwt_utils import create_jwt


@auth_bp.post("/signup")
def signup():
    try:
        data = request.get_json() or {}
        required = ["admission_number", "email", "full_name", "password"]
        
        # Validate required fields
        if not all(k in data for k in required):
            missing = [field for field in required if field not in data]
            return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400
        
        # Validate email format
        email = data["email"].strip().lower()
        if "@" not in email or "." not in email.split("@")[1]:
            return jsonify({"error": "Invalid email format"}), 400
        
        # Validate password strength
        password = data["password"]
        if len(password) < 6:
            return jsonify({"error": "Password must be at least 6 characters long"}), 400
        
        # Validate admission number format
        admission_number = data["admission_number"].strip()
        if len(admission_number) < 6:
            return jsonify({"error": "Admission number must be at least 6 characters long"}), 400
        
        # Check if student already exists
        existing_student = Student.query.filter(
            (Student.email == email) | (Student.admission_number == admission_number)
        ).first()
        
        if existing_student:
            if existing_student.email == email:
                return jsonify({"error": "Email already registered"}), 409
            else:
                return jsonify({"error": "Admission number already registered"}), 409

        # Create new student
        student = Student(
            admission_number=admission_number,
            email=email,
            full_name=data["full_name"].strip(),
            password_hash=argon2.hash(password),
            program=data.get("program", "").strip() or None,
            year_of_study=data.get("year_of_study"),
        )
        
        db.session.add(student)
        db.session.commit()
        
        return jsonify({
            "id": student.id,
            "message": "Account created successfully"
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to create account"}), 500


@auth_bp.post("/login")
def login():
    try:
        data = request.get_json() or {}
        email = data.get("email", "").strip().lower()
        password = data.get("password", "")
        
        # Validate input
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        if "@" not in email or "." not in email.split("@")[1]:
            return jsonify({"error": "Invalid email format"}), 400
        
        # Find student and verify password
        student = Student.query.filter_by(email=email).first()
        if not student or not argon2.verify(password, student.password_hash):
            return jsonify({"error": "Invalid credentials"}), 401
        
        # Generate JWT token
        token = create_jwt({"sub": str(student.id)})
        
        return jsonify({
            "token": token,
            "student": {
                "id": student.id,
                "admission_number": student.admission_number,
                "full_name": student.full_name,
                "email": student.email
            }
        })
        
    except Exception as e:
        return jsonify({"error": "Login failed"}), 500


