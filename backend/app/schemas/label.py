from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator
import re


class LabelCreate(BaseModel):
    """Schema for label creation."""
    name: str = Field(..., min_length=1, max_length=50)
    color: str = Field(..., pattern=r'^#[0-9A-Fa-f]{6}$')
    
    @field_validator('color')
    @classmethod
    def validate_hex_color(cls, v: str) -> str:
        """Validate color is a valid hex code."""
        if not re.match(r'^#[0-9A-Fa-f]{6}$', v):
            raise ValueError('Color must be a valid hex code (e.g., #FF5733)')
        return v.upper()


class LabelUpdate(BaseModel):
    """Schema for label update."""
    name: Optional[str] = Field(None, min_length=1, max_length=50)
    color: Optional[str] = Field(None, pattern=r'^#[0-9A-Fa-f]{6}$')
    
    @field_validator('color')
    @classmethod
    def validate_hex_color(cls, v: Optional[str]) -> Optional[str]:
        """Validate color is a valid hex code."""
        if v and not re.match(r'^#[0-9A-Fa-f]{6}$', v):
            raise ValueError('Color must be a valid hex code (e.g., #FF5733)')
        return v.upper() if v else v


class LabelResponse(BaseModel):
    """Schema for label response."""
    id: str
    name: str
    color: str
    user_id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

