    import { chatContext } from "@/context/ChatContext";
    import axios from "axios";
    import { useContext, useEffect, useRef, useState } from "react";
    import SingleMessage from "../components/SingleMessage";
    import ChatInput from "../components/ChatInput";
    import { useUser } from "@/context/userContext";
import SocketContext from "@/context/socketContext";


    function ChatBox() {
        const [messages, setMessage] : any= useState([]);
        const { selectedChat ,chatResults , setChatResults }: any= useContext(chatContext);
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
        
          if (socket) {
            const messageReceivedHandler = (newMessage: any) => {
              const updatedResults = chatResults.map((chat: any) =>
                chat._id === newMessage.chat._id ? { ...chat, latestMessage: newMessage } : chat
              );
              setChatResults(updatedResults); // updating the sidebar
        
              setMessage((prevMessages: any) => [...prevMessages, newMessage]);
            };
        
            socket.on('messagereceived', messageReceivedHandler);
        
            return () => {
              socket.off('messagereceived', messageReceivedHandler);
            };
          }
        }, [selectedChat, socket]);



        const sendMessage = async (e:any, msg:any) => {
          e.preventDefault();
          const { data } = await axios.post('/api/message', { content: msg, chatId: selectedChat._id });
          // Emit to server for broadcasting
      
          socket.emit("newmessage", data); // Corrected emission     
      };

    return (
    <div>
   <div style={{ height: "calc(100vh - 60px)", overflowY: "auto" }} className="overflow-y-scroll  bg-black py-4 relative text-black">
    <div className="overflow-y-auto pb-12 md:pb-14">

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
    <div className="" ref={chatref}/>
    </div>
    <ChatInput sendMessage={sendMessage}/>
    </div>
    );
    }

    export default ChatBox;