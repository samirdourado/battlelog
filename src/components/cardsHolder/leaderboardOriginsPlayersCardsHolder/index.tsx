
import styles from "./styles.module.scss"
import LeaderboardOriginsPlayerCard from "@/components/cards/leaderboardOriginsPlayerCard"
import { useLeaderBoard } from "@/contexts/leaderBoardContext"
import { LeaderboardInterface, LeaderBoardMetaDataInterface } from "@/interfaces/leaderboard.interface"

const LeaderboardOriginsPlayersCardsHolder = () => {
    const { leaderboard, firstLeaderboards, latestLeaderboards, offset } = useLeaderBoard();    

    const { _metadata } = leaderboard as unknown as {
        _metadata: LeaderBoardMetaDataInterface;
    }

    return (
        <div className={styles.container} id="leaderboard">
            <h2>Top Origins Players</h2>
            <ul className={styles.cardsHolder}>
                <LeaderboardOriginsPlayerCard/>
            </ul>
            <div className={styles.container__footer}>
                <button onClick={firstLeaderboards}>left</button>
                {
                    _metadata ? 
                    <p>Leaderboard up to { offset + 20 } of {Math.floor(_metadata?.total / _metadata?.limit)} results</p>
                    : <p>...</p>
                }
                
                <button onClick={latestLeaderboards}>right</button>
            </div>
            
        </div>
    )
}

export default LeaderboardOriginsPlayersCardsHolder

