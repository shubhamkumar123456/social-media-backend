import Home from "../src/pages/home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
// import { redirect } from "react-router-dom";




function App() {

  const {user}=useContext(AuthContext)
  return (
  
    <BrowserRouter>

      <Routes>
     
        <Route path="/" element={user?<Home />:<Register/>} />
        <Route path="/login" element={user? <Navigate to="/"/>:<Login />} />
        <Route path="/signup" element={user?<Navigate to="/"/>:<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>

    </BrowserRouter>


  );
}

export default App;
