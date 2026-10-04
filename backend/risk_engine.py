from typing import Dict, List


DEPARTMENT_RISK = [
    {"department": "Engineering", "risk": 82},
    {"department": "Support", "risk": 68},
    {"department": "HR", "risk": 45},
    {"department": "Sales", "risk": 28},
    {"department": "Marketing", "risk": 18},
]


def calculate_company_health(risk_score: float) -> float:
    """
    Convert operational risk into a company health score.
    Lower operational risk produces higher health.
    """
    health = 100 - risk_score

    return round(max(0, min(100, health)), 1)


def get_risk_level(score: float) -> str:
    if score >= 70:
        return "High"

    if score >= 40:
        return "Medium"

    return "Low"


def calculate_risk_summary() -> Dict:
    scores = [item["risk"] for item in DEPARTMENT_RISK]

    average_risk = sum(scores) / len(scores)

    high_risk_areas = [
        item for item in DEPARTMENT_RISK if item["risk"] >= 70
    ]

    medium_risk_areas = [
        item for item in DEPARTMENT_RISK
        if 40 <= item["risk"] < 70
    ]

    return {
        "overall_risk": round(average_risk),
        "company_health": calculate_company_health(average_risk),
        "risk_level": get_risk_level(average_risk),
        "high_risk_count": len(high_risk_areas),
        "medium_risk_count": len(medium_risk_areas),
        "departments": DEPARTMENT_RISK,
    }


def generate_risk_insights() -> List[Dict]:
    insights = []

    for department in DEPARTMENT_RISK:
        risk = department["risk"]

        if risk >= 70:
            insights.append(
                {
                    "department": department["department"],
                    "severity": "High",
                    "message": (
                        f"{department['department']} has elevated "
                        f"operational risk with a score of {risk}."
                    ),
                }
            )

        elif risk >= 40:
            insights.append(
                {
                    "department": department["department"],
                    "severity": "Medium",
                    "message": (
                        f"{department['department']} requires monitoring "
                        f"with a risk score of {risk}."
                    ),
                }
            )

    return insights