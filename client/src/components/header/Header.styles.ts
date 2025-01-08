import styled from "styled-components";

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
`;

export const Logo = styled.h3`
  font-size: 2.5rem;

`;
