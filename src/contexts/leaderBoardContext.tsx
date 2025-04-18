'use client'
import apiOrigins from "@/services/api"
import { ReactNode, createContext, useContext, useEffect, useState, } from "react"
import { LeaderboardInterface } from "@/interfaces/leaderboard.interface"

interface Props {
    children: ReactNode
};

interface leaderBoardProviderData {   
    listLeaderboard: () => Promise<void>;
    leaderboard: LeaderboardInterface[]
    setLeaderboard: React.Dispatch<React.SetStateAction<LeaderboardInterface[]>>
}

const LeaderBoardContext = createContext<leaderBoardProviderData>({} as leaderBoardProviderData);


const apiKey = process.env.NEXT_PUBLIC_KEY_API;

export const  LeaderBoardProvider = ({ children }: Props) => {

    const [leaderboard, setLeaderboard] = useState<LeaderboardInterface[]>([]);
    const [listLeaderboardData, setListLeaderboardData] = useState<boolean>(false);

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
    
                const response = await apiOrigins.get('origins/v2/leaderboards', config);
                setLeaderboard(response.data)
                setListLeaderboardData(true);
            };
        } catch (error) {
            console.log(error);
            setListLeaderboardData(false);
        }
    };

    return (
        <LeaderBoardContext.Provider
            value={{ 
                leaderboard,
                setLeaderboard,
                listLeaderboard
            }}
        >
            {children}
        </LeaderBoardContext.Provider>
    )
};

export const useLeaderBoard = () => useContext(LeaderBoardContext)