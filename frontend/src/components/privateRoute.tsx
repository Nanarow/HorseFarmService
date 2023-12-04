import { useAuth } from "@src/providers/authProvider";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  role: "admin" | "employee" | "user";
  path?: string;
};

const PrivateRoute = ({ role, path = "/login" }: Props) => {
  const { user, employee } = useAuth();
  if ((role === "admin" || role === "user") && !user) {
    return <Navigate to={path} replace />;
  }
  if (role === "employee" && !employee) {
    return <Navigate to={path} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
