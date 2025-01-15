import styled from "styled-components";

export const TaskContainer = styled.div`
  position: relative;
  background-color: #8a9ad4;
  border-radius: 10px;
  padding: 1rem;
  transition: transform 0.2s;
  cursor: pointer;
  height: 11rem;
  overflow: auto;

  &:hover {
    transform: translateY(-2px); 
  }
`;

export const CheckBoxWrapper = styled.div`
  position: absolute;
  top: 2px; 
  right: 2px;
`

export const TaskContainerText = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 0.5rem 0;
`
