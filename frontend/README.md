# TODO Application - Frontend

A modern, full-featured task management application built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

---

## Features

### Authentication
- ✅ User registration and login
- ✅ JWT token-based authentication
- ✅ Secure cookie storage for tokens
- ✅ Protected routes
- ✅ Auto token refresh

### Task Management
- ✅ Create, read, update, and delete tasks
- ✅ Task completion toggle
- ✅ Priority levels (High, Medium, Low)
- ✅ Deadline tracking with overdue detection
- ✅ Rich task descriptions

### Label System
- ✅ Create custom labels with colors
- ✅ Edit and delete labels
- ✅ Color picker with presets + custom colors
- ✅ Assign multiple labels to tasks
- ✅ Cascade deletion (labels removed from tasks)

### Filtering & Sorting
- ✅ Filter by priority (High, Medium, Low)
- ✅ Filter by completion status (All, Completed, Incomplete)
- ✅ Filter by overdue status
- ✅ Multi-select label filtering
- ✅ Sort by created date, deadline, or priority
- ✅ Ascending/descending sort order
- ✅ Reset all filters with one click

### UI/UX
- ✅ Modern, clean interface
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Loading states and error handling
- ✅ Expandable/collapsible filter panel
- ✅ Real-time task count
- ✅ Confirmation dialogs for destructive actions
- ✅ Smooth animations and transitions

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Authentication**: JWT with js-cookie

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Backend server running on `http://localhost:8000`

### Installation

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

---

## Project Structure

```
frontend/
├── app/                      # Next.js App Router pages
│   ├── dashboard/           # Protected dashboard routes
│   │   ├── layout.tsx       # Dashboard layout with header
│   │   └── page.tsx         # Main dashboard page
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page (redirects)
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Header.tsx           # App header with logout
│   ├── ProtectedRoute.tsx   # Auth guard component
│   ├── TaskCard.tsx         # Individual task display
│   ├── TaskList.tsx         # Task list with loading states
│   ├── TaskFormModal.tsx    # Create/edit task modal
│   ├── LabelManager.tsx     # Label CRUD modal
│   └── TaskFiltersPanel.tsx # Filtering and sorting UI
├── contexts/                # React Context providers
│   └── AuthContext.tsx      # Global auth state
├── lib/                     # Utility libraries
│   ├── api.ts              # Axios instance with interceptors
│   ├── auth.ts             # Auth service functions
│   ├── tasks.ts            # Task service functions
│   └── labels.ts           # Label service functions
├── types/                   # TypeScript type definitions
│   └── index.ts            # All app types
├── public/                  # Static assets
├── FRONTEND_STAGES.md       # Development stage plan
├── STAGE1_TEST_RESULTS.md   # Stage 1 test documentation
├── STAGE2_TEST_RESULTS.md   # Stage 2 test documentation
├── STAGE3_TEST_RESULTS.md   # Stage 3 test documentation
├── STAGE4_TEST_RESULTS.md   # Stage 4 test documentation
├── STAGE5_TEST_RESULTS.md   # Stage 5 test documentation
├── STAGE6_TEST_RESULTS.md   # Stage 6 test documentation
└── README.md               # This file
```

---

## Development Stages

The frontend was developed in 6 incremental stages:

1. **Stage 1**: Project setup and configuration ✅
2. **Stage 2**: Authentication UI (login/register) ✅
3. **Stage 3**: Dashboard layout and task display ✅
4. **Stage 4**: Task management (CRUD operations) ✅
5. **Stage 5**: Label management system ✅
6. **Stage 6**: Advanced filtering, sorting & polish ✅

Each stage has detailed test documentation in `STAGEX_TEST_RESULTS.md` files.

---

## API Integration

The frontend communicates with the backend API at `http://localhost:8000`:

### Endpoints Used:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/complete` - Toggle completion
- `GET /api/labels` - Get all labels
- `POST /api/labels` - Create label
- `PUT /api/labels/:id` - Update label
- `DELETE /api/labels/:id` - Delete label

---

## Environment Variables

Create a `.env.local` file in the frontend directory (if needed):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

*Note: The API URL is currently hardcoded in `lib/api.ts` for simplicity.*

---

## Key Components

### AuthContext
Global authentication state management:
- Provides `user`, `loading`, `login`, `registerUser`, `logout`
- Handles token refresh and user session persistence

### TaskFiltersPanel
Advanced filtering and sorting:
- Multiple filter types (priority, status, labels, overdue)
- Sort by date, deadline, or priority
- Collapsible panel with active filter indicators

### LabelManager
Complete label management:
- Create, edit, and delete labels
- Color picker with 8 presets + custom colors
- Live preview of label appearance
- Cascade delete protection

### TaskFormModal
Task creation and editing:
- Form validation with React Hook Form
- Label assignment with multi-select
- Priority and deadline selection
- Reusable for create and edit operations

---

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components adapt to screen size with Tailwind's responsive utilities.

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Production Build

To create a production build:

```bash
npm run build
npm start
```

The optimized build will be in the `.next` directory.

---

## Troubleshooting

### Issue: Login loop or 404 errors
**Solution**: Delete the `.next` cache directory and restart:
```bash
rm -rf .next  # or Remove-Item -Recurse -Force .next on Windows
npm run dev
```

### Issue: "Module not found" errors
**Solution**: Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: API connection errors
**Solution**: Verify backend is running on `http://localhost:8000`

---

## Contributing

1. Follow the established component structure
2. Use TypeScript for all new files
3. Maintain responsive design patterns
4. Add proper error handling
5. Test on multiple screen sizes

---

## License

This project is part of a learning exercise for ASU's AI course.

---

## Credits

**Developed by**: [Your Name]  
**Course**: ASU AI Course  
**Framework**: Next.js 14  
**Styling**: Tailwind CSS  

---

**Frontend Status**: ✅ **COMPLETE** - All 6 stages finished!
