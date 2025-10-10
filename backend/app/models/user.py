from datetime import datetime
from typing import Optional
from bson import ObjectId


class UserModel:
    """User document model for MongoDB."""
    
    @staticmethod
    def create_user(email: str, username: str, hashed_password: str) -> dict:
        """Create a new user document."""
        return {
            "email": email,
            "username": username,
            "hashed_password": hashed_password,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    
    @staticmethod
    def to_dict(user_doc: dict) -> dict:
        """Convert MongoDB document to dictionary with string ID."""
        if user_doc:
            user_doc["id"] = str(user_doc["_id"])
            del user_doc["_id"]
        return user_doc
    
    @staticmethod
    def get_collection_name() -> str:
        """Get the collection name for users."""
        return "users"

