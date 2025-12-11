'use client';
import Header from "@/components/header";
import styles from "./styles.module.scss";
import { useBattleLog } from "@/contexts/battleLogContext";
import Image from "next/image";
import { useState } from "react";
import rankingImage from "@/utils/rankImage";
import vStarImage from '@/../public/origins_assets/rankings/victory-star.png';
import { LiaMedalSolid } from "react-icons/lia";
import Link from "next/link";

export default function BattleLogPage() {
  const { userBattleLog } = useBattleLog();
  const avatarDefaultUrl = 'https://storage.googleapis.com/origin-production/assets/avatar/11.png';
  const borderDefaultUrl = 'https://storage.googleapis.com/origin-production/assets/border/0.png';
  
  if (!userBattleLog) {
    return <p>Nenhum dado carregado.</p>;
  }

  const [avatarError, setAvatarError] = useState(false);
  const [borderError, setBorderError] = useState(false);

  const playerGameData = userBattleLog.battleLogs[0]?.gameData;
  const battleLogs = userBattleLog.battleLogs;
  
  const lastUsedTeam = playerGameData?.players.find(
    (player: any) => player.userID === userBattleLog.playerData.userID
  );
  
  const playerALogs = battleLogs.filter((log: any) =>
    log.gameData.players.filter((player: any) => player.userID === userBattleLog.playerData.userID).length > 0
  );

  return (
    <div className={styles.container}>
      <div className={styles.card__container}>
        <figure className={styles.card__figure}>
            <Image
            src={avatarError ? avatarDefaultUrl : `https://storage.googleapis.com/origin-production/assets/avatar/${userBattleLog.playerData.avatar?.split(';')[0]}.png`} 
            className={styles.avatar}
            alt={`Avatar ${userBattleLog.playerData.name}`}
            width={80}
            height={80}
            onError={() => setAvatarError(true)}
            />
            <Image
              src={borderError ? borderDefaultUrl : `https://storage.googleapis.com/origin-production/assets/border/${userBattleLog.playerData.avatar?.split(';')[1]}.png`}
              className={styles.border}
              alt={`Border ${userBattleLog.playerData.name}`}
              width={100}
              height={100}
              onError={() => setBorderError(true)}
              />
          </figure>
          <ul className={styles.player__info}>
            <li>
              <h1>{userBattleLog.playerData.name}</h1>
              <article>
                <p className={`${styles.cardSubTitle} ${styles.vstar}`}>
                  <LiaMedalSolid /> {userBattleLog.playerData.topRank} place
                </p>
                <p className={`${styles.cardSubTitle} ${styles.ranking}`}>
                  {
                    <Image
                      src={rankingImage(userBattleLog.playerData.rank) ?? avatarDefaultUrl}
                      alt="Rank"
                      width={38}
                      height={38}
                    />
                  } {userBattleLog.playerData.rank}
                </p>
                <p className={`${styles.cardSubTitle} ${styles.vstar}`}>
                  {
                    <Image
                      src={vStarImage}
                      alt="Vstar"
                      width={15}
                      height={20}                      
                    />
                  } {userBattleLog.playerData.vstar}
                </p>
                
              </article>
            </li>
          </ul>
        </div>

        <div className={styles.card__container}>
          <h2>Last used team</h2>

          <ul className={styles.battlelog__list}>
            <li className={styles.battlelog__item}>
              <div className={styles.playerData}>
                {
                  
                  lastUsedTeam.team.fighters.map((fighter: any) => (
                    <div key={fighter.axieID} className={styles.playerDataItem}>
                      <Image
                        src={`https://axiecdn.axieinfinity.com/axies/${fighter.axieID}/axie/axie-full-transparent.png`}
                        alt={fighter.name}
                        width={160}
                        height={140}
                      />
                    </div>
                  ))
                }
              </div>

            </li>
          </ul>
        </div>
        <div className={styles.card__container}>
          <h2>Battle log</h2>
          <ul className={styles.battlelog__list}>
              {
                battleLogs.map((log: any) => (
                  <li key={log._etag} className={styles.battlelog__item}>
                    <div className={styles.playerData}>
                    {
                      log.gameData?.players.find((player: any) => player.userID === userBattleLog.playerData.userID).team.fighters.map((fighter: any) => (
                        <div key={fighter.axieID} className={`${styles.playerDataItem} ${styles.flipImage}`}>
                          <Image
                            src={`https://axiecdn.axieinfinity.com/axies/${fighter.axieID}/axie/axie-full-transparent.png`}
                            alt={fighter.name}
                            width={160}
                            height={140}
                          />
                        </div>
                      ))
                    }
                    </div>

                    <div className={styles.battleData}>
                      <div className={styles.gameMode}>{ log.gameData.gameMode }</div>
                      <div className={log.gameData.players.findIndex((p: any) => p.userID === userBattleLog.playerData.userID) === log.gameData.winner ? styles.winner : styles.looser}>
                        { log.gameData.players.findIndex((p: any) => p.userID === userBattleLog.playerData.userID) === log.gameData.winner ? 'Winner' : 'Loser' }
                      </div>
                      <Link
                        href={`axie-origin://?f=rpl&q=${log.gameData.uuid}&userId=${userBattleLog.playerData.userID}`}
                        className={styles.replay}
                        target="_blank"
                      >
                        Replay
                      </Link>
                    </div>
                    
                    <div className={styles.playerData}>
                      {
                        log.gameData?.players.find((player: any) => player.userID !== userBattleLog.playerData.userID).team.fighters.map((fighter: any) => (
                          <div key={fighter.axieID} className={styles.playerDataItem}>
                            <Image
                              src={`https://axiecdn.axieinfinity.com/axies/${fighter.axieID}/axie/axie-full-transparent.png`}
                              alt={fighter.name}
                              width={160}
                              height={140}
                            />
                          </div>
                        ))
                      }
                    </div>
                  </li>
                ))
              }
          </ul>
        </div>
    </div>
  );
}
