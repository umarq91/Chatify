import { useEffect } from "react";
import { useSocket } from "@/context/socketContext";
import { useChat } from "@/context/ChatContext";

const useSocketMessageListener = () => {
  const { socket }:any = useSocket();
  const { chatResults, setChatResults, setMessage }:any = useChat();

  const messageReceivedHandler = (newMessage:any) => {

    // Check if the chat already exists in chatResults
    const existingChatIndex = chatResults.findIndex(
      (chat) => chat._id === newMessage.chat._id
    );

    if (existingChatIndex !== -1) {
      // Update latestMessage of the existing chat
      const updatedResults = chatResults.map((chat, index) =>
        index === existingChatIndex ? { ...chat, latestMessage: newMessage } : chat
      );
      setChatResults(updatedResults);
    } else {
      // Create a new chat object and add it to chatResults
      const newChat = {
        ...newMessage.chat,
        latestMessage: newMessage
      };
      setChatResults([...chatResults, newChat]);
    }

    setMessage((prevMessages) => [...prevMessages, newMessage]);
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
