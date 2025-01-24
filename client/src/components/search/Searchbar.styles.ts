import styled from "styled-components";

export const SearchbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
`;

export const SearchInput = styled.input`
  padding: 0.5rem;
  border-radius: 10px;
  font-style: italic;
  font-size: 0.8rem;
  color: ${(props) => props.theme.textColor};
  border: none;
  width: full;
`;

export const SearchLabel = styled.label`
  font-size: 0.8rem;
  font-style: italic;
`;

export const OuterWrapper = styled.div`
  margin: 0 auto;
  width: fit-content;
  margin-top: 0.5rem;
`;
