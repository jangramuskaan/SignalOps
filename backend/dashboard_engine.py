from typing import Dict

from backend.risk_engine import calculate_risk_summary
from backend.employees_engine import calculate_employee_summary
from backend.customers_engine import calculate_customer_summary
from backend.alerts_engine import get_alert_summary
from backend.insights_engine import generate_insights


def generate_dashboard() -> Dict:
    risk = calculate_risk_summary()
    employees = calculate_employee_summary()
    customers = calculate_customer_summary()
    alerts = get_alert_summary()
    insights = generate_insights()

    high_priority_insights = [
        insight
        for insight in insights
        if insight["severity"] == "High"
    ]

    return {
        "company": {
            "health": risk["company_health"],
            "operational_risk": risk["overall_risk"],
            "risk_level": risk["risk_level"],
        },
        "workforce": {
            "total_employees": employees["total_employees"],
            "performance": employees["average_performance"],
            "workload": employees["average_workload"],
            "employees_at_risk": employees["attention_required"],
        },
        "customers": {
            "total_customers": customers["total_customers"],
            "health": customers["average_health"],
            "activity": customers["average_activity"],
            "customers_at_risk": customers["at_risk_customers"],
            "portfolio_value": customers["total_account_value"],
        },
        "alerts": {
            "total": alerts["total"],
            "critical": alerts["critical"],
            "warning": alerts["warning"],
            "info": alerts["info"],
        },
        "intelligence": {
            "total_insights": len(insights),
            "high_priority": len(high_priority_insights),
        },
        "departments": risk["departments"],
    }