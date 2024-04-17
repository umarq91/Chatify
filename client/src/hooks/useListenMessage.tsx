import { useEffect } from "react";
import { useSocket } from "@/context/socketContext";
import { useChat } from "@/context/ChatContext";




const useSocketMessageListener = () => {
  const { socket } = useSocket();

  const {chatResults,setChatResults,setMessage} = useChat()

  const messageReceivedHandler = (newMessage: any) => {
      
    
    const updatedResults = chatResults.map((chat: any) =>
      chat._id === newMessage.chat._id ? { ...chat, latestMessage: newMessage } : chat
    );

   

    setChatResults(updatedResults); // updating the sidebar

    setMessage((prevMessages: any) => [...prevMessages, newMessage]);
  };




  useEffect(() => {
    if (socket) {
      socket.on("messagereceived", messageReceivedHandler);

      // Clean up function to remove event listener when component unmounts
      return () => {
        socket.off("messagereceived");
      };
    }
  }, [socket]); // Re-run effect if socket changes
};

export default useSocketMessageListener;
