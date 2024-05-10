import Top3OriginsPlayersCardsHolder from "../cardsHolder/top3OriginsPlayers"
import styles from "./styles.module.scss"

const MainContent = () => {
    return (
        <main className={styles.container}>
            <Top3OriginsPlayersCardsHolder/>
        </main>
    )
}

export default MainContent