import { Link, NavLink } from "react-router-dom";
import { Logo, StyledHeader, StyledLink, StyledNavbar } from "./Header.styles";
import {
  IconClipboardCheck,
  IconClipboardList,
  IconClipboardPlus,
  IconHome,
  IconLogin,
  IconUser,
} from "@tabler/icons-react";
import { theme } from "../../styles";
import { useContext } from "react";
import { SessionContext } from "../../contexts/SessionContext";

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

// load different links for anonymous users
const secondaryNavlinks = [
  {
    page: "Home",
    href: "/",
    icon: IconHome,
  },
  {
    page: "Login",
    href: "/login",
    icon: IconLogin,
  },
  {
    page: "Signup",
    href: "/signup",
    icon: IconUser,
  },
];

const Header = () => {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("Session not provided");
  }

  const { isAuthenticated } = session;

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
          {isAuthenticated
            ? navlinks.map((link) => (
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
              ))
            : secondaryNavlinks.map((link) => (
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
