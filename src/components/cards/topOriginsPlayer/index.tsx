import Image from "next/image";
import styles from "./styles.module.scss";
import { useLeaderBoard } from "@/contexts/leaderBoardContext";

const Top3OriginsPlayerCard = () => {
  const {
    listLeaderboard,
    leaderboard,
    logLeaderboardSeason,
  } = useLeaderBoard();


  const { _items, _metadata } = leaderboard as unknown as {
    _items: any[];
    _metadata: any;
  };

  console.log(_items)

  return (
    <>
      {_items ? (
        _items.map((data: any) => {
          const [avatar1, avatar2] = data.avatar.split(';');
          return (
            <li className={styles.card__container} key={data.userID}>
              <section className={styles.card__lef}>
                <p className={styles.cardTitle}>{data.topRank}</p>
              </section>

              <section className={styles.card__right}>
                <section className={styles.card__body}>
                  <p className={styles.cardTitle}>{data.name}</p>
                  <p className={styles.cardSubTitle}>{data.rank}</p>
                  <p className={styles.cardSubTitle}>{data.vstar}</p>
                </section>
                <figure className={styles.card__figure}>
                  <img className={styles.avatar} src={`https://storage.googleapis.com/origin-production/assets/avatar/${avatar1}.png`} alt="Avatar 1" />
                  <img className={styles.border} src={`https://storage.googleapis.com/origin-production/assets/border/${avatar2}.png`} alt="Avatar 2" />
                </figure>
              </section>
            </li>
          );
        })
      ) : (
        <p>Loading</p>
      )}
    </>
  );

};

export default Top3OriginsPlayerCard;
