/**
 * API utility functions for authentication
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Make an API request with automatic token refresh
 */
async function fetchWithAuth(url, options = {}) {
  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let response = await fetch(url, {
    ...options,
    headers,
  });
  console.log("fetchWithAuth response:", response);

  // If token expired, try to refresh
  if (response.status === 401 && accessToken) {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      // Retry the original request with new token
      headers["Authorization"] =
        `Bearer ${localStorage.getItem("accessToken")}`;
      response = await fetch(url, {
        ...options,
        headers,
      });
    }
  }

  return response;
}

/**
 * Login user - Returns challengeId for MFA
 */
export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  const data = await response.json();

  // Return challengeId for OTP verification
  return data;
}

/**
 * Register new user - Returns challengeId for MFA
 */
export async function register(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  const data = await response.json();

  // Return challengeId for OTP verification
  return data;
}

/**
 * Verify OTP code - Returns JWT token
 */
export async function verifyMFA(challengeId, code) {
  const response = await fetch(`${API_URL}/auth/mfa`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ challengeId, code }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "OTP verification failed");
  }

  const data = await response.json();

  // Store the JWT token
  if (data.data.accessToken) {
    localStorage.setItem("accessToken", data.data.accessToken);
  }
  if (data.data.refreshToken) {
    localStorage.setItem("refreshToken", data.data.refreshToken);
  }

  return data;
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      // Refresh token is invalid or expired
      logout();
      return false;
    }

    const data = await response.json();

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Token refresh failed:", error);
    logout();
    return false;
  }
}

/**
 * Logout user
 */
export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

/**
 * Get current user info
 */
export async function getCurrentUser() {
  const response = await fetchWithAuth(`${API_URL}/auth/get-me`);

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await response.json();

  return data.data;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  return !!localStorage.getItem("accessToken");
}

/**
 * Generic authenticated API call
 */
export async function apiCall(endpoint, options = {}) {
  return fetchWithAuth(`${API_URL}${endpoint}`, options);
}

/**
 * Update user profile
 */
export async function updateProfile(profileData) {
  const response = await fetchWithAuth(`${API_URL}/user/update-profile`, {
    method: "PUT",
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Profile update failed");
  }

  const data = await response.json();
  return data;
}

/**
 * Create a donation
 */
export async function createDonation(donationData) {
  const response = await fetchWithAuth(`${API_URL}/payment/donation`, {
    method: "POST",
    body: JSON.stringify(donationData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Donation failed");
  }

  const data = await response.json();
  return data;
}
