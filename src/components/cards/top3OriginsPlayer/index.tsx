import Image from "next/image"
import styles from "./styles.module.scss"
import { useLeaderBoard } from "@/contexts/leaderBoardContext"

const Top3OriginsPlayerCard = () => {

    const { getFullLeaderBoard, axieOriginsTop3LeaderBoard, logLeaderboardSeason } = useLeaderBoard();
    
    console.log(logLeaderboardSeason)

    return (        
        <>
            { axieOriginsTop3LeaderBoard.length ? (
                axieOriginsTop3LeaderBoard.map((data: any) => (
                    <li className={styles.card__container} key={data.userID}>
                        <section className={styles.card__top}>
                            <section className={styles.card__top__left}>
                                <p>{data.topRank}</p>
                                <p>{data.name}</p>
                            </section>
                            <section className={styles.card__top__right}>
                                <p>{data.vstar}</p>
                                <p>Clã Name</p>
                            </section>
                        </section>

                        <hr className={styles.card__line}></hr>
                            
                        <ul className={styles.card__bottom}>
                            <li>
                                <Image
                                    src={"/axie-provisory.png"}
                                    alt={"Axie Name"}
                                    width={50}
                                    height={40}
                                />
                                <section>
                                    <Image
                                        src={"/rune-provisory.png"}
                                        alt={"Axie Parts name"}
                                        width={18}
                                        height={18}
                                    />
                                    <Image src={"/rune-provisory.png"} alt={"Axie Parts name"} width={18} height={18}/>
                                    <Image src={"/rune-provisory.png"} alt={"Axie Parts name"} width={18} height={18}/>
                                    <Image src={"/rune-provisory.png"} alt={"Axie Parts name"} width={18} height={18}/>
                                    <Image src={"/rune-provisory.png"} alt={"Axie Parts name"} width={18} height={18}/>
                                    <Image src={"/rune-provisory.png"} alt={"Axie Parts name"} width={18} height={18}/>
                                </section>
                            </li>
                        </ul>
                    </li>
                ))
            ) : (
                <p>Loading</p>
            )}
        </>
    )
}

export default Top3OriginsPlayerCard