from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
from backend.upload_engine import process_uploaded_file, analyze_dataset

from backend.alerts_engine import (
    generate_alerts,
    get_critical_alerts,
    get_alert_summary,
)

from backend.risk_engine import (
    calculate_risk_summary,
    generate_risk_insights,
)

from backend.insights_engine import (
    generate_insights,
    get_priority_insights,
)

from backend.employees_engine import (
    get_employees,
    calculate_employee_summary,
    get_employee_insights,
    get_department_summary,
)

from backend.customers_engine import (
    get_customers,
    calculate_customer_summary,
    get_customer_insights,
    get_industry_summary,
)

from backend.reports_engine import (
    get_monthly_data,
    calculate_report_summary,
    generate_report_insights,
    generate_report,
)

app = FastAPI(
    title="SignalOps Intelligence API",
    description="Backend intelligence and operational risk engine for SignalOps.",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "name": "SignalOps Intelligence API",
        "status": "online",
        "version": "1.0.0",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "signalops-intelligence",
    }


@app.get("/api/risk")
def risk_summary():
    return calculate_risk_summary()


@app.get("/api/insights")
def risk_insights():
    return {
        "insights": generate_risk_insights(),
    }

@app.get("/api/ai-insights")
def ai_insights():
    return {
        "count": len(generate_insights()),
        "insights": generate_insights(),
    }


@app.get("/api/ai-insights/priority")
def priority_insights():
    insights = get_priority_insights()

    return {
        "count": len(insights),
        "insights": insights,
    }


@app.get("/api/alerts")
def alerts():
    return {
        "alerts": generate_alerts(),
    }


@app.get("/api/alerts/critical")
def critical_alerts():
    return {
        "alerts": get_critical_alerts(),
    }


@app.get("/api/alerts/summary")
def alert_summary():
    return get_alert_summary()


@app.get("/api/employees")
def employees():
    return {
        "employees": get_employees(),
    }


@app.get("/api/employees/summary")
def employee_summary():
    return calculate_employee_summary()


@app.get("/api/employees/insights")
def employee_insights():
    return {
        "insights": get_employee_insights(),
    }


@app.get("/api/employees/departments")
def employee_departments():
    return {
        "departments": get_department_summary(),
    }

@app.get("/api/customers")
def customers():
    return {
        "customers": get_customers(),
    }


@app.get("/api/customers/summary")
def customer_summary():
    return calculate_customer_summary()


@app.get("/api/customers/insights")
def customer_insights():
    return {
        "insights": get_customer_insights(),
    }


@app.get("/api/customers/industries")
def customer_industries():
    return {
        "industries": get_industry_summary(),
    }

@app.get("/api/reports")
def reports():
    return generate_report()


@app.get("/api/reports/summary")
def report_summary():
    return calculate_report_summary()


@app.get("/api/reports/monthly")
def report_monthly():
    return {
        "monthly_data": get_monthly_data(),
    }


@app.get("/api/reports/insights")
def report_insights():
    return {
        "insights": generate_report_insights(),
    }

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()

    result = process_uploaded_file(
        filename=file.filename or "unknown.csv",
        file_content=content,
    )

    if result["success"]:
        result["analysis"] = analyze_dataset(result)

    return result