from flask import request, jsonify

from app import db
from models import Payment
from routes import payment_bp


@payment_bp.post("")
def create_payment():
    data = request.get_json() or {}
    required = ["student_id", "amount", "purpose"]
    if not all(k in data for k in required):
        return jsonify({"error": "Missing required fields"}), 400
    payment = Payment(
        student_id=data["student_id"],
        amount=data["amount"],
        currency=data.get("currency", "KES"),
        status="pending",
        method=data.get("method", "mpesa"),
        purpose=data["purpose"],
    )
    db.session.add(payment)
    db.session.commit()
    return jsonify({"id": payment.id}), 201


