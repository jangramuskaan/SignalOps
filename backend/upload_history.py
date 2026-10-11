from datetime import datetime
from typing import Dict, List


UPLOAD_HISTORY: List[Dict] = []


def record_upload(result: Dict) -> Dict:
    record = {
        "id": len(UPLOAD_HISTORY) + 1,
        "filename": result.get("filename", "unknown.csv"),
        "file_type": result.get("file_type", "CSV"),
        "rows_processed": result.get("rows_processed", 0),
        "columns": result.get("columns", []),
        "dataset_type": result.get(
            "analysis", {}
        ).get("dataset_type", "General Dataset"),
        "detected_fields": result.get(
            "analysis", {}
        ).get("detected_fields", []),
        "status": (
            "Processed"
            if result.get("success")
            else "Failed"
        ),
        "uploaded_at": datetime.now().isoformat(),
    }

    UPLOAD_HISTORY.insert(0, record)

    return record


def get_upload_history() -> List[Dict]:
    return UPLOAD_HISTORY


def get_upload_summary() -> Dict:
    total = len(UPLOAD_HISTORY)

    processed = len(
        [
            upload
            for upload in UPLOAD_HISTORY
            if upload["status"] == "Processed"
        ]
    )

    failed = len(
        [
            upload
            for upload in UPLOAD_HISTORY
            if upload["status"] == "Failed"
        ]
    )

    total_rows = sum(
        upload["rows_processed"]
        for upload in UPLOAD_HISTORY
    )

    return {
        "total_uploads": total,
        "processed_uploads": processed,
        "failed_uploads": failed,
        "total_rows_processed": total_rows,
    }