import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../ui/toast";
import { useToast } from "../ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && (
                <div className="flex items-center gap-4">
                  {props.variant === "destructive" && (
                    <XCircleIcon className="text-[#ec4f2c] " />
                  )}
                  {props.variant === "success" && (
                    <CheckCircle2Icon className="text-[#3ebe61] " />
                  )}
                  <ToastTitle>{title}</ToastTitle>
                </div>
              )}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
