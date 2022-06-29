import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import Navbar from "../components/SideBar/sidebar";
import Material from "../pages/Materials/Materials";
import User from "../pages/User/Users";
import Login from "../pages/Login/Login";
import Medicine from "../pages/Medicines/Medicines";
import Orders from "../pages/Orders/Orders";

function PathRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/material" element={<Material />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/users" element={<User />} />
        <Route path="/consult-order" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PathRoutes;
