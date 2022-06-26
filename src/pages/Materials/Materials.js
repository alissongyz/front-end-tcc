import React from "react";
import ModalCreateMaterial from "../../components/Modal/modal-post";
import ModalGetAndUpdateMaterial from "../../components/Table-Material/table-material";

function Material() {
  return (
    <>
      <ModalCreateMaterial />
      <ModalGetAndUpdateMaterial />
    </>
  );
}

export default Material;
