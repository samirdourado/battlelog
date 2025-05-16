'use client'
import apiOrigins from "@/services/api"
import { ReactNode, createContext, useContext, useEffect, useState, } from "react"
import { LeaderboardInterface } from "@/interfaces/leaderboard.interface"

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
    
  
    return (
        <LeaderBoardContext.Provider
            value={{ 
                leaderboard,
                setLeaderboard,
                listLeaderboard,
                firstLeaderboards,
                latestLeaderboards,
                offset,
            }}
        >
            {children}
        </LeaderBoardContext.Provider>
    )
};

export const useLeaderBoard = () => useContext(LeaderBoardContext)