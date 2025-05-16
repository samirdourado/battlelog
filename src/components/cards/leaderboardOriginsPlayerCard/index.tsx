import Image from "next/image";
import styles from "./styles.module.scss";
import { useLeaderBoard } from "@/contexts/leaderBoardContext";
import noImage from "/public/origins_assets/noImage.png"
import noBorder from "/public/origins_assets/noBorder.png"
import { LeaderBoardMetaDataInterface, LeaderboarItemsInterface } from "@/interfaces/leaderboard.interface";

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
                  <p className={styles.cardTitle}>{data.name}</p>
                  <p className={styles.cardSubTitle}>{data.rank}</p>
                  <p className={`${styles.cardSubTitle} ${styles.vstar}`}>{data.vstar}</p>
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


// {_items ? (
//   _items.map((data: any) => {
//     const [avatar, border] = data.avatar.split(';');

//     const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>, defaultSrc: string) => {
//       e.currentTarget.src = defaultSrc;
//     };

// {avatar ? (
//   <img
//     className={styles.avatar}
//     src={`https://storage.googleapis.com/origin-production/assets/avatar/${avatar}.png`}
//     onError={(e) => handleError(e, noImage.src)}
//     alt="Avatar"
//   />
// ) : (
//   <img className={styles.avatar} src={noImage.src} alt="No Avatar" />
// )}
// {border ? (
//   <img
//     className={styles.border}
//     src={`https://storage.googleapis.com/origin-production/assets/border/${border}.png`}
//     onError={(e) => handleError(e, noBorder.src)}
//     alt="Border"
//   />
// ) : (
//   <img className={styles.border} src={noBorder.src} alt="No Border" />
// )}