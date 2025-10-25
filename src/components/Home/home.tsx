import styles from "./styles.module.css"

export function Home() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Sistema de Monitoramento Ambiental</h1>
            </header>
            
            <div className={styles.content}>
                <div className={styles.buttonsContainer}>
                    <button className={styles.registerButton}>
                        Registrar
                    </button>
                    <button className={styles.manageButton}>
                        Gerenciar
                    </button>
                </div>
            </div>
        </div>
    )
}