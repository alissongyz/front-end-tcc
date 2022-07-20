import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import * as BsIcons from "react-icons/bs";
import * as GiIcons from "react-icons/gi";

import api from "../../utils/api";

const Card = () => {
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState([]);
  const [material, setMaterial] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const [updateData, setUpdateData] = useState([]);

  const token = localStorage.getItem("x-access-token");

  const decoded = jwt_decode(token);

  useEffect(() => {
    const getOrders = async () => {
      await api
        .get("order", {
          headers: {
            "x-access-token": `${token}`,
          },
        })
        .then((res) => {
          setOrder(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getUsers = async () => {
      await api
        .get("user", {
          headers: {
            "x-access-token": `${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getMaterial = async () => {
      await api
        .get("material", {
          headers: {
            "x-access-token": `${token}`,
          },
        })
        .then((res) => {
          setMaterial(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getMedicine = async () => {
      await api
        .get("medicines", {
          headers: {
            "x-access-token": `${token}`,
          },
        })
        .then((res) => {
          setMedicine(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (updateData) {
      getOrders();
      getUsers();
      getMaterial();
      getMedicine();
      setUpdateData(false);
    }
  }, [token, updateData]);

  return (
    <>
      <div className="w-full py-6">
        <div className="container mx-auto px-6 flex items-start justify-center">
          <div className="w-full">
            <div className="mx-auto w-full p-5 lg:p-10 bg-white dark:bg-gray-800 shadow rounded">
              <div className="flex flex-col lg:flex-row items-start lg:items-center mb-8">
                <h1 className="mr-12 text-xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold lg:w-1/2">
                  Visão geral
                </h1>
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="mt-4 lg:mt-0 mr-0 xl:mr-8 text-sm bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium py-2 w-48 flex justify-center">
                    {decoded.username}
                  </div>
                  <div className="mt-4 lg:mt-0 mr-0 lg:mr-4 xl:mr-8 text-sm bg-red-100 text-red-500 rounded font-medium py-2 w-48 flex justify-center">
                    {decoded.username}
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:items-center">
                <div className="w-full lg:w-1/2 pr-0 lg:pr-48">
                  <div className="flex items-center">
                    <div className="bg-white dark:bg-gray-800 rounded shadow px-8 py-6 flex items-center">
                      <div className="p-4 bg-indigo-700 rounded text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-user"
                          width={32}
                          height={32}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <circle cx={12} cy={7} r={4} />
                          <path d="M5.5 21v-2a4 4 0 0 1 4 -4h5a4 4 0 0 1 4 4v2" />
                        </svg>
                      </div>
                      <div className="ml-6">
                        <h3 className="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-2xl">
                          {user.length}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
                          Usuários
                        </p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded shadow px-8 py-6 flex items-center ml-3">
                      <div className="p-4 bg-indigo-700 rounded text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={25}
                          height={24}
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <BsIcons.BsBoxSeam className="text-[1.5rem]" />
                        </svg>
                      </div>
                      <div className="ml-6">
                        <h3 className="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-2xl">
                          {material.length}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
                          Materiais
                        </p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded shadow px-8 py-6 flex items-center ml-3">
                      <div className="p-4 bg-indigo-700 rounded text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-click"
                          width={32}
                          height={32}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <GiIcons.GiMedicines className="text-[1.5rem]" />
                        </svg>
                      </div>
                      <div className="ml-6">
                        <h3 className="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-2xl">
                          {medicine.length}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
                          Medicamentos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:pl-8 w-full lg:w-1/2 flex flex-col lg:flex-row items-start lg:items-center">
                  <div className="mr-12 flex lg:block items-center lg:mr-6 xl:mr-12 mt-5 lg:mt-0">
                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl lg:text-2xl leading-6 mb-1 lg:text-center">
                      12
                    </h2>
                    <p className="ml-2 lg:ml-0 text-gray-800 dark:text-gray-100 text-xl leading-5 text-center">
                      Pedidos Aprovados
                    </p>
                  </div>
                  <div className="mr-12 flex lg:block lg:mr-6 xl:mr-12 mt-5 lg:mt-0">
                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl lg:text-2xl leading-6 mb-1 lg:text-center">
                      {order.length}
                    </h2>
                    <p className="ml-2 lg:ml-0 text-gray-800 dark:text-gray-100 text-xl leading-5 text-center">
                      Pedidos Pendentes
                    </p>
                  </div>
                  <div className="mt-5 flex lg:block lg:mt-0">
                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl lg:text-2xl leading-6 mb-1 lg:text-center">
                      03
                    </h2>
                    <p className="ml-2 lg:ml-0 text-gray-800 dark:text-gray-100 text-xl leading-5 text-center">
                      Pedidos Reprovados
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <hr className="mt-8 mb-8 lg:mb-10 h-1 rounded bg-gray-200" />
                <hr className="absolute top-0 h-1 w-2/3 rounded bg-indigo-400" />
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:items-center">
                <div className="flex flex-col lg:flex-row w-full lg:w-2/3 items-start lg:items-center mb-8 lg:mb-0">
                  <div className="mr-24 flex lg:block flex-row-reverse items-center mb-4 lg:mb-0">
                    <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">
                      Quantidade de Medicamentos
                    </h3>
                    <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">
                      {medicine.reduce((sum, value) => {
                        return sum + value.qnty;
                      }, 0)}
                    </h2>
                  </div>
                  <div className="mr-24 flex lg:block flex-row-reverse items-center mb-4 lg:mb-0">
                    <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">
                      Quantidade de Materiais
                    </h3>
                    <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">
                      {material.reduce((sum, value) => {
                        return sum + value.qnty;
                      }, 0)}
                    </h2>
                  </div>
                  <div className="flex lg:block flex-row-reverse items-center">
                    <h3 className="text-indigo-700 dark:text-indigo-600 leading-6 text-lg">
                      UNDEFINED
                    </h3>
                    <h2 className="mr-2 lg:mr-0 text-gray-600 dark:text-gray-400 text-xl lg:text-2xl font-bold">
                      UNDEFINED
                    </h2>
                  </div>
                </div>
                <div className="flex items-center w-full lg:w-1/3 justify-start lg:justify-end">
                  UNDEFINED
                </div>
              </div>
            </div>
            {/* Card code block end */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
