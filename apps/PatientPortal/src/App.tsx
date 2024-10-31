// import { SideSection } from "./components/LeftSection";
// import Dashboard from "./pages/dashboard";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
export default function App() {
  return (
    // 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />}>
        {/* <Route index element={<Dashboard />} /> */}
        
      </Route>
      <Route path="login" element={<Login/>}/>
    </Routes>
  </BrowserRouter>
  )
}