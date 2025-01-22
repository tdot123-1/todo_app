import { IconClipboardCheckFilled } from "@tabler/icons-react";
import { LogoWrapper, Wrapper } from "../components/textbox/Textbox.styles";
import Textbox from "../components/textbox/Textbox";
import { theme } from "../styles";

const firstItems = [
  {
    header: "Plan",
    text: `Plan your tasks and add them to your personal TODO list.`,
  },
  {
    header: "Organize",
    text: `Review your tasks, make updates, add deadlines and descriptions.`,
  },
];

const secondItems = [
  {
    header: "Prioritize",
    text: `Add priority levels to your tasks to help you stay on course. 
    Sort tasks by deadline or priority.`,
  },
  {
    header: "Complete",
    text: `Check completed tasks of your TODO list when finished.`,
  },
];

const Home = () => {
  return (
    <>
      <h1>TODO App</h1>
      <Wrapper>
        {firstItems.map((item) => (
          <Textbox key={item.header} header={item.header} text={item.text} />
        ))}
      </Wrapper>
      <LogoWrapper>
        <IconClipboardCheckFilled
          size={theme.iconSizes.lg}
          color={theme.primaryColor}
        />
      </LogoWrapper>
      <Wrapper>
        {secondItems.map((item) => (
          <Textbox key={item.header} header={item.header} text={item.text} />
        ))}
      </Wrapper>
    </>
  );
};

export default Home;
