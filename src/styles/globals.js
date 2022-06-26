import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background: #FFFFFF;
    color: #2D8AE0;
    font-family: 'Poppins', cursive;
    font-size: 16px;
    scroll-behavior:smooth;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
