import styled from "styled-components";

export const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: #1f1f1f;
  margin: 2rem 0; 

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
    padding: 2rem;
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 2rem;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    padding: 2rem;
  }
`;
