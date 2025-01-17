import React, { createContext, ReactNode, useState } from "react";

interface SessionContextType {
  token: string | null | undefined;
  setToken: (token: string) => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

const SessionContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  // use effect to set token in storage
  // function to fetch with token
  // handle logout

  return (
    <SessionContext.Provider value={{ token, setToken }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
