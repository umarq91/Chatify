import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError] = useState('')
  const handleSubmit = async () => {
 
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });

      
      if(data.success === true){
      
        toast.success(`Welcome back ${data.user.username}`);
         window.location.href="/"
      }
    } catch (error:any) {
      setError(error.response?.data?.message || 'Login Failed')

    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login your account </CardTitle>
          <CardDescription>Enter your crendentials to Login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
            />
          </div>
 {error && <div className="text-red-500 font-bold">{error}</div>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex space-x-2 ml-1 justify-start  w-full">
            <Checkbox
              onClick={() => setShowPassword((prev) => !prev)}
              id="terms"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Show password
            </label>
          </div>
          <Button onClick={handleSubmit} className="w-full space-y-4">
            Login
          </Button>
          <Button className="w-full bg-red-900 hover:bg-red-800 space-y-4 flex">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
