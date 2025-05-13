import { cn } from "../../lib/utils";

export default function Button({
  type = "button",
  children,
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "focus-visible:ring-2 focus-visible:ring-primary/30 focus:outline-none bg-primary text-primary-content px-4 py-1.5 rounded shadow-sm transition duration-200 hover:bg-primary/80 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}
