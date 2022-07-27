import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  TableFooter,
} from "@material-ui/core";
import * as AiIcons from 'react-icons/ai'

import CreateUser from "./modal-create-user";
import api from "../../utils/api";
import { useStyles } from "../../styles/table";

const TableUser = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const token = localStorage.getItem("x-access-token");

  const authorization = {
    headers: {
      "x-access-token": `${token}`,
    },
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [showModalPatch, setModalPatch] = useState(false);

  const openCloseModalPatch = () => {
    setModalPatch(!showModalPatch);
  };

  const [userSelected, setUserSelected] = useState({
    id: "",
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

  const updateUser = async () => {
    await api
      .patch("user/" + userSelected.uuid, userSelected, authorization)
      .then((res) => {
        var response = res.data;
        var dataAux = data;

        // eslint-disable-next-line array-callback-return
        dataAux.map((material) => {
          if (material.id === userSelected.uuid) {
            material.username = response.username;
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

  const [filter, setFilterValue] = useState("");
  const [search, setSearchValue] = useState([]);

  const handleFilter = async (e) => {
    if (e.target.value === "") {
      setData(search);
    } else {
      const filterResult = search.filter(
        (item) =>
          item.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.role.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setData(filterResult);
    }
    setFilterValue(e.target.value);
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
          setSearchValue(res.data);
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
      <CreateUser />
      <div className="flex justify-center">
        <nav className="hidden md:flex items-center justify-center md:flex-1 lg:w-0">
          <div className="relative text-gray-600 focus-within:text-gray-400 mb-3 xl:w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="q"
              className="block w-full px-3 py-1.5 border border-solid border-gray-300
              rounded-md pl-10 transition
              ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Pesquisar..."
              value={filter}
              onInput={(e) => handleFilter(e)}
            />
          </div>
        </nav>
      </div>
      <div className="flex justify-center">
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Usuário
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Nível de Acesso
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Data de Registro
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.uuid}>
                    <TableCell className={classes.tableCell}>
                      <Typography>{row.username}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>{row.role}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {moment(row.dateRegister).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>
                        <button
                          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent 
                    rounded-md shadow-sm text-base font-normal text-white bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF]"
                          onClick={() => selectUser(row, "Editar")}
                        >
                          <AiIcons.AiOutlineForm />
                        </button>{" "}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[8, 12, 20]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableFooter>
          </Table>
        </TableContainer>

        {/*MODAL DE ATUALIZAÇÃO*/}
        {showModalPatch ? (
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
                      onClick={() => setModalPatch(false)}
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
                        value={userSelected && userSelected.username}
                      />
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
                      onClick={() => setModalPatch(false)}
                    >
                      Fechar
                    </button>
                    <button
                      className="bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF] font-bold uppercase text-sm px-6 py-3 rounded shadow 
                      outline-none text-white focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        updateUser();
                      }}
                    >
                      Confirmar
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
