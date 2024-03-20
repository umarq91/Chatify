import  {  useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate= useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const {data} = await axios.post("/api/register", {
        username,
        email,
        password,
      });

      if(data.success==="true"){
          localStorage.setItem('user', JSON.stringify(data.user))
        
          toast.success("Account has been created successfully!");
          navigate('/chat')
      }
  
  }

  return (
    <Card>
    
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Enter details to create your account!</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">

      
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 border-2"
              id="password"
              type="password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={` p-4 border-2`}
              id="confirm"
              type="password"
            />
          </div>


      </CardContent>

      <CardFooter>
        <Button 
        onClick={handleSubmit}
        className="w-full space-y-4" type='submit'>Sign Up</Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
