# Testing Stage 2: Authentication Endpoints

## Prerequisites

Before testing, make sure:
1. Your MongoDB connection is configured in `.env`
2. The server is running: `uvicorn app.main:app --reload`
3. MongoDB is accessible

## Test Using Interactive Docs (Recommended)

Visit http://127.0.0.1:8000/docs and test each endpoint:

### 1. Register a New User

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "test@example.com",
  "username": "testuser",
  "password": "password123"
}
```

**Expected Response:** User object with id, email, username, created_at

---

### 2. Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer"
}
```

**Save both tokens for next steps!**

---

### 3. Get Current User (Protected Route)

**Endpoint:** `GET /api/auth/me`

**Authorization:** Click the "Authorize" button in Swagger UI and enter your access token

**Expected Response:** User object with your information

---

### 4. Refresh Access Token

**Endpoint:** `POST /api/auth/refresh`

**Request Body:**
```json
{
  "refresh_token": "YOUR_REFRESH_TOKEN_HERE"
}
```

**Expected Response:** New access and refresh tokens

---

### 5. Logout

**Endpoint:** `POST /api/auth/logout`

**Authorization:** Use your access token

**Request Body:**
```json
{
  "refresh_token": "YOUR_REFRESH_TOKEN_HERE"
}
```

**Expected Response:**
```json
{
  "message": "Successfully logged out"
}
```

---

## Test Using PowerShell/cURL

### 1. Register
```powershell
$body = @{
    email = "test@example.com"
    username = "testuser"
    password = "password123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/auth/register" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" | Select-Object -ExpandProperty Content
```

### 2. Login
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/auth/login" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"

$tokens = $response.Content | ConvertFrom-Json
$accessToken = $tokens.access_token
$refreshToken = $tokens.refresh_token

Write-Host "Access Token: $accessToken"
Write-Host "Refresh Token: $refreshToken"
```

### 3. Get Current User
```powershell
$headers = @{
    Authorization = "Bearer $accessToken"
}

Invoke-WebRequest -Uri "http://127.0.0.1:8000/api/auth/me" `
    -Headers $headers | Select-Object -ExpandProperty Content
```

---

## Common Issues

### Issue: Database not connected
**Solution:** Update `.env` with your actual MongoDB URI

### Issue: User already exists
**Solution:** Use a different email or username, or check MongoDB to remove the test user

### Issue: 401 Unauthorized
**Solution:** Make sure you're using the correct access token and it hasn't expired (expires in 30 minutes by default)

### Issue: Invalid refresh token
**Solution:** Get a new refresh token by logging in again

