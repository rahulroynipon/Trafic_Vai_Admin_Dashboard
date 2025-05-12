import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

function AppLoader({ className }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        className="size-12 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
}

export default AppLoader;
