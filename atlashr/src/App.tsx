import './App.css'
// import AbsencePage from './pages/AbsencePage'
import AbsencesPage from './pages/AbsencesPage.tsx'
// import UsersPage from './pages/UsersPage.tsx'
import {useState} from "react";
import type {User} from "./types/User.ts";
import RegisterForm from "./components/auth/RegisterForm.tsx";
import LoginForm from "./components/auth/LoginForm.tsx";

function App() {

    const [user, setUser] = useState<User | null>(null);

  return (
    <>
      {/*<h1>Welcome to the Absence Management System</h1>*/}
      {/*<AbsencePage />*/}
        {!user ? (
            <>
                <RegisterForm />
                <LoginForm onLogin={setUser} />
            </>
        ) : (
            <><h2>Welcome, {user.username} ({user.role})</h2><AbsencesPage currentRole={user.role} /></>
        )}
    </>
  )
}

export default App
