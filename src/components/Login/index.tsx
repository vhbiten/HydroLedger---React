import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/logo.svg"
import styles from "./styles.module.css"
import { loginService } from "../../services/login"


export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        
        try {
            const data = await loginService({ email, password })
            
            if (data.token) {
                localStorage.setItem('token', data.token)
            }
            
            alert('Login realizado com sucesso!')
            navigate('/home')
            
        } catch (error) {
            if (error instanceof Error) {
                alert('Erro ao fazer login: ' + error.message)
            } else {
                alert('Erro ao conectar com o servidor')
            }
            console.error(error)
        } finally {
            setIsLoading(false)
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                        required
                    />
                </div>
            </div>
            <button type="submit" className={styles.loginButton} disabled={isLoading}>
                <span>{isLoading ? 'Entrando...' : 'Entrar'}</span>
            </button>
        </form>
    )
}

