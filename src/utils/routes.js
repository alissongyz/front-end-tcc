import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import Material from "../pages/Materials/Materials";
import User from "../pages/User/Users";
import Login from "../pages/Login/Login";
import Medicine from "../pages/Medicines/Medicines";
import Orders from "../pages/Orders/Orders";
import PrivateRoute from "../components/Routes/PrivateRoute";

function PathRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/material" element={<Material />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/users" element={<User />} />
          <Route path="/consult-order" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default PathRoutes;
