import Image from "next/image"
import styles from "./styles.module.scss"

const Hero = () => {

    return (
        <section className={styles.container}>
            <Image
                src="/axie-infinity-origins-logo.png"
                alt="Axie Infinity logo"
                width={138}
                height={102}
            />
        </section>
    )
}

export default Hero