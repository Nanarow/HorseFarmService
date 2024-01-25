import { useLocation, useNavigate } from "react-router-dom";

const useRefresh = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const refresh = () => {
    navigate("/loading", {
      replace: true,
      state: { from: location.pathname },
    });
  };
  return { refresh };
};

export default useRefresh;
