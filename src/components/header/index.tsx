import Image from "next/image"
import NavButtons from "../navButtons"
import styles from "./styles.module.scss"

const Header = () => {
    return (
        <header className={ styles.container }>
        <Image
          src={ '/logo.png' }
          alt="Battle Log Logo"
          width={ 267 }
          height={ 90 }
          priority
        />
        <NavButtons/>
      </header>
    )
}

export default Header