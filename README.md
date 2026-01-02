# Tiranga Green Solar Solutions

> [!WARNING]
> **Draft Version**: This is a first draft. Final changes and polish are yet to commence.

## Project Structure
The project is divided into three main applications:
- **Frontend**: Customer-facing React application.
- **Backend**: Node.js/Express API server.
- **Admin**: Admin dashboard for managing content and leads.

## getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- MongoDB (local or Atlas)

### Installation & Running
You will need to install dependencies and start the development server for each application separately.

#### 1. Backend
```bash
cd backend
npm install
npm run dev
# Server usually runs on http://localhost:5000
```
> **Note**: Ensure you create a `.env` file in the `backend` directory with your database string and other secrets.

#### 2. Frontend
```bash
cd frontend
npm install
npm run dev
# App usually runs on http://localhost:5173
```

#### 3. Admin Panel
```bash
cd admin
npm install
npm run dev
# App usually runs on http://localhost:5174
```

## Environment Variables
This project relies on environment variables for configuration. Since `.env` files are not checked into version control for security, you must create them locally in each directory (`backend`, `frontend`, `admin`) based on the requirements of the application (e.g., `VITE_BACKEND_URL`, `MONGO_URI`, `JWT_SECRET`, etc.).
