import { IconMoodSad } from "@tabler/icons-react";
import { Wrapper } from "./NotFound.styles";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";
import { theme } from "../../styles";

const NotFoundComp = () => {
  return (
    <Wrapper>
      <IconMoodSad size={36} color={theme.primaryColor} />
      <h2>This page does not exist.</h2>
      <Link to={"/"}>
        <Button>Return Home</Button>
      </Link>
    </Wrapper>
  );
};

export default NotFoundComp;
