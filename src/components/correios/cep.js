function ResultCEP({ events }) {
  if (!events || events.length === 0) return null;
  return (
    <>
      <div className="mx-auto w-full p-5 lg:p-10 bg-white dark:bg-gray-800 shadow rounded">
        <div className="mr-12 flex lg:block items-center lg:mr-6 xl:mr-12 mt-5 lg:mt-0">
          <p className="ml-2 lg:ml-0 text-gray-800 dark:text-gray-100 text-xl leading-5 text-center">
            {events.map((item) => (
              <p key={item.cep}>
                <span><b>Cidade -</b> {item.localidade}</span>
                <br />
                <span><b>Estado -</b> {item.uf}</span>
                <br />
                <span><b>Bairro -</b> {item.bairro}</span>
                <br />
                <span><b>Rua -</b> {item.logradouro}</span>
                <br />
                <span><b>CEP -</b> {item.cep}</span>
                <br />
                <span><b>Código IBGE -</b> {item.ibge}</span>
              </p>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}

export default ResultCEP;
