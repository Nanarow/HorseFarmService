import { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

const useWindowError = () => {
  const { showBoundary } = useErrorBoundary();
  useEffect(() => {
    window.onerror = function (_msg, _url, _lineNo, _columnNo, error) {
      showBoundary(error);
    };
    return () => {
      window.onerror = null;
    };
  }, []);
};

export default useWindowError;
