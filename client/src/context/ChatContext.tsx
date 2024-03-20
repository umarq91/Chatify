import { ReactNode, createContext, useState } from "react";
interface ChatProps{
    children:ReactNode
}


export const chatContext = createContext({});


export const ChatProvider = ({ children }:ChatProps) => {

    const [selectedChat,setSelectChat] = useState(null)


    return(
        <chatContext.Provider value={{selectedChat,setSelectChat}}>
            {children}
            </chatContext.Provider>
    )
}