  import { chatContext } from "@/context/ChatContext";
  import axios from "axios";
  import { useContext, useEffect, useRef, useState } from "react";
  import SingleMessage from "../components/SingleMessage";
  import ChatInput from "../components/ChatInput";
  import { useUser } from "@/context/userContext";

  const ChatBox = () => {

    const [messages, setMessage] = useState([]);
    const { selectedChat }: any = useContext(chatContext);
    const chatref: any = useRef(null);
    const { user }: any = useUser();

    
  useEffect(()=>{
    const fetchMessage=async()=>{
    const {data} = await axios.get('/api/message/'+selectedChat._id)
    setMessage(data)
    }
    fetchMessage()
  },[])


useEffect(() => {
  chatref.current?.scrollIntoView({ behavior: "smooth" , block: "end" });
},[messages])

    return (
      <div>
        <div className="h-screen py-4 relative  text-black ">
          <div className= "  overflow-y-auto">
 
            {messages.map((message:any,index) => (
              <>
                    <SingleMessage
          key={message._id} // Assuming a unique message ID
          content={message.content}
          sender={message.sender.username}
          isSenderUser={message.sender._id !== user._id} // mssage is send by the logged in user or not
          avatar={message.sender.avatar}
          messages={messages} // Pass the entire messages array
          index={index}
          senderId={message.sender._id}
  />
                </>
            ))}
          </div>
            <div className="pb-20"  ref={chatref}/>
        </div>
      <ChatInput/>
      </div>
    );
  }

  export default ChatBox
