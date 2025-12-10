# Zoolab - Animal Research & Management Cloud System

Zoolab is a comprehensive cloud-based platform for managing biodiversity research, animal tracking, and habitat monitoring. It consists of a multi-tier architecture designed for modern cloud deployment.

## 🏗 Architecture

The project is divided into three main tiers:

1.  **Frontend (Presentation Tier)**: React.js + Vite
    *   Public-facing website (Home, Research, Contact)
    *   Secure Admin Portal for staff
2.  **Backend (Logic Tier)**: Node.js + Express
    *   RESTful API for data management
    *   Authentication & Authorization
3.  **Mobile (Field Tier)**: React Native + Expo
    *   Mobile app for field researchers
    *   Offline-capable data access
4.  **Database (Data Tier)**: MySQL (AWS RDS / Local)

## 🚀 Getting Started

### Prerequisites

*   **Node.js** (v18+ recommended)
*   **MySQL Database** (Local instance or Cloud URL)
*   **Expo Go** app (for mobile testing)

---

### 1. Database Setup

Ensure your MySQL server is running.

```bash
cd backend
# 1. Update .env with your DB credentials if needed
# 2. Run the initialization script to create tables & seed data
npm run init-db
```

### 2. Backend Setup

Start the API server.

```bash
cd backend
npm install
npm run dev
# Server starts on http://localhost:3000
```

### 3. Frontend Setup

Launch the web dashboard.

```bash
cd frontend
npm install
npm run dev
# Website opens at http://localhost:5173
```

### 4. Mobile Setup

Run the mobile app.

```bash
cd mobile
npm install
npx expo start
# Scan the QR code with your phone (Expo Go)
```

---

## 🔐 Authentication

A default admin account is created automatically:

*   **Email**: `admin@zoolab.io`
*   **Password**: `admin123`

Use these credentials to access:
*   **Web**: `/login` or click "Staff Portal"
*   **Mobile**: "Staff Portal" tab

## ✨ Key Features

*   **Public Portal**: showcasing research work and species gallery.
*   **Admin Dashboard**: Secure management of animal records (CRUD).
*   **Mobile App**: Field access to animal data and quick status checks.
*   **Infrastructure-as-Code**: HashiCorp Terraform configuration for AWS deployment (see `infrastructure/` folder).

## 🛠 Tech Stack

*   **Frontend**: React, Tailwind CSS, Lucide Icons, React Router
*   **Backend**: Express.js, MySQL2 driver, Dotenv
*   **Mobile**: Expo Router, React Native Reanimated
*   **DevOps**: Terraform (AWS Provider)
