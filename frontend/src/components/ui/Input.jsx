import { forwardRef, useId } from "react";

const Input = forwardRef(
(
{
label,
error,
helperText,
leftIcon = null,
rightIcon = null,
id,
className = "",
containerClassName = "",
...props
},
ref,
) => {
const generatedId = useId();
const inputId = id ?? generatedId;
const errorId = `${inputId}-error`;
const helperId = `${inputId}-helper`;
const describedBy = [
  error ? errorId : null,
  !error && helperText ? helperId : null,
]
  .filter(Boolean)
  .join(" ") || undefined;

return (
  <div className={`w-full ${containerClassName}`}>
    {label && (
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-medium text-text"
      >
        {label}
      </label>
    )}

    <div className="relative">
      {leftIcon && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-text-muted"
        >
          {leftIcon}
        </span>
      )}

      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={[
          "h-11 w-full rounded-xl border bg-surface px-3.5",
          "text-sm text-text placeholder:text-text-muted",
          "transition-colors duration-200",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15",
          "disabled:cursor-not-allowed disabled:opacity-60",
          leftIcon ? "pl-10" : "",
          rightIcon ? "pr-10" : "",
          error
            ? "border-danger focus:border-danger focus:ring-danger/15"
            : "border-border",
          className,
        ].join(" ")}
        {...props}
      />

      {rightIcon && (
        <span
          className="absolute inset-y-0 right-3.5 flex items-center text-text-muted"
        >
          {rightIcon}
        </span>
      )}
    </div>

    {error && (
      <p
        id={errorId}
        role="alert"
        className="mt-1.5 text-sm text-danger"
      >
        {error}
      </p>
    )}

    {!error && helperText && (
      <p
        id={helperId}
        className="mt-1.5 text-sm text-text-muted"
      >
        {helperText}
      </p>
    )}
  </div>
);

},
);

Input.displayName = "Input";

export default Input;
