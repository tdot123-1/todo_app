import styled from "styled-components";

export const LoadingContainer = styled.div`
  padding: 1rem;
  border-radius: 10px;
  background-color: #1f1f1f;
  margin: 0.5rem 0 2rem;
  min-height: 25rem;
  color: ${(props) => props.theme.tertiaryColor};
`;
