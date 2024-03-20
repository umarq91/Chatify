import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import SignUp from "./SignUp"
import Login from "./Login"

export function AuthPage() {
 


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
