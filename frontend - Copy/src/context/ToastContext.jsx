import {
createContext,
useCallback,
useContext,
useMemo,
useState,
} from "react";

import Toaster from "../components/ui/Toaster";

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
const [toasts, setToasts] = useState([]);

const remove = useCallback((id) => {
setToasts((currentToasts) =>
currentToasts.filter((toast) => toast.id !== id),
);
}, []);

const push = useCallback(
(message, variant = "info", duration = 4000) => {
const id = ++toastId;
  setToasts((currentToasts) => [
    ...currentToasts,
    {
      id,
      message,
      variant,
    },
  ]);

  if (duration > 0) {
    setTimeout(() => {
      remove(id);
    }, duration);
  }

  return id;
},
[remove],

);

const toast = useMemo(
() => ({
success: (message) => push(message, "success"),
error: (message) => push(message, "error"),
info: (message) => push(message, "info"),
}),
[push],
);

return (
<ToastContext.Provider value={toast}>
{children}

  <Toaster
    toasts={toasts}
    onClose={remove}
  />
</ToastContext.Provider>

);
}

export function useToast() {
const context = useContext(ToastContext);

if (!context) {
throw new Error("useToast must be used within <ToastProvider>");
}

return context;
}
