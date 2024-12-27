import Link from "next/link"
import styles from "./styles.module.scss"
import { MdOutlineMenu } from "react-icons/md"
import { useNavContext } from "@/contexts/navContext"

const NavButtons = () => {

    const { setMobileMenu }: any = useNavContext()

    return (
        <>
            <nav className={ styles.nav__container }>                
                <Link href={ '#leaderboards' }>Leaderboards</Link>                
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