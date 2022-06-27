import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import moment from "moment";
import CreateUser from "./modal-create-user";

const TableUser = () => {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);

  const [showModalPatch, setModalPatch] = useState(false);

  const openCloseModalPatch = () => {
    setModalPatch(!showModalPatch);
  };

  const [userSelected, setUserSelected] = useState({
    uuid: "",
    username: "",
    password: "",
    role: "",
    dateRegister: "",
    dateUpdated: "",
  });

  const selectUser = (material, option) => {
    setUserSelected(material);
    option === "Editar" && openCloseModalPatch();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserSelected({
      ...userSelected,
      [name]: value,
    });
    console.log(setUserSelected);
  };

  const getAll = async () => {
    await api
      .get("user")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateMaterial = async () => {
    await api
      .patch("user/" + userSelected.uuid, userSelected)
      .then((res) => {
        var response = res.data;
        var dataAux = data;

        // eslint-disable-next-line array-callback-return
        dataAux.map((material) => {
          if (material.uuid === userSelected.uuid) {
            material.username = response.username;
            material.password = response.password;
            material.role = response.role;
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
      <CreateUser />
      <div className="flex justify-center">
        <table className="content-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Nível de Acesso</th>
              <th>Data de Registro</th>
              <th>Data de Atualização</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((material) => (
              <tr>
                <td className="px-8 py-4"> {material.username} </td>
                <td className="px-8 py-4"> {material.role} </td>
                <td className="px-8 py-4">
                  {" "}
                  {moment(material.dateRegister).format("DD-MM-YYYY")}{" "}
                </td>
                <td className="px-8 py-4">
                  {" "}
                  {moment(material.dateUpdated).format("DD-MM-YYYY")}{" "}
                </td>
                <td>
                  {" "}
                  <button
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent 
                    rounded-md shadow-sm text-base font-normal text-white bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF]"
                    onClick={() => selectUser(material, "Editar")}
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
                    <h3 className="text-3xl font-semibold text-gray-[#2D8AE0]">
                      Atualizar Usuário
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
                      name="username"
                      onChange={handleChange}
                      value={userSelected && userSelected.username}
                    />
                    <label className="text-gray-500">Nível de Acesso:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="role"
                      onChange={handleChange}
                      value={userSelected && userSelected.role}
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
                      className="bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF] font-bold uppercase text-sm px-6 py-3 rounded shadow 
                      outline-none text-white focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        updateMaterial();
                      }}
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
      </div>
    </>
  );
};

export default TableUser;
