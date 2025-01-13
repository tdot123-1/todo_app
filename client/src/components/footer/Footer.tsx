import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconWorld,
} from "@tabler/icons-react";
import { FooterLi, FooterUl, StyledFooter } from "./Footer.styles";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <StyledFooter>
      <FooterUl>
        <FooterLi>
          <IconWorld /> TODO 2025
        </FooterLi>

        <Link target="_blank" to={"https://github.com/tdot123-1/todo_app"}>
          <FooterLi>
            <IconBrandGithub /> GitHub
          </FooterLi>
        </Link>

        <Link
          target="_blank"
          to={`https://www.linkedin.com/in/thomas-kruithof-webdev/`}
        >
          <FooterLi>
            <IconBrandLinkedin />
            LinkedIn
          </FooterLi>
        </Link>
      </FooterUl>
    </StyledFooter>
  );
};

export default Footer;
