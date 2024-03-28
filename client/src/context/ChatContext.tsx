import { ReactNode, createContext, useState } from "react";
interface ChatProps{
    children:ReactNode
}


export const chatContext = createContext({});


export const ChatProvider = ({ children }:ChatProps) => {

    const [selectedChat,setSelectedChat] = useState(null)

    return(
        <chatContext.Provider value={{selectedChat,setSelectedChat}}>
            {children}
            </chatContext.Provider>
    )
}