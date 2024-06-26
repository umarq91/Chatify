import { chatContext } from "@/context/ChatContext";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import SingleMessage from "../components/SingleMessage";
import ChatInput from "../components/ChatInput";
import { useUser } from "@/context/userContext";
import SocketContext from "@/context/socketContext";
import "./Chat.css"

function ChatBox() {

    const { selectedChat ,chatResults , setChatResults,messages,setMessage }: any= useContext(chatContext);
    const chatref : any= useRef(null);
    const { user }: any= useUser();
    const [loading,setLoading]=useState(false)
    const {socket}:any = useContext(SocketContext);

    useEffect(() => {
      chatref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages]);
    
    useEffect(() => {
      if (selectedChat && socket) {
        socket.emit("joinchat", selectedChat._id);
      }
    }, []);
    
    useEffect(() => {
      const fetchMessage = async () => {
        setLoading(true);
        const { data } = await axios.get('/api/message/' + selectedChat._id);
        setLoading(false);
        setMessage(data);
      };
    
      fetchMessage();
    
    }, [selectedChat, socket]);



    const sendMessage = async (e:any, msg:any) => {
      e.preventDefault();
      const { data } = await axios.post('/api/message', { content: msg, chatId: selectedChat._id });
      // Emit to server for broadcasting
  
      socket.emit("newmessage", data); // Corrected emission     
     // If the chat doesn't already exist in the chat results, start the chat in real-time
        if (!chatResults.some(chat => chat._id === selectedChat._id)) {
        const newChatData = { _id: selectedChat._id, latestMessage: data }; // Assuming data contains the new message object
        setChatResults(prevResults => [...prevResults, newChatData]);
      }
  };

return (
<div>
<div style={{ height: "calc(100vh - 60px)", overflowY: "auto"  }} className="scrollbar-thin  relative bg-black py-4  text-black">
<div className="pb-12 md:pb-14">

{/* Loading  */}

{loading ? (
<div className="flex items-center justify-center h-[80vh] text-white">
  Loading messages
  </div>
) : (
  messages.map((message:any,index:number) => (
    <SingleMessage
    key={message._id} // Assuming a unique message ID
    content={message.content}
    sender={message.sender.username}
    isSenderUser={message.sender._id !== user._id} // mssage is send by the logged in user or not
    avatar={message.sender.avatar}
    messages={messages} // Pass the entire messages array
    index={index}
    senderId={message.sender._id}
    time={message.createdAt}
    />
    ))
)}


</div>
<div className="pb-4" ref={chatref}/>
</div>
<ChatInput sendMessage={sendMessage}/>
</div>
);
}

export default ChatBox;