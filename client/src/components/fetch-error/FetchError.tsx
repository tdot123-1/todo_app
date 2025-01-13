import { IconMoodSad } from "@tabler/icons-react";
import { Button } from "../button/Button";
import { Wrapper } from "./FetchError.styles";
import { theme } from "../../styles";

interface FetchErrorProps {
  handleRetry: () => void;
}

const FetchError = ({ handleRetry }: FetchErrorProps) => {
  return (
    <Wrapper>
      <IconMoodSad color={theme.primaryColor} size={36} />
      <p>Something went wrong!</p>
      <Button onClick={handleRetry}>Retry</Button>
    </Wrapper>
  );
};

export default FetchError;
