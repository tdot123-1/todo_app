import { useContext } from "react";
import { Button } from "../button/Button";
import { SessionContext } from "../../contexts/SessionContext";
import { LogoutButtonDiv, LogoutText } from "./LogoutButton.styles";
import { ButtonContent } from "../button/Button.styles";
import { IconLogout } from "@tabler/icons-react";
import { theme } from "../../styles";

const LogoutButton = () => {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("Error loading session");
  }

  const { handleLogout, isAuthenticated } = session;

  return (
    <>
      {isAuthenticated && (
        <LogoutButtonDiv>
          <Button variant={`secondary`} onClick={handleLogout}>
            <ButtonContent>
              <IconLogout size={theme.iconSizes.button} />
              <LogoutText>Logout</LogoutText>
            </ButtonContent>
          </Button>
        </LogoutButtonDiv>
      )}
    </>
  );
};

export default LogoutButton;
