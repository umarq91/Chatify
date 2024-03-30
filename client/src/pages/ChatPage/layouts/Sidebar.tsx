import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { GroupModal } from "@/pages/ChatPage/components/GroupModal";
import { Chats } from '../layouts/Chats';
import SearchUserModa from '../components/SearchUserModa';

// Interface for Chat data
interface Chat {
  users: any[];
  chatName?: string; 
}

interface SidebarProps {
  selectedChat: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedChat }) => {
  const [search, setSearch] = useState(''); // String for search term
  const [chatResults, setChatResults] = useState<Chat[]>([]); // Array of Chat objects
  const [originalChatResults, setOriginalChatResults] = useState<Chat[]>([]); // Original chat data copy
  const [loading, setLoading] = useState(false); // Boolean for loading state

  const fetchData = async () => {
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
    fetchData();
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
      selectedChat ? "hidden" : "block"
    }`}
  >
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
    <SearchUserModa fetch={handleAddChat}/>
    <GroupModal />

    {/* Chats */}
    <div className="mt-3 h-screen">
      <Chats data={chatResults} loading={loading} />
    </div>
  </div>

  )
}

export default Sidebar
