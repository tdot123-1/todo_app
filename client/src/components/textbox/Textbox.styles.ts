import styled from "styled-components";
import { theme } from "../../styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem 0 0.5rem;

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const TextHeader = styled.h3`
  color: ${(props) => props.theme.primaryColor};
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const StyledTextbox = styled.div`
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  border: 2px solid ${(props) => props.theme.primaryColor};
  width: fit-content;
  height: fit-content;

  @media (min-width: ${theme.breakpoints.sm}) {
    width: 20rem;
    height: 12rem;
  }
`;
