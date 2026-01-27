# Client-Side Donation Setup Guide

## Overview

This guide explains how to implement the donation payment flow on the frontend Next.js application using Stripe.

---

## Environment Variables Required

Create or update `.env.local` in the client directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# Stripe Configuration (Get from: https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxx
```

### Environment Variables Explanation:

1. **`NEXT_PUBLIC_API_URL`** - Your backend API base URL
   - Development: `http://localhost:3000/api/v1`
   - Production: `https://api.yourdomain.com/api/v1`

2. **`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`** - Stripe publishable key (safe to expose)
   - Test mode: `pk_test_...`
   - Production: `pk_live_...`
   - Get from: https://dashboard.stripe.com/test/apikeys

---

## Installation

The Stripe package is already installed:

```json
"@stripe/stripe-js": "^8.6.4"
```

If not installed, run:

```bash
npm install @stripe/stripe-js
```

---

## Complete Donation Flow

### Step 1: User Authentication

Users must be authenticated to create donations. Ensure JWT token is stored:

```javascript
// After login, token is stored in localStorage
localStorage.setItem("accessToken", token);
```

### Step 2: Create Donation Intent

Call the backend API to create a payment intent:

```javascript
const createDonation = async (amount, currency = "USD") => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/donation`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        currency: currency,
      }),
    },
  );

  const result = await response.json();

  if (result.status === "success") {
    return result.data; // { clientSecret, donationId, paymentIntentId }
  } else {
    throw new Error(result.message || "Failed to create donation");
  }
};
```

### Step 3: Redirect to Stripe Payment

Use the existing `StripePayment` component:

```jsx
import StripePayment from "@/components/StripePayment";

function DonationPage() {
  const [clientSecret, setClientSecret] = useState(null);
  const [amount, setAmount] = useState(50);

  const handleDonate = async () => {
    try {
      const data = await createDonation(amount, "USD");
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error creating donation:", error);
    }
  };

  return (
    <div>
      {!clientSecret ? (
        <button onClick={handleDonate}>Donate ${amount}</button>
      ) : (
        <StripePayment
          clientSecret={clientSecret}
          amount={amount}
          currency="USD"
          onError={(error) => console.error(error)}
        />
      )}
    </div>
  );
}
```

### Step 4: Handle Payment Return

Configure your Stripe component return URL (already set in `StripePayment.jsx`):

```javascript
return_url: `${window.location.origin}/dashboard?payment=success`;
```

After payment, handle the return in your dashboard or success page:

```jsx
// app/dashboard/page.js
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");

  useEffect(() => {
    if (paymentStatus === "success") {
      // Show success message
      alert("Payment successful! Thank you for your donation.");

      // Optional: Call confirm endpoint to verify
      // confirmDonation(paymentIntentId);
    }
  }, [paymentStatus]);

  return <div>Dashboard Content</div>;
}
```

---

## API Endpoints Reference

All endpoints require `Authorization: Bearer <token>` header.

### 1. Create Donation Intent

```
POST /api/v1/payment/donation
```

**Request:**

```json
{
  "amount": 50.0,
  "currency": "USD"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Donation intent created successfully",
  "data": {
    "clientSecret": "pi_xxx_secret_xxx",
    "donationId": "507f1f77bcf86cd799439011",
    "paymentIntentId": "pi_xxx"
  }
}
```

### 2. Confirm Donation (Optional)

```
POST /api/v1/payment/donation/confirm
```

**Request:**

```json
{
  "paymentIntentId": "pi_xxx"
}
```

### 3. Get Donation History

```
GET /api/v1/payment/donations?limit=10&page=1&status=succeeded
```

**Response:**

```json
{
  "status": "success",
  "results": 15,
  "data": {
    "donations": [...],
    "pagination": {
      "total": 15,
      "page": 1,
      "pages": 1,
      "limit": 10
    }
  }
}
```

### 4. Get Single Donation

```
GET /api/v1/payment/donation/:id
```

---

## Complete Example Implementation

Here's a complete donation page example:

```jsx
"use client";
import { useState } from "react";
import StripePayment, { PaymentSuccess } from "@/components/StripePayment";

