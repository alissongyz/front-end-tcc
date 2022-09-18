import React from "react";
import Navbar from "../../components/sidebar/sidebar";
import TableOrderA from "../../components/ask-order/table-order";
import ModalCreateOrder from "../../components/ask-order/modal-create-order";

function AskOrder() {
  return (
    <>
      <Navbar />
      <ModalCreateOrder />
      <TableOrderA />
    </>
  );
}

export default AskOrder;
