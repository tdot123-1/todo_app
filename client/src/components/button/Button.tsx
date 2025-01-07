import { StyledButton } from "./Button.styles";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  onClick?: () => void;
  type?: "button" | "submit";
}

export const Button = ({
  children,
  variant = "primary",
  onClick,
  type
}: ButtonProps) => {
  return (
    <StyledButton type={type ? type : "button"} variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
