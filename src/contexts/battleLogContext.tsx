'use client'
import apiOrigins from "@/services/api"
import { ReactNode, createContext, useContext, useEffect, useState, } from "react"
import { useRouter } from "next/navigation";

interface Props {
    children: ReactNode
};

interface battleLogProviderData {
    userBattleLog: any
    setUserBattleLog: React.Dispatch<any>
    getBattleLogsByUserID: (data: any) => Promise<void>
}

const BattleLogContext = createContext<battleLogProviderData>({} as battleLogProviderData);
const apiKey = process.env.NEXT_PUBLIC_KEY_API;

export const  BattleLogProvider = ({ children }: Props) => {

    const router = useRouter();
    const [userBattleLog, setUserBattleLog] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedData = localStorage.getItem('userBattleLog');
        if (storedData) {
            setUserBattleLog(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        if (userBattleLog) {
            localStorage.setItem('userBattleLog', JSON.stringify(userBattleLog));
        }
    }, [userBattleLog]);

    const getBattleLogsByUserID = async (data: any) => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': apiKey,
                    'maxBodyLength': Infinity,
                }
            };

            const response = await apiOrigins.get(`https://api-gateway.skymavis.com/origin/v2/community/users/${data.userID}/battle-logs`, config);

            if (!response || response.status !== 200) {
                throw new Error(`Error fetching battle logs: ${response.statusText}`);
            };

            const result = {
                playerData: data,
                battleLogs: response.data._items,
            };
            setUserBattleLog(result);
            router.push("/battlelog");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // const axieImage = (axieId: string) => {
    //     console.log(axieId)
    //     return `https://axiecdn.axieinfinity.com/axies/${axieId}/axie/axie-full-transparent.png`
    // };

    return (
        <BattleLogContext.Provider
            value={{
                userBattleLog, setUserBattleLog,
                getBattleLogsByUserID,
            }}
        >
            {children}
        </BattleLogContext.Provider>
    )
};

export const useBattleLog = () => useContext(BattleLogContext)