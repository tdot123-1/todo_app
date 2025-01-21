import React, { createContext, ReactNode, useEffect, useState } from "react";
import { FetchedData } from "../types";

interface SessionContextType {
  token: string | null;
  setToken: (token: string) => void;
  handleLogout: () => void;
  isAuthenticated: boolean;
  fetchWithToken: (
    endpoint: string,
    method?: string,
    payload?: any
  ) => Promise<FetchedData>;
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

  const fetchWithToken = async (
    endpoint: string,
    method: string = "GET",
    payload?: any
  ): Promise<FetchedData> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        if (response.status === 404 || response.status === 401) {
          return { status: response.status, success: false };
        }
        throw new Error(`Response not ok: ${response.status}`);
      }

      const data = await response.json();
      return { data, success: true, status: response.status };
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw new Error(`Failed to fetch data: ${error}`);
    }
  };

  return (
    <SessionContext.Provider
      value={{ token, setToken, handleLogout, isAuthenticated, fetchWithToken }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
