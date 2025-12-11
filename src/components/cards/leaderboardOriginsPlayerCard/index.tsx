import styles from "./styles.module.scss";
import { useLeaderBoard } from "@/contexts/leaderBoardContext";
import { LeaderboarItemsInterface } from "@/interfaces/leaderboard.interface";
import vStarImage from '@/../public/origins_assets/rankings/victory-star.png';
import Image from "next/image";
import rankingImage from "@/utils/rankImage";
import { useBattleLog } from "@/contexts/battleLogContext";

const LeaderboardOriginsPlayerCard = () => {
  const { leaderboard } = useLeaderBoard();
  const { _items } = leaderboard as unknown as {
    _items: LeaderboarItemsInterface[];
  };
  const { getBattleLogsByUserID } = useBattleLog();

  const avatarDefaultUrl = 'https://storage.googleapis.com/origin-production/assets/avatar/11.png';
  const borderDefaultUrl = 'https://storage.googleapis.com/origin-production/assets/border/0.png';

  // console.log("_leaderboard items:", _items);
  
  return (
    <>
      {_items ? (
        _items.map((data: LeaderboarItemsInterface) => (
          <li className={styles.card__container} key={data.userID} onClick={() => getBattleLogsByUserID(data)}>
              <section className={styles.card__lef}>
                <p className={styles.cardTitle}>{data.topRank}</p>
              </section>
              <section className={styles.card__right}>
                <section className={styles.card__right__body}>
                  <p className={styles.cardName}>{data.name}</p>
                  <p className={`${styles.cardSubTitle} ${styles.ranking}`}>
                    {
                      <Image
                        src={rankingImage(data.rank) ?? avatarDefaultUrl}
                        alt="Rank"
                        width={38}
                        height={38}
                      />
                    } {data.rank}
                  </p>
                  <p className={`${styles.cardSubTitle} ${styles.vstar}`}>
                    {
                      <Image
                        src={vStarImage}
                        alt="Vstar"
                        width={15}
                        height={20}                      
                      />
                    } {data.vstar}
                  </p>
                </section>
                <figure className={styles.card__figure}>
                  <img 
                    src={`https://storage.googleapis.com/origin-production/assets/avatar/${data.avatar?.split(';')[0]}.png`} 
                    className={styles.avatar}
                    alt={`Avatar ${data.name}`}
                    onError={e => {
                      if (e.currentTarget.src !== avatarDefaultUrl) {
                        e.currentTarget.src = avatarDefaultUrl;
                      }
                    }}
                  />
                  <img
                    src={`https://storage.googleapis.com/origin-production/assets/border/${data.avatar?.split(';')[1]}.png`}
                    className={styles.border}
                    alt={`Border ${data.name}`}
                    onError={e => {
                      if (e.currentTarget.src !== borderDefaultUrl) {
                        e.currentTarget.src = borderDefaultUrl;
                      }
                    }}
                  />
                </figure>
              </section>
            </li>
        ))
      ) : (<p>Carregando</p>)}
    </>
  );
};

export default LeaderboardOriginsPlayerCard;
