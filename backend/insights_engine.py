from typing import List, Dict


def generate_insights() -> List[Dict]:
    """
    Generate operational intelligence insights from current
    SignalOps risk indicators.
    """

    insights = [
        {
            "id": 1,
            "title": "Engineering workload requires attention",
            "category": "Operational Risk",
            "severity": "High",
            "score": 82,
            "description": (
                "Engineering currently has the highest operational risk "
                "score. Elevated workload may increase delivery pressure "
                "and the probability of overdue tasks."
            ),
            "recommendation": (
                "Review workload distribution and prioritize blocked "
                "engineering tasks."
            ),
        },
        {
            "id": 2,
            "title": "Support activity is trending upward",
            "category": "Customer Operations",
            "severity": "Medium",
            "score": 68,
            "description": (
                "Support activity has increased and may place additional "
                "pressure on the customer operations team."
            ),
            "recommendation": (
                "Monitor ticket volume and evaluate current support capacity."
            ),
        },
        {
            "id": 3,
            "title": "Workforce performance remains strong",
            "category": "Workforce",
            "severity": "Positive",
            "score": 91,
            "description": (
                "Organization-wide employee performance remains strong "
                "with a current performance indicator of 91%."
            ),
            "recommendation": (
                "Maintain current performance practices and identify "
                "high-performing teams."
            ),
        },
        {
            "id": 4,
            "title": "Overall company health is stable",
            "category": "Company Health",
            "severity": "Positive",
            "score": 87,
            "description": (
                "The organization maintains a strong overall health "
                "indicator despite elevated risk in selected departments."
            ),
            "recommendation": (
                "Continue monitoring high-risk areas while maintaining "
                "current operational practices."
            ),
        },
    ]

    return insights


def get_priority_insights() -> List[Dict]:
    """
    Return only insights requiring operational attention.
    """

    insights = generate_insights()

    return [
        insight
        for insight in insights
        if insight["severity"] in ["High", "Medium"]
    ]