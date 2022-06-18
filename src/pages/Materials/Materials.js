import React, { useEffect, useState } from "react";
import "./styles.css";
import moment from "moment";
import axios from "axios";

function Material() {
  const baseUrlMaterial = "http://localhost:3002/v1/material";

  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showModalPatch, setModalPatch] = useState(false);

  const openCloseModalIncluir = () => {
    setShowModal(!showModal);
  };

  const openCloseModalPatch = () => {
    setModalPatch(!showModalPatch);
  };

  const [materialSelected, setMaterialSelected] = useState({
    id: "",
    name: "",
    qnty: "",
    descQnty: "",
    minQnty: "",
    unitValue: "",
    expiration: "",
  });

  const selectMaterial = (material, option) => {
    setMaterialSelected(material);
    option === "Editar" && openCloseModalPatch();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMaterialSelected({
      ...materialSelected,
      [name]: value,
    });
    console.log(materialSelected);
  };

  const getAll = async () => {
    await axios
      .get(baseUrlMaterial)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createMaterial = async () => {
    delete materialSelected.id;
    await axios
      .post(baseUrlMaterial, materialSelected)
      .then((res) => {
        setData(data.concat(res.data));
        setUpdateData(true);
        openCloseModalIncluir();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateMaterial = async () => {
    await axios
      .patch(baseUrlMaterial + "/" + materialSelected.id, materialSelected)
      .then((res) => {
        var response = res.data;
        var dataAux = data;

        dataAux.map((material) => {
          if (material.id === materialSelected.id) {
            material.name = response.name;
            material.qnty = response.qnty;
            material.descQnty = response.descQnty;
            material.minQnty = response.minQnty;
            material.unitValue = response.unitValue;
            material.expiration = response.expiration;
          }
        });
        setUpdateData(true);
        openCloseModalPatch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (updateData) {
      getAll();
      setUpdateData(false);
    }
  }, [updateData]);

  return (
    <>
      <div className="flex justify-center">
        <nav class="hidden md:flex items-center justify-center md:flex-1 lg:w-0">
          <h2 className="text-lg m-5 font-medium item-left justify-left text-gray-200">
            Estoque de Materiais
          </h2>
          <button
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent 
                            rounded-md shadow-sm text-base font-normal text-white bg-[#303234] hover:bg-[#6239eb]"
            onClick={() => openCloseModalIncluir()}
          >
            Novo Material
          </button>
        </nav>
      </div>
      <div className="flex justify-center">
        <table className="content-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Quantidade Mínima</th>
              <th>Tipo de Unidade</th>
              <th>Valor da Unidade</th>
              <th>Data de Validade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((material) => (
              <tr>
                <td className="px-8 py-4"> {material.name} </td>
                <td className="px-8 py-4"> {material.qnty} </td>
                <td className="px-8 py-4"> {material.minQnty} </td>
                <td className="px-8 py-4"> {material.descQnty} </td>
                <td className="px-8 py-4"> {material.unitValue} </td>
                <td className="px-8 py-4">
                  {" "}
                  {moment(material.expiration).format("DD-MM-YYYY")}{" "}
                </td>
                <td>
                  {" "}
                  <button
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent 
                            rounded-md shadow-sm text-base font-normal text-white bg-[#303234] active:bg-[#6239eb] hover:bg-[#6239eb]"
                    onClick={() => selectMaterial(material, "Editar")}
                  >
                    Atualizar
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/*MODAL DE ATUALIZAÇÃO*/}
        {showModalPatch ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold text-gray-500">
                      Atualizar Material
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setModalPatch(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <label className="text-gray-500">Nome:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="name"
                      onChange={handleChange}
                      value={materialSelected && materialSelected.name}
                    />
                    <label className="text-gray-500">Quantidade:</label>
                    <input
                      type="text"
                      className="border-color"
                      readOnly
                      value={materialSelected && materialSelected.qnty}
                    />{" "}
                    <br />
                    <label className="text-gray-500">Quantidade Mínima:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="minQnty"
                      onChange={handleChange}
                      value={materialSelected && materialSelected.minQnty}
                    />
                    <label className="text-gray-500">Tipo de Unidade:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="descQnty"
                      onChange={handleChange}
                      value={materialSelected && materialSelected.descQnty}
                    />{" "}
                    <br />
                    <label className="text-gray-500">Valor da Unidade:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="unitValue"
                      onChange={handleChange}
                      value={materialSelected && materialSelected.unitValue}
                    />
                    <label className="text-gray-500">Data de Validade:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="expiration"
                      onChange={handleChange}
                      value={
                        materialSelected &&
                        moment(materialSelected.expiration).format("DD-MM-YYYY")
                      }
                    />{" "}
                    <br />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setModalPatch(false)}
                    >
                      Fechar
                    </button>
                    <button
                      className="bg-[#303234] text-white active:bg-[#6239eb] font-bold uppercase text-sm px-6 py-3 rounded shadow 
                      hover:bg-[#6239eb] outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => updateMaterial()}
                    >
                      Atualizar Dados
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

        {/*MODAL DE CADASTRO*/}
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold text-gray-500">
                      Novo Material
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <label className="text-gray-500">Nome:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="name"
                      onChange={handleChange}
                    />
                    <label className="text-gray-500">Quantidade:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="qnty"
                      onChange={handleChange}
                    />{" "}
                    <br />
                    <label className="text-gray-500">Quantidade Mínima:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="minQnty"
                      onChange={handleChange}
                    />
                    <label className="text-gray-500">Tipo de Unidade:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="descQnty"
                      onChange={handleChange}
                    />{" "}
                    <br />
                    <label className="text-gray-500">Valor da Unidade:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="unitValue"
                      onChange={handleChange}
                    />
                    <label className="text-gray-500">Data de Validade:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="expiration"
                      onChange={handleChange}
                    />{" "}
                    <br />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Fechar
                    </button>
                    <button
                      className="bg-[#303234] text-white active:bg-[#6239eb] font-bold uppercase text-sm px-6 py-3 rounded shadow 
                      hover:bg-[#6239eb] outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => createMaterial()}
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Material;
