from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from bson import ObjectId
from pymongo.errors import PyMongoError

from app.database import get_db
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse, PriorityEnum
from app.models.task import TaskModel
from app.utils.auth import get_current_user

router = APIRouter(prefix="/api/tasks", tags=["Tasks"])


@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_data: TaskCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new task for the authenticated user."""
    db = get_db()
    tasks_collection = db[TaskModel.get_collection_name()]
    
    # Create task document
    task_doc = TaskModel.create_task(
        title=task_data.title,
        description=task_data.description,
        priority=task_data.priority.value,
        deadline=task_data.deadline,
        user_id=current_user["id"],
        label_ids=task_data.label_ids
    )
    
    try:
        result = tasks_collection.insert_one(task_doc)
        task_doc["_id"] = result.inserted_id
        
        task_dict = TaskModel.to_dict(task_doc)
        task_dict["is_overdue"] = TaskModel.is_overdue(task_doc["deadline"], task_doc["completed"])
        
        return task_dict
    
    except PyMongoError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )


@router.get("", response_model=List[TaskResponse])
@router.get("/", response_model=List[TaskResponse])
async def get_tasks(
    priority: Optional[PriorityEnum] = None,
    completed: Optional[bool] = None,
    labels: Optional[str] = Query(None, description="Comma-separated label IDs"),
    overdue: Optional[bool] = None,
    sort_by: Optional[str] = Query("created_at", description="Field to sort by"),
    order: Optional[str] = Query("desc", description="Sort order: asc or desc"),
    current_user: dict = Depends(get_current_user)
):
    """Get all tasks for the authenticated user with optional filters."""
    db = get_db()
    tasks_collection = db[TaskModel.get_collection_name()]
    
    # Build query filter
    query = {"user_id": current_user["id"]}
    
    if priority:
        query["priority"] = priority.value
    
    if completed is not None:
        query["completed"] = completed
    
    if labels:
        label_ids = [lid.strip() for lid in labels.split(",")]
        query["label_ids"] = {"$in": label_ids}
    
    # Sort configuration
    sort_order = 1 if order == "asc" else -1
    
    try:
        tasks = list(tasks_collection.find(query).sort(sort_by, sort_order))
        
        # Convert to response format and add overdue status
        result = []
        for task in tasks:
            task_dict = TaskModel.to_dict(task)
            task_dict["is_overdue"] = TaskModel.is_overdue(task["deadline"], task["completed"])
            
            # Apply overdue filter if specified
            if overdue is not None:
                if overdue == task_dict["is_overdue"]:
                    result.append(task_dict)
            else:
                result.append(task_dict)
        
        return result
    
    except PyMongoError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: {str(e)}"
        )


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(
    task_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get a specific task by ID."""
    db = get_db()
    tasks_collection = db[TaskModel.get_collection_name()]
    
    try:
        task = tasks_collection.find_one({
            "_id": ObjectId(task_id),
            "user_id": current_user["id"]
        })
        
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )
        
        task_dict = TaskModel.to_dict(task)
        task_dict["is_overdue"] = TaskModel.is_overdue(task["deadline"], task["completed"])
        
        return task_dict
    
    except Exception as e:
        if isinstance(e, HTTPException):
            raise
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid task ID"
        )


@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: str,
    task_data: TaskUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update a task."""
    db = get_db()
    tasks_collection = db[TaskModel.get_collection_name()]
    
    try:
        # Verify task exists and belongs to user
        task = tasks_collection.find_one({
            "_id": ObjectId(task_id),
            "user_id": current_user["id"]
        })
        
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )
        
        # Build update data (only include fields that were provided)
        update_data = {}
        if task_data.title is not None:
            update_data["title"] = task_data.title
        if task_data.description is not None:
            update_data["description"] = task_data.description
        if task_data.priority is not None:
            update_data["priority"] = task_data.priority.value
        if task_data.deadline is not None:
            update_data["deadline"] = task_data.deadline
        if task_data.completed is not None:
            update_data["completed"] = task_data.completed
        if task_data.label_ids is not None:
            update_data["label_ids"] = task_data.label_ids
        
        update_data["updated_at"] = datetime.utcnow()
        
        # Update task
        tasks_collection.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": update_data}
        )
        
        # Fetch updated task
        updated_task = tasks_collection.find_one({"_id": ObjectId(task_id)})
        task_dict = TaskModel.to_dict(updated_task)
        task_dict["is_overdue"] = TaskModel.is_overdue(updated_task["deadline"], updated_task["completed"])
        
        return task_dict
    
    except Exception as e:
        if isinstance(e, HTTPException):
            raise
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid task ID or update data"
        )


@router.patch("/{task_id}/complete", response_model=TaskResponse)
async def toggle_task_completion(
    task_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Toggle task completion status."""
    db = get_db()
    tasks_collection = db[TaskModel.get_collection_name()]
    
    try:
        # Verify task exists and belongs to user
        task = tasks_collection.find_one({
            "_id": ObjectId(task_id),
            "user_id": current_user["id"]
        })
        
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )
        
        # Toggle completion
        new_completed = not task["completed"]
        tasks_collection.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": {"completed": new_completed, "updated_at": datetime.utcnow()}}
        )
        
        # Fetch updated task
        updated_task = tasks_collection.find_one({"_id": ObjectId(task_id)})
        task_dict = TaskModel.to_dict(updated_task)
        task_dict["is_overdue"] = TaskModel.is_overdue(updated_task["deadline"], updated_task["completed"])
        
        return task_dict
    
    except Exception as e:
        if isinstance(e, HTTPException):
            raise
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid task ID"
        )


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete a task."""
    db = get_db()
    tasks_collection = db[TaskModel.get_collection_name()]
    
    try:
        result = tasks_collection.delete_one({
            "_id": ObjectId(task_id),
            "user_id": current_user["id"]
        })
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found"
            )
        
        return None
    
    except Exception as e:
        if isinstance(e, HTTPException):
            raise
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid task ID"
        )

