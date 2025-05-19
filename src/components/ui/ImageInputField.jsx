import { cn } from "../../lib/utils";
import { ErrorMessage, useFormikContext } from "formik";
import { useState, useEffect } from "react";
import { IoCloudUpload, IoCloseSharp } from "react-icons/io5";

export default function ImageInputField({
  label,
  name,
  placeholder,
  className,
  required,
}) {
  const { setFieldValue } = useFormikContext();
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setFieldValue(name, file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    setFieldValue(name, null);
    setPreview(null);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="flex  items-center flex-col w-full">
      {label && (
        <label
          htmlFor={name}
          className="font-medium mb-1 self-start text-sm text-content-400"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {preview ? (
        <div
          className={cn(
            "relative mt-2 w-36 h-36 border border-primary/30 ring-2 ring-primary/20 rounded-md overflow-hidden",
            className
          )}
        >
          <img
            src={preview}
            alt="Preview"
            className="object-cover w-full h-full"
          />
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove image"
            className="absolute top-1 right-1 cursor-pointer flex items-center justify-center rounded-full bg-red-600 text-white p-1 hover:bg-red-700"
          >
            <IoCloseSharp className="text-sm" />
          </button>
        </div>
      ) : (
        <>
          <label htmlFor={name} className="cursor-pointer mt-2">
            <div
              className={cn(
                "w-36 h-36 border border-dashed border-content-400/70 rounded-md flex flex-col items-center justify-center text-content-400/85 hover:border-primary hover:text-primary transition",
                className
              )}
            >
              <IoCloudUpload className="text-2xl mb-1" />
              <p className="text-xs text-center leading-tight px-2">
                Upload Image
              </p>
            </div>
          </label>
          <input
            name={name}
            type="file"
            accept="image/*"
            placeholder={placeholder}
            id={name}
            onChange={handleChange}
            className="hidden"
          />
        </>
      )}

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-700 text-sm mt-2"
      />
    </div>
  );
}
