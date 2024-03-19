
import { ThemeProvider } from "./components/theme-provider.tsx"
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthPage } from './pages/Auth.tsx'
import Navbar from "./components/layout/Navbar.tsx";

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App
