# TODO App - Frontend

A modern Next.js 14 frontend for the TODO application with TypeScript, Tailwind CSS, and comprehensive task management features.

## Current Stage: Stage 1 ✅

**Completed**: Project setup and configuration

See [FRONTEND_STAGES.md](./FRONTEND_STAGES.md) for the complete development roadmap.

---

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Backend API running on `http://localhost:8000` (see `../backend/README.md`)

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Hook Form**: Form handling and validation
- **Lucide React**: Modern icon library
- **js-cookie**: Cookie management for JWT tokens
- **date-fns**: Date utility library

---

## Project Structure

```
frontend/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles & Tailwind
├── lib/                      # Service modules
│   ├── api.ts               # Axios client with interceptors
│   ├── auth.ts              # Authentication service
│   ├── tasks.ts             # Task service
│   └── labels.ts            # Label service
├── types/                    # TypeScript type definitions
│   └── index.ts             # All app types
├── FRONTEND_STAGES.md       # Development stage plan
└── package.json             # Dependencies
```

---

## Stage 1: Project Setup ✅

### What's Included

#### Dependencies
- Core: `next`, `react`, `react-dom`
- HTTP: `axios`
- Forms: `react-hook-form`
- Icons: `lucide-react`
- Utilities: `js-cookie`, `date-fns`
- Styling: `tailwindcss`
- Types: `typescript`, `@types/*`

#### Configuration
- **Tailwind CSS**: Custom utility classes for buttons, inputs, and cards
- **TypeScript**: Strict type checking enabled
- **API Client**: Axios with request/response interceptors for token management

#### Type Definitions
Complete TypeScript interfaces for:
- User authentication (User, UserRegister, UserLogin, AuthTokens)
- Tasks (Task, TaskCreate, TaskUpdate, Priority enum)
- Labels (Label, LabelCreate, LabelUpdate)
- Filters (TaskFilters)

#### Service Modules
API service wrappers for:
- **authService**: register, login, logout, getCurrentUser
- **taskService**: CRUD operations with filtering
- **labelService**: CRUD operations for labels

#### Features
- Automatic token refresh on 401 errors
- JWT token storage in HTTP-only cookies
- Request interceptor to add auth tokens
- Response interceptor for token refresh flow

---

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

---

## Next Steps

Ready to proceed with **Stage 2: Authentication UI**

This will include:
- AuthContext for user state management  
- Login page with form validation
- Register page with form validation
- Authentication redirects
- Cookie-based token storage

See [FRONTEND_STAGES.md](./FRONTEND_STAGES.md) for full stage details.

---

## API Integration

The frontend connects to the FastAPI backend at `http://localhost:8000` by default.

**Environment Variable:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Make sure the backend is running before starting the frontend.

---

## Notes

- Stage 1 includes all setup but no UI pages yet (login/register/dashboard will be added in later stages)
- The home page shows a simple welcome message with links to login/register (pages not created yet)
- All API services are ready to use once authentication pages are built

---

## License

This project is for educational purposes as part of ASU coursework.
