import { GroupModal } from './GroupModal'
import SearchUserModal from './SearchUserModal'
import { CiLogout } from "react-icons/ci";
import axios from 'axios';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

interface Props {
  hanldeAddChat: (data: any) => void
}

const TopBar = ({ hanldeAddChat }: Props) => {


    async function handleLogout(){
        try {
          
          const res = await axios.get("/api/auth/logout")
            window.location.reload()
          if(res.status==200){
            window.location.href="/"
          }
          
        } catch (error) {
          console.log(error);
          
        }
        }


  return (
    <div className="w-full flex justify-between items-center">
      {" "}
      {/* Use justify-between for even distribution */}
      {/* Left Icon */}
      <div className="flex-shrink-0">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <button className="border-2 flex justify-center items-center gap-2 opacity-60 hover:opacity-100 transition-all border-[#272A30] my-1 py-2 self-center  rounded-3xl bg-opacity-0  w-[50px]">
                    <CiLogout />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Logout </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            </div>

          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm logout?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>


      {/* Right Icons */}
      <div className="flex flex-shrink-0 gap-1">
        <GroupModal /> {/* Set modal width */}
        <SearchUserModal fetch={hanldeAddChat} /> {/* Set modal width */}
      </div>
    </div>
  );
}

export default TopBar