# Complete Testing Guide - TODO Application

**Project**: Full-Stack TODO Application  
**Author**: Safa M.  
**Date**: October 12, 2025  
**Purpose**: Comprehensive testing according to `todo-rubric.md` requirements

---

## Table of Contents
1. [Setup & Prerequisites](#setup--prerequisites)
2. [Backend Testing](#backend-testing)
3. [Frontend Testing](#frontend-testing)
4. [Rubric Compliance Testing](#rubric-compliance-testing)
5. [Screen Recording Checklist](#screen-recording-checklist)

---

## Setup & Prerequisites

### Required Software
- ✅ Python 3.8+ installed
- ✅ Node.js 18+ installed
- ✅ MongoDB Atlas account (or local MongoDB)
- ✅ Git for version control
- ✅ Modern web browser (Chrome, Firefox, Safari, or Edge)

### Environment Setup

#### Backend Setup Commands
```bash
# 1. Open Terminal/PowerShell in project root
cd backend

# 2. Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# 3. Verify dependencies are installed
pip list | findstr fastapi
pip list | findstr pymongo

# 4. Check .env file exists and is configured
cat .env  # or `type .env` on Windows

# 5. Verify MongoDB connection string
# Look for MONGODB_URI in .env
```

#### Frontend Setup Commands
```bash
# 1. Open NEW Terminal/PowerShell in project root
cd frontend

# 2. Verify node_modules exists
dir node_modules  # or `ls node_modules` on macOS/Linux

# 3. Verify Next.js is installed
npm list next

# 4. Clear cache (if needed)
Remove-Item -Recurse -Force .next  # Windows PowerShell
# rm -rf .next  # macOS/Linux
```

---

## Backend Testing

### 1. Start Backend Server

```bash
# Terminal 1 - From backend directory
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Will watch for changes in these directories: ['C:\\...\\backend']
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     MongoDB connected successfully!
INFO:     Application startup complete.
```

### 2. Verify Backend Health

**Browser Test:**
```
http://localhost:8000
```

**Expected Response:**
```json
{
  "message": "TODO API is running",
  "version": "1.0.0",
  "documentation": "/docs"
}
```

**Health Check:**
```
http://localhost:8000/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### 3. Test API Documentation

**Browser:**
```
http://localhost:8000/docs
```

**Verify:**
- ✅ Swagger UI loads
- ✅ All endpoints visible:
  - Authentication (5 endpoints)
  - Tasks (6 endpoints)
  - Labels (5 endpoints)
- ✅ Schemas are documented
- ✅ "Try it out" buttons work

---

## Frontend Testing

### 1. Start Frontend Server

```bash
# Terminal 2 - From frontend directory
cd frontend
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.5s
```

### 2. Verify Frontend Loads

**Browser:**
```
http://localhost:3000
```

**Expected Behavior:**
- ✅ Page loads without errors
- ✅ Redirects to login page (if not logged in)
- ✅ No console errors in browser DevTools

---

## Rubric Compliance Testing

### I. Required Features (MVP) - 50 Points

#### A. User Management (15 points)

##### Test 1.1: User Registration
**Steps:**
1. Navigate to: `http://localhost:3000/register`
2. Fill in form:
   - **Username**: `testuser1`
   - **Email**: `testuser1@example.com`
   - **Password**: `Password123!`
3. Click "Register" button

**Expected Results:**
- ✅ Success message appears
- ✅ Automatically logged in
- ✅ Redirected to dashboard
- ✅ **5 predefined labels created** (Work, Personal, Urgent, Shopping, Health)

**Database Verification (Optional):**
- Open MongoDB Atlas/Compass
- Check `users` collection for new user
- Check `labels` collection for 5 predefined labels with `user_id`

##### Test 1.2: User Login
**Steps:**
1. Logout (click user icon → Logout)
2. Navigate to: `http://localhost:3000/login`
3. Enter credentials:
   - **Email**: `testuser1@example.com`
   - **Password**: `Password123!`
4. Click "Login"

**Expected Results:**
- ✅ Success message appears
- ✅ Redirected to dashboard
- ✅ JWT tokens stored in cookies
- ✅ User name displayed in header

**Browser DevTools Check:**
- Open DevTools → Application → Cookies → localhost:3000
- Verify `access_token` and `refresh_token` exist

##### Test 1.3: User Logout
**Steps:**
1. From dashboard, click Settings icon (top-right)
2. Click "Logout" button

**Expected Results:**
- ✅ Success message: "Logged out successfully"
- ✅ Redirected to login page
- ✅ Cookies cleared
- ✅ Cannot access dashboard without re-login

##### Test 1.4: Protected Routes
**Steps:**
1. Logout (if logged in)
2. Try to access: `http://localhost:3000/dashboard`

**Expected Results:**
- ✅ Redirected to login page
- ✅ "Please log in to continue" message

##### Test 1.5: Session Management (Token Refresh)
**Steps:**
1. Login to dashboard
2. Leave browser open for 10 minutes
3. Perform an action (e.g., create a task)

**Expected Results:**
- ✅ Action completes successfully
- ✅ No forced logout
- ✅ Token automatically refreshed (check Network tab)

**Points Earned:** ✅ **15/15** (if all tests pass)

---

#### B. Task Management (25 points)

##### Test 2.1: Create Task - Basic
**Steps:**
1. Login to dashboard
2. Click "New Task" button
3. Fill in form:
   - **Title**: `Complete project documentation`
   - **Description**: `Write comprehensive README and test guide`
   - **Priority**: `High`
   - **Deadline**: `2025-10-15` (select date 3 days from now)
4. Click "Create Task"

**Expected Results:**
- ✅ Success message appears
- ✅ Task appears in task list
- ✅ Task shows correct title, description, priority (red badge)
- ✅ Deadline displayed correctly
- ✅ Task is uncompleted (checkbox unchecked)

##### Test 2.2: Create Task - With Labels
**Steps:**
1. Click "New Task"
2. Fill in:
   - **Title**: `Buy groceries`
   - **Description**: `Milk, bread, eggs`
   - **Priority**: `Medium`
   - **Deadline**: Tomorrow's date
   - **Labels**: Select "Shopping" and "Personal"
3. Create task

**Expected Results:**
- ✅ Task created with 2 labels
- ✅ Labels displayed as colored badges on task card
- ✅ Label colors match those in Label Manager

##### Test 2.3: View Tasks
**Steps:**
1. Verify all created tasks are visible in the list
2. Check task cards display:
   - Title
   - Description
   - Priority badge (colored: High=red, Medium=yellow, Low=green)
   - Deadline
   - Labels (if assigned)
   - Checkbox (completion toggle)
   - Edit button (pencil icon)
   - Delete button (trash icon)

**Expected Results:**
- ✅ All tasks displayed correctly
- ✅ Task count shown: "Showing X of X tasks"
- ✅ Visual hierarchy is clear

##### Test 2.4: Update Task
**Steps:**
1. Click edit icon on a task
2. Modify:
   - **Title**: Add " - UPDATED" to title
   - **Priority**: Change to "Low"
   - **Description**: Add additional text
3. Click "Save Changes"

**Expected Results:**
- ✅ Success message appears
- ✅ Task updates in list immediately
- ✅ Priority badge color changes
- ✅ All changes reflected correctly

##### Test 2.5: Toggle Task Completion
**Steps:**
1. Click checkbox on an incomplete task
2. Observe changes
3. Click checkbox again to uncheck

**Expected Results:**
- ✅ Task text gets strikethrough when completed
- ✅ Task card shows "completed" styling (e.g., muted colors)
- ✅ Checkbox toggles state correctly
- ✅ Changes persist after page refresh

##### Test 2.6: Delete Task
**Steps:**
1. Click delete icon (trash) on a task
2. Confirmation dialog appears
3. Click "Delete" to confirm

**Expected Results:**
- ✅ Confirmation dialog shows: "Are you sure you want to delete this task?"
- ✅ Task removed from list immediately
- ✅ Success message appears
- ✅ Task count updates

##### Test 2.7: Task Persistence
**Steps:**
1. Create a task
2. Refresh the page (`F5` or `Ctrl+R`)
3. Verify task still appears

**Expected Results:**
- ✅ All tasks persist after refresh
- ✅ No data loss
- ✅ MongoDB stores data correctly

##### Test 2.8: Required Fields Validation
**Steps:**
1. Click "New Task"
2. Try to submit without filling all required fields
3. Fill only title, try to submit
4. Fill all required fields, submit

**Expected Results:**
- ✅ Cannot submit empty form
- ✅ Validation errors show for empty required fields
- ✅ Title, Priority, and Deadline are required
- ✅ Description is optional

**Points Earned:** ✅ **25/25** (if all tests pass)

---

#### C. Labeling System (10 points)

##### Test 3.1: View Predefined Labels
**Steps:**
1. Login with newly registered account
2. Click "Manage Labels" button
3. Verify 5 predefined labels exist

**Expected Results:**
- ✅ 5 labels automatically created:
  1. Work (Blue color)
  2. Personal (Green color)
  3. Urgent (Red color)
  4. Shopping (Amber color)
  5. Health (Pink color)
- ✅ Each label has unique color
- ✅ Labels sorted alphabetically

##### Test 3.2: Create Custom Label
**Steps:**
1. In Label Manager, fill in:
   - **Label Name**: `Fitness`
   - **Color**: Select purple from preset colors
2. Click "Add Label"

**Expected Results:**
- ✅ Success message: "Label created successfully"
- ✅ New label appears in list
- ✅ Label available for task assignment

##### Test 3.3: Create Label with Custom Color
**Steps:**
1. Click "Add Label"
2. Name: `Learning`
3. Click "Custom" color picker
4. Select a unique color (e.g., teal #14B8A6)
5. Add label

**Expected Results:**
- ✅ Custom color applied correctly
- ✅ Label displays with custom color

##### Test 3.4: Duplicate Label Name Prevention
**Steps:**
1. Try to create a label named "Work" (already exists)
2. Submit form

**Expected Results:**
- ✅ Error message: "Label with this name already exists"
- ✅ Label not created
- ✅ Form stays open for correction

##### Test 3.5: Assign Labels to Task
**Steps:**
1. Click "New Task"
2. Fill in required fields
3. In Labels section, select multiple labels (e.g., "Work" and "Urgent")
4. Create task

**Expected Results:**
- ✅ Task created with multiple labels
- ✅ Labels displayed as colored badges
- ✅ Each label shows correct color

##### Test 3.6: Edit Label
**Steps:**
1. Open "Manage Labels"
2. Click edit icon on a label
3. Change:
   - **Name**: `Work Projects` (from "Work")
   - **Color**: Different color
4. Save changes

**Expected Results:**
- ✅ Label updated successfully
- ✅ Changes reflected on all tasks using this label
- ✅ Color updates everywhere

##### Test 3.7: Delete Label (Cascade Delete)
**Steps:**
1. Create a task with label "Shopping"
2. Open "Manage Labels"
3. Delete "Shopping" label
4. Confirm deletion
5. Check the task that had this label

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ Label deleted successfully
- ✅ Label removed from all tasks
- ✅ Tasks remain intact (only label removed)

##### Test 3.8: Label Persistence
**Steps:**
1. Create several labels
2. Assign to tasks
3. Logout and login again
4. Verify labels still exist

**Expected Results:**
- ✅ All labels persist
- ✅ Task-label relationships maintained
- ✅ No data loss

**Points Earned:** ✅ **10/10** (if all tests pass)

---

### II. Technical Implementation & Structure - 25 Points

#### A. Backend & Database (10 points)

##### Test 4.1: FastAPI RESTful API
**Steps:**
1. Open `http://localhost:8000/docs`
2. Expand all endpoint sections
3. Verify proper HTTP methods:
   - GET (read)
   - POST (create)
   - PUT (full update)
   - PATCH (partial update)
   - DELETE (remove)

**Expected Results:**
- ✅ All CRUD operations use correct HTTP verbs
- ✅ 16+ endpoints total
- ✅ RESTful URL structure (/api/resource, /api/resource/{id})

##### Test 4.2: MongoDB Persistence
**Steps:**
1. Open MongoDB Atlas Dashboard (or MongoDB Compass)
2. Navigate to your database (e.g., `MyTodoASUproj1`)
3. Check collections:
   - `users`
   - `tasks`
   - `labels`
   - `refresh_tokens`

**Expected Results:**
- ✅ All 4 collections exist
- ✅ Data persists correctly
- ✅ User-scoped data (user_id fields)
- ✅ Proper document structure

##### Test 4.3: Test API Endpoint in Swagger
**Steps:**
1. Go to `http://localhost:8000/docs`
2. Test POST `/api/auth/register`:
   - Click "Try it out"
   - Fill in request body with test data
   - Execute
3. Verify 200 OK response

**Expected Results:**
- ✅ Interactive docs work
- ✅ Request/response schemas visible
- ✅ Can test endpoints without frontend

**Points Earned:** ✅ **10/10** (if all tests pass)

---

#### B. Frontend & UI (10 points)

##### Test 5.1: Next.js Framework
**Steps:**
1. Check project files:
   - `frontend/package.json` → verify Next.js 14.x.x
   - `frontend/app/` directory → App Router structure
2. Verify TypeScript:
   - Check `.tsx` file extensions
   - `frontend/tsconfig.json` exists

**Expected Results:**
- ✅ Next.js 14 installed
- ✅ App Router (not Pages Router)
- ✅ TypeScript used throughout

##### Test 5.2: Tailwind CSS Styling
**Steps:**
1. Check `tailwind.config.ts` exists
2. Inspect any UI element in browser DevTools
3. Look for Tailwind utility classes (e.g., `bg-blue-500`, `p-4`, `rounded-lg`)

**Expected Results:**
- ✅ Tailwind CSS configured
- ✅ Utility classes used in components
- ✅ Responsive classes (sm:, md:, lg:)

##### Test 5.3: API Integration
**Steps:**
1. Open browser DevTools → Network tab
2. Perform an action (e.g., create task)
3. Check network request:
   - URL: `http://localhost:8000/api/...`
   - Method: POST
   - Headers: Authorization with Bearer token
   - Response: JSON data

**Expected Results:**
- ✅ Frontend calls backend API
- ✅ JWT tokens in Authorization header
- ✅ JSON request/response
- ✅ No CORS errors

**Points Earned:** ✅ **10/10** (if all tests pass)

---

#### C. File Structure & Organization (5 points)

##### Test 6.1: Backend Structure
**Steps:**
1. Open `backend/` directory
2. Verify folder structure:
```
backend/
├── app/
│   ├── models/          ✅
│   ├── schemas/         ✅
│   ├── routers/         ✅
│   ├── utils/           ✅
│   ├── config.py        ✅
│   ├── database.py      ✅
│   └── main.py          ✅
├── requirements.txt     ✅
├── README.md            ✅
└── .env                 ✅
```

**Expected Results:**
- ✅ Follows FastAPI project structure
- ✅ Clear separation of concerns
- ✅ Modular organization

##### Test 6.2: Frontend Structure
**Steps:**
1. Open `frontend/` directory
2. Verify folder structure:
```
frontend/
├── app/                 ✅ (pages)
├── components/          ✅
├── contexts/            ✅
├── lib/                 ✅ (services)
├── types/               ✅
├── package.json         ✅
└── README.md            ✅
```

**Expected Results:**
- ✅ Follows Next.js 14 App Router structure
- ✅ Components separate from pages
- ✅ Service layer in `lib/`

**Points Earned:** ✅ **5/5** (if all tests pass)

---

### III. Git & GitHub Workflow - 15 Points

#### A. Repository & README (5 points)

##### Test 7.1: Public Repository
**Steps:**
1. Open: `https://github.com/fly2safa/todo-asu-proj1`
2. Verify repository is public
3. Check README.md displays

**Expected Results:**
- ✅ Repository accessible without login
- ✅ README renders correctly on GitHub

##### Test 7.2: README Completeness
**Steps:**
1. Read `README.md` in project root
2. Check for sections:
   - Project description
   - Features list
   - Technology stack
   - Installation instructions
   - Running the application
   - API documentation
   - Usage guide
   - Troubleshooting

**Expected Results:**
- ✅ All sections present
- ✅ Clear, detailed instructions
- ✅ Code examples provided
- ✅ 600+ lines of documentation

**Points Earned:** ✅ **5/5** (if all tests pass)

---

#### B. Commit History (10 points)

##### Test 8.1: View Commit History
**Steps:**
```bash
# From project root
git log --oneline --all --graph

# Or view on GitHub:
# https://github.com/fly2safa/todo-asu-proj1/commits/main
```

**Expected Results:**
- ✅ Multiple commits (10+ commits)
- ✅ Clear commit messages
- ✅ Staged development visible (Stage 1, Stage 2, etc.)

##### Test 8.2: Descriptive Commit Messages
**Examples to verify:**
- ✅ `feat: Stage 1 - Project setup and MongoDB connection`
- ✅ `feat: Stage 2 - Authentication system with JWT tokens`
- ✅ `feat: Stage 3 - Task management CRUD with filtering`
- ✅ `docs: Update README with comprehensive documentation`

**Expected Results:**
- ✅ Conventional commits format
- ✅ Descriptive, not generic ("fix", "update")
- ✅ Easy to understand project history

##### Test 8.3: Daily Commits
**Steps:**
1. Check commit dates:
```bash
git log --pretty=format:"%ad" --date=short
```

**Expected Results:**
- ✅ Commits on October 9, 10, 12, 2025
- ✅ Consistent progress
- ✅ Daily work demonstrated

**Points Earned:** ✅ **10/10** (if all tests pass)

---

### IV. Code Quality & Best Practices - 10 Points

#### A. Code Readability (5 points)

##### Test 9.1: Code Formatting
**Steps:**
1. Open any backend file (e.g., `backend/app/routers/tasks.py`)
2. Check:
   - Consistent indentation (4 spaces)
   - Proper spacing
   - Line breaks between functions

**Expected Results:**
- ✅ Well-formatted code
- ✅ Consistent style
- ✅ Easy to read

##### Test 9.2: Meaningful Names
**Examples to verify:**
- Functions: `create_task()`, `get_current_user()`, `delete_label()`
- Variables: `user_data`, `task_doc`, `filtered_tasks`
- Components: `TaskCard`, `LabelManager`, `ProfileModal`

**Expected Results:**
- ✅ Self-documenting names
- ✅ Clear intent
- ✅ No cryptic abbreviations

##### Test 9.3: Comments & Documentation
**Steps:**
1. Open `backend/app/routers/auth.py`
2. Check for docstrings on functions
3. Open `frontend/components/TaskCard.tsx`
4. Check for TypeScript type annotations

**Expected Results:**
- ✅ Docstrings on API endpoints
- ✅ Type hints in Python
- ✅ TypeScript interfaces
- ✅ Complex logic explained with comments

**Points Earned:** ✅ **5/5** (if all tests pass)

---

#### B. Modularity & Efficiency (5 points)

##### Test 10.1: Modular Architecture
**Steps:**
1. Backend: Verify separate files for:
   - Models (`app/models/`)
   - Schemas (`app/schemas/`)
   - Routes (`app/routers/`)
   - Utils (`app/utils/`)

2. Frontend: Verify separate files for:
   - Components (`components/`)
   - Services (`lib/`)
   - Types (`types/`)
   - Contexts (`contexts/`)

**Expected Results:**
- ✅ Clear separation of concerns
- ✅ No "God files" (files > 500 lines)
- ✅ Reusable components

##### Test 10.2: No Code Duplication
**Steps:**
1. Check for reusable components:
   - `TaskCard` used in `TaskList`
   - `ProtectedRoute` wraps dashboard
   - API service functions in `lib/`

**Expected Results:**
- ✅ DRY principle followed
- ✅ No copy-pasted code blocks
- ✅ Shared logic extracted to functions

##### Test 10.3: Performance
**Steps:**
1. Open browser DevTools → Performance tab
2. Record while:
   - Loading dashboard
   - Applying filters
   - Creating a task
3. Check for:
   - Database indexes (in MongoDB)
   - React `useMemo` for filtering
   - Efficient queries

**Expected Results:**
- ✅ Fast page loads (< 2 seconds)
- ✅ Smooth filtering (no lag)
- ✅ Optimized database queries
- ✅ No unnecessary re-renders

**Points Earned:** ✅ **5/5** (if all tests pass)

---

### ⭐ Bonus Points (Stretch Goals) - 10 Points

#### Bonus 1: Task Filtering by Label (2.5 points)

##### Test 11.1: Multi-Select Label Filter
**Steps:**
1. Create tasks with various labels
2. Click "Filters & Sort" to expand panel
3. Click on 2-3 label chips in the "Filter by Labels" section
4. Observe filtered results

**Expected Results:**
- ✅ Selected labels show ring/highlight
- ✅ Tasks with ANY selected label appear (OR logic)
- ✅ Task count updates: "Showing X of Y tasks"
- ✅ Message: "Showing tasks with any of the selected labels"

##### Test 11.2: Clear Label Filters
**Steps:**
1. With labels selected, click selected labels again to deselect
2. OR click "Reset All" button

**Expected Results:**
- ✅ All tasks reappear
- ✅ Label filter clears
- ✅ Task count returns to total

**Points Earned:** ✅ **2.5/2.5** (if all tests pass)

---

#### Bonus 2: User Profile Management (2.5 points)

##### Test 12.1: View Profile
**Steps:**
1. From dashboard, click Settings icon (gear icon in header)
2. Click "Profile" option
3. Profile modal opens

**Expected Results:**
- ✅ Modal displays:
  - Current username
  - Current email
  - Account creation date
- ✅ Edit form available

##### Test 12.2: Update Username
**Steps:**
1. In profile modal, change username to `testuser_updated`
2. Click "Save Changes"

**Expected Results:**
- ✅ Success message: "Profile updated successfully"
- ✅ Header shows new username
- ✅ Change persists after refresh

##### Test 12.3: Update Email
**Steps:**
1. Change email to `testuser_new@example.com`
2. Save changes

**Expected Results:**
- ✅ Email updated in database
- ✅ Can login with new email
- ✅ Old email no longer works

##### Test 12.4: Change Password
**Steps:**
1. In profile modal:
   - **Current Password**: `Password123!`
   - **New Password**: `NewPassword123!`
   - **Confirm Password**: `NewPassword123!`
2. Save changes
3. Logout and login with new password

**Expected Results:**
- ✅ Password updated successfully
- ✅ Can login with new password
- ✅ Old password rejected

##### Test 12.5: Validation
**Steps:**
1. Try to update email to existing email
2. Try to change password without entering current password

**Expected Results:**
- ✅ Error: "Email already in use"
- ✅ Error: "Current password required"
- ✅ Form validation prevents invalid data

**Points Earned:** ✅ **2.5/2.5** (if all tests pass)

---

#### Bonus 3: Responsive Design (2.5 points)

##### Test 13.1: Desktop View (>1024px)
**Steps:**
1. Open dashboard on desktop/large monitor
2. Verify layout:
   - Filters panel on left or top
   - Tasks in grid or list
   - Full navigation visible
   - Multi-column forms

**Expected Results:**
- ✅ Optimized for large screens
- ✅ No wasted space
- ✅ Comfortable layout

##### Test 13.2: Tablet View (768px - 1024px)
**Steps:**
1. Resize browser to tablet size (or use DevTools device toolbar)
2. Test all features:
   - Create task
   - Apply filters
   - Edit labels

**Expected Results:**
- ✅ Layout adapts smoothly
- ✅ All features accessible
- ✅ Touch-friendly button sizes
- ✅ No horizontal scrolling

##### Test 13.3: Mobile View (<768px)
**Steps:**
1. Resize to mobile size (375px width)
2. Test:
   - Login/register forms
   - Dashboard navigation
   - Task cards stack vertically
   - Modals fit screen

**Expected Results:**
- ✅ Single column layout
- ✅ Mobile-friendly navigation
- ✅ Forms easy to fill on mobile
- ✅ No cut-off content
- ✅ Readable text size

##### Test 13.4: Breakpoint Testing
**Tailwind Breakpoints to Verify:**
- `sm:` (640px) - Small devices
- `md:` (768px) - Medium devices
- `lg:` (1024px) - Large devices

**Check for:**
- ✅ Headers adjust (hide text on mobile)
- ✅ Forms change from single to multi-column
- ✅ Filters collapse on mobile
- ✅ Icons replace text buttons

**Points Earned:** ✅ **2.5/2.5** (if all tests pass)

---

#### Bonus 4: Comprehensive Error Handling (2.5 points)

##### Test 14.1: User-Friendly Error Messages
**Steps:**
1. Try to login with wrong password
2. Try to create task with empty title
3. Try to create duplicate label
4. Try to access task that doesn't exist

**Expected Error Messages:**
- ✅ "Incorrect email or password" (not "401 Unauthorized")
- ✅ "Title is required"
- ✅ "Label with this name already exists"
- ✅ "Task not found"

##### Test 14.2: Visual Error Indicators
**Steps:**
1. Trigger an error (e.g., wrong login)
2. Check UI:
   - Error icon (AlertCircle)
   - Red banner or border
   - Clear error text

**Expected Results:**
- ✅ Visual feedback (color, icon)
- ✅ Error message displayed prominently
- ✅ Auto-dismiss or close button

##### Test 14.3: Form Validation
**Steps:**
1. Try to submit forms with invalid data:
   - Short password (< 8 chars)
   - Invalid email format
   - Future date in past (if applicable)

**Expected Results:**
- ✅ Inline validation errors
- ✅ Prevent form submission
- ✅ Clear instructions for fixing

##### Test 14.4: Network Error Handling
**Steps:**
1. Stop backend server (Ctrl+C in terminal)
2. Try to perform an action in frontend
3. Check error message

**Expected Results:**
- ✅ User-friendly message (not "ERR_CONNECTION_REFUSED")
- ✅ "Unable to connect to server" or similar
- ✅ Suggestion to check connection

##### Test 14.5: Loading States
**Steps:**
1. Perform actions and observe:
   - Login button while logging in
   - Task list while loading
   - Form submit buttons

**Expected Results:**
- ✅ Loading spinners/indicators
- ✅ Buttons disabled during processing
- ✅ "Loading..." text where appropriate

**Points Earned:** ✅ **2.5/2.5** (if all tests pass)

---

## Final Compliance Check

### Complete Testing Checklist

**I. Required Features (MVP) - 50 Points**
- [ ] User Management (15 points)
  - [ ] Registration works with predefined labels
  - [ ] Login works with JWT tokens
  - [ ] Logout clears session
  - [ ] Protected routes enforce authentication
  - [ ] Session persists with token refresh
- [ ] Task Management (25 points)
  - [ ] Create tasks with all required fields
  - [ ] View all tasks
  - [ ] Update tasks (edit)
  - [ ] Delete tasks (with confirmation)
  - [ ] Toggle completion status
  - [ ] Tasks persist in MongoDB
  - [ ] Form validation works
- [ ] Labeling System (10 points)
  - [ ] 5 predefined labels for new users
  - [ ] Create custom labels
  - [ ] Assign labels to tasks
  - [ ] Edit labels
  - [ ] Delete labels (cascade)
  - [ ] Labels persist

**II. Technical Implementation - 25 Points**
- [ ] Backend & Database (10 points)
  - [ ] FastAPI with RESTful API
  - [ ] MongoDB persistence
  - [ ] Swagger docs work
- [ ] Frontend & UI (10 points)
  - [ ] Next.js 14 framework
  - [ ] Tailwind CSS styling
  - [ ] API integration with JWT
- [ ] File Structure (5 points)
  - [ ] Backend structure organized
  - [ ] Frontend structure organized

**III. Git & GitHub - 15 Points**
- [ ] Repository & README (5 points)
  - [ ] Public repository accessible
  - [ ] Comprehensive README
- [ ] Commit History (10 points)
  - [ ] Clear commit messages
  - [ ] Daily commits visible
  - [ ] Staged development

**IV. Code Quality - 10 Points**
- [ ] Code Readability (5 points)
  - [ ] Well-formatted code
  - [ ] Meaningful names
  - [ ] Comments and docs
- [ ] Modularity (5 points)
  - [ ] Modular architecture
  - [ ] No duplication
  - [ ] Good performance

**⭐ Bonus Features - 10 Points**
- [ ] Task Filtering (2.5 points)
- [ ] Profile Management (2.5 points)
- [ ] Responsive Design (2.5 points)
- [ ] Error Handling (2.5 points)

---

## Screen Recording Checklist

### Pre-Recording Setup
- [ ] Clear browser cache and cookies
- [ ] Close unnecessary browser tabs/windows
- [ ] Have fresh terminal windows ready
- [ ] Prepare test data (usernames, emails, etc.)
- [ ] Check screen recording software settings
- [ ] Ensure good lighting and audio (if voice-over)

### Recording Flow (Suggested Order)

**Part 1: Introduction & Setup (2-3 minutes)**
1. [ ] Show project in IDE/editor
2. [ ] Show directory structure
3. [ ] Show README.md
4. [ ] Start backend server (show terminal)
5. [ ] Start frontend server (show terminal)
6. [ ] Show Swagger docs briefly

**Part 2: User Management (3-4 minutes)**
7. [ ] Register new account
8. [ ] Verify 5 predefined labels created (check Label Manager)
9. [ ] Logout
10. [ ] Login with credentials
11. [ ] Show profile management (view/edit)

**Part 3: Label Management (2-3 minutes)**
12. [ ] Show predefined labels
13. [ ] Create 2-3 custom labels
14. [ ] Edit a label (name and color)
15. [ ] Show color picker options

**Part 4: Task Management (5-7 minutes)**
16. [ ] Create task without labels
17. [ ] Create task with labels
18. [ ] Show task list with different priorities
19. [ ] Edit a task
20. [ ] Toggle completion (check/uncheck)
21. [ ] Delete a task

**Part 5: Filtering & Sorting (3-4 minutes)**
22. [ ] Filter by priority
23. [ ] Filter by completion status
24. [ ] Filter by labels (multi-select)
25. [ ] Sort by deadline
26. [ ] Sort by priority
27. [ ] Reset all filters

**Part 6: Bonus Features (3-4 minutes)**
28. [ ] Show responsive design (resize browser)
29. [ ] Demonstrate error handling (wrong password, validation)
30. [ ] Show cascade delete (delete label, check tasks)

**Part 7: Technical Demonstration (2-3 minutes)**
31. [ ] Show MongoDB data in Atlas/Compass
32. [ ] Show network requests in DevTools
33. [ ] Show JWT tokens in cookies
34. [ ] Refresh page to show persistence

**Part 8: Conclusion (1 minute)**
35. [ ] Summarize features implemented
36. [ ] Mention GitHub repository
37. [ ] Thank viewer

---

## Troubleshooting During Testing

### Backend Issues

**Problem:** Backend won't start
- Check virtual environment is activated
- Verify `.env` file exists with correct values
- Check MongoDB connection string
- Try: `pip install -r requirements.txt` again

**Problem:** MongoDB connection error
- Check MongoDB Atlas cluster is running
- Verify IP whitelist includes your IP
- Check username/password in connection string
- Test connection in MongoDB Compass

**Problem:** Port 8000 already in use
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process

# OR use different port:
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

**Problem:** Frontend won't start
- Check `node_modules` exists
- Try: `npm install` again
- Clear Next.js cache: `Remove-Item -Recurse -Force .next`

**Problem:** Login redirect loop
- Clear browser cookies
- Delete `.next` folder
- Restart frontend server

**Problem:** CORS errors
- Verify backend is running on port 8000
- Check `app/main.py` CORS configuration
- Ensure frontend uses `http://localhost:8000`

### Database Issues

**Problem:** Data not persisting
- Check MongoDB connection is healthy (`/health` endpoint)
- Verify database name in `.env` matches Atlas
- Check user permissions in MongoDB

**Problem:** "Unauthorized" errors
- Check access token in cookies (DevTools)
- Try logout and login again
- Verify JWT secret key matches in backend

---

## Post-Testing

### After All Tests Pass

1. **Document Results**
   - [ ] Update this file with actual test results
   - [ ] Screenshot any notable features
   - [ ] Note any issues found and fixed

2. **Git Commit**
   ```bash
   git add .
   git commit -m "docs: Complete comprehensive testing according to rubric"
   git push origin main
   ```

3. **Final Verification**
   - [ ] All test cases passed
   - [ ] Rubric requirements met (100/100 + 10 bonus)
   - [ ] Ready for submission

4. **Video Upload**
   - [ ] Edit/trim screen recording (if needed)
   - [ ] Upload to YouTube
   - [ ] Set visibility (Public/Unlisted)
   - [ ] Add description with GitHub link
   - [ ] Get shareable link

---

## Submission Checklist

- [ ] All code committed and pushed to GitHub
- [ ] README.md is comprehensive
- [ ] All features tested and working
- [ ] Screen recording completed
- [ ] YouTube link obtained
- [ ] Repository link ready: `https://github.com/fly2safa/todo-asu-proj1`
- [ ] Video link ready: `[Your YouTube Link]`

---

**Congratulations! You're ready to submit a fully-tested, rubric-compliant TODO application!** 🎉

**Total Achievable Score:** 110/100 (100 base + 10 bonus)
