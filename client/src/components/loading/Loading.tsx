import { IconLoader } from "@tabler/icons-react";
import { Spinner, Wrapper } from "./Loading.styles";

const Loading = () => {
  return (
    <Wrapper>
      <p>Fetching data...</p>
      <Spinner>
        <IconLoader size={36} color="#8a9ad4" />
      </Spinner>
    </Wrapper>
  );
};

export default Loading;
