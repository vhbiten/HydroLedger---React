import styles from "./app.module.css"
import { Login } from "./components/Login"
import { Navbar } from "./components/Navbar/navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export function App(){
    return (
        <BrowserRouter>
            <div className={styles.container}>
                <main>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Navbar />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}