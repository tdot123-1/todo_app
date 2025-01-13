import { IconLoader } from "@tabler/icons-react";
import { Wrapper } from "./Loading.styles";
import { theme } from "../../styles";

const Loading = () => {
  return (
    <Wrapper>
      <p>Fetching data...</p>
      <IconLoader size={36} color={theme.primaryColor} />
    </Wrapper>
  );
};

export default Loading;
