import { Employee, User } from "@src/interfaces";
import { http } from "@src/services/httpRequest";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type Role = "user" | "employee" | "admin";
type AuthContextProps = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  employee: Employee | undefined;
  setEmployee: React.Dispatch<React.SetStateAction<Employee | undefined>>;
  logout: () => Promise<void>;
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
  const postLogout = async (role: Role) => {
    console.log("logout as ", role);
    const res = await http.Post("/logout/" + role, {});
    if (res.ok) {
      setEmployee(undefined);
      setUser(undefined);
    }
  };
  const logout = async () => {
    if (user) {
      if (user.RoleID === 101) {
        await postLogout("user");
      } else {
        await postLogout("admin");
      }
    }
    if (employee) {
      await postLogout("employee");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, employee, setEmployee, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
