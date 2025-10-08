## ClearPack - JKUAT Student Academic Tracker

Backend: Flask + SQLAlchemy + PostgreSQL

### Setup
1. Create and export DATABASE_URL (or use default):
```
export DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/jkuat_tracker
export SECRET_KEY=your-secret
```
2. Install backend deps:
```
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```
3. Initialize DB (SQL):
```
export DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/jkuat_tracker
psql "postgresql://postgres:postgres@localhost:5432/postgres" -c "CREATE DATABASE jkuat_tracker;"
psql "$DATABASE_URL" -f ../database/schema.sql
psql "$DATABASE_URL" -f ../database/seed.sql
```
4. Run API:
```
flask --app app:app run --port 5000
```

### Key Tables
- students, courses, enrollments, grades, payments
- sessions, audit_logs, ai_predictions

### Notes
- JWT sign/verify in `backend/utils/jwt_utils.py`
- GPA calculation in `backend/services/gpa_service.py`

# ClearPack
