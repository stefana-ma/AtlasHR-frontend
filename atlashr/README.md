# React + TypeScript + Vite

# AtlasHR Frontend

This is the frontend for **AtlasHR**, built with **React + TypeScript + Material UI**.  
It provides a simple, functional frontend for authentication, absences/users management, and feedback.

---

## 🚀 How to Run

### Requirements
- Node.js 18+
- npm or yarn

## Steps
1. Clone the repo:
   ```bash
   git clone https://github.com/stefana-ma/AtlasHR-frontend.git
   
2. Install dependencies:
    ```bash
    npm install

3. Start the frontend:
    ```bash
    npm run dev

4. Open in browser: http://localhost:5173

## 🏗️ Architecture Decisions

Framework: React with TypeScript

UI Library: Material UI (MUI) for fast and consistent design

Routing: React Router with protected routes by role.

State Management: Local state with hooks; tokens stored in localStorage (absolutely not the best, smth to improve)

Services Layer: Axios-based API services (authService, absenceService, feedbackService) to keep components as clean as possible

Role-based Views:
-Manager: can see all data, and can edit (not implemented yet)
-Employee: can request absences
-Co-worker: leave feedback, can view limited data (not implemented yet)

## ✨ Future Improvements

Add global state management (Redux or React Query)

Improve error handling

Add form validation with Formik + Yup

Add testing (React Testing Library, Cypress)

Use Docker Compose for easy local setup

Improve UI/UX

Add auth context

---