import styles from "./app.module.css"
import { Login } from "./components/Login"
import { Navbar } from "./components/Navbar/navbar"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { Register } from "./components/Register/register"
import { Manage } from "./components/Manage/manage"

function AppContent() {
    const location = useLocation()
    const showNavbar = location.pathname !== '/'

    return (
        <div className={styles.container}>
            {showNavbar && <Navbar />}
            <main>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<div>Home Content</div>} />
                    <Route path="/home/register" element={<Register />} />
                    <Route path="/home/manage" element={<Manage />} />
                </Routes>
            </main>
        </div>
    )
}

export function App(){
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}