export default function DonatePage() {
  const [amount, setAmount] = useState(50);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateDonation = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Please login first");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/donation`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount,
            currency: "USD",
          }),
        },
      );

      const result = await response.json();

      if (result.status === "success") {
        setClientSecret(result.data.clientSecret);
      } else {
        throw new Error(result.message || "Failed to create donation");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setClientSecret(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Make a Donation</h1>

      {!clientSecret ? (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <label className="block mb-4">
            <span className="text-gray-700">Donation Amount (USD)</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              min="1"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <button
            onClick={handleCreateDonation}
            disabled={loading || amount <= 0}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : `Donate $${amount}`}
          </button>
        </div>
      ) : (
        <StripePayment
          clientSecret={clientSecret}
          amount={amount}
          currency="USD"
          onError={(error) => {
            setError(error);
            setClientSecret(null);
          }}
        />
      )}
    </div>
  );
}
```

---

## Donation History Page Example

```jsx
"use client";
import { useEffect, useState } from "react";

export default function DonationHistory() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/donations?limit=20&page=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const result = await response.json();

    if (result.status === "success") {
      setDonations(result.data.donations);
    }

    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Donations</h1>

      <div className="space-y-4">
        {donations.map((donation) => (
          <div key={donation._id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">
                  {donation.currency} {donation.amount}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(donation.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  donation.status === "succeeded"
                    ? "bg-green-100 text-green-800"
                    : donation.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {donation.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Testing

### Test Card Numbers (Stripe Test Mode)

- ✅ **Success:** `4242 4242 4242 4242`
- ❌ **Decline:** `4000 0000 0000 0002`
- 🔒 **3D Secure:** `4000 0025 0000 3155`

Use:

- Any future expiry date (e.g., 12/34)
- Any 3-digit CVC (e.g., 123)
- Any ZIP code (e.g., 12345)

---

## Security Notes

1. **Never expose `STRIPE_SECRET_KEY`** - This is only for backend
2. **`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is safe** - Designed to be public
3. **Always use HTTPS in production**
4. **JWT tokens** are required for all donation endpoints
5. **Stripe handles PCI compliance** - Card data never touches your server

---

## Backend Alignment Checklist

✅ **Backend Environment Variables** (api/config/config.env):

```env
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

✅ **Frontend Environment Variables** (client/.env.local):

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

✅ **Webhook Route Fixed**: Webhook endpoint is registered before `express.json()` in `app.js`

✅ **API Endpoints**: All 5 endpoints are implemented and authenticated

✅ **Stripe Package**: Installed on both backend and frontend

✅ **Database Model**: Donation model exists with proper schema

---

## Troubleshooting

**Error: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined"**

- Add the variable to `.env.local`
- Restart the development server (`npm run dev`)

**Error: "Failed to create donation intent"**

- Check if user is logged in (JWT token exists)
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running

**Error: "Stripe failed to load"**

- Check internet connection
- Verify publishable key is correct

**Payment succeeds but status not updated**

- Check webhook is configured in Stripe Dashboard
- Verify `STRIPE_WEBHOOK_SECRET` on backend
- For local testing, use Stripe CLI

---

## Next Steps

1. ✅ Add environment variables to `.env.local`
2. ✅ Get Stripe publishable key from dashboard
3. ✅ Create donation page using examples above
4. ✅ Test with Stripe test cards
5. ✅ Configure webhook in Stripe Dashboard
6. ✅ Test complete flow

---

## Support

- **Stripe Documentation**: https://stripe.com/docs
- **Backend Setup**: See `api/SETUP_DONATIONS.md`
- **Flow Diagram**: See `api/DONATION_FLOW.md`
