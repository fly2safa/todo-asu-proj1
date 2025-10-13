# Testing Cheatsheet - Quick Reference

**Project**: TODO Application | **Author**: Safa M. | **Date**: October 12, 2025

---

## 🚀 Quick Start Commands

### Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**URLs:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`

---

## ✅ Testing Flow (Screen Recording Order)

### 1️⃣ SETUP (2 min)
- [ ] Show project structure in IDE
- [ ] Show README.md
- [ ] Start backend (Terminal 1)
- [ ] Start frontend (Terminal 2)
- [ ] Open `http://localhost:8000/docs` (Swagger UI)
- [ ] Open `http://localhost:3000`

---

### 2️⃣ USER MANAGEMENT (3 min) → 15 Points

**A. Registration (✅ Auto-creates 5 labels!)**
- [ ] Go to: `http://localhost:3000/register`
- [ ] Username: `demouser`
- [ ] Email: `demo@example.com`
- [ ] Password: `Demo123!`
- [ ] Click "Register" → Auto-login to dashboard

**B. Verify Predefined Labels**
- [ ] Click "Manage Labels" button
- [ ] Verify 5 labels exist: Work, Personal, Urgent, Shopping, Health
- [ ] Close modal

**C. Logout**
- [ ] Click Settings icon (top-right)
- [ ] Click "Logout"
- [ ] Redirected to login

**D. Login**
- [ ] Email: `demo@example.com`
- [ ] Password: `Demo123!`
- [ ] Click "Login" → Dashboard

**E. Protected Route Test**
- [ ] Logout
- [ ] Try URL: `http://localhost:3000/dashboard`
- [ ] Redirected to login ✅

**Login again for remaining tests**

---

### 3️⃣ LABEL MANAGEMENT (3 min) → 10 Points

**A. View Predefined Labels**
- [ ] Click "Manage Labels"
- [ ] See 5 labels with colors

**B. Create Custom Label**
- [ ] Name: `Fitness`
- [ ] Color: Select purple preset
- [ ] Click "Add Label"

