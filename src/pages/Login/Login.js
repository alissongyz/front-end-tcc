/* eslint-disable jsx-a11y/anchor-is-valid */
import { IconContext } from "react-icons/lib";
import { FaLastfmSquare } from "react-icons/fa";
import api from "../../utils/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [status, setStatus] = useState(false);

  const [userSelected, setUserSelected] = useState({
    username: "",
    password: "",
  });

  const autenticateUser = async () => {
    await api
      .post("auth/login", userSelected)
      .then((res) => {
        localStorage.setItem("x-access-token", res.data.token);

        navigate("/home");
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
      <div className="flex items-center justify-end py-2 mr-6">
        {status ? (
          <div
            id="toast-danger"
            className="flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
          >
            <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Warning icon</span>
            </div>
            <div class="ml-3 text-sm font-normal">{status.mensagem}</div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-danger"
              aria-label="Close"
              onClick={() => setStatus(false)}
            >
              <span class="sr-only">Close</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
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
      </div>

      <div className="flex items-center justify-center py-20">
        <div className="max-w-md w-full space-y-8">
          <div>
            <FaLastfmSquare className="mx-auto h-12 w-auto" color="#2D8AE0" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Entre com a sua conta
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="text-gray-500">Nome de usuário:</label>
                <input
                  id="email-address"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Digite seu nome de usuário aqui"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-gray-500">Senha:</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                  rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Digite sua senha aqui"
                  onChange={handleChange}
                />
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
