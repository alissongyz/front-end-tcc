const UpdatePassword = () => {
  return (
    <div className="w-full py-6">
      <div className="container mx-auto px-6 flex items-start justify-center">
        <div className="w-full">
          <div className="mx-auto w-full p-5 lg:p-10 bg-white dark:bg-gray-800 shadow rounded">
            <div className="flex flex-col lg:flex-row items-start lg:items-center mb-8">
              <h1 className="mr-12 text-xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold lg:w-1/2">
                Alterar senha
              </h1>
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center">
              <div className="w-full lg:w-1/2 pr-0 lg:pr-48">
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Digite sua senha antiga
                  </label>
                  <input
                    type="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                        dark:shadow-sm-light"
                    name="tracking"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col lg:flex-row items-end lg:items-center">
                <div className="w-full lg:pr-48">
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Digite sua nova senha
                    </label>
                    <input
                      type="password"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                        dark:shadow-sm-light"
                      name="tracking"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end rounded-b mr-44">
              <button
                type="submit"
                name="TrackCEP"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                      focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
                      text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
