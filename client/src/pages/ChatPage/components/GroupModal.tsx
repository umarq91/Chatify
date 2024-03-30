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
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { SearchedUsers } from "./SearchedUsers"
import { toast } from "sonner"
import UserBadge from "./UserBadge"
import axios from "axios"


export function GroupModal() {

  const [groupChatName,setGroupChatName] = useState('')
  const [searchResults,setSearchResults] = useState([])
  const [selectedUsers,setSelectedUsers] = useState<any[]>([])
  const [searchQuery,setSearchQuery] = useState('')

  // append with the chats ( Side bar chats )

 useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.length > 1) {
        try {
          const { data } = await axios.get(`api/user?search=${searchQuery}`);
          setSearchResults(data);
        } catch (error) {
          console.error("Error fetching users:", error);
          // Handle errors gracefully, e.g., display an error message
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchData();

    return () => {
      // Cleanup function to cancel any pending requests on unmount
     axios.Cancel
    }; // Add a dependency array to avoid infinite loops:
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
    setSelectedUsers([...selectedUsers,user])
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="border-2 flex justify-center items-center gap-2 opacity-60 hover:opacity-100 transition-all border-[#272A30] my-1 py-2 self-center  rounded-3xl bg-opacity-0 w-full">
          <FaPlus />
          New group chat
        </button>
      </DialogTrigger>
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
            />
          </div>

          <div className=" items-center gap-4">
            <Input
              id="search"
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
              placeholder="Add Users email eg abc@gmail.com"
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
        {searchResults.slice(0, 3).map((user:any) => (
          <SearchedUsers
            handleAddUser={() => handleSelectUser(user)}
            avatar={user.avatar}
            username={user.username}
            email={user.email}
          />
        ))}

        <DialogFooter>
          <Button type="submit">Create group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
