    # Quick Start Guide - Authentication

## ✅ What's Been Set Up

Your authentication system is now fully configured! Here's what you have:

### 📁 New Files Created

1. **`.env.local`** - Environment configuration (update with your API URL)
2. **`src/lib/api.js`** - API utility functions
3. **`src/contexts/AuthContext.js`** - Authentication state management
4. **`src/middleware.js`** - Route protection middleware
5. **`src/app/login/page.js`** - Login page
6. **`src/app/dashboard/page.js`** - Protected dashboard example
7. **`src/components/ProtectedRoute.jsx`** - Client-side route protection component

### 🔄 Updated Files

1. **`src/app/layout.js`** - Added AuthProvider wrapper
2. **`src/app/register/page.js`** - Integrated with authentication
3. **`src/components/Navbar.jsx`** - Added login/logout UI

## 🚀 Getting Started (3 Steps)

### Step 1: Configure Your Backend API URL

Open `.env.local` and update with your backend URL:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

### Step 2: Verify Backend Endpoints

Ensure your backend has these endpoints:

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registration
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/me` - Get current user

### Step 3: Test the Flow

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/register` to create an account
3. You'll be redirected to `/dashboard` after successful registration
4. Try logging out and logging back in at `/login`

## 🔐 How It Works

### Public Routes (Anyone can access)

- `/` - Home page
- `/about-us` - About page
- `/projects/*` - All project pages
- `/downloads/*` - All download pages
- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Login required)

- `/dashboard` - User dashboard
- `/profile` - User profile (you can create this)
- `/settings` - User settings (you can create this)

### Auto-Redirects

- Logged-in users trying to access `/login` or `/register` → redirected to `/dashboard`
- Non-logged users trying to access `/dashboard` → redirected to `/login`

## 💡 Common Tasks

### Check if User is Logged In

```javascript
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.username}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

### Logout User

```javascript
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { logout } = useAuth();

  return <button onClick={logout}>Logout</button>;
}
```

### Create a New Protected Page

```javascript
// src/app/profile/page.js
"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return <h1>Profile: {user?.email}</h1>;
}
```

Then add `/profile` to protected routes in `src/middleware.js`:

```javascript
const protectedRoutes = ["/dashboard", "/profile", "/settings"];
```

### Make an Authenticated API Call

```javascript
import { apiCall } from "@/lib/api";

async function fetchData() {
  const response = await apiCall("/your-endpoint");
  const data = await response.json();
  return data;
}
```

## 🎨 UI Updates

The **Navbar** now shows:

- **When logged out**: "Login" and "Register" buttons
- **When logged in**: Username/Dashboard link and "Logout" button

## 🔧 Customization

### Add More Protected Routes

Edit `src/middleware.js`:

```javascript
const protectedRoutes = ["/dashboard", "/profile", "/settings", "/my-route"];
```

### Change Redirect After Login

Edit `src/app/login/page.js`:

```javascript
if (result.success) {
  router.push("/your-preferred-route"); // Change this line
}
```

### Store Additional User Data

Update the backend response to include more user fields, they'll automatically be available in the `user` object.

## ⚠️ Important Notes

1. **Update .env.local** with your actual backend URL before testing
2. **Refresh tokens** are handled automatically - users stay logged in
3. **Tokens** are stored in localStorage (consider httpOnly cookies for production)
4. **HTTPS** should be used in production for security

## 📚 Full Documentation

For detailed information, see **`AUTH_README.md`** which includes:

- Complete API documentation
- Security best practices
- Troubleshooting guide
- Advanced customization options

## 🐛 Troubleshooting

**"API_URL is not defined"**
→ Make sure `.env.local` exists and restart your dev server

**"Login not working"**
→ Check browser console for errors and verify backend endpoints

**"Redirect loop"**
→ Clear localStorage and cookies, then try again

**"Token expired immediately"**
→ Check your backend token expiry settings

## ✨ You're All Set!

Your authentication system is ready to use. Start by:

1. Updating `.env.local` with your backend URL
2. Testing registration and login
3. Building out your protected pages

Happy coding! 🚀
