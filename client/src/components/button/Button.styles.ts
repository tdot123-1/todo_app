import styled from "styled-components";

export const StyledButton = styled.button<{ variant: "primary" | "secondary" }>`
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === "secondary"
      ? props.theme.secondaryColor
      : props.theme.primaryColor};

  color: #ffffff;
  &:hover {
    opacity: 0.9;
  }
`;
