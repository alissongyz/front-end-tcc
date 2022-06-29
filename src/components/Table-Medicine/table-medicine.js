import React, { useEffect, useState } from "react";
import api from "../../utils/api";
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
import "../../styles/table-modal-styles.css";
import { useStyles } from "../../styles/table";

const TableMedicine = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

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

  const selectMaterial = (material, option) => {
    setMedicineSelected(material);
    option === "Editar" && openCloseModalPatch();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMedicineSelected({
      ...medicineSelected,
      [name]: value,
    });
    console.log(medicineSelected);
  };

  const getAll = async () => {
    await api
      .get("medicines")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateMaterial = async () => {
    await api
      .patch("medicines/" + medicineSelected.uuid, medicineSelected)
      .then((res) => {
        var response = res.data;
        var dataAux = data;

        // eslint-disable-next-line array-callback-return
        dataAux.map((medicine) => {
          if (medicine.uuid === medicineSelected.uuid) {
            medicine.name = response.name;
            medicine.qnty = response.qnty;
            medicine.descQnty = response.descQnty;
            medicine.minQnty = response.minQnty;
            medicine.valueOfInput = response.unitValue;
            medicine.validity = response.expiration;
            medicine.lote = response.lote;
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
                  Nome do Medicamento
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Quantidade
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Quantidade Mínima
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Valor por Unidade
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Tipo de unidade
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Data de Validade
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>
                  Lote
                </TableCell>
                <TableCell className={classes.tableHeaderCell}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>
                      <Typography>
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.qnty}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.minQnty}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.valueOfInput}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.descQnty}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{moment(row.validity).format("DD-MM-YYYY")}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.lote}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <button
                          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent 
                    rounded-md shadow-sm text-base font-normal text-white bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF]"
                          onClick={() => selectMaterial(row, "Editar")}
                        >
                          Atualizar
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
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
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
                    <h3 className="text-3xl font-semibold text-gray-[#2D8AE0]">
                      Atualizar Material
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
                      name="name"
                      onChange={handleChange}
                      value={medicineSelected && medicineSelected.name}
                    />
                    <label className="text-gray-500">Quantidade:</label>
                    <input
                      type="number"
                      className="border-color-quantity"
                      readOnly
                      value={medicineSelected && medicineSelected.qnty}
                    />{" "}
                    <br />
                    <label className="text-gray-500">Quantidade Mínima:</label>
                    <input
                      type="number"
                      className="border-color"
                      name="minQnty"
                      onChange={handleChange}
                      value={medicineSelected && medicineSelected.minQnty}
                    />
                    <label className="text-gray-500">Tipo de Unidade:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="descQnty"
                      onChange={handleChange}
                      value={medicineSelected && medicineSelected.descQnty}
                    />{" "}
                    <br />
                    <label className="text-gray-500">Valor da Unidade:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="unitValue"
                      onChange={handleChange}
                      value={medicineSelected && medicineSelected.valueOfInput}
                    />
                    <label className="text-gray-500">Data de Validade:</label>
                    <input
                      type="date"
                      className="border-color"
                      name="validity"
                      onChange={handleChange}
                      value={
                        medicineSelected &&
                        moment(medicineSelected.validity).format("DD-MM-YYYY")
                      }
                    />{" "}
                    <br />
                    <label className="text-gray-500">Lote:</label>
                    <input
                      type="text"
                      className="border-color"
                      name="validity"
                      onChange={handleChange}
                      value={
                        medicineSelected &&
                        medicineSelected.lote
                      }
                    />{" "}
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
                      className="bg-[#2D8AE0] hover:bg-[#2d89e0d2] font-bold uppercase text-sm px-6 py-3 rounded shadow 
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

export default TableMedicine;