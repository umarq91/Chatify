import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { EventHandler, useEffect, useState } from "react"

export function AuthPage() {
const [showPassword,setShowPassword] = useState(false)


const [password,setPassword] = useState('')
const [confirmPassword,setConfirmPassword] = useState('')
const [isPasswordSame,setIsPasswordSame] = useState(false)

useEffect(() => {
  if (password && confirmPassword) {
    setIsPasswordSame(password === confirmPassword);
  }
}, [password, confirmPassword]);


const handleConfirmChange=(e:React.ChangeEvent<HTMLInputElement>)=>{

setConfirmPassword(e.target.value)




}

console.log(isPasswordSame);

  return (
    <div className="h-[80vh] w-full flex justify-center items-center">
      <Tabs defaultValue="sign-in" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign in</TabsTrigger>
          <TabsTrigger value="sign-up">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <Card>
            <CardHeader>
              <CardTitle>Login </CardTitle>
              <CardDescription>
                Enter your crendentials to Login
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Johndoe@gmail.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <div className="flex space-x-2 ml-1 justify-start  w-full">
                <Checkbox
                  onClick={() => setShowPassword((prev) => !prev)}
                  id="terms"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show password
                </label>
              </div>
              <Button className="w-full space-y-4">Login</Button>
              <Button  className="w-full bg-red-900 hover:bg-red-800 space-y-4">Login with Google</Button>

            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tab 2 */}
        <TabsContent value="sign-up">
          <Card>
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Enter details to create your account!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="border p-4 border-2"
                id="password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">Confim Password</Label>
                <Input 
                value={confirmPassword}
                onChange={handleConfirmChange}
                className={`border p-4 border-2`}
                id="confirm" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
              className="w-full space-y-4"
              >Sign Up</Button>
              
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
