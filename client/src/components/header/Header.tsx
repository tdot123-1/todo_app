import { Link, NavLink } from "react-router-dom";
import { Logo, StyledHeader, StyledLink, StyledNavbar } from "./Header.styles";
import {
  IconClipboardCheck,
  IconClipboardList,
  IconClipboardPlus,
  IconHome,
} from "@tabler/icons-react";
import { theme } from "../../styles";

const navlinks = [
  {
    page: "Home",
    href: "/",
    icon: IconHome,
  },
  {
    page: "Tasks",
    href: "/tasks",
    icon: IconClipboardList,
  },
  {
    page: "Create",
    href: "/tasks/create",
    icon: IconClipboardPlus,
  },
];

const Header = () => {
  return (
    <>
      <StyledHeader>
        <Link to={"/"}>
          <Logo>
            <IconClipboardCheck size={theme.iconSizes.logo} />
            <h3>TODO</h3>
          </Logo>
        </Link>
        <StyledNavbar>
          {navlinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end
              style={({ isActive }) =>
                isActive
                  ? { fontWeight: "bold" }
                  : {
                      textDecoration: "underline",
                    }
              }
            >
              <StyledLink>
                <link.icon size={theme.iconSizes.nav} />
                {link.page}
              </StyledLink>
            </NavLink>
          ))}
        </StyledNavbar>
      </StyledHeader>
    </>
  );
};

export default Header;
