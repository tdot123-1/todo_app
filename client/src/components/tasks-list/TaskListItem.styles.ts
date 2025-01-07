import styled from "styled-components";

export const TaskContainer = styled.div`
  background-color: #8a9ad4;
  border-radius: 10px;
  padding: 1rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px); /* Lift effect on hover */
  }
`;

export const TaskContainerText = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 0.5rem 0;
`
