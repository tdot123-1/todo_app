import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
      font-family: Roboto, sans-serif;
      color: ${(props) => props.theme.textColor};
    }

    main {
      padding: 1.5rem 1rem;
      background-color: ${(props) => props.theme.bgColor};
      min-height: 80vh;
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
  primaryColor: "#030f2b",
  secondaryColor: "#49525c",
  tertiaryColor: "#ebf0f5",
  dangerColor: "#de1421",
  successColor: "#14de32",
  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
  },
  iconSizes: {
    button: 20,
    nav: 24,
    logo: 50,
    md: 30,
  },
};

// reused styles