**C. Create Label with Custom Color**
- [ ] Name: `Learning`
- [ ] Click "Custom" color picker
- [ ] Choose teal (#14B8A6)
- [ ] Add label

**D. Edit Label**
- [ ] Click edit icon on "Work"
- [ ] Change name: `Work Projects`
- [ ] Change color
- [ ] Save

**E. Test Duplicate Prevention**
- [ ] Try to create "Personal" (exists)
- [ ] See error: "Label already exists" ✅

---

### 4️⃣ TASK MANAGEMENT (6 min) → 25 Points

**A. Create Task - Basic**
- [ ] Click "New Task"
- [ ] Title: `Complete project demo`
- [ ] Description: `Record video for YouTube`
- [ ] Priority: `High`
- [ ] Deadline: Tomorrow
- [ ] Create → Task appears with red badge

**B. Create Task - With Labels**
- [ ] Click "New Task"
- [ ] Title: `Buy groceries`
- [ ] Description: `Milk, bread, eggs`
- [ ] Priority: `Medium`
- [ ] Deadline: Tomorrow
- [ ] Labels: Select "Shopping" + "Personal"
- [ ] Create → Task shows 2 colored labels

**C. Create Task - Low Priority**
- [ ] Click "New Task"
- [ ] Title: `Read documentation`
- [ ] Priority: `Low`
- [ ] Deadline: Next week
- [ ] Labels: "Learning"
- [ ] Create → Green badge

**D. Create Task - Overdue**
- [ ] Title: `Overdue task example`
- [ ] Priority: `High`
- [ ] Deadline: Yesterday's date
- [ ] Create → Shows "Overdue" indicator

**E. View All Tasks**
- [ ] Verify all 4 tasks visible
- [ ] Check task count: "Showing 4 of 4 tasks"

**F. Edit Task**
- [ ] Click edit icon on first task
- [ ] Add " - UPDATED" to title
- [ ] Change priority to Low
- [ ] Save → See changes immediately

**G. Toggle Completion**
- [ ] Click checkbox on "Buy groceries"
- [ ] Text gets strikethrough
- [ ] Click again to uncheck

**H. Delete Task**
- [ ] Click delete icon on a task
- [ ] Confirmation: "Are you sure?"
- [ ] Confirm → Task removed

**I. Test Validation**
- [ ] Click "New Task"
- [ ] Try to submit empty form
- [ ] See validation errors ✅

**J. Test Persistence**
- [ ] Refresh page (F5)
- [ ] All tasks still there ✅

---

### 5️⃣ FILTERING & SORTING (4 min) → Part of Bonus

**A. Expand Filters Panel**
- [ ] Click "Filters & Sort"
- [ ] Panel expands with all options

**B. Filter by Priority**
- [ ] Select "High" from Priority dropdown
- [ ] Only high-priority tasks shown
- [ ] "Active" badge appears

**C. Filter by Status**
- [ ] Select "Completed" from Status
- [ ] Only completed tasks shown

**D. Filter by Labels (Multi-Select)**
- [ ] Select "Completed" status to "All" first
- [ ] Click "Shopping" label chip
- [ ] Click "Personal" label chip
- [ ] Tasks with ANY selected label shown
- [ ] See message: "Showing tasks with any of..."

**E. Filter by Overdue**
- [ ] Select "Overdue Only"
- [ ] Only overdue incomplete tasks shown

**F. Sort by Deadline**
- [ ] Sort By: "Deadline"
- [ ] Order: "Ascending"
- [ ] Tasks sorted, no-deadline tasks at end

**G. Sort by Priority**
- [ ] Sort By: "Priority"
- [ ] Order: "Descending"
- [ ] High → Medium → Low

**H. Reset Filters**
- [ ] Click "Reset All"
- [ ] All filters cleared
- [ ] All tasks visible

---

### 6️⃣ BONUS FEATURE: PROFILE MANAGEMENT (3 min) → 2.5 Bonus Points

**A. View Profile**
- [ ] Click Settings icon
- [ ] Click "Profile"
- [ ] Modal shows username, email, created date

**B. Update Username**
- [ ] Change username: `demouser_updated`
- [ ] Click "Save Changes"
- [ ] Success message
- [ ] Header shows new username

**C. Update Email**
- [ ] Change email: `demoupdated@example.com`
- [ ] Save
- [ ] Success ✅

**D. Change Password**
- [ ] Current Password: `Demo123!`
- [ ] New Password: `NewDemo123!`
- [ ] Confirm Password: `NewDemo123!`
- [ ] Save
- [ ] Logout and login with new password ✅

**E. Test Validation**
- [ ] Try to update to existing email
- [ ] See error: "Email already in use" ✅

---

### 7️⃣ BONUS FEATURE: RESPONSIVE DESIGN (2 min) → 2.5 Bonus Points

**A. Desktop View**
- [ ] Browser at full width
- [ ] Multi-column layout
- [ ] All features visible

**B. Tablet View**
- [ ] Resize browser to ~800px
- [ ] Layout adjusts
- [ ] Test creating a task

**C. Mobile View**
- [ ] Resize to ~375px (or use DevTools device toolbar)
- [ ] Single column layout
- [ ] Navigation adapts
- [ ] Forms stack vertically
- [ ] All features work

**D. Breakpoint Demo**
- [ ] Slowly resize browser from wide to narrow
- [ ] Show smooth transitions
- [ ] Point out responsive classes

---

### 8️⃣ BONUS FEATURE: ERROR HANDLING (2 min) → 2.5 Bonus Points

**A. Authentication Errors**
- [ ] Logout
- [ ] Try to login with wrong password
- [ ] See: "Incorrect email or password" (not "401")

**B. Form Validation Errors**
- [ ] Register page → invalid email format
- [ ] Password too short
- [ ] See inline validation errors

**C. Duplicate Prevention**
- [ ] Try to create duplicate label
- [ ] See: "Label with this name already exists"

**D. Network Error (Optional)**
- [ ] Stop backend server (Ctrl+C)
- [ ] Try to create task
- [ ] See: "Unable to connect to server"
- [ ] Restart backend for next tests

**E. Loading States**
- [ ] Show loading spinner during login
- [ ] Button disables during processing

---

### 9️⃣ BONUS FEATURE: CASCADE DELETE (1 min) → Part of Labeling System

**A. Label Cascade Delete**
- [ ] Create task with "Shopping" label
- [ ] Open "Manage Labels"
- [ ] Delete "Shopping" label
- [ ] Confirm deletion
- [ ] Go back to task → Label removed from task ✅
- [ ] Task still exists ✅

---

### 🔟 TECHNICAL DEMONSTRATION (3 min)

**A. Swagger API Docs**
- [ ] Open: `http://localhost:8000/docs`
- [ ] Show all endpoints (16+)
- [ ] Expand Auth, Tasks, Labels sections
- [ ] Show schemas
- [ ] Test one endpoint (e.g., GET /health)

**B. MongoDB Database**
- [ ] Open MongoDB Atlas Dashboard (or Compass)
- [ ] Navigate to database: `MyTodoASUproj1`
- [ ] Show collections:
  - `users` → Show user document
  - `tasks` → Show task documents
  - `labels` → Show label documents
  - `refresh_tokens` → Show tokens
- [ ] Point out user_id fields (user-scoped data)

**C. Browser DevTools**
- [ ] Open DevTools (F12)
- [ ] **Network Tab:**
  - [ ] Perform action (create task)
  - [ ] Show POST request to API
  - [ ] Show Authorization header with JWT
  - [ ] Show JSON response
- [ ] **Application Tab → Cookies:**
  - [ ] Show `access_token`
  - [ ] Show `refresh_token`
- [ ] **Console Tab:**
  - [ ] Show no errors (clean console) ✅

**D. Code Structure**
- [ ] Open IDE/Editor
- [ ] Show `backend/app/` structure:
  - models/, schemas/, routers/, utils/
- [ ] Show `frontend/` structure:
  - app/, components/, lib/, types/
- [ ] Show `README.md` sections

---

## 📊 Rubric Scoring Summary

| Category | Points | Status |
|----------|--------|--------|
| **I. Required Features (MVP)** | **50** | |
| - User Management | 15 | ✅ |
| - Task Management | 25 | ✅ |
| - Labeling System | 10 | ✅ |
| **II. Technical Implementation** | **25** | |
| - Backend & Database | 10 | ✅ |
| - Frontend & UI | 10 | ✅ |
| - File Structure | 5 | ✅ |
| **III. Git & GitHub Workflow** | **15** | |
| - Repository & README | 5 | ✅ |
| - Commit History | 10 | ✅ |
| **IV. Code Quality** | **10** | |
| - Code Readability | 5 | ✅ |
| - Modularity & Efficiency | 5 | ✅ |
| **⭐ Bonus Features** | **10** | |
| - Task Filtering by Label | 2.5 | ✅ |
| - User Profile Management | 2.5 | ✅ |
| - Responsive Design | 2.5 | ✅ |
| - Error Handling | 2.5 | ✅ |
| **TOTAL SCORE** | **110/100** | ✅ |

---

## 🎬 Screen Recording Tips

### Before Recording
- [ ] Clear browser history and cookies
- [ ] Close unnecessary tabs/apps
- [ ] Prepare test data (write down emails/passwords)
- [ ] Test microphone (if doing voice-over)
- [ ] Full screen browser (hide bookmarks bar)
- [ ] Zoom in browser if needed (Ctrl + +)

### During Recording
- [ ] Speak clearly (if voice-over)
- [ ] Move mouse slowly
- [ ] Pause after each action (1-2 seconds)
- [ ] Point out success messages
- [ ] Highlight important UI elements

### Recording Software Options
- **Windows**: Xbox Game Bar (Win + G), OBS Studio, Camtasia
- **macOS**: QuickTime, OBS Studio, Screen Studio
- **Online**: Loom, Screencastify

### Suggested Duration
- **Total**: 20-30 minutes
- **Introduction**: 2 min
- **Feature Demo**: 18-25 min
- **Conclusion**: 1-2 min

---

## 🐛 Quick Troubleshooting

### Backend Won't Start
```bash
# Check virtual environment
venv\Scripts\activate

# Reinstall dependencies
pip install -r requirements.txt

# Check .env file exists
cat .env
```

### Frontend Won't Start
```bash
# Clear cache
Remove-Item -Recurse -Force .next

# Reinstall
npm install

# Try again
npm run dev
```

### Port Already in Use
```bash
# Kill process on port 8000 (Windows)
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process

# Or use different port
uvicorn app.main:app --reload --port 8001
```

### Login Issues
- Clear browser cookies
- Delete `.next` folder
- Restart frontend server

### MongoDB Connection Error
- Check MongoDB Atlas is running
- Verify IP whitelist
- Check credentials in `.env`

---

## 📝 Test Data Reference

### User Accounts
- **User 1**: `demo@example.com` / `Demo123!`
- **User 2**: `testuser@example.com` / `Test123!`

### Sample Tasks
1. **High Priority**: "Complete project demo" - Tomorrow
2. **Medium Priority**: "Buy groceries" - Tomorrow - Labels: Shopping, Personal
3. **Low Priority**: "Read documentation" - Next week - Label: Learning
4. **Overdue**: "Overdue task" - Yesterday

### Sample Labels
- **Predefined**: Work, Personal, Urgent, Shopping, Health
- **Custom**: Fitness (Purple), Learning (Teal)

---

## 🔗 Important Links

- **GitHub Repo**: `https://github.com/fly2safa/todo-asu-proj1`
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:8000`
- **API Docs**: `http://localhost:8000/docs`
- **MongoDB Atlas**: `https://cloud.mongodb.com`

---

## ✅ Final Checklist

### Pre-Submission
- [ ] All features tested and working
- [ ] Screen recording completed
- [ ] Video uploaded to YouTube
- [ ] Video is Public or Unlisted
- [ ] GitHub repository is public
- [ ] README.md is comprehensive
- [ ] All code committed and pushed

### Submission
- [ ] Repository URL ready
- [ ] YouTube video URL ready
- [ ] Both URLs tested (accessible without login)

---

## 🎉 Success Criteria

**You're ready to submit when:**
- ✅ All 50 MVP points demonstrated
- ✅ All 25 technical implementation points verified
- ✅ All 15 Git & GitHub points checked
- ✅ All 10 code quality points confirmed
- ✅ All 10 bonus points demonstrated
- ✅ Screen recording clearly shows all features
- ✅ GitHub repository is complete and public

**Total Achievement: 110/100 Points** 🏆

---

**Good luck with your demo! You've built an impressive full-stack application!** 🚀

**Time estimate for complete testing: 30-40 minutes**


