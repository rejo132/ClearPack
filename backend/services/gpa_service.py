from typing import List

from models import Enrollment, Grade


GRADE_POINTS = {
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0,
}


def calculate_gpa(enrollments: List[Enrollment]) -> float:
    total_points = 0.0
    total_credits = 0
    for enrollment in enrollments:
        if not enrollment.course or not enrollment.grades:
            continue
        # take the latest grade record
        grade: Grade = sorted(enrollment.grades, key=lambda g: g.updated_at)[-1]
        if not grade.grade_letter:
            continue
        points = GRADE_POINTS.get(grade.grade_letter.upper())
        if points is None:
            continue
        total_points += points * int(enrollment.course.credits)
        total_credits += int(enrollment.course.credits)
    if total_credits == 0:
        return 0.0
    return round(total_points / total_credits, 2)


