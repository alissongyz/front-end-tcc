import GlobalStyle from "./styles/globals";
import PathRoutes from "./utils/routes";
import "tailwindcss/tailwind.css";

function App() {
  return (
    <div>
      <GlobalStyle />
      <PathRoutes />
    </div>
  );
}

export default App;
