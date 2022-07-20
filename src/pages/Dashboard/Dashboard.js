import React from "react";
import Card from "../../components/dashboard/card";
import TableDash from "../../components/dashboard/table";
import Navbar from "../../components/sidebar/sidebar";

const Dash = () => {
  return (
    <>
      <Navbar />
      <Card />
      <TableDash />
    </>
  );
};

export default Dash;
