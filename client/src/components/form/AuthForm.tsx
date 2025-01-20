import { Link } from "react-router-dom";
import { Button } from "../button/Button";
import { ButtonContainer, ButtonContent } from "../button/Button.styles";
import {
  ErrorText,
  FormWrapper,
  Input,
  InputContainer,
  Label,
} from "./TaskForm.styles";
import { IconArrowBack, IconLogin } from "@tabler/icons-react";
import { theme } from "../../styles";

interface AuthFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  signup: boolean;
  isLoading: boolean;
  error: string;
}

const AuthForm = ({ onSubmit, signup, isLoading, error }: AuthFormProps) => {
  return (
    <FormWrapper>
      <form onSubmit={onSubmit}>
        <InputContainer>
          <Label>Username</Label>
          <Input
            name="username"
            id="username"
            type="text"
            required
            disabled={isLoading}
          />
        </InputContainer>
        {signup && (
          <InputContainer>
            <Label>Email Address</Label>
            <Input
              name="email"
              id="email"
              type="email"
              required
              disabled={isLoading}
            />
          </InputContainer>
        )}
        <InputContainer>
          <Label>Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            required
            disabled={isLoading}
          />
        </InputContainer>
        {signup && (
          <InputContainer>
            <Label>Confirm Password</Label>
            <Input
              name="confirm_password"
              id="confirm_password"
              type="password"
              required
              disabled={isLoading}
            />
          </InputContainer>
        )}
        <ButtonContainer>
          <Button variant="secondary" disabled={isLoading}>
            <Link to={`/`}>
              <ButtonContent>
                <IconArrowBack size={theme.iconSizes.button} />
                <span>Cancel</span>
              </ButtonContent>
            </Link>
          </Button>

          <Button type="submit" disabled={isLoading}>
            <ButtonContent>
              <IconLogin size={theme.iconSizes.button} />
              <span>{signup ? "Signup" : "Login"}</span>
            </ButtonContent>
          </Button>
        </ButtonContainer>
        {error && <ErrorText>{error}</ErrorText>}
      </form>
    </FormWrapper>
  );
};

export default AuthForm;
