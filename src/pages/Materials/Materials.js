import React from "react";
import Navbar from "../../components/SideBar/sidebar";
import ModalCreateMaterial from '../../components/Table-Material/modal-create-material'
import TableMaterial from "../../components/Table-Material/table-material";

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
