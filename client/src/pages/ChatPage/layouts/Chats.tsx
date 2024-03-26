import SideSingleChat from "../components/SingleSideChat";
import { SkeletonDemo } from "../components/Skeleton";
import { CiChat1 } from "react-icons/ci";
import "./Chat.css" 
interface ChatProps {
  data: any[];
  loading: boolean;
}

export const Chats = ({ data,loading }: ChatProps) => {

  return (
    <div  className="scrollbar-thin overflow-y-auto h-[80%] " >
      {data.length == 0 && !loading && (
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
            chat={chat}
          />
     
        ))
      )}
    </div>
  );
};