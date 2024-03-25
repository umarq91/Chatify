import { CiSearch } from "react-icons/ci";
import { Chats } from './layouts/Chats';
import { useContext, useEffect, useState } from 'react';
import { chatContext } from "@/context/ChatContext";
import { GroupModal } from "./components/GroupModal";
import { CiChat1 } from "react-icons/ci";
import { SearchModal } from "./components/SearchModal";
import { UserContext } from "@/context/userContext";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
const data= [
  { profile:"https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
  name:"Anshal Khan",
  lastMessage:"Hello world how are you what have you been ",
  time:"9:40PM",
  active:true},
  { profile:"https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
  name:"Ali Abdul",
  lastMessage:"Hello world how are you what have you been ",
  time:"9:40PM",
  active:true},
  { profile:"https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
  name:"Umar Qureshi",
  lastMessage:"Hello world how are you what have you been ",
  time:"9:40PM",
  active:true},
  
  { profile:"https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
  name:"Umar Qureshi",
  lastMessage:"Hello world how are you what have you been ",
  time:"9:40PM",
  active:true},

  { profile:"https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
  name:"hayat",
  lastMessage:"Hello world how are you what have you been ",
  time:"9:40PM",
  active:true},

  { profile:"https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
  name:"Usman hayat",
  lastMessage:"Hello world how are you what have you been ",
  time:"9:40PM",
  active:true},
  { profile:"https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
  name:" ali hayat",
  lastMessage:"Hello world how are you what have you been ",
  time:"9:40PM",
  active:true},
  { profile:"https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
  name:"Anshal Khan",
  lastMessage:"Hello world how are you what have you been ",
  time:"9:40PM",
  active:true},
  { profile:"https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
  name:"Ali Abdul",
  lastMessage:"Hello world how are you what have you been ",
  time:"9:40PM",
  active:true},
  { profile:"https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp",
  name:"Umar Qureshi",
  lastMessage:"Hello world how are you what have you been ",
  time:"9:40PM",
  active:true},
  // Add more data as needed
];

const ChatPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('');
  const [chatResults, setChatResults] = useState(data);
  const { selectedChat ,setSelectChat}: any = useContext(chatContext);
const {user,loading}:any = useContext(UserContext)

if(loading){
  return <div>Loading...</div>
}

if (!user) {
  navigate('/')
  return null; // Add this return statement
}

  // Function to handle search
  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    if (searchTerm.trim() === '') {
      setChatResults(data); // Reset to original data when search term is empty
    } else {
      // Filter chat results based on search term
      const filteredResults = data.filter(chat => chat.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setChatResults(filteredResults);
    }
  };

  return (
    <div className="flex ">
 
      {/*  Left side */}
                <div className={` md:w-[40%] lg:w-[30%] xl:w-[23%] w-full bg-[#17191C] h-screen text-white md:block ${selectedChat ? "hidden" : 'block'}`}>
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
                  <GroupModal />



                  {/* side chat */}
                  <div className="mt-3 h-screen">
                    <Chats data={chatResults} loading={loading} />
                  </div>
                </div>


      {/* Right Side */}
            <div className={`flex-1 md:block bg-[#1C1E22] h-screen text-white ${selectedChat ? "block" : 'hidden'}`}>
              {selectedChat   ? 
              <div 
              onClick={()=>{setSelectChat(null)}}
              className="mt-2  bg-slate-500 cursor-pointer p-2" >
                    <div className="flex items-center gap-1">
                <IoArrowBack/>
                Back

                    </div>
              </div>
              : (
                <div className="flex flex-col justify-center items-center h-screen opacity-60 ">
                  <CiChat1 className=" text-[4rem]"/>
                  <h1 className="text-lg"> Chat not selected</h1>
                </div>
              )}
            </div>
          </div>
        );
      }

export default ChatPage;
