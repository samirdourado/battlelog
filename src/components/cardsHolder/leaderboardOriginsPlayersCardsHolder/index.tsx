
import styles from "./styles.module.scss"
import LeaderboardOriginsPlayerCard from "@/components/cards/leaderboardOriginsPlayerCard"
import { useLeaderBoard } from "@/contexts/leaderBoardContext"
import { LeaderBoardMetaDataInterface } from "@/interfaces/leaderboard.interface"
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";


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
                <MdNavigateBefore className={styles.btn__pages} onClick={firstLeaderboards}/>
                {
                    _metadata ? 
                    <p>Leaderboard up to { offset + 20 } of {Math.floor(_metadata?.total / _metadata?.limit)} results</p>
                    : <p>...</p>
                }                
                <MdNavigateNext className={styles.btn__pages} onClick={latestLeaderboards} />
            </div>
        </div>
    )
}

export default LeaderboardOriginsPlayersCardsHolder

