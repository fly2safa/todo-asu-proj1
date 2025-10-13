# API Test Examples - Valid Request Bodies

This document provides working examples for testing your TODO API endpoints.

---

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`

```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "Password123!"
}
```

**Requirements:**
- `username`: 3+ characters
- `email`: valid email format
- `password`: 8+ characters

---

### Login
**POST** `/api/auth/login`

```json
{
  "email": "testuser@example.com",
  "password": "Password123!"
}
```

---

## Task Endpoints

### Create Task (Minimal)
**POST** `/api/tasks`

```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README",
  "priority": "High",
  "deadline": "2025-10-15T23:59:59"
}
```

### Create Task (With Labels)
**POST** `/api/tasks`

```json
{
  "title": "Buy groceries",
  "description": "Milk, bread, eggs",
  "priority": "Medium",
  "deadline": "2025-10-14T18:00:00",
  "label_ids": ["67234abc123def456789", "67234def789ghi123456"]
}
```

**Note:** Replace `label_ids` with actual ObjectId strings from your database.

---

### Update Task
**PUT** `/api/tasks/{task_id}`

```json
{
  "title": "Complete project documentation - UPDATED",
  "description": "Write comprehensive README and test guide",
  "priority": "Low",
  "deadline": "2025-10-16T23:59:59",
  "completed": false,
  "label_ids": []
}
```

---

## Label Endpoints

### Create Label
**POST** `/api/labels`

```json
{
  "name": "Work",
  "color": "#3B82F6"
}
```

**Color Format:** Must be hex color (e.g., `#3B82F6`, `#FF0000`)

**Preset Colors You Can Use:**
- Blue: `#3B82F6`
- Green: `#10B981`
- Red: `#EF4444`
- Yellow: `#F59E0B`
- Purple: `#8B5CF6`
- Pink: `#EC4899`
- Indigo: `#6366F1`
- Teal: `#14B8A6`

---

### Update Label
**PUT** `/api/labels/{label_id}`

```json
{
  "name": "Work Projects",
  "color": "#6366F1"
}
```

---

## User Profile Update

### Update Profile (Username Only)
**PUT** `/api/auth/me`

```json
{
  "username": "newusername"
}
```

### Update Profile (Email Only)
**PUT** `/api/auth/me`

```json
{
  "email": "newemail@example.com"
}
```

### Update Profile (Change Password)
**PUT** `/api/auth/me`

```json
{
  "current_password": "OldPassword123!",
  "new_password": "NewPassword123!"
}
```

### Update Profile (All Fields)
**PUT** `/api/auth/me`

```json
{
  "username": "updateduser",
  "email": "updated@example.com",
  "current_password": "OldPassword123!",
  "new_password": "NewPassword123!"
}
```

---

## Common Date Formats

### Valid Deadline Formats

All of these work:
```json
"2025-10-15T00:00:00"           // Midnight
"2025-10-15T23:59:59"           // End of day
"2025-10-15T14:30:00"           // 2:30 PM
"2025-10-15T14:30:00.000Z"      // With milliseconds and UTC
"2025-10-15"                    // Date only (will be parsed to midnight)
```

### Invalid Formats (Will Cause 422 Error)
```
"10/15/2025"         // ❌ US format
"15-10-2025"         // ❌ European format
"Oct 15, 2025"       // ❌ Text format
"2025/10/15"         // ❌ Slashes instead of dashes
```

---

## Priority Values

### Valid Priority Values
```json
"High"     // ✅ Correct
"Medium"   // ✅ Correct
"Low"      // ✅ Correct
```

### Invalid Priority Values
```json
"high"     // ❌ lowercase
"HIGH"     // ❌ uppercase
"Normal"   // ❌ not defined
"Urgent"   // ❌ not defined
"low"      // ❌ lowercase
```

---

## Troubleshooting Steps

### If You Get 422 Error:

1. **Check the Response Body**
   - The error will tell you which field is wrong
   - Example: `"Field 'priority' must be one of: High, Medium, Low"`

2. **Verify Required Fields**
   - Make sure all required fields are present
   - Check they're not null or empty

3. **Check Data Types**
   - `title`: string
   - `description`: string (optional)
   - `priority`: string (enum)
   - `deadline`: string (ISO 8601 datetime)
   - `completed`: boolean
   - `label_ids`: array of strings

4. **Validate in Swagger UI**
   - Go to http://localhost:8000/docs
   - Click "Try it out" on the endpoint
   - Look at the example schema
   - Compare with your request

5. **Check for Typos**
   - Field names are case-sensitive
   - `title` not `Title`
   - `deadline` not `Deadline`

---

## Frontend Issues

### If Getting 422 from Frontend:

Check `frontend/lib/tasks.ts` and `frontend/components/TaskFormModal.tsx`:

**Common Issues:**
1. Date not converted to ISO format
2. Priority value not matching enum
3. Empty required fields

**Fix:** Ensure date is formatted before sending:
```typescript
// In TaskFormModal.tsx
const formattedDeadline = new Date(deadline).toISOString();
```

---

## Testing in Swagger UI

### Step-by-Step:

1. **Start Backend:**
   ```bash
   cd backend
   venv\Scripts\activate
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```

2. **Open Swagger:**
   ```
   http://localhost:8000/docs
   ```

3. **Register/Login First:**
   - Test POST `/api/auth/register`
   - Copy the `access_token` from response

4. **Authorize:**
   - Click "Authorize" button (top right)
   - Enter: `Bearer YOUR_ACCESS_TOKEN`
   - Click "Authorize"

5. **Test Endpoints:**
   - Now you can test protected endpoints
   - Use the examples above

---

## Quick Fixes for Common Scenarios

### Scenario 1: Creating Task from Frontend
If tasks aren't creating, check browser console:

```javascript
// Should see:
POST http://localhost:8000/api/tasks
Status: 201 Created

// If 422, check the request payload in Network tab
```

### Scenario 2: Label Color Error
```json
// ❌ Wrong
{
  "name": "Work",
  "color": "blue"  // Must be hex
}

// ✅ Correct
{
  "name": "Work",
  "color": "#3B82F6"
}
```

### Scenario 3: Empty Label Array
```json
// Both valid:
{
  "label_ids": []        // ✅ Empty array
}

{
  "label_ids": null      // ✅ Null
}

// Can also omit:
{
  // label_ids not included  // ✅ Optional field
}
```

---

## Need More Help?

If still getting 422 errors:

1. **Share the Full Error:**
   - Copy the entire error message from browser console
   - Include which endpoint you're calling

2. **Share Your Request:**
   - What data are you sending?
   - Which method (POST, PUT, etc.)?

3. **Check Backend Logs:**
   - Look at the terminal where backend is running
   - Should show detailed validation errors

---

## Summary

**Most Common Fixes:**
- ✅ Use ISO date format: `"2025-10-15T23:59:59"`
- ✅ Use exact priority: `"High"`, `"Medium"`, or `"Low"`
- ✅ Use hex colors: `"#3B82F6"`
- ✅ Include all required fields
- ✅ Authorize in Swagger before testing protected endpoints

**Test in This Order:**
1. Register user
2. Login (get token)
3. Create labels
4. Create task with those label IDs
5. Update/delete as needed

Good luck! 🚀

