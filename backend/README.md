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

### Current Endpoints (Stage 1)

- `GET /` - Root endpoint with API information
- `GET /health` - Health check endpoint (verifies database connection)

### Coming Soon

- Stage 2: Authentication endpoints (`/api/auth/*`)
- Stage 3: Task management endpoints (`/api/tasks/*`)
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

## Stage 1 Completion Checklist

- [x] Project structure created
- [x] Dependencies defined in requirements.txt
- [x] Environment configuration with .env files
- [x] MongoDB connection manager implemented
- [x] FastAPI app with CORS configuration
- [x] Health check endpoint
- [x] Startup/shutdown lifecycle management
- [ ] Test health check endpoint
- [ ] Verify database connection
- [ ] Ready to commit Stage 1

