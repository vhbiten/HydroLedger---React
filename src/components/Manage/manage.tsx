import { Navigate } from "react-router-dom"
import styles from "./styles.module.css"

export function Manage() {
    
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    
    if (!token) {
        return <Navigate to="/" />
    }
    
    if (role !== "editor") {
        return <Navigate to="/home/register" />
    }
    
    return (
        <h1> MANAGE SESSION </h1>
    )
}