# Full-Stack TODO Application

A modern, full-stack TODO application built with FastAPI (Python) backend and
 Next.js (React/TypeScript) frontend, using MongoDB for data persistence. This
 application/project is designed to provide hands-on experience with modern web
 development tools and best practices with user authentication, labels, and
 advanced filtering capabilities.

## Required Features (Core User Stories)
   Following are the essential features that must be completed:

### User Management
- **As a user**, I want to sign up for an account, so I can have my own personal task list.
- **As a user**, I want to log in, so I can access my tasks and manage my profile.
- **As a user**, I want to securely log out, so my data is protected from others.

### Task Management
- **As a user**, I want to create a new task, so I can add things I need to do to my list.
- **As a user**, I want to view all my tasks, so I can see everything I need to get done.
- **As a user**, I want to update a task's details, so I can change its title, description, or status (e.g., incomplete to complete).
- **As a user**, I want to delete a task, so I can remove completed or irrelevant items from my list.
- **Required Task Fields**: Every task must include a title, an optional description, 
                            a priority level (e.g., High, Medium, Low), and a deadline (date).

### Labeling System
- **As a user**, I want to create and manage labels (e.g., 'Work,' 'Personal,' 'Urgent'), so I can categorize and/or 
                 prioritize my tasks.
- **As a user**, I want to assign one or more labels to a task, so I can easily filter and organize my tasks.

### Data Persistence
- **MongoDB Integration**: The application must persist all user, task, and label data in a MongoDB database.
- **Real-time Updates**: Changes reflected immediately across the application


## Technical Requirements & File Structure
   Need to adhere to the following technical and structural guidelines

## Database: MongoDB
   The project should leverage a MongoDB database filled with appropriately modeled documents & collections. Reference this document on the MongoDB guidelines for embeding vs referencing information in a document:
    guideline_image.png

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