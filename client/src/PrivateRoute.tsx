import { ReactNode, useContext } from "react";
import { SessionContext } from "./contexts/SessionContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("Error loading session");
  }

  const { isAuthenticated } = session;

  // navigate to login if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to={`/login`} />;
  }

  return children;
};

export default PrivateRoute;
