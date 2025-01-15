import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
`;

export const Spinner = styled.div`
  animation: spin 2s linear infinite;
  width: fit-content;

  @keyframes spin {
    from {
      transform: rotate(0deg); 
    }
    to {
      transform: rotate(360deg); 
    }
  }
`;
