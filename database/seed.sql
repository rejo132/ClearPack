-- Seed minimal data
INSERT INTO courses (code, name, department, credits, level)
VALUES
  ('HBC 2101', 'Calculus I', 'Mathematics', 3, 1),
  ('SMA 2102', 'Linear Algebra', 'Mathematics', 3, 1)
ON CONFLICT (code) DO NOTHING;


