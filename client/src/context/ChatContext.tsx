import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import SocketContext from "./socketContext";
interface ChatProps{
    children:ReactNode
}


export const chatContext = createContext({});


export const ChatProvider = ({ children }:ChatProps) => {

    const [selectedChat,setSelectedChat] = useState(null)
    const [chatResults,setChatResults] = useState([]); 
    const {socket}:any = useContext(SocketContext)
    const [messages,setMessage] = useState([])



    return(
        <chatContext.Provider value={{selectedChat,setSelectedChat,chatResults,setChatResults,setMessage,messages}}>
            {children}
            </chatContext.Provider>
    )
}

export const useChat = () => useContext(chatContext)