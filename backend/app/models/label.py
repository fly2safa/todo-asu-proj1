from datetime import datetime
from typing import Optional


class LabelModel:
    """Label document model for MongoDB."""
    
    @staticmethod
    def create_label(name: str, color: str, user_id: str) -> dict:
        """Create a new label document."""
        return {
            "name": name,
            "color": color,
            "user_id": user_id,
            "created_at": datetime.utcnow()
        }
    
    @staticmethod
    def to_dict(label_doc: dict) -> dict:
        """Convert MongoDB document to dictionary with string ID."""
        if label_doc:
            label_doc["id"] = str(label_doc["_id"])
            del label_doc["_id"]
        return label_doc
    
    @staticmethod
    def get_collection_name() -> str:
        """Get the collection name for labels."""
        return "labels"

