import { Employee, User } from "@src/interfaces";
import { http } from "@src/services/httpRequest";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Role = "user" | "employee" | "admin";
type TLogin = {
  Email: string;
  Password: string;
};

type AuthContextProps = {
  isLoggedIn: () => boolean;
  getRole: () => Role;
  getUser: () => User;
  getEmployee: () => Employee;
  handleLogin: (role: Role, data?: TLogin) => Promise<void>;
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
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/home";

  const logout = async () => {
    const role = getRole();
    const res = await http.Post("/logout/" + role, {});
    if (res.ok) {
      setEmployee(undefined);
      setUser(undefined);
    }
  };

  const getUser = () => {
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  };

  const getEmployee = () => {
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  };

  const isLoggedIn = () => {
    if (user) {
      return true;
    }
    if (employee) {
      return true;
    }
    return false;
  };

  const getRole = () => {
    if (employee) {
      return "employee";
    }
    if (!user || (user && user.RoleID === 101)) {
      return "user";
    }
    return "admin";
  };

  const handleLogin = async (role: Role, data?: TLogin) => {
    if (role === "user" || role === "admin") {
      const org = role === "user" ? "/login" : "/login/admin";
      const res = await http.Post<User>(org, data || {});
      if (res.ok) {
        setUser(res.data);
        navigate(from, { replace: true });
      }
    } else if (role === "employee") {
      const res = await http.Post<Employee>("/login/employee", data || {});
      if (res.ok) {
        setEmployee(res.data);
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        getRole,
        getUser,
        getEmployee,
        handleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
