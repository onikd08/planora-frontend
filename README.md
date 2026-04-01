# Planora - Comprehensive Event Management Platform

## 🌟 Introduction
Planora is a modern, full-stack event management platform built using **Next.js 16**, **TypeScript**, and **Tailwind CSS 4**. It empowers users to discover, join, and manage events effortlessly, while providing admins with powerful tools for moderation, analytics, and platform control.

## 🚀 Built with the Latest Tech Stack
*   **Framework**: Next.js 16 (App Router, Turbopack)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS 4 + Shadcn/UI + Framer Motion
*   **UI Components**: Radix UI primitives, Lucide Icons
*   **Forms & Validation**: React Hook Form + Zod
*   **State & Tables**: TanStack Table v8, Sonner Toasts
*   **Visualizations**: Recharts for Admin Analytics
*   **Auth**: JWT-based authentication with role-based routing (Admin/User slots)

## ✨ Core Features

### 🌍 Public Access
*   **Dynamic Hero Section**: Interactive shuffle grid with event discovery.
*   **Event Exploration**: Browse events by categories, statuses (Upcoming/Ongoing), and keywords.
*   **Category Navigation**: Easy filtering by event types (Workshops, Festivals, Technology, etc.).
*   **Detailed Event Pages**: Comprehensive views including location, date/time, description, and pricing.

### 👤 User Dashboard
*   **Event Creation**: Form-based event publishing with validation.
*   **My Participations**: Track joined events and payment statuses.
*   **Profile Management**: Update personal info, photo, and passwords.
*   **Payment Integration**: Secure event joining (Integrated with Stripe/External API).

### 🛡️ Admin Suite
*   **Real-time Analytics**: Visual dashboards for revenue, user growth, and event categories using Recharts.
*   **User Management**: Monitor, ban/unban users, and manage staff roles (Admin/User).
*   **Category Management**: Create, edit, and curate event categories with ease.
*   **Event Moderation**: Toggle featured status and manage platform-wide listings.

## 🛠️ Getting Started

### Prerequisites
*   Node.js 18+
*   NPM / PNPM / Yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-repo/planora-frontend.git
    cd planora-frontend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Create a `.env.local` file in the root:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
    # or point to hosted backend
    # NEXT_PUBLIC_API_URL=https://planora-backend.vercel.app/api/v1
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

## 📂 Project Structure
*   `actions/`: Server Actions for backend integration.
*   `app/`: Next.js App Router (Common & Role-based Dashboard).
*   `components/`: UI components (Shadcn + Custom builds).
*   `hooks/`: Reusable React Hooks.
*   `lib/`: Utility functions and shared Logic.
*   `services/`: Core logic and data fetching handlers.

---
*Developed as part of the Planora Ecosystem.*
