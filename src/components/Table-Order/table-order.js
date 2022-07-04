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
import { useStyles } from "../../styles/table";

const TableOrder = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

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

  const [orderSelected, ] = useState({
    uuid: "",
    askedBy: "",
    approvedBy: "",
    itemName: "",
    qnty: "",
    motive: "",
    status: "",
    deleted: "",
    dateRegister: "",
    dateUpdated: "",
  });

  const getAll = async () => {
    await api
      .get("order")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // eslint-disable-next-line no-unused-vars
  const updateOrder = async () => {
    await api
      .patch("order/" + orderSelected.uuid, orderSelected)
      .then((res) => {
        var dataAux = data;

        // eslint-disable-next-line array-callback-return
        dataAux.map((order) => {
          if (order.uuid === orderSelected.uuid) {
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
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>
                  Solicitado Por
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Aprovado Por
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Nome do Medicamento
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Quantidade
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Motivo
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
                  <TableRow key={row.askedBy}>
                    <TableCell className={classes.tableCell}>
                      <Typography>{row.askedBy}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>{row.approvedBy}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>{row.itemName}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>{row.qnty}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>{row.motive}</Typography>
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
                    rounded-md shadow-sm text-base font-normal text-white bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF]"
                        >
                          Autorizar Saída
                        </button>{" "}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[12, 15, 20]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default TableOrder;
