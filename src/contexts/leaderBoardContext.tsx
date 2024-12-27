'use client'
import apiOrigins from "@/services/api"
import { ReactNode, createContext, useContext, useState, } from "react"

interface Props {
    children: ReactNode
}

interface leaderBoardProviderData {   
    leaderboard: never[];
    setLeaderboard: React.Dispatch<React.SetStateAction<never[]>>;

    axieOriginsTop3LeaderBoard: never[];
    setAxieOriginsTop3LeaderBoard: React.Dispatch<React.SetStateAction<never[]>>;
    
    logLeaderboardSeason: never[];
    setLogLeaderBoardSeason: React.Dispatch<React.SetStateAction<never[]>>;    

    listLeaderboard: () => Promise<void>;
    getLeaderboardBattleLogs: (userId: string) => Promise<void>;
}

const LeaderBoardContext = createContext<leaderBoardProviderData>({} as leaderBoardProviderData);

export const  LeaderBoardProvider = ({children}: Props) => {

    const apiKey = process.env.NEXT_PUBLIC_KEY_API;
    
    const [leaderboard, setLeaderboard] = useState([]);
    const [top1kAxiePlayers, setTop1kAxiePlayers] = useState(false);
    const [axieOriginsTop3LeaderBoard, setAxieOriginsTop3LeaderBoard] = useState([]);    
    const [logLeaderboardSeason, setLogLeaderBoardSeason] = useState([]);
    
    
    const listLeaderboard = async () => {
        try {            
            if (!top1kAxiePlayers) {
                
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Key': apiKey
                      }
                };
    
                const response = await apiOrigins.get('origins/v2/leaderboards', config);                
                
                setLeaderboard(response.data)
                setTop1kAxiePlayers(true);
            };

        } catch (error) {
            console.log(error);
            setTop1kAxiePlayers(false);
        }
    };
    listLeaderboard();

    const getLeaderboardBattleLogs = async (userId: string) => {
        const config = {
            headers: {
                'Accept': 'application/json',
                'X-API-Key': apiKey
            }
        };
    };

    return (
        <LeaderBoardContext.Provider value={{ 
            leaderboard, setLeaderboard,
            axieOriginsTop3LeaderBoard, setAxieOriginsTop3LeaderBoard,
            logLeaderboardSeason, setLogLeaderBoardSeason,
            listLeaderboard, getLeaderboardBattleLogs,
         }}>
            {children}
         </LeaderBoardContext.Provider>
    )
}

export const useLeaderBoard = () => useContext(LeaderBoardContext)