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
import "../../styles/table-modal-styles.css";
import * as CgIcons from "react-icons/cg";
import { useStyles } from "../../styles/table";

const TableOrder = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const [showModalPatch, setModalPatch] = useState(false);
  const [showModalDelete, setModalDelete] = useState(false);

  const openCloseModalPatch = () => {
    setModalPatch(!showModalPatch);
  };

  const openCloseModalDelete = () => {
    setModalDelete(!showModalDelete);
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
      'x-access-token': `${token}`,
    },
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
      .catch((error) => {
        console.log(error);
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
            'x-access-token': `${token}`,
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
                          backgroundColor:
                            (row.status === "PENDING" && "orange") ||
                            (row.status === "AUTHORIZED" && "green") ||
                            (row.status === "NOT_AUTHORIZED" && "red"),
                        }}
                      >
                        {row.status}
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
