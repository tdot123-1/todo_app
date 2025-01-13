import styled from "styled-components";
import { theme } from "../../styles";

export const StyledHeader = styled.header`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.tertiaryColor};
`;

export const StyledNavbar = styled.nav`
  display: flex;
  gap: 0.8rem;
  flex-direction: column;

  @media (min-width: ${theme.breakpoints.sm}) {
    flex-direction: row;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;

  flex-direction: column;

  @media (min-width: ${theme.breakpoints.sm}) {
    font-size: 2.2rem;
    flex-direction: row;
    gap: 0.1rem;
  }
`;

export const StyledLink = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;
