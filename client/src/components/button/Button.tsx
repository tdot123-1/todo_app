import { StyledButton } from "./Button.styles";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean
}

export const Button = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <StyledButton type={type} $variant={variant} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};
