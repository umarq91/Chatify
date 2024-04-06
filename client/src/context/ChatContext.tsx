import { ReactNode, createContext, useContext, useState } from "react";
interface ChatProps{
    children:ReactNode
}
interface Chat {
    users: any[];
    chatName?: string; 
  }

export const chatContext = createContext({});


export const ChatProvider = ({ children }:ChatProps) => {

    const [selectedChat,setSelectedChat] = useState(null)
    const [chatResults, setChatResults] = useState<Chat[]>([]); 
    
    
    return(
        <chatContext.Provider value={{selectedChat,setSelectedChat,chatResults,setChatResults}}>
            {children}
            </chatContext.Provider>
    )
}