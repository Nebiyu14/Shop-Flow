# Shop-Flow

## Introduction

This project is a full-stack e-commerce application developed with React and Node.js with integrated Stripe payments using PaymentIntent and the embedded PaymentElement. 

The payment process is handled **inside the application**, allowing users to complete checkout without being redirected to a Stripe-hosted page and the user interface is **fully responsive** on desktop, tablet, and mobile devices.

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API (Global Cart State)
- Stripe.js

### Backend
- Node.js
- Express
- Stripe API (PaymentIntent)


---

## Features

### Cart System
- Add/remove products
- Update item quantity
- Dynamic total price calculation
- Cart persistence using localStorage

### Secure Stripe Checkout
- Backend endpoint creates Stripe PaymentIntent
- Client receives `clientSecret`
- Stripe PaymentElement handles secure card collection
- Payment confirmed using `stripe.confirmPayment()`
- Payment status verified using `stripe.retrievePaymentIntent()`
- Cart cleared only after confirmed successful payment

### Payment Status Handling
- Displays "Processing", "Success", or "Failure"
- Prevents false-positive success pages
- Conditional rendering based on real Stripe status

### Architecture
- Separate frontend and backend folders
- Environment variable management
- Structured for future scalability

---

## What I Learned

- How Stripe PaymentIntent flow works end-to-end
- Secure client-server communication for payments
- Why payment status must be verified instead of trusting redirects
- Managing global state using Context API
- Handling conditional routing and UI rendering
- Structuring scalable full-stack projects
- Managing environment variables securely

---


## Upcoming Features

Planned next integrations:

- Firebase Authentication (Login & Register)
- Firestore database for cart and order storage
- Order history page
- Protected routes (Checkout & Orders)
- Persistent order storage in database

---

## How to Run the Project

> Requirements: Node.js (v16+) and npm

---

### 1. Clone the Repository

```bash
https://github.com/Nebiyu14/Shop-Flow.git

```

---

### 2. Run the Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

Start the backend server:

```bash
npm start
```

Backend runs at:

```
http://localhost:3000
```

---

### 3. Run the Frontend (Client)

Open a new terminal window:

```bash
cd client
npm install
```

Create a `.env` file inside the `client/` folder:

```
VITE_APP_STRIPE_PUBLIC_KEY=pk_test_your_publishable_key_here
VITE_BACKEND_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5100
```

---

### 4. Test the Stripe Payment Flow

Open in your browser:

```
http://localhost:5100
```

Use Stripe test card details:

```
4242 4242 4242 4242
Any future date
Any CVC
```

Steps:

1. Add products to cart
2. Go to checkout
3. Enter test card details
4. Submit payment
5. Confirm the Success page is displayed

---

### Notes

* Backend must be running before the frontend
* Stripe is in test mode (no real charges)
* Update ports in `.env` if changed
