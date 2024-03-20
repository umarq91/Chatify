interface SideChatProps{
    profile:string,
    name:string,
    lastMessage:string,
    time:Date
}

const SideChat = ({profile,name,lastMessage,time}:SideChatProps) => {
  return (
    <div className="h-16  w-full hover:bg-opacity-80 cursor-pointer">
      <div className="flex justify-between items-center h-full px-4">
        <div className="flex items-center gap-2">
          <img
            src={profile}
            className="w-12 h-12 object-cover rounded-full"
            />
            <div className="flex flex-col">
            <h2 className="text-xl"> {name}</h2>
            <p className="text-xs font-light tracking-wide">{lastMessage}</p>
            </div>
            </div>
            </div>
    </div>
  )
}

export default SideChat