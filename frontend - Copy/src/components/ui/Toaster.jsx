import { CheckCircle2, Info, X, XCircle } from "lucide-react";

const VARIANT_CONFIG = {
success: {
icon: CheckCircle2,
title: "Success",
className:
"border-success/20 bg-success-tint text-success",
},
error: {
icon: XCircle,
title: "Error",
className:
"border-danger/20 bg-danger-tint text-danger",
},
info: {
icon: Info,
title: "Info",
className:
"border-primary/20 bg-primary-tint text-primary",
},
};

function Toaster({ toasts, onClose }) {
return ( <div
   aria-live="polite"
   aria-atomic="true"
   className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:bottom-6"
 >
{toasts.map((toast) => {
const config =
VARIANT_CONFIG[toast.variant] ?? VARIANT_CONFIG.info;
    const Icon = config.icon;

    return (
      <div
        key={toast.id}
        role="status"
        className={`pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-card backdrop-blur-md transition-all duration-300 ${config.className}`}
      >
        <Icon
          size={20}
          strokeWidth={2}
          className="mt-0.5 shrink-0"
          aria-hidden="true"
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">
            {config.title}
          </p>

          <p className="mt-1 text-sm text-text-secondary">
            {toast.message}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onClose(toast.id)}
          aria-label="Close notification"
          className="shrink-0 rounded-lg p-1 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          <X
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>
      </div>
    );
  })}
</div>

);
}

export default Toaster;
