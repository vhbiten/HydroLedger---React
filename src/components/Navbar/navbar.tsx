import styles from "./styles.module.css"
import navLogo from "../../assets/navlogo.svg"
import { LuMenu } from "react-icons/lu"
import { Drawer } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

export function Navbar() {
    const [openMenu, setOpenMenu] = useState(false)

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div className={styles.navbarLeft}>
                    <img src={navLogo} alt="Logo" className={styles.navbarLogo} />
                    <h1 className={styles.navbarTitle}>HydroLedger</h1>
                </div>
                
                <div className={styles.navbarButtons}>
                    <Link to="/home/register">
                        <button className={styles.registerButton}>
                        Registrar
                        </button>
                    </Link>
                    
                    <Link to="/home/manage">
                        <button className={styles.manageButton}>
                        Gerenciar
                        </button>
                    </Link>
                    
                </div>

                <div className={styles.navbarMobile}>
                    <div className={styles.navbarMobileBtns}>
                        <LuMenu className={styles.navbarMobileBtn} onClick={handleOpenMenu}/>
                    </div>
                </div>
                <Drawer
                anchor="right"
                open={openMenu}
                onClose={handleOpenMenu}
                >
                    <div className={styles.Drawer}>
                        <Link to="/home/register">
                            <button className={styles.registerButton} onClick={handleOpenMenu}>
                                Registrar
                            </button>
                        </Link>

                        <Link to="/home/manage">
                            <button className={styles.manageButton} onClick={handleOpenMenu}>
                                Gerenciar
                            </button>
                    </Link>
                    </div>
                </Drawer>
            </div>
        </nav>
    )
}