import { useField } from "formik";
import { cn } from "../../lib/utils";

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  className,
  required,
}) {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={name}
          className="font-medium mb-1 text-sm text-content-400"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        {...field}
        type={type}
        placeholder={placeholder}
        id={name}
        className={cn(
          "px-3 py-2 border rounded focus:outline-none w-full transition-all placeholder:text-sm",
          hasError
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-content-400/20 focus:border-primary focus:ring-2 focus:ring-primary/30",
          className
        )}
      />

      {hasError && (
        <div className="text-red-700 text-sm mt-1.5">{meta.error}</div>
      )}
    </div>
  );
}
