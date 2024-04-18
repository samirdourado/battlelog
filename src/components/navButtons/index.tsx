import Link from "next/link"
import styles from "./styles.module.scss"
import { MdOutlineMenu } from "react-icons/md"
import { useNavContext } from "@/contexts/navContext"

const NavButtons = () => {

    const { setMobileMenu }: any = useNavContext()

    return (
        <>
            <nav className={ styles.nav__container }>
                <Link href={ '#axies' }>Axies</Link>
                <Link href={ '#leaderbords' }>Leaderboards</Link>
                <Link href={ '#guilds' }>Guilds</Link>
                <Link href={ '#runes' }>Runes</Link>
                <Link href={ '#runes' }>Ranking</Link>
            </nav>
            <button 
                className={ styles.hamburguer__btn__open }
                onClick={ () => setMobileMenu(true) }
            >
            <MdOutlineMenu />
            </button>
        </>
    )
}

export default NavButtons