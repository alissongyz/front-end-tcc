/* eslint-disable jsx-a11y/anchor-is-valid */
import { IconContext } from "react-icons/lib";
import { FaLastfmSquare } from "react-icons/fa";
import api from "../../utils/api";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as VscIcons from "react-icons/vsc";

export default function Login() {
  const navigate = useNavigate();

  const [status, setStatus] = useState(false);

  const [userSelected, setUserSelected] = useState({
    username: "",
    password: "",
  });

  /* LÓGICA DE VISUALIZAR A SENHA NO FORMULÁRIO */
  const inputRef = useRef(null);
  const [eyeIsClosed, setEyeState] = useState(false);

  const toggleShow = () => {
    if (inputRef.current.type === "password") {
      setEyeState(true);
      inputRef.current.type = "text";
    } else {
      setEyeState(false);
      inputRef.current.type = "password";
    }
  };

  const autenticateUser = async () => {
    await api
      .post("auth/login", userSelected)
      .then((res) => {
        localStorage.setItem("x-access-token", res.data.token);
        localStorage.setItem("x-access-type", res.data.objectToResponse.role);

        navigate("/material");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          return setStatus({
            type: "error",
            mensagem: `Erro: É necessário informar um nome de usuário válido.`,
          });
        }
        if (error.response.status === 400) {
          return setStatus({
            type: "error",
            mensagem: "Erro: Senha inválida, tente novamente.",
          });
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserSelected({
      ...userSelected,
      [name]: value,
    });
  };

  return (
    <>
      <div className="flex items-center justify-center py-20">
        <div className="max-w-md w-full space-y-8">
          <div>
            <FaLastfmSquare className="mx-auto h-12 w-auto" color="#2D8AE0" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Entre com a sua conta
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            {status ? (
              <div
                id="alert-border-2"
                className="flex p-4 mb-4 bg-red-100 border-t-4 border-red-500 dark:bg-red-200"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-red-700"
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
                <div className="ml-3 text-sm font-medium text-red-700">
                  {status.mensagem}
                </div>
                <button
                  type="button"
                  className="ml-auto -mx-1.5 -my-1.5 bg-red-100 dark:bg-red-200 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:hover:bg-red-300 inline-flex h-8 w-8"
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
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="col-span-6 sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                  Nome de Usuário
                </label>
                <div className="md:flex items-center justify-center">
                  <input
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                          sm:text-sm rounded-md block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                           dark:placeholder-gray-400 dark:text-white"
                    name="username"
                    onChange={handleChange}
                    placeholder="Nome de usuário"
                  />
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                  Senha
                </label>
                <div className="md:flex items-center justify-center">
                  <input
                    ref={inputRef}
                    type="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                          sm:text-sm rounded-l block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                           dark:placeholder-gray-400 dark:text-white"
                    name="password"
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  <button className="button" onClick={toggleShow}>
                    {eyeIsClosed ? (
                      <VscIcons.VscEye />
                    ) : (
                      <VscIcons.VscEyeClosed />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2D8AE0] active:bg-[#2D8AE0] hover:bg-[#2E66FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => autenticateUser()}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <IconContext.Provider
                    value={{ color: "#5e5e60" }}
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
