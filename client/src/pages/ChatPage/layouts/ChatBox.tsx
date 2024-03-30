    import { chatContext } from "@/context/ChatContext";
    import axios from "axios";
    import { useContext, useEffect, useRef, useState } from "react";
    import SingleMessage from "../components/SingleMessage";
    import ChatInput from "../components/ChatInput";
    import { useUser } from "@/context/userContext";
    import io from "socket.io-client";

    let socket:any;

    function ChatBox() {

        const [messages, setMessage] : any= useState([]);
        const { selectedChat }: any= useContext(chatContext);
        const chatref : any= useRef(null);
        const { user }: any= useUser();
        useEffect(() => {
            chatref.current?.scrollIntoView({ behavior: "smooth" , block: "end" });
        },[messages]);

        useEffect(() => {
            socket = io('http://localhost:5000');

            socket.on('connect', () => console.log('Connected to socket.io server'));
            socket.emit("joinchat", selectedChat._id);
            return () => socket.disconnect(); // Clean up socket connection on unmount
        }, []);


        useEffect(() => {
          const fetchMessage=async()=>{
              const {data} : any= await axios.get('/api/message/'+selectedChat._id)
              console.log(data);
              
              setMessage(data)
          }
          fetchMessage()
          socket.on('messagereceived', (newMessage:any) => {
            console.log(newMessage);
            
            setMessage((prevMessages:any) => [...prevMessages, newMessage]);
        });
      },[selectedChat]);

        const sendMessage = async (e:any, msg:any) => {
          e.preventDefault();
          const { data } = await axios.post('/api/message', { content: msg, chatId: selectedChat._id });
          // Emit to server for broadcasting

          
          socket.emit("newmessage", data); // Corrected emission
      };

    return (
    <div>
    <div className="h-screen py-4 relative text-black">
    <div className="overflow-y-auto">

    {messages.map((message:any,index:number) => (
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
    ))}
    </div>
    <div className="pb-20" ref={chatref}/>
    </div>
    <ChatInput sendMessage={sendMessage}/>
    </div>
    );
    }

    export default ChatBox;