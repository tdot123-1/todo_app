import { StyledButton } from "./Button.styles";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) => {
  return (
    <StyledButton variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
