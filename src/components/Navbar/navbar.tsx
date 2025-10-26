import styles from "./styles.module.css"
import navLogo from "../../assets/navlogo.svg"

export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div className={styles.navbarLeft}>
                    <img src={navLogo} alt="Logo" className={styles.navbarLogo} />
                    <h1 className={styles.navbarTitle}>HydroLedger</h1>
                </div>
                
                <div className={styles.navbarButtons}>
                    <button className={styles.registerButton}>
                        Registrar
                    </button>
                    <button className={styles.manageButton}>
                        Gerenciar
                    </button>
                </div>
            </div>
        </nav>
    )
}