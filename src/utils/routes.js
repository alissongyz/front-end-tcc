import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import Navbar from "../components/NavBar/navbar";
import Material from "../pages/Materials/Materials";

function PathRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/material" element={< Material/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default PathRoutes;
