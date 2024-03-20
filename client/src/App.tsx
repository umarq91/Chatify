
import { ThemeProvider } from "./components/theme-provider.tsx"
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthPage } from './pages/AuthPage.tsx'
import Navbar from "./components/layout/Navbar.tsx";
import ChatPage from "./pages/ChatPage/ChatPage.tsx"
function App() {

  return (
    <>
     
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/Chat" element={<ChatPage />} />
          </Routes>
        </BrowserRouter>
   
    </>
  );
}

export default App
