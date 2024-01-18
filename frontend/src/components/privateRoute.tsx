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
  const state = { from: pathname, status: 403 };

  return !isLoggedIn() ? (
    <Navigate to={path} state={state} replace />
  ) : role ? (
    getUser().RoleID !== role ? (
      <Navigate to={"/"} state={state} replace />
    ) : (
      <Outlet />
    )
  ) : getEmployee().PositionID !== position ? (
    <Navigate to={"/"} state={state} replace />
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;

// import { Outlet } from "react-router-dom";
// const PrivateRoute = (_: any) => {
//   return <Outlet />;
// };
// export default PrivateRoute;
