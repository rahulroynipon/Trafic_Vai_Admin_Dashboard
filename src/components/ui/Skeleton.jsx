import { cn } from "../../lib/utils";

function Skeleton({ className }) {
  return (
    <div
      className={cn(
        "max-w-40 w-full h-4 bg-content-400/30 rounded animate-pulse",
        className
      )}
    />
  );
}

export default Skeleton;
