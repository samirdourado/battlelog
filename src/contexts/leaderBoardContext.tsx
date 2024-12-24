'use client'
import api from "@/services/api"
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
    

    listLeaderboard: () => Promise<void>
    getLeaderboardBattleLogs: (userId: string[]) => Promise<void>
    logLeaderBoardSeason1k: (data: any) => Promise<void>
}

const LeaderBoardContext = createContext<leaderBoardProviderData>({} as leaderBoardProviderData)

export const  LeaderBoardProvider = ({children}: Props) => {

    const apiKey = process.env.NEXT_PUBLIC_KEY_API
    
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
    
                const response = await api.get('origins/v2/leaderboards', config);                
                
                setLeaderboard(response.data)
                // getLeaderboardBattleLogs(usersStrings)
                setTop1kAxiePlayers(true);
            };

        } catch (error) {
            console.log(error);
            setTop1kAxiePlayers(false);
        }
    };
    listLeaderboard()

    const getLeaderboardBattleLogs = async (userId: string[]) => {
        const config = {
            headers: {
                'Accept': 'application/json',
                'X-API-Key': apiKey
            }
        };

        const battleLogs: any[] = []
        
        try {
            // userId.forEach(async (element: any) => {
            //     const response = await api.get(`origins/v2/community/users/${element}/battle-logs`, config)
            //     battleLogs.push(response.data._items)
            // })

            // console.log(battleLogs)

            
            // const response = await api.get(`origins/v2/community/users/${userId}/battle-logs`, config)
            // console.log(response.data._items);
            // return response.data._items;
            // setLogLeaderBoardSeason(response.data._items);

        } catch (error) {
            console.log(error);
        }
    };

    

    //     const players = await data.slice(0, 3)        
    //     setAxieOriginsTop3LeaderBoard(players)
    // };

    const logLeaderBoardSeason1k = async (data: any) => {
        // const players = await data.slice(0, 50)
        // setLeaderboard(players)
        
        // Estava utilizando para verificar o id do jogador u buscar seus registros
        // let usersIds: string[] = []        
        // players.map((data: any) => 
        //     usersIds.push(data.userID)
        // )

        // getLeaderboardBattleLogs(usersIds) //inutilizei esta função por hora, mas ela funciona
        
    };



    return (
        <LeaderBoardContext.Provider value={{ 
            leaderboard, setLeaderboard,
            axieOriginsTop3LeaderBoard, setAxieOriginsTop3LeaderBoard,
            logLeaderboardSeason, setLogLeaderBoardSeason,
            listLeaderboard, getLeaderboardBattleLogs, logLeaderBoardSeason1k,
         }}>
            {children}
         </LeaderBoardContext.Provider>
    )
}

export const useLeaderBoard = () => useContext(LeaderBoardContext)