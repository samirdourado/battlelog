'use client'
import api from "@/services/api"
import { ReactNode, createContext, useContext, useState, } from "react"

interface Props {
    children: ReactNode
}

interface leaderBoardProviderData {    
    axieOriginsTop3LeaderBoard: never[];
    setAxieOriginsTop3LeaderBoard: React.Dispatch<React.SetStateAction<never[]>>;
    
    logLeaderboardSeason: never[];
    setLogLeaderBoardSeason: React.Dispatch<React.SetStateAction<never[]>>;
    

    getFullLeaderBoard: () => Promise<void>
    getBattleLogsByUserID: (userId: string[]) => Promise<void>
    logLeaderBoardSeason1k: (data: any) => Promise<void>
}

const LeaderBoardContext = createContext<leaderBoardProviderData>({} as leaderBoardProviderData)

export const  LeaderBoardProvider = ({children}: Props) => {

    const apiKey = process.env.NEXT_PUBLIC_KEY_API
    
    const [axieOriginsTop3LeaderBoard, setAxieOriginsTop3LeaderBoard] = useState([]);
    const [logLeaderboardSeason, setLogLeaderBoardSeason] = useState([]);
    const [top3AxiePlayers, setTop3AxiePlayers] = useState(false);
    
    const getFullLeaderBoard = async () => {
        try {            
            if (!top3AxiePlayers) {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Key': apiKey
                      }
                };
    
                const response = await api.get('origins/v2/leaderboards', config);
                
                getTop3leaderBoardPlayes(response.data._items);
                logLeaderBoardSeason1k(response.data._items);
                setTop3AxiePlayers(true);
            };


        } catch (error) {
            console.log(error);
            setTop3AxiePlayers(false);
        }
    };
    getFullLeaderBoard()

    const getTop3leaderBoardPlayes = async (data: any) => {
        const players = await data.slice(0, 3)
        setAxieOriginsTop3LeaderBoard(players)
    };

    const logLeaderBoardSeason1k = async (data: any) => {
        const users = await data.slice(0, 50)
        let usersIds: string[] = []
        
        users.map((data: any) => 
            usersIds.push(data.userID)
        )

        getBattleLogsByUserID(usersIds)
        
    };

    const getBattleLogsByUserID = async (userId: string[]) => {

        // console.log(userId[0])

        try {
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'X-API-Key': apiKey
                }
            };            

            const response = await api.get(`origins/v2/community/users/${userId[0]}/battle-logs`, config)
            // console.log(response.data._items);
            setLogLeaderBoardSeason(response.data._items);
            // console.log(logLeaderboardSeason)

        } catch (error) {
            console.log(error);
        }
    };

    
    


    return (
        <LeaderBoardContext.Provider value={{ 
            axieOriginsTop3LeaderBoard, setAxieOriginsTop3LeaderBoard,
            logLeaderboardSeason, setLogLeaderBoardSeason,
            getFullLeaderBoard, getBattleLogsByUserID, logLeaderBoardSeason1k,
         }}>
            {children}
         </LeaderBoardContext.Provider>
    )
}

export const useLeaderBoard = () => useContext(LeaderBoardContext)