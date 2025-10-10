from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from enum import Enum


class PriorityEnum(str, Enum):
    """Task priority levels."""
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"


class TaskCreate(BaseModel):
    """Schema for task creation."""
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    priority: PriorityEnum
    deadline: datetime
    label_ids: List[str] = Field(default_factory=list)


class TaskUpdate(BaseModel):
    """Schema for task update."""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    priority: Optional[PriorityEnum] = None
    deadline: Optional[datetime] = None
    completed: Optional[bool] = None
    label_ids: Optional[List[str]] = None


class TaskResponse(BaseModel):
    """Schema for task response."""
    id: str
    title: str
    description: Optional[str]
    priority: str
    deadline: datetime
    completed: bool
    user_id: str
    label_ids: List[str]
    created_at: datetime
    updated_at: datetime
    is_overdue: bool = False
    
    class Config:
        from_attributes = True

