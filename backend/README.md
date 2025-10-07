Backend documentation

Environment
- DATABASE_URL: postgresql connection string
- SECRET_KEY: JWT signing secret

Run
- pip install -r requirements.txt
- flask --app app:app run

Endpoints
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/students/<id>
- POST /api/students/<id>/enroll
- POST /api/grades/<enrollment_id>
- POST /api/payments


