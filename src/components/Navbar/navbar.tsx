import styles from "./styles.module.css"
import navLogo from "../../assets/navlogo.svg"
import { LuMenu, LuUser, LuLogOut } from "react-icons/lu"
import { Drawer } from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { logoutService } from "../../services/logout"

export function Navbar() {
    const [openMenu, setOpenMenu] = useState(false)
    const navigate = useNavigate()

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
                    
                    {localStorage.getItem('role') === 'editor' ? (
                        <Link to="/home/manage">
                            <button className={styles.manageButton}>
                                Gerenciar
                            </button>
                        </Link>
                    ) : null}

                    <div className={styles.navbarProfile}>
                        <div className={styles.navbarProfileUser}>
                            <LuUser />
                            <p className={styles.navbarProfileName}>{localStorage.getItem('name')} {localStorage.getItem('role') === 'editor' ? ', Administrador' : ''}</p>
                        </div>
                        <div className={styles.navbarProfileLogOut} onClick={() => logoutService(navigate)}>
                            <LuLogOut />
                            <p>Sair</p>
                        </div>
                    </div>
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
                        <div className={styles.navbarProfile}>
                            <div className={styles.navbarProfileUser}>
                                <LuUser />
                                <p className={styles.navbarProfileName}>{localStorage.getItem('name')}, {localStorage.getItem('role') === 'editor' ? 'Administrador' : ''}</p>
                            </div>
                            <div className={styles.navbarProfileLogOut}>
                                <LuLogOut />
                                <p onClick={() => logoutService(navigate)}>Sair</p>
                            </div>
                        </div>
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