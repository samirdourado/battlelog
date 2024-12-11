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
    

    getFullLeaderBoard: () => Promise<void>
    getBattleLogsByUserID: (userId: string[]) => Promise<void>
    logLeaderBoardSeason1k: (data: any) => Promise<void>
}

const LeaderBoardContext = createContext<leaderBoardProviderData>({} as leaderBoardProviderData)

export const  LeaderBoardProvider = ({children}: Props) => {

    const apiKey = process.env.NEXT_PUBLIC_KEY_API
    
    const [leaderboard, setLeaderboard] = useState([]);
    const [top1kAxiePlayers, setTop1kAxiePlayers] = useState(false);
    const [axieOriginsTop3LeaderBoard, setAxieOriginsTop3LeaderBoard] = useState([]);    
    const [logLeaderboardSeason, setLogLeaderBoardSeason] = useState([]);
    const [top3AxiePlayers, setTop3AxiePlayers] = useState(false);
    
    const getFullLeaderBoard = async () => {
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
                setTop1kAxiePlayers(true);
            };

        } catch (error) {
            console.log(error);
            setTop1kAxiePlayers(false);
        }
    };
    getFullLeaderBoard()

    const getTop3leaderBoardPlayes = async (data: any) => {
        const players = await data.slice(0, 3)        
        setAxieOriginsTop3LeaderBoard(players)
    };

    const logLeaderBoardSeason1k = async (data: any) => {
        // const players = await data.slice(0, 50)
        // setLeaderboard(players)
        
        // Estava utilizando para verificar o id do jogador u buscar seus registros
        // let usersIds: string[] = []        
        // players.map((data: any) => 
        //     usersIds.push(data.userID)
        // )

        // getBattleLogsByUserID(usersIds) //inutilizei esta função por hora, mas ela funciona
        
    };

    const getBattleLogsByUserID = async (userId: string[]) => {

        // // console.log(userId[0])

        // try {
        //     const config = {
        //         headers: {
        //             'Accept': 'application/json',
        //             'X-API-Key': apiKey
        //         }
        //     };            

        //     const response = await api.get(`origins/v2/community/users/${userId[0]}/battle-logs`, config)
        //     // console.log(response.data._items); // A PARTIR DAQUI TENHO AS INFORMAÇÕES
        //     // console.log(response.data._items); // A PARTIR DAQUI TENHO AS INFORMAÇÕES

            
        //     setLogLeaderBoardSeason(response.data._items);
        //     // console.log(logLeaderboardSeason)

        // } catch (error) {
        //     console.log(error);
        // }
    };

    return (
        <LeaderBoardContext.Provider value={{ 
            leaderboard, setLeaderboard,
            axieOriginsTop3LeaderBoard, setAxieOriginsTop3LeaderBoard,
            logLeaderboardSeason, setLogLeaderBoardSeason,
            getFullLeaderBoard, getBattleLogsByUserID, logLeaderBoardSeason1k,
         }}>
            {children}
         </LeaderBoardContext.Provider>
    )
}

export const useLeaderBoard = () => useContext(LeaderBoardContext)