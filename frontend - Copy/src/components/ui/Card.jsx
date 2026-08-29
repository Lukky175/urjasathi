function Card({
children,
className = "",
padding = "md",
hover = false,
...props
}) {
const paddingClasses = {
none: "",
sm: "p-4",
md: "p-5 sm:p-6",
lg: "p-6 sm:p-8",
};

return (
<div
className={[
"rounded-card border border-border bg-surface",
"text-text shadow-card",
"transition-all duration-300",
hover
? "hover:-translate-y-0.5 hover:shadow-card-hover"
: "",
paddingClasses[padding] ?? paddingClasses.md,
className,
].join(" ")}
{...props}
>
{children} </div>
);
}

export default Card;
