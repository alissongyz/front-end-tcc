import React, { useEffect, useState } from "react";
import api from "../../utils/api";
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
import * as CgIcons from "react-icons/cg";
import { CSVLink } from "react-csv";
import { useStyles } from "../../styles/table";

const TableOrder = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const [showModalPatch, setModalPatch] = useState(false);
  const [showModalDelete, setModalDelete] = useState(false);
  const [showItemNotFound, setItemNotFound] = useState(false);
  const [showQntyNotFound, setQntyNotFound] = useState(false);

  const openCloseModalPatch = () => {
    setModalPatch(!showModalPatch);
  };

  const openCloseModalDelete = () => {
    setModalDelete(!showModalDelete);
  };

  const openCloseModalItemNotFound = () => {
    setItemNotFound(!showItemNotFound);
  };

  const openCloseModalErrorQnty = () => {
    setQntyNotFound(!showQntyNotFound);
  };

  const [orderSelected, setOrderSelected] = useState({
    uuid: "",
    requiredBy: "",
    approvedBy: "",
    itemName: "",
    qnty: "",
    motive: "",
    status: "",
    deleted: "",
    dateRegister: "",
    dateUpdated: "",
  });

  const selectOrder = (order, option) => {
    setOrderSelected(order);
    option === "Editar" && openCloseModalPatch();
    option === "Excluir" && openCloseModalDelete();
  };

  const token = localStorage.getItem("x-access-token");

  const authorization = {
    headers: {
      "x-access-token": `${token}`,
    },
  };

  const header = [
    { label: "Numero do pedido", key: "nroOrder" },
    { label: "Requerido por", key: "requiredBy" },
    { label: "Nome do item", key: "itemName" },
    { label: "Qunatidade", key: "qnty" },
    { label: "Status", key: "status" },
  ];

  const csvReport = {
    data: data,
    headers: header,
    filename: "pedidos.csv",
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const updateOrder = async () => {
    await api
      .patch("order/" + orderSelected.uuid, orderSelected, authorization)
      .then((res) => {
        setData(data.filter((order) => order.uuid !== res.data));
        setUpdateData(true);
        openCloseModalPatch();
      })
      .catch((e) => {
        if (e.response.data.itemNotFound === true) {
          openCloseModalPatch(false);
          openCloseModalItemNotFound();
        }

        if (e.response.data.materialQnty === false) {
          openCloseModalPatch(false);
          openCloseModalErrorQnty();
        }

        if (e.response.data.medicineQnty === false) {
          openCloseModalPatch(false);
          openCloseModalErrorQnty();
        }
      });
  };

  const deleteOrder = async () => {
    await api
      .delete("order/" + orderSelected.uuid, authorization)
      .then((res) => {
        setData(data.filter((order) => order.uuid !== res.data));
        setUpdateData(true);
        openCloseModalDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const getAll = async () => {
      await api
        .get("order", {
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
      <button
        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent 
        rounded-md shadow-sm text-base font-normal text-white bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF]"
      >
        <CSVLink {...csvReport}>Exportar CSV</CSVLink>
      </button>
      </div>
      <div className="flex justify-center">
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Nº do Pedido
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Solicitado Por
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Nome do Medicamento
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Quantidade
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Status
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
                      <Typography>{row.nroOrder}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>{row.requiredBy}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>{row.itemName}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>{row.qnty}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography
                        className={classes.status}
                        style={{
                          backgroundColor: row.status === "PENDING" && "orange",
                        }}
                      >
                        {row.status === "PENDING" && "PENDENTE"}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>
                        <button
                          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent 
                    rounded-md shadow-sm text-base font-normal text-white bg-[#22C55E] active:bg-[#2D8AE0] hover:bg-[#16A34A]"
                          onClick={() => selectOrder(row, "Editar")}
                        >
                          <CgIcons.CgCheckO />
                        </button>
                        <button
                          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent 
                    rounded-md shadow-sm text-base font-normal text-white bg-[#EF4444] active:bg-[#2D8AE0] hover:bg-[#DC2626]"
                          onClick={() => selectOrder(row, "Excluir")}
                        >
                          <CgIcons.CgCloseO />
                        </button>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[8, 10, 15]}
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

        {/*MODAL DE ERRO NA QUANTIDADE*/}
        {showQntyNotFound ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={() => setQntyNotFound(false)}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-6 text-center">
                    <svg
                      aria-hidden="true"
                      class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Quantidade do pedido não corresponde com a quantidade
                      atual em estoque. Verifique a disponibilidade.
                    </h3>
                    <button
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      onClick={() => setQntyNotFound(false)}
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

        {/*MODAL DE ERRO ITEM NOTFOUND*/}
        {showItemNotFound ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={() => setItemNotFound(false)}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-6 text-center">
                    <svg
                      aria-hidden="true"
                      class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Não encontramos o item {orderSelected.itemName} disponível
                      em estoque. Verifique se esse item existe.
                    </h3>
                    <button
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      onClick={() => setItemNotFound(false)}
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

        {/*MODAL DE ATUALIZAÇÃO*/}
        {showModalPatch ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold text-[#22C55E]">
                      Confirmar saída
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
                  {/* BODY */}
                  <div className="relative p-6 flex-auto">
                    <p className="text-gray-500">
                      Nº do Pedido: {orderSelected.nroOrder}
                    </p>
                    <p className="text-gray-500">
                      Solicitante: {orderSelected.requiredBy}
                    </p>
                    <p className="text-gray-500">
                      Nome do item: {orderSelected.itemName}
                    </p>
                    <p className="text-gray-500">
                      Quantidade: {orderSelected.qnty}
                    </p>
                    <p className="text-gray-500">
                      Motivo: {orderSelected.motive}
                    </p>
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
                      className="bg-[#22C55E] active:bg-[#2D8AE0] hover:bg-[#16A34A] font-bold uppercase text-sm px-6 py-3 rounded shadow 
                      outline-none text-white focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        updateOrder();
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

        {/*MODAL DE REPROVAR PERDIDO*/}
        {showModalDelete ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <p className="text-3xl font-semibold text-red-500">
                      Reprovar saída
                    </p>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setModalDelete(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/* BODY */}
                  <div className="relative p-6 flex-auto">
                    <p className="text-gray-500">
                      Nº do Pedido: {orderSelected.nroOrder}
                    </p>
                    <p className="text-gray-500">
                      Solicitante: {orderSelected.requiredBy}
                    </p>
                    <p className="text-gray-500">
                      Nome do item: {orderSelected.itemName}
                    </p>
                    <p className="text-gray-500">
                      Quantidade: {orderSelected.qnty}
                    </p>
                    <p className="text-gray-500">
                      Motivo: {orderSelected.motive}
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setModalDelete(false)}
                    >
                      Fechar
                    </button>
                    <button
                      className="bg-[#EF4444] active:bg-[#2D8AE0] hover:bg-[#DC2626] font-bold uppercase text-sm px-6 py-3 rounded shadow 
                      outline-none text-white focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        deleteOrder();
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

export default TableOrder;
