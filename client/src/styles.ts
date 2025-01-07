import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0 2rem;
        background-color: ${(props) => props.theme.bgColor};
        font-family: Roboto, sans-serif;
        color: ${(props) => props.theme.textColor};
    }

    h1 {
        font-size: 3rem;
    }
    
    h2 {
        font-size: 2rem;
    }
    
    p {
        font-size: 1rem;
    }
`;

export const theme = {
  bgColor: "#d6d6d6",
  textColor: "#3d3d3d",
  primaryColor: "#021d54",
  secondaryColor: "#49525c",
};
