import { useAuth } from "@src/providers/authProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = {
  role: "admin" | "employee" | "user";
  path?: string;
};

const PrivateRoute = ({ role, path = "/login" }: Props) => {
  const { user, employee } = useAuth();
  const { pathname } = useLocation();
  if ((role === "admin" || role === "user") && !user) {
    return <Navigate to={path} replace state={{ from: pathname }} />;
  }
  if (role === "employee" && !employee) {
    return <Navigate to={path} replace state={{ from: pathname }} />;
  }
  return <Outlet />;
};

// const PrivateRoute = ({}: Props) => {
//   const {} = useAuth();
//   return <Outlet />;
// };

export default PrivateRoute;
