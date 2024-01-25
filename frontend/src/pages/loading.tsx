import { Navigate, useLocation } from "react-router-dom";

const Loading = () => {
  const {
    state: { from },
  } = useLocation();
  return <Navigate to={`${from}`}></Navigate>;
};

export default Loading;
