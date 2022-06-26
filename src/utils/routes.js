import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import Navbar from "../components/NavBar/navbar";
import Material from "../pages/Materials/Materials";
import User from "../pages/User/Users";
import Login from "../pages/Login/Login";

function PathRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/material" element={<Material />} />
        <Route path="/users" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PathRoutes;
