import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./styles";

const HomePage = () => {
  return (
    <Container>
      <p className="text-5xl font-bold mb-4 text-red-400">Home</p>
      <p className="text-2xl mb-2 text-amber-300">Routes</p>
      <Link className="text-amber-400" to="dashboard">Dashboard</Link>
      <Link className="text-amber-400" to="listos">Materiais</Link>
      <Link className="text-amber-400" to="aboutus">Medicamentos</Link>
      <Link className="text-amber-400" to="contact">Painel Aprovação de saída</Link>
      <Link className="text-amber-400" to="contact">Registro de Saídas</Link>
    </Container>
  );
}

export default HomePage;
