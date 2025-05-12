import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

function Overlay({ children, isOpen, onClose, className }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer",
            className
          )}
          onClick={onClose}
        >
          {children && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full h-full flex items-center justify-center"
            >
              {children}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Overlay;
