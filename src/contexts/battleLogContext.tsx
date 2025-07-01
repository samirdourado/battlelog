'use client'
import apiOrigins from "@/services/api"
import { ReactNode, createContext, useContext, useEffect, useState, } from "react"
import { LeaderboardInterface } from "@/interfaces/leaderboard.interface"
import egg from '@/../public/origins_assets/rankings/egg.png';
import chick from '@/../public/origins_assets/rankings/chick.png';
import hare from '@/../public/origins_assets/rankings/hare.png';
import boar from '@/../public/origins_assets/rankings/boar.png';
import bear from '@/../public/origins_assets/rankings/bear.png';
import wolf from '@/../public/origins_assets/rankings/wolf.png';
import tiger from '@/../public/origins_assets/rankings/tiger.png';
import dragon from '@/../public/origins_assets/rankings/dragon.png';
import challenger from '@/../public/origins_assets/rankings/challenger.png';

interface Props {
    children: ReactNode
};

interface battleLogProviderData {
    userBattleLog: any
    setUserBattleLog: React.Dispatch<any>
}

const BattleLogContext = createContext<battleLogProviderData>({} as battleLogProviderData);
const apiKey = process.env.NEXT_PUBLIC_KEY_API;

export const  BattleLogProvider = ({ children }: Props) => {

    const [userBattleLog, setUserBattleLog] = useState<any>();

    return (
        <BattleLogContext.Provider
            value={{
                userBattleLog, setUserBattleLog,
            }}
        >
            {children}
        </BattleLogContext.Provider>
    )
};

export const useBattleLog = () => useContext(BattleLogContext)