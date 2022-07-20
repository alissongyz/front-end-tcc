import React from "react";
import Navbar from "../../components/sidebar/sidebar";
import ModalCreateMedicine from "../../components/medicine/modal-create-medicine";
import TableMedicine from "../../components/medicine/table-medicine";

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
