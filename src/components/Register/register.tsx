import styles from "./styles.module.css"
import { Navigate } from "react-router-dom"

export function Register() {
    
    const token = localStorage.getItem("token")
    
    if (!token) {
        return <Navigate to="/" />
    }

    return (
        <h1>Register</h1>
    )
}