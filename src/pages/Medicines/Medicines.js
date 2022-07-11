import React from "react";
import Navbar from "../../components/SideBar/sidebar";
import ModalCreateMedicine from "../../components/Table-Medicine/modal-create-medicine";
import TableMedicine from "../../components/Table-Medicine/table-medicine";

function Medicine() {
  return (
    <>
      <Navbar />
      <ModalCreateMedicine />
      <TableMedicine />
    </>
  );
}

export default Medicine;
