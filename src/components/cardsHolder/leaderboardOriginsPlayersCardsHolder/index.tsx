import Top3OriginsPlayerCard from "@/components/cards/leaderboardOriginsPlayerCard"
import styles from "./styles.module.scss"
import Link from "next/link"
import LeaderboardOriginsPlayerCard from "@/components/cards/leaderboardOriginsPlayerCard"

const LeaderboardOriginsPlayersCardsHolder = () => {
    

    return (
        <section className={styles.container} id="leaderboards">           
            <h2>Top Origins Players</h2>
            <ul className={styles.cardsHolder}>
                <LeaderboardOriginsPlayerCard/>
            </ul>
        </section>
    )

}

export default LeaderboardOriginsPlayersCardsHolder