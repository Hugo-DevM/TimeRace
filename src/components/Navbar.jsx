import Button from "../components/Button"
import { useAuthViewModel } from "../viewmodels/authViewModel";
import styles from "../styles/components/navbar.module.css"

export default function Navbar() {
    const { logout } = useAuthViewModel();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
    };
    return (
        <header>
            <nav className={styles.navbar}>
                <div className={styles.containerLogo}>
                    <img src="logoIcon.png" alt="Logo de TimeRace" width="48" />
                    <h2 className={styles.titleNav}>TimeRace</h2>
                </div>
                <button className={styles.btnNav} onClick={handleLogout}>Cerrar Sesion</button>
            </nav>
        </header>
    );
}