import moment from "moment";
import { useState } from "react";
import api from "../../utils/api";
import ResultCEP from "./cep";
import ResultSearch from "./title";

const ConsultaCEP = () => {
  const [events, setEvents] = useState([]);

  const [status, setStatus] = useState(false);

  const convertToArray = (obj) => {
    const arr = [obj];
    return arr;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    api
      .get("correios/" + data.tracking)
      .then((res) => {
        const array = convertToArray(res.data);

        console.log(
          `${moment().format("DD-MM-YYYY HH:mm:ss")} - CEP ENCONTRADO`,
          array
        );

        setEvents(array);
        return array;
      })
      .catch((e) => {
        if (e.response.status !== 200) {
          return setStatus({
            type: "error",
            mensagem: `Nenhum CEP encontrado.`,
          });
        }
      });
  };

  return (
    <>
      <div className="w-full py-6">
        <div className="container mx-auto px-6 flex items-start justify-center">
          <div className="w-full">
            <div className="mx-auto w-full p-5 lg:p-10 bg-white dark:bg-gray-800 shadow rounded">
              <div className="flex flex-col lg:flex-row items-start lg:items-center mb-8">
                <h1 className="mr-12 text-xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold lg:w-1/2">
                  Serviços Correios
                </h1>
                <ResultSearch events={events} />
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:items-center">
                <div className="w-full lg:w-1/2 pr-0 lg:pr-48">
                  <form onSubmit={submitHandler}>
                    <div className="mb-6">
                      {status ? (
                        <div
                          id="alert-border-2"
                          className="flex p-4 mb-4 bg-orange-100 border-t-4 border-orange-500 dark:bg-orange-200"
                          role="alert"
                        >
                          <svg
                            className="flex-shrink-0 w-5 h-5 text-orange-700"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <div className="ml-3 text-sm font-medium text-orange-700">
                            {status.mensagem}
                          </div>
                          <button
                            type="button"
                            className="ml-auto -mx-1.5 -my-1.5 bg-orange-100 dark:bg-orange-200 text-orange-500 rounded-lg focus:ring-2 focus:ring-orange-400 p-1.5 hover:bg-orange-200 dark:hover:bg-orange-300 inline-flex h-8 w-8"
                            aria-label="Close"
                            onClick={() => setStatus(false)}
                          >
                            <span className="sr-only">Dismiss</span>
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
                          </button>
                        </div>
                      ) : null}
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Consultar CEP
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                        dark:shadow-sm-light"
                        name="tracking"
                        placeholder="Exemplo: 00000-000"
                      />
                    </div>
                    <div className="flex items-center justify-end rounded-b">
                      <button
                        type="submit"
                        name="TrackCEP"
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                      focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
                      text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Consultar
                      </button>
                    </div>
                  </form>
                </div>
                <div className="lg:pl-8 w-full lg:w-1/2 flex flex-col lg:flex-row items-start lg:items-center">
                  <ResultCEP events={events} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultaCEP;
