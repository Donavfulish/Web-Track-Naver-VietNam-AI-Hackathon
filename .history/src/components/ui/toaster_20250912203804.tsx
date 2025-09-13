import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from "./toast";
import { useToast } from "./use-toast";

export const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map((t, i) => (
        <Toast key={i} open>
          <ToastTitle>{t.title}</ToastTitle>
          {t.description && <ToastDescription>{t.description}</ToastDescription>}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
};
