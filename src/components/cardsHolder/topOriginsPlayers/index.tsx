import Top3OriginsPlayerCard from "@/components/cards/topOriginsPlayer"
import styles from "./styles.module.scss"
import Link from "next/link"

const TopOriginsPlayersCardsHolder = () => {

    return (
        <section className={styles.container} id="leaderbords">           
            <h2>Top Origins Players</h2>
            <ul className={styles.cardsHolder}>
                <Top3OriginsPlayerCard/>
            </ul>
            <Link
                href={"#"}
            >
                VIEW FULL LEADERBOARD
            </Link>
        </section>
    )

}

export default TopOriginsPlayersCardsHolder