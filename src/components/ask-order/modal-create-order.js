import React, { useEffect, useState } from "react";

import api from "../../utils/api";
import * as FAIcons from 'react-icons/fa';

const ModalCreateOrder = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataMaterial, setDataMaterial] = useState([]);
  const [itemsMaterial, setItemsMaterial] = useState([]);
  const [itemsMedicine, setItemsMedicine] = useState([]);
  const [dataMedicine, setDataMedicine] = useState([]);
  const [updateData, setUpdateData] = useState(true);

  const handleAddButtonClicMaterial = (e) => {
    
    const value = e.target.value;
    if(value != '') {
    const newItem = {
      itemName: value,
      qnty: 1,
      isSelected: false,
    };

    const newItems = [...itemsMaterial, newItem]

    setItemsMaterial(newItems);
    }
  };

  const handleAddButtonClicMedicine = (e) => {
      const value = e.target.value;
      if(value !== ''){
        const newItem = {
          itemName: value,
          qnty: 1,
          isSelected: false,
        };
    
        const newItems = [...itemsMedicine, newItem]
    
        setItemsMedicine(newItems);
      }
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...itemsMaterial];

    newItems[index].qnty++;

    setItemsMaterial(newItems);
  };

  const handleQuantityDecrease = (index) => {
    const newItems = [...itemsMaterial];

    newItems[index].qnty--;

    setItemsMaterial(newItems)
  };

  const handleExcludeItems = (index) => {
    let newItems = [...itemsMaterial];

    newItems = newItems.filter((_, i) => i !== index);

    setItemsMaterial(newItems);
  };

  const handleQuantityIncreaseMedicine = (index) => {
    const newItems = [...itemsMedicine];

    newItems[index].qnty++;

    setItemsMedicine(newItems);
  };

  const handleMotive = (e) =>{
    const motive = e.target.value;
    console.log(motive);

    setOrder({itemsMaterial, itemsMedicine, motive});
  };

  const handleQuantityDecreaseMedicine = (index) => {
    const newItems = [...itemsMedicine];

    newItems[index].qnty--;

    setItemsMedicine(newItems);
  };

  const handleExcludeItemsMedicine = (index) => {
    let newItems = [...itemsMedicine];

    newItems = newItems.filter((_, i) => i !== index);

    setItemsMedicine(newItems);
  };

  const createOrder = async () => {
    await api
      .post("order/multiple", order, authorization)
      .then((res) => {
        setData(data.concat(res.data));
        setUpdateData(true);
        openCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const token = localStorage.getItem("x-access-token");

  const [order, setOrder] = useState({
    materials: [],
    medicines: [],
    motive: "",
  });

  const authorization = {
    headers: {
        "x-access-token": `${token}`,
    },
  };

  const openCloseModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const getOrders = async () => {
      await api
        .get("order/multiple/user", {
          headers: {
            "x-access-token": `${token}`,
          },
        })
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getAllMaterial = async () => {
      await api
        .get("material", {
          headers: {
            "x-access-token": `${token}`,
          },
        })
        .then((res) => {
          setDataMaterial(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getAllMedicine = async () => {
        await api
          .get("medicines", {
            headers: {
              "x-access-token": `${token}`,
            },
          })
          .then((res) => {
            setDataMedicine(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };

    if (updateData) {
      getOrders();
      getAllMaterial();
      getAllMedicine();
    }
  }, [token, updateData]);

  return (
    <>
      <div className="flex justify-center">
        <nav className="hidden md:flex items-center justify-center md:flex-1 lg:w-0">
          <h2 className="text-lg m-5 font-medium item-left justify-left text-gray-[#2D8AE0]">
            Realizar Pedido
          </h2>
          <button
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent 
                            rounded-md shadow-sm text-base font-normal text-white bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF]"
            onClick={() => openCloseModal()}
          >
            Novo Pedido
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
                      Pedido
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
                  <div className="p-6 space-y-6 h-72">
                    <div className="grid grid-cols-6 gap-2 h-64 ">
                        <label>
                          Selecione o Material:
                        </label>
                        <input list="materials" onChange={handleAddButtonClicMaterial} className="border-2 rounded border-blue-500 w-auto"  />
                        <datalist id="materials">
                          {dataMaterial.map((item) => (
                            <option key={item.uuid} value={item.name} />
                          ))}
                        </datalist>

                        <div className='item-list-material flex'>
                            {itemsMaterial.map((item, index) => (
                                <div className='item-container'>
                                    <div className='item-name'>
                                        <span>{item.itemName}</span>
                                    </div>
                                    <div className='qnty'>
                                        <button>
                                          <FAIcons.FaRegCaretSquareLeft onClick={() => handleQuantityDecrease(index)} />
                                        </button>
                                        <span> {item.qnty} </span>
                                        <button>
                                          <FAIcons.FaRegCaretSquareRight onClick={() => handleQuantityIncrease(index)} />
                                        </button>
                                        <button>
                                          <FAIcons.FaRegWindowClose onClick={() => handleExcludeItems(index)} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <label>
                          Selecione o Medicamento:
                        </label>
                        <input list="medicines" onChange={handleAddButtonClicMedicine} className="border-2 rounded border-blue-500 w-auto"/>
                        <datalist id="medicines">
                          {dataMedicine.map((item) => (
                            <option key={item.uuid} value={item.name} />
                          ))}
                        </datalist>

                        <div className='item-list-medicine'>
                            {itemsMedicine.map((item, index) => (
                                <div className='item-container'>
                                    <div className='item-name'>
                                        <span>{item.itemName}</span>
                                    </div>
                                    <div className='qnty'>
                                        <button>
                                          <FAIcons.FaRegCaretSquareLeft onClick={() => handleQuantityDecreaseMedicine(index)} />
                                        </button>
                                        <span> {item.qnty} </span>
                                        <button>
                                          <FAIcons.FaRegCaretSquareRight onClick={() => handleQuantityIncreaseMedicine(index)} />
                                        </button>
                                        <button>
                                          <FAIcons.FaRegWindowClose onClick={() => handleExcludeItemsMedicine(index)} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                      <div className="col-span-6 sm:col-span-6">
                      <label className="lock mb-2 text-sm font-medium text-gray-500 dark:text-white">
                        Motivo
                      </label>
                      <textarea
                        type="text"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="motive"
                        onChange={handleMotive}
                        placeholder="Exemplo: Digite neste campo o motivo do pedido"
                      />
                    </div>
                      
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

export default ModalCreateOrder;
