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

export const SearchError = styled.p`
  text-align: center;
  color: ${(props) => props.theme.dangerColor};
  font-style: italic;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

export const NoResultsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
  background-color: #1f1f1f;
  margin: 0.5rem 0 2rem;
  min-height: 28rem;
  color: #8a9ad4;
`;
