import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import SignUp from "./SignUp"
import Login from "./Login"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
 const navigate = useNavigate()
  const {user}:any =  useContext(UserContext)


  if(user){
   return navigate('/chat')
  }
  
  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <Tabs defaultValue="sign-in" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign in</TabsTrigger>
          <TabsTrigger value="sign-up">Sign up</TabsTrigger>
        </TabsList>

        <TabsContent value="sign-in">
       <Login/>
        </TabsContent>


        <TabsContent value="sign-up">
        <SignUp/>
        </TabsContent>
      </Tabs>
    </div>

  );
}
