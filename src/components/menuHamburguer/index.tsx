import Link from "next/link"
import styles from "./styles.module.scss"
import { MdOutlineMenuOpen } from "react-icons/md"
import { useNavContext } from "@/contexts/navContext"

const MenuHamburguer = () => {

    const { setMobileMenu }: any = useNavContext()

    return (
        <div className={ styles.backdrop }>
            <div className={ styles.menu__container }>
                <button 
                    className={ styles.hamburguer__btn__close }
                    onClick={ () => setMobileMenu(false) }
                >
                    <MdOutlineMenuOpen />
                </button>
                <nav className={ styles.nav__container__mobile }>
                    <Link href={ '#axies' }>Axies</Link>
                    <Link href={ '#leaderbords' }>Leaderboards</Link>
                    <Link href={ '#guilds' }>Guilds</Link>
                    <Link href={ '#runes' }>Runes</Link>
                    <Link href={ '#runes' }>Ranking</Link>
                </nav>
            </div>
        </div>
    )
}

export default MenuHamburguer