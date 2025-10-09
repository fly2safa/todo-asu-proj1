# Full-Stack TODO Application

A modern, full-stack TODO application built with FastAPI (Python) backend and
 Next.js (React/TypeScript) frontend, using MongoDB for data persistence. This
 application/project is designed to provide hands-on experience with modern web
 development tools and best practices with user authentication, labels, and
 advanced filtering capabilities.

## Required Features (Core User Stories)

### User Management
- **User Registration**: Create a new account with email, username, and password
- **User Authentication**: Secure login/logout with JWT tokens
- **Protected Routes**: Access control for authenticated users only

### Task Management
- **Create Tasks**: Add new tasks with title, description, priority, and deadline
- **View Tasks**: Display all tasks with filtering and sorting options
- **Update Tasks**: Edit task details and mark as complete/incomplete
- **Delete Tasks**: Remove tasks from your list
- **Priority Levels**: Organize tasks by High, Medium, or Low priority
- **Deadline Tracking**: Visual indicators for overdue tasks
- **Required Task Fields**: Every task must include a title, an optional description,
                            a priority level (e.g., High, Medium, Low) and a deadline (date)


### Labeling System
- **Create Labels**: Add custom labels with names and colors
- **Assign Labels**: Tag tasks with multiple labels for better organization
- **Filter by Labels**: View tasks filtered by specific labels
- **Label Management**: Edit and delete labels as needed and manage lables (e.g.,
                     'Work', 'Persnal', 'Urgent'), to categorize and/or prioritize tasks

### Data Persistence
- **MongoDB Integration**: All data stored securely in MongoDB
- **Real-time Updates**: Changes reflected immediately across the application

## Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
               NOTE: Use Simplified FastAPI structure
- **Python**: Programming language
- **MongoDB**: NoSQL database for data storage
- **PyMongo**: MongoDB driver for Python
- **JWT Authentication**: Secure token-based authentication
- **Pydantic**: Data validation and serialization
- **Uvicorn**: ASGI server for running the application

### Frontend
- **Next.js 14**: React framework with App Router
                  NOTE: Use Simplified Next.js structure
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Hook Form**: Form handling and validation
- **Lucide React**: Modern icon library
- **js-cookie**: Cookie management
- **date-fns**: Date utility library