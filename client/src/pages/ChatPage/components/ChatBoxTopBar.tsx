import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SlOptionsVertical } from 'react-icons/sl';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import UpdateGroupModal from './updateGroupModal'; // Import UpdateGroupModal component

interface Props {
  avatar: string;
  isGroupChat: boolean;
  username: string;
  onlineStatus: boolean;
  setSelectedChat: (chat: any) => void;
  members: any;
}

const ChatBoxTopBar = ({
  avatar,
  username,
  onlineStatus,
  isGroupChat,
  setSelectedChat,
  members
}: Props) => {
  // Define state for managing the alert dialog and update group modal
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isUpdateGroupModalOpen, setIsUpdateGroupModalOpen] = useState(false);

  const handleDeleteChat = () => {
    // Implement deletion logic here
    setIsAlertDialogOpen(false);
  };

  return (
    <div className="w-full flex justify-between py-2 pr-10 items-center bg-[#17191C] ">
      <div className="flex items-center h-auto">
        <div
          onClick={() => {
            setSelectedChat(null);
          }}
          className="mt-2 cursor-pointer p-2"
        >
          <div className="flex items-center gap-1 ">
            <IoArrowBack size={20} />
          </div>
        </div>
        <img className="h-10 w-10" src={avatar} alt="" />
        <div className="flex flex-col -gap-2 ml-2 justify-center">
          <h2 className="font-bold text-md">{username}</h2>
          <p className="block text-xs text-[#747881]">
            {isGroupChat
              ? ` You and ${members.length - 1} others`
              : onlineStatus
              ? 'Online'
              : 'Offline'}
          </p>
        </div>
      </div>

      <div>
        {isGroupChat && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              {' '}
              <SlOptionsVertical />{' '}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsUpdateGroupModalOpen(true)} // Open the update group modal when this item is clicked
              >
                Update Group
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsAlertDialogOpen(true)} // Open the alert dialog when this item is clicked
              >
                Delete Group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Confirmation dialog */}
        <AlertDialog open={isAlertDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Group Chat and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction className='bg-red-800 hover:bg-red-700' onClick={handleDeleteChat}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Render UpdateGroupModal component */}
        {isUpdateGroupModalOpen && <UpdateGroupModal open={() => setIsUpdateGroupModalOpen(true)} close={() => setIsUpdateGroupModalOpen(false)} />}
      </div>
    </div>
  );
};

export default ChatBoxTopBar;
