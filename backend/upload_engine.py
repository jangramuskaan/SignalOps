import csv
import io
from typing import Dict, List


ALLOWED_EXTENSIONS = {
    ".csv": "CSV",
}


def validate_file(filename: str) -> Dict:
    filename_lower = filename.lower()

    for extension, file_type in ALLOWED_EXTENSIONS.items():
        if filename_lower.endswith(extension):
            return {
                "valid": True,
                "file_type": file_type,
                "extension": extension,
            }

    return {
        "valid": False,
        "file_type": None,
        "extension": None,
    }


def process_csv(file_content: bytes) -> Dict:
    try:
        text = file_content.decode("utf-8")

        reader = csv.DictReader(io.StringIO(text))

        rows = list(reader)

        columns = reader.fieldnames or []

        return {
            "success": True,
            "rows_processed": len(rows),
            "columns": columns,
            "sample": rows[:5],
        }

    except UnicodeDecodeError:
        return {
            "success": False,
            "rows_processed": 0,
            "columns": [],
            "sample": [],
            "error": "File must use UTF-8 encoding.",
        }

    except Exception as error:
        return {
            "success": False,
            "rows_processed": 0,
            "columns": [],
            "sample": [],
            "error": str(error),
        }


def process_uploaded_file(
    filename: str,
    file_content: bytes,
) -> Dict:

    validation = validate_file(filename)

    if not validation["valid"]:
        return {
            "success": False,
            "filename": filename,
            "error": "Unsupported file type. Only CSV files are currently supported.",
        }

    result = process_csv(file_content)

    return {
        "success": result["success"],
        "filename": filename,
        "file_type": validation["file_type"],
        "rows_processed": result["rows_processed"],
        "columns": result["columns"],
        "sample": result["sample"],
        **(
            {"error": result["error"]}
            if "error" in result
            else {}
        ),
    }


def analyze_dataset(data: Dict) -> Dict:
    columns: List[str] = data.get("columns", [])
    rows_processed = data.get("rows_processed", 0)

    detected_fields = []

    field_keywords = {
        "employee": [
            "employee",
            "employee_id",
            "employee_name",
            "staff",
        ],
        "customer": [
            "customer",
            "customer_id",
            "customer_name",
            "client",
        ],
        "department": [
            "department",
            "team",
            "division",
        ],
        "performance": [
            "performance",
            "score",
            "rating",
        ],
        "risk": [
            "risk",
            "risk_score",
            "risk_level",
        ],
        "revenue": [
            "revenue",
            "sales",
            "amount",
            "value",
        ],
    }

    normalized_columns = {
        column.lower().strip()
        for column in columns
    }

    for category, keywords in field_keywords.items():
        if any(keyword in normalized_columns for keyword in keywords):
            detected_fields.append(category)

    return {
        "rows": rows_processed,
        "columns": len(columns),
        "detected_fields": detected_fields,
        "dataset_type": detect_dataset_type(detected_fields),
    }


def detect_dataset_type(fields: List[str]) -> str:
    if "employee" in fields:
        return "Employee Dataset"

    if "customer" in fields:
        return "Customer Dataset"

    if "risk" in fields:
        return "Risk Dataset"

    if "revenue" in fields:
        return "Financial Dataset"

    return "General Dataset"