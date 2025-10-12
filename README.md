# Full-Stack TODO Application


A modern, full-stack TODO application built with **FastAPI (Python)** backend and
 **Next.js 14 (React/TypeScript)** frontend, using **MongoDB** for data persistence.
 This project demonstrates best practices in full-stack development and is designed to
 provide hands-on experience with modern web development tools and best practices
 with user authentication, labels, and advanced filtering capabilities.


---

## Author

**Developer**: [Safa M.]  
**Course**: ASU **AI Vibe Coding** Course  
**Project**: Full-Stack TODO Application  
**Completion Date**: October 13, 2025

### Key Contributions
- Designed and implemented complete backend API with FastAPI
- Built modern, responsive frontend with Next.js 14
- Integrated MongoDB for data persistence
- Implemented JWT authentication with refresh tokens
- Created comprehensive filtering and sorting system
- Developed custom label management with color picker
- Followed staged development approach with Git version control

---

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Development Notes](#development-notes)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

## Required Features (Core User Stories)
   Following are the essential features that must be completed:
### User Management
- **User Registration**: Ability to create a new account with email, username, and password
- **User Authentication**: Secure login/logout with JWT tokens and refresh token mechanism
- **Protected Routes**: Access control for authenticated users only
- **Session Management**: Automatic token refresh for seamless user experience
- **Profile Management**: View and edit profile details (username, email, password) ⭐ NEW
- **Predefined Labels**: New users automatically get 5 starter labels (Work, Personal, Urgent, Shopping, Health) ⭐ NEW

### Task Management
- **Create Tasks**: Add new tasks with title, description, priority, and deadline
- **View Tasks**: Display all tasks with comprehensive filtering and sorting options
- **Update Tasks**: Edit task details and toggle completion status
- **Delete Tasks**: Remove tasks with confirmation dialogs
- **Priority Levels**: Organize tasks by High, Medium, or Low priority
- **Deadline Tracking**: Visual indicators for overdue tasks
- **Completion Tracking**: Mark tasks as complete/incomplete with a single click

### Labeling System
- **Predefined Labels**: New users automatically receive 5 starter labels (Work, Personal, Urgent, Shopping, Health) ⭐ NEW
- **Create Labels**: Add custom labels with names and colors (8 presets + custom picker)
- **Assign Labels**: Tag tasks with multiple labels for better organization
- **Filter by Labels**: View tasks filtered by specific labels (multi-select with OR logic)
- **Label Management**: Edit label names/colors and delete labels
- **Cascade Delete**: Deleted labels automatically removed from all tasks

### Advanced Filtering & Sorting
- **Filter by Priority**: High, Medium, Low, or All
- **Filter by Status**: Completed, Incomplete, or All
- **Filter by Overdue**: Show only overdue tasks or exclude them
- **Filter by Labels**: Multi-select label filtering
- **Sort by Date**: Created date, deadline, or priority
- **Sort Order**: Ascending or descending
- **Smart Sorting**: Tasks without deadlines handled intelligently

### Data Persistence
- **MongoDB Integration**: All data stored securely in MongoDB with proper indexing
- **Real-time Updates**: Changes reflected immediately across the application
- **User-scoped Data**: Each user sees only their own tasks and labels


## Technical Requirements & File Structure
   Need to adhere to the following technical and structural guidelines

## Database: MongoDB
   The project should leverage a MongoDB database filled with appropriately modeled documents & collections. Reference this document on the MongoDB guidelines for embeding vs referencing information in a document:
    guideline_image.png

## Technology Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs with automatic documentation
                NOTE: Using Simplified FastAPI structure
- **Python 3.8+** - Programming language
- **MongoDB** - NoSQL database for data storage
- **PyMongo** - MongoDB driver for Python
- **Motor** - Async MongoDB driver
- **JWT/Passlib** - Secure token-based authentication with password hashing
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server for running the application

### Frontend
- **Next.js 14** - React framework with App Router for modern web applications
                   NOTE: Using Simplified Next.js structure
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Axios** - HTTP client for API requests with interceptors
- **React Hook Form** - Performant form handling and validation
- **Lucide React** - Modern, customizable icon library
- **js-cookie** - Simple cookie management for JWT storage
- **date-fns** - Modern JavaScript date utility library

---

## Project Structure

```
todo-asu-proj1/
├── backend/                           # FastAPI backend application
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                    # FastAPI application entry point
│   │   ├── config.py                  # Configuration settings
│   │   ├── database.py                # MongoDB connection setup
│   │   ├── models/                    # Database models (MongoDB documents)
│   │   │   ├── __init__.py
│   │   │   ├── user.py                # User model
│   │   │   ├── task.py                # Task model
│   │   │   ├── label.py               # Label model
│   │   │   └── token.py               # Token model (refresh tokens)
│   │   ├── schemas/                   # Pydantic schemas for validation
│   │   │   ├── __init__.py
│   │   │   ├── user.py                # User request/response schemas
│   │   │   ├── task.py                # Task request/response schemas
│   │   │   └── label.py               # Label request/response schemas
│   │   ├── routers/                   # API route handlers
│   │   │   ├── __init__.py
│   │   │   ├── auth.py                # Authentication endpoints
│   │   │   ├── tasks.py               # Task CRUD endpoints
│   │   │   └── labels.py              # Label CRUD endpoints
│   │   └── utils/                     # Utility functions
│   │       ├── __init__.py
│   │       └── auth.py                # JWT utilities, password hashing
│   ├── requirements.txt               # Python dependencies
│   ├── README.md                      # Backend-specific documentation
│   ├── .env.example                   # Environment variables template
│   ├── .gitignore                     # Git ignore rules for backend
│   ├── STAGE1_TEST_RESULTS.md         # Backend Stage 1 tests
│   ├── STAGE2_TEST_RESULTS.md         # Backend Stage 2 tests
│   ├── STAGE3_TEST_RESULTS.md         # Backend Stage 3 tests
│   └── STAGE4_TEST_RESULTS.md         # Backend Stage 4 tests
│
├── frontend/                          # Next.js 14 frontend application
│   ├── app/                           # Next.js App Router pages
│   │   ├── globals.css                # Global styles with Tailwind
│   │   ├── layout.tsx                 # Root layout with AuthProvider
│   │   ├── page.tsx                   # Home page (redirects based on auth)
│   │   ├── login/
│   │   │   └── page.tsx               # Login page with form validation
│   │   ├── register/
│   │   │   └── page.tsx               # Registration page
│   │   └── dashboard/
│   │       ├── layout.tsx             # Dashboard layout with header
│   │       └── page.tsx               # Main dashboard with tasks & filters
│   ├── components/                    # React components
│   │   ├── Header.tsx                 # App header with user info & logout
│   │   ├── ProtectedRoute.tsx         # Route protection wrapper
│   │   ├── TaskCard.tsx               # Individual task display with actions
│   │   ├── TaskList.tsx               # Task list with loading states
│   │   ├── TaskFormModal.tsx          # Task create/edit modal
│   │   ├── LabelManager.tsx           # Label CRUD modal
│   │   └── TaskFiltersPanel.tsx       # Advanced filtering & sorting UI
│   ├── contexts/                      # React Context providers
│   │   └── AuthContext.tsx            # Global authentication state
│   ├── lib/                           # Utility libraries & services
│   │   ├── api.ts                     # Axios instance with interceptors
│   │   ├── auth.ts                    # Auth service functions
│   │   ├── tasks.ts                   # Task service functions
│   │   └── labels.ts                  # Label service functions
│   ├── types/                         # TypeScript type definitions
│   │   └── index.ts                   # All app types and interfaces
│   ├── public/                        # Static assets
│   ├── package.json                   # Node.js dependencies
│   ├── tailwind.config.ts             # Tailwind CSS configuration
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── next.config.mjs                # Next.js configuration
│   ├── README.md                      # Frontend-specific documentation
│   ├── .gitignore                     # Git ignore rules for frontend
│   ├── FRONTEND_STAGES.md             # Frontend development plan
│   ├── STAGE1_TEST_RESULTS.md         # Frontend Stage 1 tests
│   ├── STAGE2_TEST_RESULTS.md         # Frontend Stage 2 tests
│   ├── STAGE3_TEST_RESULTS.md         # Frontend Stage 3 tests
│   ├── STAGE4_TEST_RESULTS.md         # Frontend Stage 4 tests
│   ├── STAGE5_TEST_RESULTS.md         # Frontend Stage 5 tests
│   └── STAGE6_TEST_RESULTS.md         # Frontend Stage 6 tests
│
├── .gitignore                         # Root-level Git ignore rules
├── guideline_image.png                # MongoDB design guidelines reference
└── README.md                          # This file - main project documentation
```

---

## Prerequisites

Before running this application, ensure you have the following installed:

- **Python 3.8+** - Backend programming language
- **Node.js 18+** - Frontend runtime environment
- **MongoDB** - Local installation or MongoDB Atlas account
- **npm** or **yarn** - Package manager for frontend
- **Git** - Version control (for cloning and managing the repository)

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/fly2safa/todo-asu-proj1
cd todo-asu-proj1
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
# Copy .env.example to .env and configure
```

**Configure `.env` file** with your settings:
```env
MONGODB_URI=mongodb+srv://<userid>:<password>@cluster0.mnk7h6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DATABASE_NAME=MyTodoASUproj1
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd ../frontend

# Install dependencies
npm install

# (Optional) Create .env.local if you need custom API URL
# NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Database Setup

Ensure MongoDB is running on your system:

**Option A - Local MongoDB:**
```bash
# Start MongoDB service (varies by OS)
# Windows: MongoDB should be running as a service
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Option B - MongoDB Atlas (Cloud):**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Update `MONGODB_URL` in your `.env` file

---

## Running the Application

### Start the Backend Server

```bash
# From backend directory (with virtual environment activated)
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: `http://localhost:8000`
- **Interactive API Docs (Swagger)**: `http://localhost:8000/docs`
- **Alternative API Docs (ReDoc)**: `http://localhost:8000/redoc`

### Start the Frontend Development Server

```bash
# From frontend directory (in a new terminal)
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: `http://localhost:3000`

---

## API Documentation

The backend provides comprehensive API documentation through FastAPI's automatic documentation.

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Create new user account (+ 5 predefined labels) | No |
| POST | `/api/auth/login` | User login (returns access & refresh tokens) | No |
| POST | `/api/auth/refresh` | Refresh access token | Yes (Refresh Token) |
| GET | `/api/auth/me` | Get current user info | Yes |
| PUT | `/api/auth/me` | Update user profile (username, email, password) ⭐ NEW | Yes |
| POST | `/api/auth/logout` | Logout user (revoke refresh token) | Yes |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all tasks for current user | Yes |
| POST | `/api/tasks` | Create new task | Yes |
| GET | `/api/tasks/{task_id}` | Get specific task | Yes |
| PUT | `/api/tasks/{task_id}` | Update task | Yes |
| DELETE | `/api/tasks/{task_id}` | Delete task | Yes |
| PATCH | `/api/tasks/{task_id}/complete` | Toggle task completion | Yes |

### Label Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/labels` | Get all labels for current user | Yes |
| POST | `/api/labels` | Create new label | Yes |
| GET | `/api/labels/{label_id}` | Get specific label | Yes |
| PUT | `/api/labels/{label_id}` | Update label | Yes |
| DELETE | `/api/labels/{label_id}` | Delete label (cascade) | Yes |

For detailed request/response schemas and to test the API interactively, visit `http://localhost:8000/docs` after starting the backend.

---

## Usage Guide

### Getting Started

1. **Register an Account**
   - Navigate to `http://localhost:3000/register`
   - Fill in username, email, and password
   - Submit to create your account

2. **Log In**
   - Navigate to `http://localhost:3000/login`
   - Enter your credentials
   - You'll be redirected to the dashboard

3. **Create Labels (Optional but Recommended)**
   - Click "Manage Labels" on the dashboard
   - Create labels like "Work", "Personal", "Urgent"
   - Choose colors to visually distinguish them

4. **Create Your First Task**
   - Click "New Task" button
   - Fill in task details:
     - **Title** (required)
     - **Description** (optional)
     - **Priority** (High, Medium, Low)
     - **Deadline** (date)
     - **Labels** (select one or more)
   - Click "Create Task"

5. **Manage Tasks**
   - **Complete**: Click the checkbox to mark as done
   - **Edit**: Click the edit icon to modify task details
   - **Delete**: Click the delete icon (confirmation required)

6. **Filter and Sort**
   - Click "Filters & Sort" to expand the panel
   - Apply filters by priority, status, labels, or overdue
   - Sort by created date, deadline, or priority
   - Use "Reset All" to clear filters

### Tips for Effective Task Management

- Use **High priority** for urgent or important tasks
- Set **realistic deadlines** to avoid overdue tasks
- Use **labels** to categorize tasks by context (e.g., Work, Home, Shopping)
- **Filter by labels** to focus on specific areas of your life
- **Sort by deadline** to see what's due soon
- Regularly review and update your tasks

---

## Development Notes

### Backend Development

- **Staged Development**: Backend was built in 4 incremental stages (see `backend/STAGE*_TEST_RESULTS.md`)
- **Auto-reload**: FastAPI automatically reloads when code changes
- **API Documentation**: Swagger UI provides interactive API testing
- **Database Models**: MongoDB documents defined in `app/models/`
- **Validation**: Pydantic schemas ensure data integrity
- **Authentication**: JWT with refresh tokens for security

### Frontend Development

- **Staged Development**: Frontend was built in 6 incremental stages (see `frontend/STAGE*_TEST_RESULTS.md`)
- **Hot Reload**: Next.js provides instant feedback during development
- **Type Safety**: Full TypeScript implementation prevents runtime errors
- **State Management**: React Context for global authentication state
- **API Integration**: Axios with interceptors for token management
- **Responsive Design**: Tailwind CSS ensures mobile-friendly interface

### Code Quality

- **Modular Architecture**: Clear separation of concerns
- **Error Handling**: Comprehensive error handling throughout
- **Loading States**: User feedback during async operations
- **Confirmation Dialogs**: Prevent accidental deletions
- **Input Validation**: Both client-side and server-side validation

---

## Troubleshooting

### Backend Issues

**Issue: MongoDB Connection Error**
```
pymongo.errors.ServerSelectionTimeoutError
```
**Solution:**
- Ensure MongoDB is running: `sudo systemctl status mongod` (Linux)
- Check `MONGODB_URL` in `.env` file
- Verify network connectivity
- For Atlas: Check IP whitelist and credentials

**Issue: Module Import Errors**
```
ModuleNotFoundError: No module named 'fastapi'
```
**Solution:**
- Activate virtual environment: `source venv/bin/activate` (macOS/Linux) or `venv\Scripts\activate` (Windows)
- Install dependencies: `pip install -r requirements.txt`

**Issue: Port Already in Use**
```
Error: [Errno 48] Address already in use
```
**Solution:**
- Find process using port 8000: `lsof -i :8000` (macOS/Linux) or `netstat -ano | findstr :8000` (Windows)
- Kill the process or use a different port: `uvicorn app.main:app --port 8001`

### Frontend Issues

**Issue: Login Loop or 404 Errors**
```
GET /login 404 in 6ms (repeated)
```
**Solution:**
- Delete Next.js cache: `rm -rf .next` (or `Remove-Item -Recurse -Force .next` on Windows)
- Restart dev server: `npm run dev`
- Clear browser cookies and cache

**Issue: Module Not Found**
```
Error: Cannot find module 'axios'
```
**Solution:**
- Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

**Issue: CORS Errors**
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:**
- Ensure backend is running on `http://localhost:8000`
- Check CORS configuration in `backend/app/main.py`
- Verify frontend is using correct API URL

### Database Issues

**Issue: Authentication Failed**
```
MongoDB authentication failed
```
**Solution:**
- Check MongoDB credentials in `.env`
- Ensure database user has proper permissions
- For Atlas: Verify username/password in connection string

**Issue: Database Not Found**
```
Database 'todo_app' does not exist
```
**Solution:**
- MongoDB creates databases automatically
- Ensure `DATABASE_NAME` in `.env` is correct
- Try creating a task to trigger database creation

### General Issues

**Issue: API Requests Failing**
- Check both backend and frontend are running
- Verify ports (backend: 8000, frontend: 3000)
- Check browser console for errors
- Test API directly at `http://localhost:8000/docs`

**Issue: Styling Not Applied**
- Clear browser cache
- Check Tailwind CSS is configured correctly
- Restart frontend dev server

---

## Development Timeline

### Backend Stages (Completed)
1. ✅ **Stage 1**: Project setup, configuration, and database connection
2. ✅ **Stage 2**: User authentication with JWT
3. ✅ **Stage 3**: Task CRUD operations
4. ✅ **Stage 4**: Label management system

### Frontend Stages (Completed)
1. ✅ **Stage 1**: Project setup and configuration
2. ✅ **Stage 2**: Authentication UI (login/register)
3. ✅ **Stage 3**: Dashboard layout and task display
4. ✅ **Stage 4**: Task management (CRUD operations)
5. ✅ **Stage 5**: Label management system
6. ✅ **Stage 6**: Advanced filtering, sorting & polish

---

## ⭐ Bonus Features Implemented (Stretch Goals)

All stretch goals from the project rubric have been successfully implemented:

1. ✅ **Task Filtering by Label** (2.5 bonus points)
   - Multi-select label filtering with visual feedback
   - OR logic (tasks with ANY selected label)
   - Filter count display and reset functionality

2. ✅ **User Profile Management** (2.5 bonus points) ⭐ NEW
   - View current profile information
   - Edit username and email (with uniqueness validation)
   - Change password (with current password verification)
   - Accessible via Settings icon in header

3. ✅ **Responsive Design** (2.5 bonus points)
   - Mobile-first design with Tailwind breakpoints
   - Adaptive layouts for all screen sizes (sm, md, lg)
   - Touch-friendly UI elements
   - Hidden/visible elements based on screen size

4. ✅ **Comprehensive Error Handling** (2.5 bonus points)
   - Clear, user-friendly error messages throughout
   - Visual error indicators (colored banners with icons)
   - Form validation with helpful feedback
   - HTTP status codes properly used

**Total Bonus Points Achieved: 10/10**

---

## Future Enhancements (Optional)

- 📱 Mobile app (React Native)
- 🔔 Push notifications for deadlines
- 🎨 Dark mode theme
- 🔍 Full-text search across tasks
- 📊 Analytics and productivity insights
- 🔄 Drag-and-drop task reordering
- 📁 Task categories/projects
- 👥 Collaborative tasks (sharing)
- 📤 Export tasks (CSV, JSON, PDF)
- 🌐 Internationalization (i18n)

---

## Contributing

This project is part of ASU coursework. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is for educational purposes as part of ASU coursework.

---

## Acknowledgments

- **ASU 'AI Vibe coding' Course** - Project guidelines and requirements
                                  - Link: https://github.com/JesterCharles/asu-todo-project/blob/main/todo-specs.md
- **FastAPI** - Excellent documentation and framework
- **Next.js** - Comprehensive React framework
- **MongoDB** - Flexible NoSQL database
- **Tailwind CSS** - Rapid UI development
- **Cursor AI** - Development assistance and pair programming

---

## Contact & Support

For questions or issues:
- Review the documentation above
- Check `backend/README.md` for backend-specific details
- Check `frontend/README.md` for frontend-specific details
- Review stage test results for detailed testing scenarios
- Consult course materials or instructor

---

**Built with ❤️ for ASU 'AI Vibe Coding' Course**

**Status**: ✅ **Full-Stack Application Complete** - All 10 stages finished!

**Developer**: [Safa M.] | **Repository**: [https://github.com/fly2safa/todo-asu-proj1] | **Year**: 2025
