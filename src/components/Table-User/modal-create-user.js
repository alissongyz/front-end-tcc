import React, { useState } from "react";
import api from "../../utils/api";
import "./styles.css";

const CreateUser = () => {
  const [data, setData] = useState([]);
  const [, setUpdateData] = useState(true);
  const [showModal, setShowModal] = useState(false);

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
      .post("user", userSelected)
      .then((res) => {
        setData(data.concat(res.data));
        setUpdateData(true);
        openCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            Novo Material
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
                      Novo Usuário
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
                      name="username"
                      onChange={handleChange}
                    />
                    <label className="text-gray-500">Senha:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="password"
                      onChange={handleChange}
                    />{" "}
                    <br />
                    <label className="text-gray-500">Nível de Acesso:</label>
                    <select
                      type="text"
                      className="border-color"
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
