from typing import List, Dict


def generate_alerts() -> List[Dict]:
    """
    Generate operational alerts from current SignalOps intelligence.
    """

    return [
        {
            "id": 1,
            "title": "Engineering risk threshold exceeded",
            "category": "Operational Risk",
            "severity": "Critical",
            "department": "Engineering",
            "score": 82,
            "message": (
                "Engineering operational risk has exceeded the "
                "high-risk threshold."
            ),
            "action": (
                "Review workload distribution and blocked tasks."
            ),
        },
        {
            "id": 2,
            "title": "Support workload increasing",
            "category": "Customer Operations",
            "severity": "Warning",
            "department": "Support",
            "score": 68,
            "message": (
                "Support activity is approaching the elevated-risk "
                "threshold."
            ),
            "action": (
                "Review ticket volume and current team capacity."
            ),
        },
        {
            "id": 3,
            "title": "Workforce performance remains strong",
            "category": "Workforce",
            "severity": "Info",
            "department": "Organization",
            "score": 91,
            "message": (
                "Employee performance remains above the organizational "
                "target."
            ),
            "action": (
                "Continue monitoring performance and workload balance."
            ),
        },
    ]


def get_critical_alerts() -> List[Dict]:
    alerts = generate_alerts()

    return [
        alert
        for alert in alerts
        if alert["severity"] == "Critical"
    ]


def get_alert_summary() -> Dict:
    alerts = generate_alerts()

    return {
        "total": len(alerts),
        "critical": len(
            [alert for alert in alerts if alert["severity"] == "Critical"]
        ),
        "warning": len(
            [alert for alert in alerts if alert["severity"] == "Warning"]
        ),
        "info": len(
            [alert for alert in alerts if alert["severity"] == "Info"]
        ),
    }