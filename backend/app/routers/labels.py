from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from pymongo.errors import PyMongoError

from app.database import get_db
from app.schemas.label import LabelCreate, LabelUpdate, LabelResponse
from app.models.label import LabelModel
from app.models.task import TaskModel
from app.utils.auth import get_current_user

router = APIRouter(prefix="/api/labels", tags=["Labels"])


@router.post("", response_model=LabelResponse, status_code=status.HTTP_201_CREATED)
@router.post("/", response_model=LabelResponse, status_code=status.HTTP_201_CREATED)
async def create_label(
    label_data: LabelCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new label for the authenticated user."""
    db = get_db()
    labels_collection = db[LabelModel.get_collection_name()]
    
    # Check if label with same name already exists for this user
    existing = labels_collection.find_one({
        "name": label_data.name,
        "user_id": current_user["id"]
    })
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Label with this name already exists"
        )
    
    # Create label document
    label_doc = LabelModel.create_label(
        name=label_data.name,
        color=label_data.color,
        user_id=current_user["id"]
    )
    
    try:
        result = labels_collection.insert_one(label_doc)
        label_doc["_id"] = result.inserted_id
        
        return LabelModel.to_dict(label_doc)
    
    except PyMongoError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )


@router.get("", response_model=List[LabelResponse])
@router.get("/", response_model=List[LabelResponse])
async def get_labels(
    current_user: dict = Depends(get_current_user)
):
    """Get all labels for the authenticated user."""
    db = get_db()
    labels_collection = db[LabelModel.get_collection_name()]
    
    try:
        labels = list(labels_collection.find({"user_id": current_user["id"]}).sort("name", 1))
        return [LabelModel.to_dict(label) for label in labels]
    
    except PyMongoError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )


@router.get("/{label_id}", response_model=LabelResponse)
async def get_label(
    label_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get a specific label by ID."""
    db = get_db()
    labels_collection = db[LabelModel.get_collection_name()]
    
    try:
        label = labels_collection.find_one({
            "_id": ObjectId(label_id),
            "user_id": current_user["id"]
        })
        
        if not label:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Label not found"
            )
        
        return LabelModel.to_dict(label)
    
    except Exception as e:
        if isinstance(e, HTTPException):
            raise
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid label ID"
        )


@router.put("/{label_id}", response_model=LabelResponse)
async def update_label(
    label_id: str,
    label_data: LabelUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update a label."""
    db = get_db()
    labels_collection = db[LabelModel.get_collection_name()]
    
    try:
        # Verify label exists and belongs to user
        label = labels_collection.find_one({
            "_id": ObjectId(label_id),
            "user_id": current_user["id"]
        })
        
        if not label:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Label not found"
            )
        
        # Build update data
        update_data = {}
        if label_data.name is not None:
            # Check if new name conflicts with existing label
            existing = labels_collection.find_one({
                "name": label_data.name,
                "user_id": current_user["id"],
                "_id": {"$ne": ObjectId(label_id)}
            })
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Label with this name already exists"
                )
            update_data["name"] = label_data.name
        
        if label_data.color is not None:
            update_data["color"] = label_data.color
        
        if not update_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No fields to update"
            )
        
        # Update label
        labels_collection.update_one(
            {"_id": ObjectId(label_id)},
            {"$set": update_data}
        )
        
        # Fetch updated label
        updated_label = labels_collection.find_one({"_id": ObjectId(label_id)})
        return LabelModel.to_dict(updated_label)
    
    except Exception as e:
        if isinstance(e, HTTPException):
            raise
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid label ID or update data"
        )


@router.delete("/{label_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_label(
    label_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete a label and remove it from all associated tasks."""
    db = get_db()
    labels_collection = db[LabelModel.get_collection_name()]
    tasks_collection = db[TaskModel.get_collection_name()]
    
    try:
        # Verify label exists and belongs to user
        result = labels_collection.delete_one({
            "_id": ObjectId(label_id),
            "user_id": current_user["id"]
        })
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Label not found"
            )
        
        # Remove label from all tasks
        tasks_collection.update_many(
            {"user_id": current_user["id"]},
            {"$pull": {"label_ids": label_id}}
        )
        
        return None
    
    except Exception as e:
        if isinstance(e, HTTPException):
            raise
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid label ID"
        )

