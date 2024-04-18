'use client'
import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
    children: ReactNode;
};

interface navProviderData {
    mobileMenu: boolean
    setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>
};

const NavContext = createContext<navProviderData>({} as navProviderData)

export const NavProvider = ({ children }: Props) => {
    const [mobileMenu, setMobileMenu] = useState(false)

    return (
        <NavContext.Provider
            value={{                
                mobileMenu, setMobileMenu,
            }}
        >
            { children }
        </NavContext.Provider>
    )
}

export const useNavContext = () => useContext(NavContext)