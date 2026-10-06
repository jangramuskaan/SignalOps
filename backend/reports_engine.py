from typing import Dict, List


MONTHLY_DATA = [
    {
        "month": "May",
        "risk": 61,
        "health": 72,
        "performance": 84,
        "alerts": 14,
    },
    {
        "month": "June",
        "risk": 57,
        "health": 76,
        "performance": 86,
        "alerts": 12,
    },
    {
        "month": "July",
        "risk": 53,
        "health": 81,
        "performance": 88,
        "alerts": 10,
    },
    {
        "month": "August",
        "risk": 49,
        "health": 84,
        "performance": 89,
        "alerts": 8,
    },
    {
        "month": "September",
        "risk": 48,
        "health": 87,
        "performance": 91,
        "alerts": 7,
    },
]


def get_monthly_data() -> List[Dict]:
    return MONTHLY_DATA


def calculate_report_summary() -> Dict:
    latest = MONTHLY_DATA[-1]

    previous = MONTHLY_DATA[-2]

    return {
        "current_health": latest["health"],
        "health_change": latest["health"] - previous["health"],
        "current_risk": latest["risk"],
        "risk_change": latest["risk"] - previous["risk"],
        "current_performance": latest["performance"],
        "performance_change": (
            latest["performance"] - previous["performance"]
        ),
        "active_alerts": latest["alerts"],
        "alerts_change": latest["alerts"] - previous["alerts"],
    }


def generate_report_insights() -> List[Dict]:
    latest = MONTHLY_DATA[-1]
    previous = MONTHLY_DATA[-2]

    insights = []

    if latest["risk"] < previous["risk"]:
        insights.append(
            {
                "title": "Operational risk is improving",
                "category": "Risk",
                "severity": "Positive",
                "message": (
                    f"Operational risk decreased from "
                    f"{previous['risk']} to {latest['risk']}."
                ),
                "recommendation": (
                    "Continue monitoring high-risk departments "
                    "and maintain current mitigation strategies."
                ),
            }
        )

    if latest["health"] > previous["health"]:
        insights.append(
            {
                "title": "Company health continues to improve",
                "category": "Company Health",
                "severity": "Positive",
                "message": (
                    f"Company health increased from "
                    f"{previous['health']}% to {latest['health']}%."
                ),
                "recommendation": (
                    "Maintain current operational practices while "
                    "addressing remaining risk areas."
                ),
            }
        )

    if latest["performance"] > previous["performance"]:
        insights.append(
            {
                "title": "Workforce performance is trending upward",
                "category": "Workforce",
                "severity": "Positive",
                "message": (
                    f"Employee performance increased from "
                    f"{previous['performance']}% to "
                    f"{latest['performance']}%."
                ),
                "recommendation": (
                    "Identify successful team practices and "
                    "replicate them across the organization."
                ),
            }
        )

    if latest["alerts"] < previous["alerts"]:
        insights.append(
            {
                "title": "Operational alerts are decreasing",
                "category": "Alerts",
                "severity": "Positive",
                "message": (
                    f"Active alerts decreased from "
                    f"{previous['alerts']} to {latest['alerts']}."
                ),
                "recommendation": (
                    "Continue resolving recurring signals and "
                    "monitor for new operational risks."
                ),
            }
        )

    return insights


def generate_report() -> Dict:
    return {
        "summary": calculate_report_summary(),
        "monthly_data": get_monthly_data(),
        "insights": generate_report_insights(),
    }