import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import api from "../../utils/api";
import "../../styles/table-modal-styles.css";

const ModalCreateMaterial = () => {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("x-access-token");

  const authorization = {
    headers: {
      "x-access-token": `${token}`,
    },
  };

  const openCloseModal = () => {
    setShowModal(!showModal);
  };

  const [materialSelected, setMaterialSelected] = useState({
    uuid: "",
    name: "",
    qnty: "",
    descQnty: "",
    minQnty: "",
    unitValue: "",
    expiration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMaterialSelected({
      ...materialSelected,
      [name]: value,
    });
    console.log(materialSelected);
  };

  const createMaterial = async () => {
    delete materialSelected.uuid;
    await api
      .post("material", materialSelected, authorization)
      .then((res) => {
        setData(data.concat(res.data));
        setUpdateData(true);
        openCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const header = [
    { label: "Material", key: "name" },
    { label: "Quantidade", key: "qnty" },
    { label: "Quantidade Mínima", key: "minQnty" },
    { label: "Tipo de Unidade", key: "descQnty" },
    { label: "Valor da Unidade", key: "unitValue" },
    { label: "Validade", key: "expiration" },
    { label: "Data de Registro", key: "dateRegister" },
  ];

  const csvReport = {
    data: data,
    headers: header,
    filename: "material.csv",
  };

  useEffect(() => {
    const getAll = async () => {
      await api
        .get("material", {
          headers: {
            "x-access-token": `${token}`,
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (updateData) {
      getAll();
      setUpdateData(false);
    }
  }, [token, updateData]);

  return (
    <>
      <div className="flex justify-center">
        <nav className="hidden md:flex items-center justify-center md:flex-1 lg:w-0">
          <h2 className="text-lg m-5 font-medium item-left justify-left text-gray-[#2D8AE0]">
            Estoque de Materiais
          </h2>
          <button
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent 
                            rounded-md shadow-sm text-base font-normal text-white bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF]"
            onClick={() => openCloseModal()}
          >
            Novo Material
          </button>
          <button
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent 
                            rounded-md shadow-sm text-base font-normal text-white bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF]"
          >
            <CSVLink {...csvReport}>Exportar CSV</CSVLink>
          </button>
        </nav>
        {/*MODAL DE CADASTRO*/}
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full max-w-2xl h-full md:h-auto">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold text-gray-[#2D8AE0]">
                      Material
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
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                          Material
                        </label>
                        <input
                          type="text"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                           sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600
                           block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="name"
                          placeholder="Exemplo: Material"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                          Quantidade
                        </label>
                        <input
                          type="number"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                           sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600
                           block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                           ark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="qnty"
                          placeholder="Exemplo: 10"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                          Quantidade Mínima
                        </label>
                        <input
                          type="number"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                           sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block
                           w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="minQnty"
                          placeholder="Exemplo: 3"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                          Valor da Unidade
                        </label>
                        <input
                          type="text"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                             sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                             dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="unitValue"
                          placeholder="Exemplo: 00,00"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                          Tipo de Unidade
                        </label>
                        <input
                          type="text"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                             sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="descQnty"
                          placeholder="Exemplo: UNIDADE"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                          Data de Validade
                        </label>
                        <input
                          type="text"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                             sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="expiration"
                          placeholder="Exemplo: YYYY-MM-DD"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
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
                      className="bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF] text-white font-bold uppercase text-sm px-6 py-3 rounded shadow 
                      outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
};

export default ModalCreateMaterial;
