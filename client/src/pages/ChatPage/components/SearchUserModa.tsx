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
import { Input } from "@/components/ui/input";
import { chatContext } from "@/context/ChatContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const SearchUserModal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [searchedUsers, setSearchedUsers]: any = useState(null);
  const { setSelectedChat }: any = useContext(chatContext);
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  const handleSearch = () => {
    try {
      axios
        .get("/api/user?search=" + searchQuery)
        .then((res) => setSearchedUsers(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    const { data } = await axios.post('/api/chat', { userId: searchedUsers._id });
    setSelectedChat(data);
    setModalOpen(false); // Close the modal after selecting chat
  };

  useEffect(() => {
    setSearchedUsers(null); // Reset searchedUsers when inputValue changes
  }, [inputValue]);


  return (
    <>
      <Dialog open={modalOpen} onDismiss={() => setModalOpen(false)}>
        <DialogTrigger asChild onClick={() => setModalOpen(true)}>
          <button className="border-2 flex justify-center items-center gap-2 opacity-60 hover:opacity-100 transition-all border-[#272A30] my-1 py-2 self-center  rounded-3xl bg-opacity-0 w-full">
            <FaPlus />
            Search User
          </button>
        </DialogTrigger>
        <DialogContent className=" sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>Create a group</DialogTitle>
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
              <Button
                onClick={handleSearch}
                className=""
                type="submit">Search</Button>
            </div>
          </div>
          {/* Selected Users */}
          {searchedUsers && (
            <div className="flex flex-wrap gap-2 overflow-x-auto">
              <div
                onClick={handleClick}
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

          {/* Rendering Searched Users */}

          <DialogFooter>
            <Button type="submit">Create group</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SearchUserModal;
