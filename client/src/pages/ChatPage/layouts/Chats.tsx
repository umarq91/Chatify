import { useContext, useState } from "react";
import SideSingleChat from "../components/SingleSideChat";
import { SkeletonDemo } from "../components/Skeleton";
import { chatContext } from "@/context/ChatContext";
import { CiChat1 } from "react-icons/ci";
import "./Chat.css"
interface ChatProps {
  data: any[];
  loading: boolean;
}

export const Chats = ({ data, loading }: ChatProps) => {
  const [chatSelect, setchatSelect] = useState(null);


  const customScrollbarStyle = {
    "::-webkit-scrollbar": {
      width: "0.5rem",
      backgroundColor: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "#ccc",
      borderRadius: "0.5rem",
    },
  };
  return (
    <div  className="scrollbar-thin overflow-y-auto h-[80%] " >
      {data.length == 0 && (
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
        data.map((chat, index) => (
          <SideSingleChat
            key={index}
            profile={chat.profile}
            lastMessage={chat.lastMessage}
            active={chat.active}
            name={chat.name}
            time={chat.time}
          />
        ))
      )}
    </div>
  );
};