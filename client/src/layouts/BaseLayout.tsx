import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const BaseLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>TODO App 2025</p>
      </footer>
    </>
  );
};

export default BaseLayout;
