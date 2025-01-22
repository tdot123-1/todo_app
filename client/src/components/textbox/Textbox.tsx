import { StyledTextbox, TextHeader } from "./Textbox.styles";

interface TextboxProps {
  header: string;
  text: string;
}

const Textbox = ({ header, text }: TextboxProps) => {
  return (
    <StyledTextbox>
      <TextHeader>{header}</TextHeader>
      <p>{text}</p>
    </StyledTextbox>
  );
};

export default Textbox;
