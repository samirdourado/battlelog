'use client'
import api from "@/services/api"
import { ReactNode, createContext, useContext, useState, } from "react"

interface Props {
    children: ReactNode
}

interface leaderBoardProviderData {
    leaderBoard: undefined
    setLeaderBoard: React.Dispatch<React.SetStateAction<undefined>>
    fullLeaderBoard: undefined;
    setFullLeaderBoard: React.Dispatch<React.SetStateAction<undefined>>
}

const LeaderBoardContext = createContext<leaderBoardProviderData>({} as leaderBoardProviderData)

export const  LeaderBoardProvider = ({children}: Props) => {

    const apiKey = process.env.NEXT_PUBLIC_KEY_API

    const [fullLeaderBoard, setFullLeaderBoard] = useState()
    const [leaderBoard, setLeaderBoard] = useState()
    
    const getFullLeaderBoard = async () => {
        try {

            const response = await api.get('origins/v2/leaderboards', {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': apiKey
                  }
            })
            
            setFullLeaderBoard(response.data)
            setLeaderBoard(response.data._items)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <LeaderBoardContext.Provider value={{ 
            fullLeaderBoard, setFullLeaderBoard,
            leaderBoard, setLeaderBoard,
         }}>{children}</LeaderBoardContext.Provider>
    )
}

export const useLeaderBoard = () => useContext(LeaderBoardContext)