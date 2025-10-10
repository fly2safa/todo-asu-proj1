from datetime import datetime
from typing import Optional


class TokenModel:
    """Refresh token document model for MongoDB."""
    
    @staticmethod
    def create_refresh_token(user_id: str, token: str, expires_at: datetime) -> dict:
        """Create a new refresh token document."""
        return {
            "user_id": user_id,
            "token": token,
            "expires_at": expires_at,
            "revoked": False,
            "created_at": datetime.utcnow()
        }
    
    @staticmethod
    def get_collection_name() -> str:
        """Get the collection name for refresh tokens."""
        return "refresh_tokens"

