/* eslint-disable jsx-a11y/anchor-is-valid */
import { IconContext } from "react-icons/lib";
import { FaLastfmSquare } from "react-icons/fa";
import api from "../../utils/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  let [passError, setPassError] = useState();
  let [userError, setUserError] = useState();

  const [userSelected, setUserSelected] = useState({
    username: "",
    password: "",
  });

  const autenticateUser = async () => {
    await api
      .post("auth/login", userSelected)
      .then((res) => {
        localStorage.setItem('x-access-token', res.data.token);
        setPassError();
        setUserError();
        navigate("/home");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setPassError(true);
        } else if (error.response.status === 401) {
          setUserError(true);
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
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="text-gray-500">
                  Nome de usuário:
                </label>
                <input
                  id="email-address"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                    userError ? "userError" : ""
                  }`}
                  placeholder="Digite seu nome de usuário aqui"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-gray-500">
                  Senha:
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                    passError ? "passError" : ""
                  }`}
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
