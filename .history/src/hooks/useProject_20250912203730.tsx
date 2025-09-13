import { useState } from "react";

interface ToastOptions {
  title: string;
  description?: string;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const toast = ({ title, description }: ToastOptions) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { title, description }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.title !== title));
    }, 4000);
  };

  return { toast, toasts };
};
