import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

function Dropdown({
  renderOption,
  buttonLabel = "Select option",
  value,
  onChange,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedValue) => {
    onChange?.(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "cursor-pointer px-3 py-2 border border-content-400/20 focus:border-primary rounded w-full flex justify-between items-center focus:outline-none transition-all placeholder:text-sm",
          className
        )}
      >
        <span>{value || buttonLabel}</span>
        <FiChevronDown
          className={`ml-2 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-0.5 w-full bg-base-100 border border-content-400/20 rounded shadow-lg z-10"
          >
            {renderOption?.({
              select: handleSelect,
              close: () => setIsOpen(false),
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
