import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import AbsencesPage from './pages/AbsencesPage.tsx'
import UsersPage from "./pages/UsersPage.tsx";
import RegisterForm from "./components/auth/RegisterForm.tsx";
import LoginForm from "./components/auth/LoginForm.tsx";
import ProtectedRoute from './components/ProtectedRoutes.tsx';
import Navbar from "./components/Navbar.tsx";
import RequestAbsencePage from "./pages/RequestAbsencePage.tsx";
import FeedbackPage from "./pages/FeedbackPage.tsx";

function App() {

    return (
        <>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Navigate to="/login"/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                    <Route path="/users" element={
                        <ProtectedRoute allowedRoles={["MANAGER", "COWORKER"]}>
                            <UsersPage/>
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/absences" element={
                        <ProtectedRoute allowedRoles={["MANAGER", "COWORKER"]}>
                            <AbsencesPage/>
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/absences/request" element={
                        <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                            <RequestAbsencePage/>
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/feedback" element={
                        <ProtectedRoute allowedRoles={["COWORKER"]}>
                            <FeedbackPage />
                        </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<h2>404 - Page Not Found</h2>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
