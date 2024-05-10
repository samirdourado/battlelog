'use client'
import api from "@/services/api"
import { ReactNode, createContext, useContext, useState, } from "react"

interface Props {
    children: ReactNode
}

interface leaderBoardProviderData {    
    axieOriginsTop3LeaderBoard: never[];
    setAxieOriginsTop3LeaderBoard: React.Dispatch<React.SetStateAction<never[]>>;
    

    getFullLeaderBoard: () => Promise<void>
}

const LeaderBoardContext = createContext<leaderBoardProviderData>({} as leaderBoardProviderData)

export const  LeaderBoardProvider = ({children}: Props) => {

    const apiKey = process.env.NEXT_PUBLIC_KEY_API
    
    const [axieOriginsTop3LeaderBoard, setAxieOriginsTop3LeaderBoard] = useState([]);
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
    

    return (
        <LeaderBoardContext.Provider value={{ 
            axieOriginsTop3LeaderBoard, setAxieOriginsTop3LeaderBoard,
            getFullLeaderBoard,
         }}>{children}</LeaderBoardContext.Provider>
    )
}

export const useLeaderBoard = () => useContext(LeaderBoardContext)