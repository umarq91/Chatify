import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { CiChat1, CiSearch } from "react-icons/ci";
import { SkeletonDemo } from '../components/Skeleton';
import SideSingleChat from '../components/SingleSideChat';
import { chatContext, useChatContext } from '@/context/ChatContext';
import TopBar from '../components/TopBar';

interface SidebarProps {
  selectedChat: boolean;
}


interface Chat {
  users: any[];
  chatName?: string; 
}


const Sidebar: React.FC<SidebarProps> = ({ selectedChat }) => {
  const [search, setSearch] = useState(''); 
 const {chatResults,setChatResults}:any = useContext(chatContext);
  const [originalChatResults, setOriginalChatResults] = useState<Chat[]>([]); 
  const [loading, setLoading] = useState(false); 


  const fetchChats = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<Chat[]>("/api/chat"); // Specify expected data type (array of Chat)
      setChatResults(data);
      setOriginalChatResults(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };


  useEffect(() => {
    fetchChats();
  }, []);



  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    if (searchTerm.trim() === '' || searchTerm.length < 2) {
      setChatResults(originalChatResults);
    } else {
      const filteredResults = originalChatResults.filter((chat: Chat) =>
        chat.users.some((user: any) => user.username.toLowerCase().includes(searchTerm)) ||
        chat.chatName?.toLowerCase().includes(searchTerm) // Optional check for group chat name
      );
      setLoading(true);
      setTimeout(() => {
        setChatResults(filteredResults);
        setLoading(false);
      }, 500);
    }
  };


  const handleAddChat = (data: any) => {
    // Check if the chat already exists in chatResults
    const chatExists = chatResults.some((chat:any) => chat._id === data.id);
  
    // If the chat doesn't already exist, add it to chatResults
    if (!chatExists) {
      setChatResults([...chatResults, data]);
    }
  };


  return (
    <div
    className={` md:w-[40%] lg:w-[30%] xl:w-[25%] w-full bg-[#17191C] h-screen text-white md:block px-2 ${
      selectedChat ? "hidden" : "block"}`}>

<TopBar hanldeAddChat={handleAddChat}/>
                   {/* Search */}
    <div className="relative mt-2">
      <input
        value={search}
        onChange={handleSearch}
        className="w-full bg-transparent border-2 border-[#272A30] self-center  h-12  rounded-3xl bg-opacity-0 pl-12"
        placeholder="Search chats"
      />
      <div className="absolute inset-y-0 left-2 pl-3 flex items-center pointer-events-none">
        <CiSearch className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  


    {/* Chats */}
    <div className="mt-3 h-screen">
    <div  className="scrollbar-thin overflow-y-auto h-[80%] " >
      {chatResults.length == 0 && !loading && (
        <div className="flex flex-col mt-40 justify-center items-center opacity-60">
          <CiChat1 className="text-[4rem]" />
          <h1 className="text-lg">No chats</h1>
        </div>
      )}
      {loading ? (
        <>
          <SkeletonDemo />
          <SkeletonDemo />
          <SkeletonDemo />
          <SkeletonDemo />
          <SkeletonDemo />
          <SkeletonDemo />
          <SkeletonDemo />
          <SkeletonDemo />
          <SkeletonDemo />
        </>
      ) : (
        chatResults.map((chat:any, index:number) => (
          <SideSingleChat
            key={index}
            chat={chat}
          />
     
        ))
      )}
    </div>
    </div>
  </div>

  )
}

export default Sidebar
