from pymongo import MongoClient
from pymongo.database import Database
from pymongo.errors import ConnectionFailure, ConfigurationError
from app.config import settings


class DatabaseManager:
    """Manages MongoDB connection and provides database instance."""
    
    def __init__(self):
        self.client: MongoClient | None = None
        self.db: Database | None = None
    
    def connect(self):
        """Establish connection to MongoDB."""
        try:
            # Check if we have a real MongoDB URI (not placeholder)
            if "username:password" in settings.MONGODB_URI or "cluster.mongodb.net" not in settings.MONGODB_URI:
                print("WARNING: Using placeholder MongoDB URI. Please update .env with your actual MongoDB connection string.")
                print("For now, the application will run without database connection for testing.")
                return
            
            self.client = MongoClient(settings.MONGODB_URI)
            # Test the connection
            self.client.admin.command('ping')
            self.db = self.client[settings.DATABASE_NAME]
            print(f"Successfully connected to MongoDB database: {settings.DATABASE_NAME}")
        except (ConnectionFailure, ConfigurationError) as e:
            print(f"WARNING: MongoDB connection failed: {e}")
            print("The application will run without database connection for testing.")
        except Exception as e:
            print(f"ERROR: Unexpected error connecting to MongoDB: {e}")
            raise
    
    def close(self):
        """Close MongoDB connection."""
        if self.client:
            self.client.close()
            print("MongoDB connection closed")
    
    def get_database(self) -> Database:
        """Get the database instance."""
        if self.db is None:
            raise RuntimeError("Database not connected. Call connect() first.")
        return self.db
    
    def check_connection(self) -> bool:
        """Check if database connection is active."""
        try:
            if self.client:
                self.client.admin.command('ping')
                return True
            return False
        except Exception:
            return False


# Global database manager instance
db_manager = DatabaseManager()


def get_db() -> Database:
    """Dependency to get database instance in route handlers."""
    return db_manager.get_database()

