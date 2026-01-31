# Meeting Room Booking System - Frontend

A modern, responsive frontend application for managing meeting room bookings, built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod
- **State Management**: TanStack React Query
- **Authentication**: JWT (Bearer Token)
- **UI Components**: Shadcn UI
- **Notifications**: Sonner (Toast)

## Features

### Authentication
- User registration and login
- JWT-based authentication with localStorage persistence
- Role-based access control (Admin/User)
- Protected routes with middleware

### User Dashboard
- View personal bookings
- Create new bookings
- Edit existing bookings (with restrictions)
- View booking details with room information
- Filter bookings by date, status, room, and keyword
- Pagination support

### Admin Panel
- View and manage pending bookings
- Approve or reject booking requests
- Manage meeting rooms (CRUD operations)
- Upload and manage room photos
- Set cover photos for rooms

### UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Loading skeletons
- Empty state components
- Error fallback pages
- Toast notifications
- Image gallery with carousel
- Real-time updates with React Query

## Project Structure

```
booking-meeting-room-frontend/
├── app/
│   ├── admin/
│   │   ├── bookings/
│   │   │   └── page.tsx          # Admin approval dashboard
│   │   ├── rooms/
│   │   │   └── page.tsx          # Room management page
│   │   ├── layout.tsx              # Admin layout with sidebar
│   │   └── page.tsx               # Admin dashboard
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   ├── register/
│   │   │   └── page.tsx          # Registration page
│   │   └── layout.tsx              # Auth layout
│   ├── dashboard/
│   │   ├── bookings/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx      # Booking detail page
│   │   │   ├── create/
│   │   │   │   └── page.tsx      # Create booking page
│   │   │   ├── edit/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx  # Edit booking page
│   │   │   └── page.tsx          # Bookings list page
│   │   ├── layout.tsx              # Dashboard layout with sidebar
│   │   └── page.tsx               # User dashboard
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                   # Landing page
├── components/
│   ├── auth/
│   │   └── auth-wrapper.tsx       # Auth provider wrapper
│   ├── providers/
│   │   └── query-client-provider.tsx # React Query provider
│   ├── shared/
│   │   ├── empty-state.tsx         # Empty state component
│   │   ├── error-fallback.tsx      # Error fallback component
│   │   └── image-gallery.tsx      # Image gallery with carousel
│   └── ui/                       # Shadcn UI components
├── hooks/
│   └── use-auth.ts                # Auth context and hook
├── lib/
│   ├── utils.ts                   # Utility functions
│   └── validations/
│       ├── auth.ts                # Auth validation schemas
│       ├── booking.ts             # Booking validation schemas
│       └── room.ts               # Room validation schemas
├── services/
│   ├── api.ts                    # Axios instance with interceptors
│   ├── auth.service.ts            # Authentication API calls
│   ├── booking.service.ts         # Booking API calls
│   └── room.service.ts           # Room API calls
├── types/
│   └── index.ts                 # TypeScript type definitions
├── middleware.ts                 # Route protection middleware
├── next.config.ts                # Next.js configuration
├── .env.example                 # Environment variables example
└── package.json                  # Dependencies
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend API server running (ExpressJS)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd booking-meeting-room-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Meeting Room Booking System
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## API Integration

The frontend is designed to work with a backend API. Ensure your backend provides the following endpoints:

### Authentication
- `POST /api/auth/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - User logout

### Bookings
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/my` - Get user's bookings
- `GET /api/bookings/:id` - Get booking details
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `PATCH /api/bookings/:id/cancel` - Cancel booking
- `PATCH /api/bookings/:id/approve` - Approve booking (admin)
- `PATCH /api/bookings/:id/reject` - Reject booking (admin)
- `GET /api/bookings/pending` - Get pending bookings (admin)

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get room details
- `POST /api/rooms` - Create room (admin)
- `PUT /api/rooms/:id` - Update room (admin)
- `DELETE /api/rooms/:id` - Delete room (admin)
- `POST /api/rooms/:id/photos` - Upload room photo (admin)
- `DELETE /api/rooms/:id/photos/:photoId` - Delete room photo (admin)
- `PATCH /api/rooms/:id/photos/:photoId/cover` - Set cover photo (admin)

## Authentication Flow

1. User logs in via `/auth/login`
2. JWT token is stored in `localStorage`
3. Token is automatically attached to all API requests via Axios interceptor
4. Middleware protects routes based on authentication status
5. Admin routes are protected by role check in layout components

## Booking Rules

- Users can create bookings for available rooms
- Bookings start in "pending" status
- Admin must approve bookings before they become "approved"
- Users can edit bookings in "pending" or "approved" status
- Cancelled bookings cannot be edited
- Approved bookings can only have their description edited (not time/date)
- Admin can reject bookings with a reason

## Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Meeting Room Booking System` |
| `NEXT_PUBLIC_APP_URL` | Frontend application URL | `http://localhost:3000` |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Key Features Explained

### Route Protection
The `middleware.ts` file implements route protection:
- Public routes: `/auth/login`, `/register`
- Protected routes: `/dashboard`, `/admin`
- Redirects unauthenticated users to login
- Redirects authenticated users away from login/register

### React Query Configuration
Configured in `QueryClientProviderWrapper`:
- 1-minute stale time for queries
- Disabled refetch on window focus
- Automatic retry on failure (1 attempt)

### Form Validation
All forms use Zod schemas with React Hook Form:
- Client-side validation
- Type-safe form data
- Clear error messages

### Image Optimization
Next.js Image component is used throughout:
- Automatic optimization (WebP, AVIF)
- Responsive sizing
- Lazy loading
- Support for remote images from backend

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure your backend allows requests from your frontend URL.

### Token Expiry
When a token expires (401 response), the user is automatically redirected to login.

### Image Loading
Ensure your backend serves images with proper CORS headers for Next.js Image optimization.

## License

This project is licensed under the MIT License.
