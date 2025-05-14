import { cn } from "../../lib/utils";
import AppLoader from "../global/AppLoader";

export default function Button({
  type = "button",
  children,
  onClick,
  className = "",
  disabled = false,
  variant = "primary",
  isLoading = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "cursor-pointer duration-200 transition-all disabled:bg-content-400/50 disabled:cursor-not-allowed",
        variant === "primary" &&
          "focus-visible:ring-2 focus-visible:ring-primary/30 focus:outline-none bg-primary text-primary-content px-4 py-1.5 rounded shadow-sm hover:bg-primary/80",
        variant === "outline" &&
          "focus-visible:ring-2 focus-visible:ring-primary/30 focus:outline-none border border-primary text-primary px-4 py-1.5 rounded shadow-sm hover:bg-primary/10 ",
        variant === "icon" &&
          "size-6 flex items-center justify-center rounded-full p-0.5 text-content-400 hover:bg-primary/15 focus-visible:ring-2 focus-visible:ring-primary/30 focus:outline-none",
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <AppLoader
            className={cn(
              "size-4 border-2 border-base-300 border-t-transparent"
            )}
          />
          <span className="">please wait</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
