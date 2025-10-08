from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from config import get_config


db = SQLAlchemy()
migrate = Migrate()


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(get_config())

    db.init_app(app)
    migrate.init_app(app, db)

    # Import models so Alembic sees them
    import models  # noqa: F401

    # Register blueprints
    from routes.auth_routes import auth_bp
    from routes.student_routes import student_bp
    from routes.grade_routes import grade_bp
    from routes.payment_routes import payment_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(student_bp, url_prefix="/api/students")
    app.register_blueprint(grade_bp, url_prefix="/api/grades")
    app.register_blueprint(payment_bp, url_prefix="/api/payments")

    @app.get("/")
    def root():
        return {"message": "ClearPack API running", "endpoints": ["/health", "/api/auth", "/api/students", "/api/grades", "/api/payments"]}

    @app.get("/health")
    def health_check():
        return {"status": "ok"}

    return app


app = create_app()


