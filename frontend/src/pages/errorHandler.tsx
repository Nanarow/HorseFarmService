import { Button } from "@shadcn/ui";
import { FallbackProps } from "react-error-boundary";

const ErrorHandler = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="error-page min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-semibold text-red-600 mb-4">
          Error !!! 🌍
        </h1>
        <p className="text-2xl text-primary font-semibold">
          Message: {error.message}
        </p>
        <Button className="mt-4" onClick={resetErrorBoundary}>
          Reload Page
        </Button>
      </div>
    </div>
  );
};

export default ErrorHandler;
