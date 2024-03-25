import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthPage } from "./pages/auth/AuthPage.tsx";
import Navbar from "./components/layout/Navbar.tsx";
import ChatPage from "./pages/ChatPage/ChatPage.tsx";
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import { ChatProvider } from "./context/ChatContext.tsx";
import  UserProvider  from "./context/userContext.tsx";

function App() {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
  axios.defaults.withCredentials=true

  
  return (
    <>
      <div className="h-screen overflow-hidden">
        <Toaster />
        <BrowserRouter>
        <UserProvider>

          <ChatProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<AuthPage />} />
       
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </ChatProvider>
        </UserProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
