import styles from "./styles.module.scss";
import { useLeaderBoard } from "@/contexts/leaderBoardContext";
import { LeaderboarItemsInterface } from "@/interfaces/leaderboard.interface";
import vStarImage from '@/../public/origins_assets/rankings/victory-star.png';
import Image from "next/image";

const LeaderboardOriginsPlayerCard = () => {
  const { leaderboard, } = useLeaderBoard();
  const { _items } = leaderboard as unknown as {
    _items: LeaderboarItemsInterface[];
  };

  const avatarDefaultUrl = 'https://storage.googleapis.com/origin-production/assets/avatar/11.png';
  const borderDefaultUrl = 'https://storage.googleapis.com/origin-production/assets/border/0.png';

  return (
    <>
      {_items ? (
        _items.map((data: LeaderboarItemsInterface) => (
          <li className={styles.card__container} key={data.userID}>
              <section className={styles.card__lef}>
                <p className={styles.cardTitle}>{data.topRank}</p>
              </section>
              <section className={styles.card__right}>
                <section className={styles.card__right__body}>
                  <p className={styles.cardName}>{data.name}</p>
                  <p className={styles.cardSubTitle}>{data.rank}</p>
                  <p className={`${styles.cardSubTitle} ${styles.vstar}`}>{
                    <Image
                      src={vStarImage}
                      alt="Vstar"
                      width={15}
                      height={20}
                      
                    />
                  } {data.vstar}</p>
                </section>
                <figure className={styles.card__figure}>
                  <img 
                    src={`https://storage.googleapis.com/origin-production/assets/avatar/${data.avatar?.split(';')[0]}.png`} 
                    className={styles.avatar}
                    alt="Avatar"
                    onError={e => {
                      if (e.currentTarget.src !== avatarDefaultUrl) {
                        e.currentTarget.src = avatarDefaultUrl;
                      }
                    }}
                  />
                  <img
                    src={`https://storage.googleapis.com/origin-production/assets/border/${data.avatar?.split(';')[1]}.png`}
                    className={styles.border}
                    alt="Border"
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
