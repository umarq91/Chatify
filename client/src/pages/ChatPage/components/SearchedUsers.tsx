

interface SearchedUsersProps {
    avatar: string,
    username: string,
    email:string,
    handleAddUser:any
}
export const SearchedUsers = ({avatar,username,email,handleAddUser}:SearchedUsersProps) => {
  return (
    <div 
    onClick={handleAddUser}
    className="h-16 -mt-3  w-full  hover:bg-[#272A30] cursor-pointer bg-[#17191C] text-white rounded-2xl transition-all">
      <div className="flex   justify-between items-center h-full px-4">
        <div className="flex w-full items-center gap-3">
          <img
            src={avatar}
            className="w-12 h-12 object-cover rounded-full"
            />
            <div className="flex w-full flex-col">
            <h2 className="text-lg"> {username}</h2>
            <p className={`text-xs w-[80%] tracking-wide truncate line-clamp-1 '}`}>{email}</p>
            </div>
            </div>
            </div>
    </div>
  )
}
