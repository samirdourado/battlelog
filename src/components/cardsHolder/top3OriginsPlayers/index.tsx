import Top3OriginsPlayerCard from "@/components/cards/top3OriginsPlayer"
import styles from "./styles.module.scss"
import Link from "next/link"

const Top3OriginsPlayersCardsHolder = () => {

    return (
        <section className={styles.container}>
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

export default Top3OriginsPlayersCardsHolder