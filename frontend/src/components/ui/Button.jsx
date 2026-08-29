import { Loader2 } from "lucide-react";

const VARIANTS = {
primary:
"bg-primary text-white shadow-sm hover:bg-primary-dark focus-visible:outline-primary",
secondary:
"bg-secondary text-white shadow-sm hover:bg-secondary-dark focus-visible:outline-secondary",
action:
"bg-action text-white shadow-sm hover:bg-action-dark focus-visible:outline-action",
outline:
"border border-border bg-transparent text-text hover:border-primary hover:text-primary focus-visible:outline-primary",
ghost:
"bg-transparent text-text-secondary hover:bg-surface-2 hover:text-text focus-visible:outline-primary",
danger:
"bg-danger text-white shadow-sm hover:opacity-90 focus-visible:outline-danger",
};

const SIZES = {
sm: "h-9 px-3.5 text-sm",
md: "h-11 px-5 text-sm",
lg: "h-12 px-6 text-base",
xl: "h-14 px-7 text-base",
};

function Button({
children,
variant = "primary",
size = "md",
loading = false,
disabled = false,
leftIcon = null,
rightIcon = null,
className = "",
type = "button",
...props
}) {
const isDisabled = disabled || loading;

return (
<button
type={type}
disabled={isDisabled}
className={[
"inline-flex items-center justify-center gap-2 rounded-xl",
"font-medium whitespace-nowrap",
"transition-all duration-200",
"focus-visible:outline-2 focus-visible:outline-offset-2",
"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
VARIANTS[variant] ?? VARIANTS.primary,
SIZES[size] ?? SIZES.md,
className,
].join(" ")}
{...props}
>
{loading ? ( <Loader2
       size={18}
       strokeWidth={2}
       className="animate-spin"
       aria-hidden="true"
     />
) : (
leftIcon
)}

  {children}

  {!loading && rightIcon}
</button>

);
}

export default Button;
