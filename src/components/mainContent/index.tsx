
import LeaderboardOriginsPlayersCardsHolder from "../cardsHolder/leaderboardOriginsPlayersCardsHolder"
import styles from "./styles.module.scss"

const MainContent = () => {
    return (
        <main className={styles.container}>
            <section>
                <LeaderboardOriginsPlayersCardsHolder/>
            </section>
        </main>
    )
}

export default MainContent