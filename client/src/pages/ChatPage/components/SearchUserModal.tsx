import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input";
import { chatContext } from "@/context/ChatContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LuMessageSquarePlus } from "react-icons/lu";

interface Props {
  fetch: (data: any) => void
}

const SearchUserModal = ({ fetch }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [searchedUsers, setSearchedUsers]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // State for controlling modal visibility
  const { setSelectedChat }: any = useContext(chatContext);

  const handleSearch = () => {
    setLoading(true);
    try {
      axios
        .get("/api/user?search=" + inputValue)
        .then((res) => {
          setLoading(false);
          if (res.data.message) {
            setErrorMessage("No users Found");
          } else {
            setSearchedUsers(res.data);
            setErrorMessage('');
          }
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSelectUsers = async () => {
    if (!searchedUsers) {
      console.log("No users found");
      return;
    }

    try {
      const { data } = await axios.post('/api/chat', { userId: searchedUsers._id });
      setSelectedChat(data);
      fetch(data);
      setModalOpen(false); // Close the modal when user is selected
      setInputValue('')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSearchedUsers(null);
    setErrorMessage("");
  }, [inputValue,modalOpen]);


  const handleClose=()=>{
    setModalOpen(false);
    setInputValue('');
    setSearchedUsers(null);
  }

  
  return (
    <>
      <Dialog  open={modalOpen}>

        <DialogTrigger asChild>
          <div>
            {/*  TRIGGER  */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild onClick={()=>setModalOpen(true)
}>
                  <button className="border-2 flex justify-center items-center gap-2 opacity-60 hover:opacity-100 transition-all border-[#272A30] my-1 py-2 self-center  rounded-3xl bg-opacity-0  w-[55px]">
                    <LuMessageSquarePlus />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Direct Message </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </DialogTrigger>
        <DialogContent className=" sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>Search User</DialogTitle>
            <DialogDescription>Add users by email to chat with</DialogDescription>
          </DialogHeader>
          <div className="mb-1 grid gap-4">
            <div className=" items-center gap-4 flex">
              <Input
                id="name"
                placeholder="Search user here..."
                className="w-full "
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
  
            </div>
          </div>
          {/* Selected Users */}
          {searchedUsers && (
            <div className="flex flex-wrap gap-2 overflow-x-auto">
              <div
                onClick={handleSelectUsers}
                className="h-16  w-full  hover:bg-[#272A30] cursor-pointer bg-[#17191C] text-white rounded-2xl transition-all">
                <div className="flex   justify-between items-center h-full px-4">
                  <div className="flex w-full items-center gap-3">
                    <img
                      src={searchedUsers.avatar}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div className="flex w-full flex-col">
                      <h2 className="text-lg"> {searchedUsers.username}</h2>
                      <p className={`text-xs w-[80%] tracking-wide truncate line-clamp-1 '}`}>{searchedUsers.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {loading && <div className="text-center">Searching...</div>}
          {errorMessage && <h1 className="text-red-800 font-bold"> No users found , try again</h1>}

          <DialogFooter>
            <div className="flex flex-col gap-2 w-full">

            <Button
            className="w-full"
            onClick={handleSearch} type="submit">Search</Button>
               <Button
            className="w-full"
            variant={"ghost"}
            onClick={handleClose} type="submit">Cancel</Button>
            </div>
          
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SearchUserModal;
