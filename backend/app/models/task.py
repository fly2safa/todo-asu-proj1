from datetime import datetime, timezone
from typing import Optional, List


class TaskModel:
    """Task document model for MongoDB."""
    
    @staticmethod
    def create_task(
        title: str,
        description: Optional[str],
        priority: str,
        deadline: datetime,
        user_id: str,
        label_ids: List[str] = None
    ) -> dict:
        """Create a new task document."""
        return {
            "title": title,
            "description": description,
            "priority": priority,
            "deadline": deadline,
            "completed": False,
            "user_id": user_id,
            "label_ids": label_ids or [],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    
    @staticmethod
    def to_dict(task_doc: dict) -> dict:
        """Convert MongoDB document to dictionary with string ID."""
        if task_doc:
            task_doc["id"] = str(task_doc["_id"])
            del task_doc["_id"]
        return task_doc
    
    @staticmethod
    def is_overdue(deadline: datetime, completed: bool) -> bool:
        """Check if a task is overdue."""
        if completed:
            return False
        # Make datetime timezone-aware for comparison
        now = datetime.now(timezone.utc)
        # If deadline is naive, make it aware
        if deadline.tzinfo is None:
            deadline = deadline.replace(tzinfo=timezone.utc)
        return now > deadline
    
    @staticmethod
    def get_collection_name() -> str:
        """Get the collection name for tasks."""
        return "tasks"

