

interface SearchedUsersProps {
    profile: string,
    name: string,
    email:string
}
export const SearchedUsers = ({profile,name,email}:SearchedUsersProps) => {
  return (
    <div 
    className="h-16  w-full  hover:bg-[#272A30] cursor-pointer bg-[#17191C] text-white rounded-3xl transition-all">
      <div className="flex   justify-between items-center h-full px-4">
        <div className="flex w-full items-center gap-3">
          <img
            src={profile}
            className="w-12 h-12 object-cover rounded-full"
            />
            <div className="flex w-full flex-col">
            <h2 className="text-lg"> {name}</h2>
            <p className={`text-xs w-[80%] tracking-wide truncate line-clamp-1 '}`}>{email}</p>
            </div>
            </div>
            </div>
    </div>
  )
}
