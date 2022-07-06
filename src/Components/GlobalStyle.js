import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        font-family: 'Raleway', sans-serif;
    }
    a{
        text-decoration: none;
    }

    body{
        background-color: #FFDAC6;
    }
   
`;

export default GlobalStyle;