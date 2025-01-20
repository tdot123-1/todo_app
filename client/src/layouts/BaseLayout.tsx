import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import LogoutButton from "../components/logout/LogoutButton";

const BaseLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <LogoutButton />
      <Footer />
    </>
  );
};

export default BaseLayout;
