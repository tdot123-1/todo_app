import styled from "styled-components";
import { theme } from "../../styles";

export const StyledFooter = styled.footer`
  padding: 1rem;
  margin: 0 auto;
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.tertiaryColor};
`;

export const FooterUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
  list-style: none;
  padding: 0;

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

export const FooterLi = styled.li`
    display: flex;
    align-items: center;
    gap: 0.1rem;
`;
