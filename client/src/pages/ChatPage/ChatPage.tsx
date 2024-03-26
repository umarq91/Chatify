
import { useContext, useEffect, useState } from 'react';
import { chatContext } from "@/context/ChatContext";


import { UserContext } from "@/context/userContext";
import { useNavigate } from "react-router-dom";

import Sidebar from "./layouts/Sidebar";
import RightSide from './layouts/RightSide';


const ChatPage = () => {
  const navigate = useNavigate();


  const { selectedChat, setSelectedChat }: any = useContext(chatContext);
  const { user, loading }: any = useContext(UserContext);

  if(loading) return <h1>Loading...</h1>

  if(!user) return navigate("/")


  return (
    <div className="flex ">
      {/*  Left side */}
    <Sidebar selectedChat={selectedChat}/>
      {/* Right Side */}
    <RightSide selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>
    </div>
  );
}

export default ChatPage;
