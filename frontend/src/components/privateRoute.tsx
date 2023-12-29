import { useAuth } from "@src/providers/authProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = {
  role?: 100 | 101;
  position?: 201 | 202 | 203 | 204 | 205;
  path: string;
};

const PrivateRoute = ({ role, position, path }: Props) => {
  const { getUser, getEmployee, isLoggedIn } = useAuth();
  const { pathname } = useLocation();
  if (role && isLoggedIn()) {
    if (getUser().RoleID == role) {
      return <Outlet />;
    } else {
      return <Navigate to={"/home"} replace state={{ from: pathname }} />;
    }
  }

  if (position && isLoggedIn()) {
    if (getEmployee().PositionID == position) {
      return <Outlet />;
    } else {
      return <Navigate to={"/home"} replace state={{ from: pathname }} />;
    }
  }

  return <Navigate to={path} replace state={{ from: pathname }} />;
};

// const PrivateRoute = ({}: Props) => {
//   return <Outlet />;
// };

export default PrivateRoute;
