import styled from "styled-components";
import { theme } from "../../styles";

export const Select = styled.select`
  padding: 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
  color: ${(props) => props.theme.textColor};
  border: none;
`;

export const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
  flex-direction: column;

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

export const Label = styled.p`
  font-size: 0.8rem;
  font-style: italic;
`;
