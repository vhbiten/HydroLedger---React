import styles from "./app.module.css"
import { Login } from "./components/Login"
import { Home } from "./components/Home/home"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export function App(){
    return (
        <BrowserRouter>
            <div className={styles.container}>
                <main>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}