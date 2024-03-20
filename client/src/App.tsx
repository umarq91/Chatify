import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthPage } from "./pages/auth/AuthPage.tsx";
import Navbar from "./components/layout/Navbar.tsx";
import ChatPage from "./pages/ChatPage/ChatPage.tsx";
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import { ChatProvider } from "./context/ChatContext.tsx";

function App() {
  axios.defaults.baseURL = "http://127.0.0.1:5000";

  return (
    <>
      <div className="h-screen overflow-hidden">
        <Toaster />
        <BrowserRouter>
          <ChatProvider>
            <Navbar />
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </ChatProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
