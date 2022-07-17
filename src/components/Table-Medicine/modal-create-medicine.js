import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import moment from "moment";

import api from "../../utils/api";
import "../../styles/table-modal-styles.css";

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

    console.log(
      `${moment().format("DD-MM-YYYY hh:mm:ss")} -> Requisição send criada:`,
      orderSelected
    );
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
            Solicitar saída de Medicamento
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
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
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
                      name="valueOfInput"
                      placeholder="Exemplo: 00,00"
                      onChange={handleChange}
                    />
                    <label className="text-gray-500">Data de Validade:</label>
                    <input
                      type="date"
                      className="border-color"
                      name="validity"
                      onChange={handleChange}
                    />{" "}
                    <br />
                    <label className="text-gray-500">Lote:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="lote"
                      onChange={handleChange}
                    />{" "}
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
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold text-gray-[#2D8AE0]">
                      Solicitar saída de medicamento
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
                  <div className="relative p-6 flex-auto">
                    <label className="text-gray-500">Medicamento:</label>
                    <select
                      className="border-color"
                      disabled={false}
                      value={select}
                      onChange={handleChangeOrder}
                      name="itemName"
                    >
                      {data.map((item) => (
                        <option key={item.uuid}>{item.name}</option>
                      ))}
                    </select>
                    <label className="text-gray-500">Quantidade:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="qnty"
                      onChange={handleChangeOrder}
                    />{" "}
                    <br />
                    <label className="text-gray-500">
                      Motivo da solicitação:
                    </label>
                    <input
                      type="text"
                      className="border-color"
                      name="motive"
                      onChange={handleChangeOrder}
                    />
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
