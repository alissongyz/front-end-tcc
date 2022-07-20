import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import api from "../../utils/api";

const ModalCreateMedicine = () => {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);

  const [select] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showModalMedicine, setShowModalMedicine] = useState(false);

  const openCloseModal = () => {
    setShowModal(!showModal);
  };

  const openCloseModalMedicine = () => {
    setShowModalMedicine(!showModalMedicine);
  };

  const [medicineSelected, setMedicineSelected] = useState({
    uuid: "",
    name: "",
    qnty: "",
    minQnty: "",
    descQnty: "",
    valueOfInput: "",
    validity: "",
    lote: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMedicineSelected({
      ...medicineSelected,
      [name]: value,
    });
    console.log(medicineSelected);
  };

  const [orderSelected, setOrderSelected] = useState({
    uuid: "",
    itemName: "",
    qnty: "",
    motive: "",
  });

  const handleChangeOrder = (e) => {
    const { name, value } = e.target;

    setOrderSelected({
      ...orderSelected,
      [name]: value,
    });
  };

  const token = localStorage.getItem("x-access-token");

  const authorization = {
    headers: {
      "x-access-token": `${token}`,
    },
  };

  const createMedicine = async () => {
    delete medicineSelected.uuid;
    await api
      .post("medicines", medicineSelected, authorization)
      .then((res) => {
        setData(data.concat(res.data));
        setUpdateData(true);
        openCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createOrder = async () => {
    delete orderSelected.uuid;
    await api
      .post("order", orderSelected, authorization)
      .then((res) => {
        setData(data.concat(res.data));
        setUpdateData(true);
        openCloseModalMedicine();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const header = [
    { label: "Nome do Medicamento", key: "name" },
    { label: "Quantidade", key: "qnty" },
    { label: "Quantidade Mínima", key: "minQnty" },
    { label: "Tipo de Unidade", key: "descQnty" },
    { label: "Valor da Unidade", key: "valueOfInput" },
    { label: "Validade", key: "validity" },
    { label: "Lote", key: "lote" },
    { label: "Data de Registro", key: "dateRegister" },
  ];

  const csvReport = {
    data: data,
    headers: header,
    filename: "medicamentos.csv",
  };

  useEffect(() => {
    const getAll = async () => {
      await api
        .get("medicines", {
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
            Estoque de Medicamentos
          </h2>
          <button
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent 
                            rounded-md shadow-sm text-base font-normal text-white bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF]"
            onClick={() => openCloseModal()}
          >
            Novo Medicamento
          </button>
          <button
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent 
                      rounded-md shadow-sm text-base font-normal text-white bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF]"
            onClick={() => openCloseModalMedicine()}
          >
            Solicitar saída
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
                      Novo Medicamento
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
                        <label
                          for="first-name"
                          className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                        >
                          Medicamento
                        </label>
                        <input
                          type="text"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                           sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600
                           block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 
                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="name"
                          onChange={handleChange}
                          placeholder="Exemplo: Medicamento"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          for="last-name"
                          className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
                        >
                          Quantidade
                        </label>
                        <input
                          type="number"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                           sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600
                           block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                           ark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="qnty"
                          onChange={handleChange}
                          placeholder="Exemplo: 10"
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
                          onChange={handleChange}
                          placeholder="Exemplo: 3"
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
                          name="valueOfInput"
                          onChange={handleChange}
                          placeholder="Exemplo: 00,00"
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
                          onChange={handleChange}
                          placeholder="Exemplo: UNIDADE"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                          Lote
                        </label>
                        <input
                          type="text"
                          className="shadow-sm bg-gray-50 border border-gray-300 
                            text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600
                             dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="lote"
                          onChange={handleChange}
                          placeholder="Exemplo: TST-01"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                          Data de Validade
                        </label>
                        <input
                          type="text"
                          className="shadow-sm bg-gray-50 border border-gray-300 
                            text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600
                             dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="validity"
                          onChange={handleChange}
                          placeholder="Exemplo: YYYY-MM-DD"
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
                      onClick={() => createMedicine()}
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

        {/*MODAL DE SOLICITAÇÃO DE SÁIDA*/}
        {showModalMedicine ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full max-w-2xl h-full md:h-auto">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold text-gray-[#2D8AE0]">
                      Solicitar saída
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModalMedicine(false)}
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
                          Medicamento
                        </label>
                        <select
                          className="shadow-sm bg-gray-50 border border-gray-300 
                           text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600
                           dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          disabled={false}
                          value={select}
                          onChange={handleChangeOrder}
                          name="itemName"
                        >
                          {data.map((item) => (
                            <option key={item.uuid}>{item.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                          Quantidade
                        </label>
                        <input
                          type="text"
                          className="shadow-sm bg-gray-50 border border-gray-300 
                            text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600
                            dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="qnty"
                          onChange={handleChangeOrder}
                          placeholder="Exemplo: 10"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="lock mb-2 text-sm font-medium text-gray-500 dark:text-white">
                        Motivo
                      </label>
                      <textarea
                        type="text"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="motive"
                        onChange={handleChangeOrder}
                        placeholder="Exemplo: Lorem ipsum platea faucibus dapibus enim commodo euismod a molestie sodales enim morbi lectus, odio bibendum luctus accumsan per a at vel sollicitudin vitae turpis."
                      />
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModalMedicine(false)}
                    >
                      Fechar
                    </button>
                    <button
                      className="bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF] text-white font-bold uppercase text-sm px-6 py-3 rounded shadow 
                      outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => createOrder()}
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

export default ModalCreateMedicine;
