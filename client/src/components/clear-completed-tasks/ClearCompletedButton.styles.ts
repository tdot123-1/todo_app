import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: end;
`;

export const ErrorMessage = styled.p`
  color: ${(props) => props.theme.dangerColor};
  font-style: italic;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;
