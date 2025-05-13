import { motion, AnimatePresence } from "framer-motion";
import Overlay from "./Overlay";
import { IoCloseSharp } from "react-icons/io5";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -50 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 50 },
};

export default function Modal({ children, onClose, isOpen, title = "" }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Overlay isOpen={true} onClose={onClose} className="z-0" />

          <motion.div
            variants={modalVariants}
            transition={{ duration: 0.25 }}
            className="relative z-10 bg-white p-5 rounded shadow-lg min-w-xs max-w-[30rem] w-full m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold italic">{title}</h1>
              <button
                onClick={onClose}
                className="size-8 flex items-center justify-center rounded-full p-1 
                cursor-pointer text-gray-700 hover:bg-gray-200 transition-colors duration-200"
              >
                <IoCloseSharp className="text-2xl" />
              </button>
            </div>
            <main className="mt-2">{children}</main>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
