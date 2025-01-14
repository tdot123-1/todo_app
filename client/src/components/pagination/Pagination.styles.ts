import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const PaginationLink = styled.div<{
  $active: boolean;
  $disabled?: boolean;
}>`
  border: none;
  border-radius: 10px;
  width: fit-content;
  padding: 0.5rem;
  font-weight: bold;
  background-color: ${(props) =>
    props.$active ? props.theme.primaryColor : props.theme.tertiaryColor};
  color: ${(props) =>
    props.$active ? props.theme.tertiaryColor : props.theme.primaryColor};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
`;
