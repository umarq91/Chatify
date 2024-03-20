
import { ThemeProvider } from "./components/theme-provider.tsx"
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthPage } from './pages/auth/AuthPage.tsx'
import Navbar from "./components/layout/Navbar.tsx";
import ChatPage from "./pages/ChatPage/ChatPage.tsx"
import axios from "axios";
import { Toaster } from "@/components/ui/sonner"
 
function App() {
  axios.defaults.baseURL = 'http://127.0.0.1:5000';

  return (
    <>
      <Toaster />
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </BrowserRouter>
   
    </>
  );
}

export default App
