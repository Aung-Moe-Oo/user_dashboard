import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <BrowserRouter className="App">
      <Navbar user={currentUser} />
      <Routes>
        <Route path="/" element={currentUser ? <Home /> : <Login />} />
        <Route
          path="/profile/:id"
          element={currentUser ? <Profile /> : <Login />}
        />
        <Route path="/edit/:id" element={currentUser ? <Edit /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
