import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import SocketContext from "./socketContext";
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
    const {socket}:any = useContext(SocketContext)
    
useEffect(() => {
    socket?.on('chats_updated', (updatedChats:any) => {
        setChatResults(updatedChats); // Update state with received data
      }); 
},[])


    return(
        <chatContext.Provider value={{selectedChat,setSelectedChat,chatResults,setChatResults}}>
            {children}
            </chatContext.Provider>
    )
}