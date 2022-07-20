import React from "react";
import Navbar from "../../components/sidebar/sidebar";
import ModalCreateMaterial from '../../components/material/modal-create-material'
import TableMaterial from "../../components/material/table-material";

function Material() {
  return (
    <>
      <Navbar />
      <ModalCreateMaterial />
      <TableMaterial />
    </>
  );
}

export default Material;
