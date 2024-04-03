import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { SearchedUsers } from "./SearchedUsers"
import { toast } from "sonner"
import UserBadge from "./UserBadge"
import axios from "axios"
import { MdGroupAdd } from "react-icons/md";

export function GroupModal() {

  const [groupChatName,setGroupChatName] = useState('')
  const [searchResults,setSearchResults] = useState([])
  const [selectedUsers,setSelectedUsers] = useState([])
  const [searchQuery,setSearchQuery] = useState('')

  // append with the chats ( Side bar chats )

 useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.length > 1) {
        try {
       
            const { data } = await axios.get(`api/user?search=${searchQuery}`);
            console.log(data);
              
             setSearchResults((prevResults) => [...prevResults, data]);
      
     
        } catch (error) {
          console.error("Error fetching users:", error);
          // Handle errors gracefully, e.g., display an error message
        }
      } else {
        setSearchResults([]);
      }
    };

  const time =   setTimeout(()=>{
      fetchData();
    },1500)

    return () => {
      clearTimeout(time)

    }; 
  }, [searchQuery]);



  const handleSubmit = () => {
    if(!groupChatName || !selectedUsers) {
      toast.error("Please fill all fields")
      return
    }
   
    try {
      // Todo : API CALL for creating a group chat
    } catch (error) {
      
    }
  }

  const handleSelectUser = (user:any) => {
    if(selectedUsers.includes(user)) {
      toast.error("User already selected")
      return
    }
    console.log(user);
    
    setSelectedUsers([...selectedUsers,user])
    setSearchQuery('')
    setSearchResults([])
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>

            {/*  TRIGGER  */}
            <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <button className="border-2 flex justify-center items-center gap-2 opacity-60 hover:opacity-100 transition-all border-[#272A30] my-1 py-2 self-center  rounded-3xl bg-opacity-0 w-[55px]">
          <MdGroupAdd />
        </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create group</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

        </div>
      </DialogTrigger>


                   {/* Content  */}
      <DialogContent className=" sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Create a group</DialogTitle>
          <DialogDescription>Add users by email to chat with</DialogDescription>
        </DialogHeader>
        <div className="mb-1 grid gap-4">
          <div className=" items-center gap-4">
            <Input
              id="name"
              placeholder="Group Chat Name"
              className="w-full "
              value={groupChatName}
              onChange={(e)=>setGroupChatName(e.target.value)}
            />
          </div>

          <div className=" items-center gap-4">
            <Input
              id="search"
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
              placeholder="Add users by email..."
            />
          </div>
        </div>
        {/* Selected Users */}
        <div className="flex flex-wrap gap-2 overflow-x-auto">
          {selectedUsers.map((user, index) => (
            <UserBadge
              key={index}
              handleDelete={() =>
                setSelectedUsers(selectedUsers.filter((u) => u !== user))
              }
              user={user}
            />
          ))}
        </div>

        {/* Rendering Searched Users */}
{
 searchResults.slice(0,1).map((user:any) => (
            <SearchedUsers
            key={user._id}
            handleAddUser={() => handleSelectUser(user)}
            avatar={user.avatar}
            username={user.username}
            email={user.email}
            />
            ))
          }
    

        <DialogFooter>
          <Button type="submit">Create group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
