import Image from "next/image"
import NavButtons from "../navButtons"

const Header = () => {
    return (
        <header>
        <Image
          src={'/logo.png'}
          alt="Battle Log Logo"
          width={267}
          height={90}
          priority
        />
        <NavButtons/>
      </header>
    )
}

export default Header