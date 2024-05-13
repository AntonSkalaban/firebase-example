import { User } from "firebase/auth";
import { ReactNode, createContext, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
  user: User | null;
  login: (data: User) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = useCallback((data: User) => {
    setUser(data);
    navigate("/chat");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
    }),
    [login, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
