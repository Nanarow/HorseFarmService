import { Navigate, useParams } from "react-router-dom";

const Loading = () => {
  const { page } = useParams();
  return <Navigate to={`/${page}`}></Navigate>;
};

export default Loading;
