import React, { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import * as VscIcons from "react-icons/vsc";

import api from "../../utils/api";
import "../../styles/button.css";

const CreateUser = () => {
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

  const [userSelected, setUserSelected] = useState({
    uuid: "",
    username: "",
    password: "",
    role: "",
    dateRegister: "",
    dateUpdated: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserSelected({
      ...userSelected,
      [name]: value,
    });
    console.log(userSelected);
  };

  const createMaterial = async () => {
    delete userSelected.uuid;
    await api
      .post("user", userSelected, authorization)
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
    {
      label: "Usuário",
      key: "username",
    },
    {
      label: "Nível de acesso",
      key: "role",
    },
    {
      label: "Data de Registro",
      key: "dateRegister",
    },
  ];

  const csvReport = {
    data: data,
    headers: header,
    filename: "users.csv",
  };

  /* LÓGICA DE VISUALIZAR A SENHA NO FORMULÁRIO */
  const inputRef = useRef(null);
  const [eyeIsClosed, setEyeState] = useState(false);

  const toggleShow = () => {
    if (inputRef.current.type === "password") {
      setEyeState(true);
      inputRef.current.type = "text";
    } else {
      setEyeState(false);
      inputRef.current.type = "password";
    }
  };

  useEffect(() => {
    const getAll = async () => {
      await api
        .get("user", {
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
            Usuários
          </h2>
          <button
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent 
                       rounded-md shadow-sm text-base font-normal text-white bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF]"
            onClick={() => openCloseModal()}
          >
            Novo Usuário
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
                      Usuário
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
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                        Usuário
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                             sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="username"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                        Senha
                      </label>
                      <div className="md:flex items-center justify-center">
                        <input
                          ref={inputRef}
                          type="password"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                          sm:text-sm rounded-l focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                           dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="password"
                          onChange={handleChange}
                          placeholder="••••••••"
                        />
                        <button className="button" onClick={toggleShow}>
                          {eyeIsClosed ? (
                            <VscIcons.VscEye />
                          ) : (
                            <VscIcons.VscEyeClosed />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                        Nível de Acesso:
                      </label>
                      <select
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                         sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                         dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="role"
                        onChange={handleChange}
                      >
                        <option selected disabled></option>
                        <option value="admin">Admin</option>
                        <option value="veterinario">Veterinário</option>
                        <option value="farmaceutico">Farmacêutico</option>
                        <option value="usuario">Usuário</option>
                      </select>
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

export default CreateUser;
