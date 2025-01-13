import styled from "styled-components";
import { theme } from "../../styles";

export const StyledButton = styled.button<{
  $variant: "primary" | "secondary" | "danger" | "success";
}>`
  padding: 0.5rem 0.8rem;
  font-size: 0.7rem;
  font-weight: bold;
  border: none;
  width: 100%;
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

  @media (min-width: ${theme.breakpoints.sm}) {
    width: fit-content;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (min-width: ${theme.breakpoints.sm}) {
    flex-direction: row;
  }
`;

export const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;
