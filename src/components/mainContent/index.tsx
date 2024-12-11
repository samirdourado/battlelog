import Top3OriginsPlayersCardsHolder from "../cardsHolder/topOriginsPlayers"
import styles from "./styles.module.scss"

const MainContent = () => {
    return (
        <main className={styles.container}>
            <section>
                <Top3OriginsPlayersCardsHolder/>
            </section>
        </main>
    )
}

export default MainContent