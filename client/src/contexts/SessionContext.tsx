import React, { createContext, ReactNode, useEffect, useState } from "react";

interface SessionContextType {
  token: string | null;
  setToken: (token: string) => void;
  handleLogout: () => void;
  isAuthenticated: boolean;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

const SessionContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // if there is a token, set in storage, authenticate
  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
      setIsAuthenticated(true);
    }
  }, [token]);

  // on mount, check for local token, set token, authenticate
  useEffect(() => {
    const localToken = window.localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
      setIsAuthenticated(true);
    }
  }, []);

  const removeToken = () => {
    window.localStorage.removeItem("token");
  };

  // on log out, remove token and local token
  const handleLogout = () => {
    removeToken();
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <SessionContext.Provider
      value={{ token, setToken, handleLogout, isAuthenticated }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
