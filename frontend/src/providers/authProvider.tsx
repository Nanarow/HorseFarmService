import { Employee, User } from "@src/interfaces";
import { http } from "@src/services/httpRequest";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type AuthContextProps = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  employee: Employee | undefined;
  setEmployee: React.Dispatch<React.SetStateAction<Employee | undefined>>;
  LogOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | null>(null);
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
}
const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const [employee, setEmployee] = useState<Employee>();
  const LogOut = async () => {
    const res = await http.Post("/logout", {});
    if (res.ok) {
      setEmployee(undefined);
      setUser(undefined);
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, employee, setEmployee, LogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
