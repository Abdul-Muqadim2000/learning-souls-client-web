# Authentication Setup Guide

## Overview

This authentication system provides a complete, easy-to-follow implementation for your Next.js application with:

- Login and registration functionality
- JWT token-based authentication with refresh tokens
- Public and protected routes
- Automatic token refresh
- Client-side route protection

## Configuration

### 1. Set up your API URL

Update the `.env.local` file with your backend API URL:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

## Project Structure

```
src/
├── app/
│   ├── layout.js                 # Root layout with AuthProvider
│   ├── login/
│   │   └── page.js              # Login page
│   ├── register/
│   │   └── page.js              # Registration page
│   └── dashboard/
│       └── page.js              # Protected route example
├── components/
│   ├── LoginForm.jsx            # Existing login form
│   ├── RegisterForm.jsx         # Existing register form
│   ├── ProtectedRoute.jsx       # Client-side route protection
│   └── Navbar.jsx               # Updated with auth UI
├── contexts/
│   └── AuthContext.js           # Authentication context and provider
├── lib/
│   └── api.js                   # API utility functions
└── middleware.js                # Next.js middleware for route protection
```

## Key Components

### 1. AuthContext (`src/contexts/AuthContext.js`)

Provides authentication state and methods throughout your app.

**Available methods:**

- `login(email, password)` - Login user
- `register(userData)` - Register new user
- `logout()` - Logout user
- `isAuthenticated` - Boolean indicating auth status
- `user` - Current user object
- `loading` - Loading state

**Usage in components:**

```javascript
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  // Use auth methods and state
}
```

### 2. API Functions (`src/lib/api.js`)

Handles all API communications with automatic token refresh.

**Available functions:**

- `login(email, password)` - Login API call
- `register(userData)` - Registration API call
- `refreshAccessToken()` - Refresh access token
- `logout()` - Clear local tokens
- `getCurrentUser()` - Get current user info
- `isAuthenticated()` - Check if user has token
- `apiCall(endpoint, options)` - Make authenticated API calls

**Token Storage:**

- Access token: `localStorage.getItem('accessToken')`
- Refresh token: `localStorage.getItem('refreshToken')`

### 3. Middleware (`src/middleware.js`)

Protects routes at the server level.

**Protected routes** (require authentication):

- `/dashboard`
- `/profile`
- `/settings`

**Auth routes** (redirect to dashboard if logged in):

- `/login`
- `/register`

**To add more protected routes:**

```javascript
const protectedRoutes = ["/dashboard", "/profile", "/settings", "/your-route"];
```

### 4. ProtectedRoute Component

Optional client-side protection wrapper.

**Usage:**

```javascript
import ProtectedRoute from "@/components/ProtectedRoute";

export default function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <div>Protected content here</div>
    </ProtectedRoute>
  );
}
```

## Backend API Expected Endpoints

Your backend should implement these endpoints:

### 1. Login

```
POST /api/auth/login
Body: { email, password }
Response: {
  accessToken: "jwt_token",
  refreshToken: "refresh_token",
  user: { id, email, username, ... }
}
```

### 2. Register

```
POST /api/auth/register
Body: { username, email, password }
Response: {
  accessToken: "jwt_token",
  refreshToken: "refresh_token",
  user: { id, email, username, ... }
}
```

### 3. Refresh Token

```
POST /api/auth/refresh
Body: { refreshToken: "refresh_token" }
Response: {
  accessToken: "new_jwt_token"
}
```

### 4. Get Current User

```
GET /api/auth/me
Headers: { Authorization: "Bearer access_token" }
Response: {
  id, email, username, ...
}
```

## How Authentication Works

### Login Flow

1. User submits login form
2. `login()` function sends credentials to backend
3. Backend returns access token and refresh token
4. Tokens are stored in localStorage
5. User state is updated in AuthContext
6. User is redirected to dashboard

### Token Refresh Flow

1. API request is made with access token
2. If response is 401 (unauthorized), token is expired
3. Automatically calls refresh token endpoint
4. New access token is stored
5. Original request is retried with new token
6. If refresh fails, user is logged out

### Protected Routes

1. **Middleware level**: Checks for token in cookies/headers before page loads
2. **Component level**: `useAuth` hook checks authentication status
3. **Client-side**: `ProtectedRoute` wrapper provides loading states

## Usage Examples

### Creating a Protected Page

```javascript
// src/app/profile/page.js
"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Making Authenticated API Calls

```javascript
import { apiCall } from "@/lib/api";

async function fetchUserData() {
  const response = await apiCall("/user/profile");
  const data = await response.json();
  return data;
}

async function updateProfile(profileData) {
  const response = await apiCall("/user/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
  return response.json();
}
```

### Conditional Rendering Based on Auth

```javascript
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      {isAuthenticated ? <p>Hello, {user?.username}</p> : <p>Please login</p>}
    </div>
  );
}
```

## Security Notes

1. **HTTPS Only**: Always use HTTPS in production
2. **Token Expiry**: Access tokens should have short expiry (15-30 min)
3. **Refresh Token**: Should have longer expiry (7-30 days)
4. **XSS Protection**: Be careful with localStorage - consider httpOnly cookies for production
5. **CORS**: Configure your backend CORS properly

## Customization

### Change Token Storage

Currently using localStorage. For better security, you can modify `src/lib/api.js` to use cookies:

```javascript
// Instead of localStorage
document.cookie = `accessToken=${token}; Secure; HttpOnly; SameSite=Strict`;
```

### Add More User Data

Update the registration form to collect more fields and modify the register function accordingly.

### Custom Redirect After Login

Modify the login page to redirect to a different route:

```javascript
// In src/app/login/page.js
if (result.success) {
  router.push("/your-custom-route"); // Change this
}
```

## Troubleshooting

### "Cannot use import statement outside a module" error

Make sure you're using "use client" directive in client components.

### Tokens not persisting

Check if localStorage is available in your browser and not blocked.

### Redirect loops

Check middleware configuration and ensure auth routes are properly defined.

### 401 errors

Verify your backend API endpoints match the expected format and check CORS settings.

## Next Steps

1. Update `.env.local` with your actual backend URL
2. Test login and registration with your backend
3. Add more protected routes as needed
4. Customize the dashboard page
5. Add password reset functionality (optional)
6. Implement role-based access control (optional)

## Support

For issues or questions, refer to:

- Next.js documentation: https://nextjs.org/docs
- Your backend API documentation
