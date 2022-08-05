import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import Material from "../pages/Materials/Materials";
import User from "../pages/User/Users";
import Login from "../pages/Login/Login";
import Medicine from "../pages/Medicines/Medicines";
import Orders from "../pages/Orders/Orders";
import Page404 from "../pages/404/Page-404";
import Dash from "../pages/Dashboard/Dashboard";
import Correios from "../pages/Correios/Correios";
import SettingsPage from "../pages/Settings/Settings";
import PrivateRoute from "../components/Routes/PrivateRoute"

function PathRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Page404 />}/>
        
        {/* PRIVATE ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<Dash />} />
          <Route path="/material" element={<Material />} />
          <Route path="/medicine" element={<Medicine />} />
          <Route path="/users" element={<User />} />
          <Route path="/consult-order" element={<Orders />} />
          <Route path="/correios" element={<Correios />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default PathRoutes;
