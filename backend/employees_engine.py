from typing import Dict, List


EMPLOYEES = [
    {
        "id": 1,
        "name": "Aarav Sharma",
        "department": "Engineering",
        "role": "Software Engineer",
        "performance": 94,
        "workload": 78,
        "risk": 32,
        "status": "High Performer",
    },
    {
        "id": 2,
        "name": "Ananya Mehta",
        "department": "Engineering",
        "role": "Frontend Developer",
        "performance": 89,
        "workload": 72,
        "risk": 38,
        "status": "Strong",
    },
    {
        "id": 3,
        "name": "Rohan Verma",
        "department": "Engineering",
        "role": "Backend Developer",
        "performance": 82,
        "workload": 91,
        "risk": 64,
        "status": "Needs Attention",
    },
    {
        "id": 4,
        "name": "Priya Kapoor",
        "department": "Support",
        "role": "Support Specialist",
        "performance": 91,
        "workload": 68,
        "risk": 35,
        "status": "Strong",
    },
    {
        "id": 5,
        "name": "Arjun Singh",
        "department": "Support",
        "role": "Support Analyst",
        "performance": 76,
        "workload": 86,
        "risk": 58,
        "status": "Needs Attention",
    },
    {
        "id": 6,
        "name": "Ishita Rao",
        "department": "HR",
        "role": "HR Executive",
        "performance": 88,
        "workload": 54,
        "risk": 29,
        "status": "Strong",
    },
    {
        "id": 7,
        "name": "Kabir Malhotra",
        "department": "Sales",
        "role": "Sales Executive",
        "performance": 93,
        "workload": 61,
        "risk": 24,
        "status": "High Performer",
    },
    {
        "id": 8,
        "name": "Meera Joshi",
        "department": "Marketing",
        "role": "Marketing Specialist",
        "performance": 87,
        "workload": 48,
        "risk": 21,
        "status": "Strong",
    },
]


def get_employees() -> List[Dict]:
    return EMPLOYEES


def calculate_employee_summary() -> Dict:
    employees = get_employees()

    average_performance = (
        sum(employee["performance"] for employee in employees)
        / len(employees)
    )

    average_workload = (
        sum(employee["workload"] for employee in employees)
        / len(employees)
    )

    average_risk = (
        sum(employee["risk"] for employee in employees)
        / len(employees)
    )

    high_performers = [
        employee
        for employee in employees
        if employee["performance"] >= 90
    ]

    attention_required = [
        employee
        for employee in employees
        if employee["risk"] >= 50
    ]

    return {
        "total_employees": len(employees),
        "average_performance": round(average_performance, 1),
        "average_workload": round(average_workload, 1),
        "average_risk": round(average_risk, 1),
        "high_performers": len(high_performers),
        "attention_required": len(attention_required),
    }


def get_employee_insights() -> List[Dict]:
    employees = get_employees()

    insights = []

    for employee in employees:
        if employee["risk"] >= 50:
            insights.append(
                {
                    "employee_id": employee["id"],
                    "name": employee["name"],
                    "department": employee["department"],
                    "type": "Risk",
                    "severity": "High",
                    "message": (
                        f"{employee['name']} has elevated workload "
                        f"and employee risk indicators."
                    ),
                }
            )

        elif employee["performance"] >= 90:
            insights.append(
                {
                    "employee_id": employee["id"],
                    "name": employee["name"],
                    "department": employee["department"],
                    "type": "Performance",
                    "severity": "Positive",
                    "message": (
                        f"{employee['name']} is currently performing "
                        f"above the organizational benchmark."
                    ),
                }
            )

    return insights


def get_department_summary() -> List[Dict]:
    employees = get_employees()

    departments = {}

    for employee in employees:
        department = employee["department"]

        if department not in departments:
            departments[department] = []

        departments[department].append(employee)

    summary = []

    for department, members in departments.items():
        summary.append(
            {
                "department": department,
                "employees": len(members),
                "average_performance": round(
                    sum(
                        employee["performance"]
                        for employee in members
                    )
                    / len(members),
                    1,
                ),
                "average_workload": round(
                    sum(
                        employee["workload"]
                        for employee in members
                    )
                    / len(members),
                    1,
                ),
                "average_risk": round(
                    sum(
                        employee["risk"]
                        for employee in members
                    )
                    / len(members),
                    1,
                ),
            }
        )

    return summary