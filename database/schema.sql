-- PostgreSQL schema for jkuat_tracker

CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  admission_number VARCHAR(64) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  program VARCHAR(128),
  year_of_study INT,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  code VARCHAR(32) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  department VARCHAR(128),
  credits INT NOT NULL,
  level INT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id INT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  semester VARCHAR(32) NOT NULL,
  academic_year VARCHAR(32),
  status VARCHAR(32) NOT NULL DEFAULT 'enrolled',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, course_id, semester)
);

CREATE TABLE IF NOT EXISTS grades (
  id SERIAL PRIMARY KEY,
  enrollment_id INT NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  marks FLOAT,
  grade_letter VARCHAR(2),
  is_submitted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  currency VARCHAR(8) NOT NULL DEFAULT 'KES',
  status VARCHAR(32) NOT NULL DEFAULT 'pending',
  method VARCHAR(32) NOT NULL DEFAULT 'mpesa',
  mpesa_receipt VARCHAR(64) UNIQUE,
  purpose VARCHAR(64) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  jti VARCHAR(64) UNIQUE NOT NULL,
  user_agent VARCHAR(256),
  ip_address VARCHAR(64),
  revoked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  actor_student_id INT REFERENCES students(id) ON DELETE SET NULL,
  entity_type VARCHAR(64) NOT NULL,
  entity_id INT NOT NULL,
  action VARCHAR(32) NOT NULL,
  diff JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_predictions (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  target_semester VARCHAR(32),
  predicted_gpa FLOAT NOT NULL,
  confidence FLOAT,
  insights JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


