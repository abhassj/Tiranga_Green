# ☀️ Tiranga Green Solar Solutions

### Empowering India with Sustainable Energy 🇮🇳

> **Live Status**: 🟢 Deployed & Operational

Tiranga Green Solar Solutions is a premier digital platform designed to streamline solar energy adoption for **Housing Societies**, **Commercial Enterprises**, and **Individual Homes**. This project features a high-performance customer-facing website and a robust administrative dashboard for managing leads and operations.

---

## 🚀 Live Demo

Explore the live applications below:

| Application | Role | Link |
| :--- | :--- | :--- |
| **Frontend** | Customer Portal | [**Visit Website**](https://tiranga-green-3ngouf92g-abhas-jaltares-projects.vercel.app) |
| **Admin Panel** | Management Dashboard | [**Access Admin**](https://tiranga-green-e5un-c64zv4ca0-abhas-jaltares-projects.vercel.app) |
| **Backend API** | Server (Health Check) | [**View API**](https://tiranga-green.onrender.com) |

---

## ✨ Key Features

### 🌍 Customer Portal (Frontend)
*   **Modern UI/UX**: Built with React and Tailwind CSS for a premium, responsive experience.
*   **Interactive Forms**: Specialized enquiry forms for Housing Societies and Commercial projects.
*   **Dynamic Content**: Swiper-based sliders and real-time validation.
*   **Performance**: Optimized with Vite for lightning-fast load times.

### 🛡️ Admin Dashboard
*   **Lead Management**: Centralized view of all customer enquiries.
*   **Secure Authentication**: JWT-based login protection for administrators.
*   **Data Visualization**: (Planned) Charts and graphs for business insights.
*   **Role-Based Access**: Secure endpoints ensuring data privacy.

### ⚙️ Backend Core
*   **RESTful API**: Scalable Node.js & Express architecture.
*   **Database**: MongoDB with Mongoose for flexible data modeling.
*   **Security**: Implemented Helmet, CORS, and Bcrypt for robust security.
*   **Environment Aware**: Configurable for Development and Production environments.

---

## 🛠️ Technology Stack

This project is built using the **MERN** ecosystem:

*   **Frontend**: React.js, Vite, Tailwind CSS, Swiper.js
*   **Backend**: Node.js, Express.js, MongoDB, Mongoose
*   **Authentication**: JSON Web Tokens (JWT)
*   **Deployment**: Vercel (Client/Admin) & Render (Server)

---

## 💻 Local Development Setup

Follow these steps to run the project locally.

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Local or Atlas Connection String)

### 1. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "PORT=5000" > .env
echo "MONGODB_URI=your_mongodb_connection_string" >> .env
echo "JWT_SECRET=your_jwt_secret" >> .env

npm run dev
# Server runs at http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend
npm install

# Create .env file for local API mapping
echo "VITE_API_URL=http://localhost:5000" > .env

npm run dev
# Client runs at http://localhost:5173
```

### 3. Admin Setup
```bash
cd admin
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env

npm run dev
# Admin runs at http://localhost:5174
```

---

## 📦 Deployment Configuration

### Environment Variables
For production deployment, ensure the following environment variables are set:

**Frontend & Admin (Vercel)**
*   `VITE_API_URL`: `https://tiranga-green.onrender.com`

**Backend (Render)**
*   `NODE_ENV`: `production`
*   `MONGODB_URI`: *[Your Access String]*
*   `JWT_SECRET`: *[Your Secret]*

---

### © 2026 Tiranga Green Solar Solutions
*Building a Greener Future.*
