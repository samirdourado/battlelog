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

interface leaderBoardProviderData {   
    listLeaderboard: (offSetValue: number) => Promise<void>
    leaderboard: LeaderboardInterface[]
    setLeaderboard: React.Dispatch<React.SetStateAction<LeaderboardInterface[]>>
    firstLeaderboards: () => Promise<void>
    latestLeaderboards: () => Promise<void>
    offset: number
    rankingImage: (rank: string) => any
}

const LeaderBoardContext = createContext<leaderBoardProviderData>({} as leaderBoardProviderData);
const apiKey = process.env.NEXT_PUBLIC_KEY_API;

export const  LeaderBoardProvider = ({ children }: Props) => {

    const [listLeaderboardData, setListLeaderboardData] = useState<boolean>(false);
    const [leaderboard, setLeaderboard] = useState<LeaderboardInterface[]>([]);
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        listLeaderboard();
    }, []);
    
    const listLeaderboard = async () => {
        try {            
            if (!listLeaderboardData) {
                
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Key': apiKey
                    }
                };
    
                const response = await apiOrigins.get(`origins/v2/leaderboards`, config);
                setLeaderboard(response.data)
                setListLeaderboardData(true);
            };
        } catch (error) {
            console.log(error);
            setListLeaderboardData(false);
        }
    };

    const listPaginatedLeaderboard = async (currentOffset: number) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': apiKey
                }
            };
    
            const response = await apiOrigins.get(`origins/v2/leaderboards?offset=${currentOffset}`, config);
    
            if (response.data) {
                setLeaderboard([])
                setListLeaderboardData(false);
                setLeaderboard((prevLeaderboard) => ({
                    ...prevLeaderboard,
                    ...prevLeaderboard,
                    ...response.data,
                    _metadata: response.data._metadata
                }));
                setListLeaderboardData(true);
            }
        } catch (error) {
            console.log(error);
            setListLeaderboardData(false);
        }
    };

    const firstLeaderboards = async () => {
        if (offset >= 20) {
            setOffset((prevOffset) => {
                const newOffset = prevOffset - 20;                
                listPaginatedLeaderboard(newOffset);
                return newOffset;
            });
        } else {            
            listLeaderboard();
        }
    };

    const latestLeaderboards = async () => {
        setOffset((prevOffset) => {
            const newOffset = prevOffset + 20;
            listPaginatedLeaderboard(newOffset);
            return newOffset;
        });
    };

    const rankingImage = (rank: string) => {

        const imgRank = rank.toLowerCase();

        if (imgRank === 'egg') {
            return egg;
        } else if (imgRank === 'chick') {
            return chick;
        } else if (imgRank === 'hare') {
            return hare;
        } else if (imgRank === 'boar') {
            return boar;
        } else if (imgRank === 'bear') {
            return bear;
        } else if (imgRank === 'wolf') {
            return wolf;
        } else if (imgRank === 'tiger') {
            return tiger;
        } else if (imgRank === 'dragon') {
            return dragon;
        } else if (imgRank === 'challenger') {
            return challenger;
        }
        return null;
    };
    
  
    return (
        <LeaderBoardContext.Provider
            value={{ 
                leaderboard,
                setLeaderboard,
                listLeaderboard,
                firstLeaderboards,
                latestLeaderboards,
                offset,
                rankingImage,
            }}
        >
            {children}
        </LeaderBoardContext.Provider>
    )
};

export const useLeaderBoard = () => useContext(LeaderBoardContext)