import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/logo.svg"
import styles from "./styles.module.css"


export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        
        try {
            const response = await fetch('https://api-hydroledger.onrender.com/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.ok) {
                alert('Login realizado com sucesso!')
                navigate('/home')
            } else {
                alert('Erro ao fazer login: ' + (data.message || 'Credenciais inválidas'))
            }
        } catch (error) {
            alert('Erro ao conectar com o servidor')
            console.error(error)
        }
    }

    return (
        <form className={styles.container} onSubmit={handleLogin}>
            <div className={styles.loginHeader}>
                <img src={logo} alt="Logo" />
            </div>
            
            <div className={styles.formGroup}>
                <div className={styles.inputWrapper}>
                    <label htmlFor="email">Usuário</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className={styles.inputWrapper}>
                    <label htmlFor="password">Senha</label>
                    <input 
                        type="password" 
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>
            <button type="submit" className={styles.loginButton}>
                <span>Entrar</span>
            </button>
        </form>
    )
}

