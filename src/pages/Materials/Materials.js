import React from "react";
import ModalCreateMaterial from "../../components/Modal/modal-post";
import ModalGetAndUpdateMaterial from "../../components/Modal/modal-put";

function Material() {
  return (
    <>
      <ModalCreateMaterial />
      <ModalGetAndUpdateMaterial />
    </>
  );
}

export default Material;
