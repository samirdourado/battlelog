import Image from "next/image";
import styles from "./styles.module.scss";
import { useLeaderBoard } from "@/contexts/leaderBoardContext";

const Top3OriginsPlayerCard = () => {
  const {
    getFullLeaderBoard,
    leaderboard,
    axieOriginsTop3LeaderBoard,
    logLeaderboardSeason,
  } = useLeaderBoard();
  
  const { _items, _metadata } = leaderboard as unknown as {
    _items: any[];
    _metadata: any;
  };

  return (
    <>
      {_items ? (
        _items.map((data: any) => (
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
                <p>{data.gameMode}</p>
              </li>
              <li>
                <Image
                  src={"/axie-provisory.png"}
                  alt={"Axie Name"}
                  width={50}
                  height={40}
                />
              </li>
            </ul>
          </li>
        ))
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default Top3OriginsPlayerCard;
