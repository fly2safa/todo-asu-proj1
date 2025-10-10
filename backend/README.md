# TODO API - Backend

FastAPI backend for the TODO application with MongoDB integration.

## Setup Instructions

### 1. Install Dependencies

```bash
# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Update the following values in `.env`:
   - `MONGODB_URI`: Your MongoDB connection string (e.g., from MongoDB Atlas)
   - `DATABASE_NAME`: Your database name
   - `JWT_SECRET_KEY`: Generate a secure random key for JWT signing

To generate a secure JWT secret key, run:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 3. Run the Application

```bash
# Run with uvicorn
uvicorn app.main:app --reload

# Or specify host and port
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

## API Endpoints

### Stage 1: Core Endpoints

- `GET /` - Root endpoint with API information
- `GET /health` - Health check endpoint (verifies database connection)

### Stage 2: Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive access/refresh tokens
- `POST /api/auth/refresh` - Refresh access token using refresh token
- `POST /api/auth/logout` - Logout and revoke refresh token
- `GET /api/auth/me` - Get current authenticated user information (protected)

### Stage 3: Task Management Endpoints

- `POST /api/tasks` - Create a new task (protected)
- `GET /api/tasks` - Get all user's tasks with filtering/sorting (protected)
- `GET /api/tasks/{task_id}` - Get a specific task (protected)
- `PUT /api/tasks/{task_id}` - Update a task (protected)
- `PATCH /api/tasks/{task_id}/complete` - Toggle task completion (protected)
- `DELETE /api/tasks/{task_id}` - Delete a task (protected)

### Coming Soon

- Stage 4: Label management endpoints (`/api/labels/*`)

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py           # FastAPI app initialization
│   ├── config.py         # Settings and configuration
│   ├── database.py       # MongoDB connection management
│   ├── models/           # MongoDB document models
│   ├── schemas/          # Pydantic validation schemas
│   ├── routers/          # API route handlers
│   └── utils/            # Helper functions and utilities
├── .env                  # Environment variables (not in git)
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── requirements.txt      # Python dependencies
└── README.md            # This file
```

## Development

### Testing the API

Use the interactive documentation at `/docs` to test endpoints:
1. Navigate to http://localhost:8000/docs
2. Try the health check endpoint to verify database connectivity
3. Explore available endpoints and their schemas

### MongoDB Atlas Setup (if needed)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update `MONGODB_URI` in `.env`

## Stage 1 Completion ✅

- [x] Project structure created
- [x] Dependencies defined in requirements.txt
- [x] Environment configuration with .env files
- [x] MongoDB connection manager implemented
- [x] FastAPI app with CORS configuration
- [x] Health check endpoint
- [x] Startup/shutdown lifecycle management
- [x] Tested and committed

## Stage 2 Completion ✅

- [x] User model and schema created
- [x] Token model for refresh tokens
- [x] Password hashing with bcrypt
- [x] JWT token generation (access + refresh)
- [x] User registration endpoint
- [x] User login endpoint
- [x] Token refresh endpoint
- [x] Logout endpoint
- [x] Protected route for user info
- [x] Tested and committed

## Stage 3 Completion Checklist

- [x] Task model and schema created
- [x] Priority enum (High, Medium, Low)
- [x] Task CRUD endpoints
- [x] Filtering by priority, completion, labels, overdue
- [x] Sorting by various fields
- [x] Overdue detection
- [x] Task ownership verification
- [ ] Test all task endpoints
- [ ] Verify filtering and sorting
- [ ] Ready to commit Stage 3

