from flask import request, jsonify
from passlib.hash import bcrypt

from app import db
from models import Student
from routes import auth_bp
from utils.jwt_utils import create_jwt


@auth_bp.post("/signup")
def signup():
    data = request.get_json() or {}
    required = ["admission_number", "email", "full_name", "password"]
    if not all(k in data for k in required):
        return jsonify({"error": "Missing required fields"}), 400

    if Student.query.filter((Student.email == data["email"]) | (Student.admission_number == data["admission_number"])) .first():
        return jsonify({"error": "Student already exists"}), 409

    student = Student(
        admission_number=data["admission_number"],
        email=data["email"],
        full_name=data["full_name"],
        password_hash=bcrypt.hash(data["password"]),
        program=data.get("program"),
        year_of_study=data.get("year_of_study"),
    )
    db.session.add(student)
    db.session.commit()
    return jsonify({"id": student.id}), 201


@auth_bp.post("/login")
def login():
    data = request.get_json() or {}
    student = Student.query.filter_by(email=data.get("email")).first()
    if not student or not bcrypt.verify(data.get("password", ""), student.password_hash):
        return jsonify({"error": "Invalid credentials"}), 401
    token = create_jwt({"sub": student.id})
    return jsonify({"token": token})


