from typing import Dict, List


CUSTOMERS = [
    {
        "id": 1,
        "name": "Apex Technologies",
        "industry": "Technology",
        "account_value": 185000,
        "health_score": 92,
        "activity_score": 88,
        "risk_score": 18,
        "status": "Healthy",
    },
    {
        "id": 2,
        "name": "Northstar Retail",
        "industry": "Retail",
        "account_value": 142000,
        "health_score": 84,
        "activity_score": 79,
        "risk_score": 26,
        "status": "Healthy",
    },
    {
        "id": 3,
        "name": "Vertex Finance",
        "industry": "Finance",
        "account_value": 210000,
        "health_score": 71,
        "activity_score": 64,
        "risk_score": 48,
        "status": "Monitor",
    },
    {
        "id": 4,
        "name": "Bluewave Logistics",
        "industry": "Logistics",
        "account_value": 98000,
        "health_score": 63,
        "activity_score": 57,
        "risk_score": 61,
        "status": "At Risk",
    },
    {
        "id": 5,
        "name": "Crest Healthcare",
        "industry": "Healthcare",
        "account_value": 175000,
        "health_score": 89,
        "activity_score": 91,
        "risk_score": 22,
        "status": "Healthy",
    },
    {
        "id": 6,
        "name": "Nova Manufacturing",
        "industry": "Manufacturing",
        "account_value": 126000,
        "health_score": 76,
        "activity_score": 73,
        "risk_score": 39,
        "status": "Monitor",
    },
]


def get_customers() -> List[Dict]:
    return CUSTOMERS


def calculate_customer_summary() -> Dict:
    customers = get_customers()

    average_health = (
        sum(customer["health_score"] for customer in customers)
        / len(customers)
    )

    average_activity = (
        sum(customer["activity_score"] for customer in customers)
        / len(customers)
    )

    average_risk = (
        sum(customer["risk_score"] for customer in customers)
        / len(customers)
    )

    total_account_value = sum(
        customer["account_value"]
        for customer in customers
    )

    healthy_customers = [
        customer
        for customer in customers
        if customer["health_score"] >= 80
    ]

    at_risk_customers = [
        customer
        for customer in customers
        if customer["risk_score"] >= 50
    ]

    return {
        "total_customers": len(customers),
        "average_health": round(average_health, 1),
        "average_activity": round(average_activity, 1),
        "average_risk": round(average_risk, 1),
        "total_account_value": total_account_value,
        "healthy_customers": len(healthy_customers),
        "at_risk_customers": len(at_risk_customers),
    }


def get_customer_insights() -> List[Dict]:
    customers = get_customers()

    insights = []

    for customer in customers:
        if customer["risk_score"] >= 50:
            insights.append(
                {
                    "customer_id": customer["id"],
                    "name": customer["name"],
                    "industry": customer["industry"],
                    "type": "Customer Risk",
                    "severity": "High",
                    "message": (
                        f"{customer['name']} has elevated customer "
                        f"risk with a score of {customer['risk_score']}."
                    ),
                    "recommendation": (
                        "Review account activity, engagement, and "
                        "recent customer interactions."
                    ),
                }
            )

        elif customer["health_score"] < 80:
            insights.append(
                {
                    "customer_id": customer["id"],
                    "name": customer["name"],
                    "industry": customer["industry"],
                    "type": "Customer Health",
                    "severity": "Medium",
                    "message": (
                        f"{customer['name']} has a customer health "
                        f"score of {customer['health_score']}."
                    ),
                    "recommendation": (
                        "Monitor engagement and identify opportunities "
                        "to improve customer health."
                    ),
                }
            )

        elif customer["health_score"] >= 90:
            insights.append(
                {
                    "customer_id": customer["id"],
                    "name": customer["name"],
                    "industry": customer["industry"],
                    "type": "Customer Health",
                    "severity": "Positive",
                    "message": (
                        f"{customer['name']} is maintaining excellent "
                        f"customer health."
                    ),
                    "recommendation": (
                        "Maintain engagement and identify expansion "
                        "opportunities."
                    ),
                }
            )

    return insights


def get_industry_summary() -> List[Dict]:
    customers = get_customers()

    industries = {}

    for customer in customers:
        industry = customer["industry"]

        if industry not in industries:
            industries[industry] = []

        industries[industry].append(customer)

    summary = []

    for industry, members in industries.items():
        summary.append(
            {
                "industry": industry,
                "customers": len(members),
                "average_health": round(
                    sum(
                        customer["health_score"]
                        for customer in members
                    )
                    / len(members),
                    1,
                ),
                "average_activity": round(
                    sum(
                        customer["activity_score"]
                        for customer in members
                    )
                    / len(members),
                    1,
                ),
                "average_risk": round(
                    sum(
                        customer["risk_score"]
                        for customer in members
                    )
                    / len(members),
                    1,
                ),
            }
        )

    return summary