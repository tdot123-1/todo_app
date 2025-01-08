import styled from "styled-components";

export const StyledButton = styled.button<{
  $variant: "primary" | "secondary" | "danger" | "success";
}>`
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${(props) => {
    switch (props.$variant) {
      case "secondary":
        return props.theme.secondaryColor;
      case "danger":
        return props.theme.dangerColor;
      case "success":
        return props.theme.successColor;
      default:
        return props.theme.primaryColor;
    }
  }};

  color: ${(props) => props.theme.tertiaryColor};
  &:hover {
    opacity: 0.9;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
`;
