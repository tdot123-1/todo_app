import styled from "styled-components";
import { theme } from "../../styles";

export const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: #1f1f1f;
  margin: 2rem 0;

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
    padding: 2rem;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 2rem;
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    padding: 2rem;
  }
`;

export const EmptyTasksList = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
