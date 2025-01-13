import { Link, NavLink } from "react-router-dom";
import { Logo, StyledHeader, StyledNavbar } from "./Header.styles";

const navlinks = [
  {
    page: "Home",
    href: "/",
  },
  {
    page: "Tasks",
    href: "/tasks",
  },
  {
    page: "Create",
    href: "/tasks/create",
  },
];

const Header = () => {
  return (
    <>
      <StyledHeader>
        <Link to={"/"}>
          <Logo>TODO</Logo>
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
              {link.page}
            </NavLink>
          ))}
        </StyledNavbar>
      </StyledHeader>
    </>
  );
};

export default Header;
