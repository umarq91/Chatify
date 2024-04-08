import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { chatContext } from "@/context/ChatContext";
import { useContext, useEffect, useState } from "react";
import UserBadge from "./UserBadge"
import { useUser } from "@/context/userContext";
import { toast } from "sonner";
import axios from "axios";
import { SearchedUsers } from "./SearchedUsers";



interface UpdateGroupModalProps {
  close: () => void;
  open:boolean;
}
const updateGroupModal = ({close,open}:UpdateGroupModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const {selectedChat, setSelectedChat}:any = useContext(chatContext)
  const [selectedUsers,setSelectedUsers] = useState(selectedChat?.users)
  const {user}:any = useUser()
  const [loading,setLoading] = useState(false)
  const [noFoundMessage,setNoFoundMessage] = useState('') 


useEffect(() => {
  const fetchData = async () => {
    if (searchQuery.length > 1) {
      try {
        setLoading(true)
          const { data } = await axios.get(`api/user?search=${searchQuery}`);
          setLoading(false)
          if (data.message) {
            setNoFoundMessage("No users Found");
          }else{ 
            setSearchResults((prevResults:any) => [...prevResults, data]);
          }
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

console.log(selectedUsers);

const handleSelectUser =async (user:any) => {
  const isUserSelected = selectedUsers.some(u => u._id === user._id);



  if (isUserSelected) {
    toast.error("User already selected");
    setSearchQuery('')
    return;
  }
try {
let res = await axios.post('/api/chat/addingroup', {
    chatId: selectedChat?._id,
    userId:user?._id
  })
;
  toast.success("User added successfully")
  setSelectedChat(res.data)
  setSelectedUsers([...selectedUsers,user])
  setSearchQuery('')
  setSearchResults([])
} catch (error:any) {
  toast.error(error?.response.data.message || "Something went wrong")
  
}


}

const handleRemoveUser = async(user:any) => {

  if(selectedUsers.length === 2 ) {
    toast.error("Group Must have at least 2 members")
    return
  }

  try {
    const res =  await axios.put('/api/chat/removefromgroup', {
        chatId: selectedChat?._id,
        userId:user?._id
    })
    
    setSelectedUsers((prevUsers:any) =>
      prevUsers.filter((u:any) => u._id !== user._id)
    );
    
    setSelectedChat(res.data)
  } catch (error) {
    console.log(error);
    
  }
}

const updateGroupName =async () => {
  if(user._id === selectedChat?.groupAdmin._id) {
   return toast.error("Only admins can update group name")
  }
  if(newName === selectedChat?.chatName) {
  toast.error("Group name is already set to "+newName)
  }
  if(newName.length == 0 || newName.length < 3) {
  toast.error("Group name must be at least 3 characters long")
  }
  try {
  const res=  await axios.put('/api/chat/rename', {
      chatId: selectedChat?._id,
      chatName: newName
    })
   toast.success("Group name updated successfully")
    setSelectedChat(res.data)
   console.log(res.data);
   
    
  }catch (error) {
    toast.error("Something went wrong")
  }
}

  return (
    <Dialog  open={open} onOpenChange={close}>

    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">

        <div className="grid grid-cols-4 items-center gap-4">
         
          <Input id="name" 

          onChange={(e) => setNewName(e.target.value)}
          defaultValue={selectedChat?.chatName} className="col-span-3"/>
          <Button variant="default" onClick={updateGroupName}>Rename</Button>
        </div>

        <div className=" items-center gap-4">
            <Input
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Add users by email..."
            />
          </div>

      </div>
      
      <div className="flex flex-wrap gap-2 overflow-x-auto">
          {selectedUsers.map((user:any, index:number) => (
            <UserBadge
              key={index}
               handleDelete={() => handleRemoveUser(user)}
              user={user}
            />
          ))}
        </div>

        {loading && <p className="text-center">Seaching...</p>}
        {noFoundMessage && <p className="text-center">{noFoundMessage}</p>}

        {searchResults.slice(0, 1).map((user: any) => (
          <SearchedUsers
            key={user._id}
            handleAddUser={() => handleSelectUser(user)}
            avatar={user.avatar}
            username={user.username}
            email={user.email}
          />
        ))}
      <DialogFooter>
        <Button onClick={close} >Done</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  );
};

export default updateGroupModal;
