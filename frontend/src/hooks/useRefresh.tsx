import { useLocation, useNavigate } from "react-router-dom";

const useRefresh = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const refresh = () => {
    navigate("/loading" + location.pathname, {
      replace: true,
    });
  };
  return { refresh };
};

export default useRefresh;
