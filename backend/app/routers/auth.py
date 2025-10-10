from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from bson import ObjectId
from pymongo.errors import DuplicateKeyError

from app.database import get_db
from app.schemas.user import UserCreate, UserLogin, UserResponse, Token, TokenRefresh
from app.models.user import UserModel
from app.models.token import TokenModel
from app.utils.auth import (
    get_password_hash,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
    get_current_user,
    verify_token_type
)
from app.config import settings

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate):
    """Register a new user."""
    db = get_db()
    users_collection = db[UserModel.get_collection_name()]
    
    # Check if user already exists
    existing_user = users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if username already exists
    existing_username = users_collection.find_one({"username": user_data.username})
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Hash password and create user
    hashed_password = get_password_hash(user_data.password)
    user_doc = UserModel.create_user(
        email=user_data.email,
        username=user_data.username,
        hashed_password=hashed_password
    )
    
    # Create unique indexes
    users_collection.create_index("email", unique=True)
    users_collection.create_index("username", unique=True)
    
    try:
        result = users_collection.insert_one(user_doc)
        user_doc["_id"] = result.inserted_id
        
        return UserModel.to_dict(user_doc)
    
    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )


@router.post("/login", response_model=Token)
async def login(user_data: UserLogin):
    """Login user and return access and refresh tokens."""
    db = get_db()
    users_collection = db[UserModel.get_collection_name()]
    
    # Find user by email
    user = users_collection.find_one({"email": user_data.email})
    
    if not user or not verify_password(user_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access and refresh tokens
    user_id = str(user["_id"])
    access_token = create_access_token(data={"sub": user_id, "email": user["email"]})
    refresh_token = create_refresh_token(data={"sub": user_id, "email": user["email"]})
    
    # Store refresh token in database
    tokens_collection = db[TokenModel.get_collection_name()]
    refresh_token_doc = TokenModel.create_refresh_token(
        user_id=user_id,
        token=refresh_token,
        expires_at=datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    )
    tokens_collection.insert_one(refresh_token_doc)
    
    return Token(access_token=access_token, refresh_token=refresh_token)


@router.post("/refresh", response_model=Token)
async def refresh_token(token_data: TokenRefresh):
    """Refresh access token using refresh token."""
    # Verify token type
    if not verify_token_type(token_data.refresh_token, "refresh"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Decode refresh token
    decoded_token = decode_token(token_data.refresh_token)
    
    # Check if refresh token exists and is not revoked
    db = get_db()
    tokens_collection = db[TokenModel.get_collection_name()]
    
    stored_token = tokens_collection.find_one({
        "token": token_data.refresh_token,
        "revoked": False,
        "expires_at": {"$gt": datetime.utcnow()}
    })
    
    if not stored_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create new tokens
    access_token = create_access_token(
        data={"sub": decoded_token.user_id, "email": decoded_token.email}
    )
    new_refresh_token = create_refresh_token(
        data={"sub": decoded_token.user_id, "email": decoded_token.email}
    )
    
    # Revoke old refresh token
    tokens_collection.update_one(
        {"_id": stored_token["_id"]},
        {"$set": {"revoked": True}}
    )
    
    # Store new refresh token
    new_refresh_token_doc = TokenModel.create_refresh_token(
        user_id=decoded_token.user_id,
        token=new_refresh_token,
        expires_at=datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    )
    tokens_collection.insert_one(new_refresh_token_doc)
    
    return Token(access_token=access_token, refresh_token=new_refresh_token)


@router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(token_data: TokenRefresh, current_user: dict = Depends(get_current_user)):
    """Logout user by revoking refresh token."""
    db = get_db()
    tokens_collection = db[TokenModel.get_collection_name()]
    
    # Revoke the refresh token
    result = tokens_collection.update_one(
        {"token": token_data.refresh_token, "user_id": current_user["id"]},
        {"$set": {"revoked": True}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid refresh token"
        )
    
    return {"message": "Successfully logged out"}


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current authenticated user information."""
    return current_user

