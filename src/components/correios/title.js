function ResultSearch({ events }) {
  if (!events || events.length === 0) return null;
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <h1 className="mr-12 text-xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold">
          Resultado da Pesquisa
        </h1>
      </div>
    </>
  );
}

export default ResultSearch;
