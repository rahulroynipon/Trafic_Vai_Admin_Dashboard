import { cn } from "../../lib/utils";
import { ErrorMessage, useFormikContext } from "formik";
import { useState, useEffect } from "react";
import { IoCloudUpload, IoCloseSharp } from "react-icons/io5";

export default function ImageInputField({
  label,
  name,
  placeholder,
  className,
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
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={name}
          className="font-medium mb-1 text-sm text-gray-700"
        >
          {label}
        </label>
      )}

      {preview ? (
        <div
          className={cn(
            "mt-2 w-full h-36 p-5 flex justify-center items-center border border-gray-300 rounded-md",
            className
          )}
        >
          <div className="relative h-full ">
            <img
              src={preview}
              alt="Preview"
              className="object-contain h-full w-full max-h-full max-w-full rounded-md"
            />
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove image"
              className="absolute -top-2 -right-2 cursor-pointer flex items-center justify-center rounded-full bg-red-600 text-white p-1 hover:bg-red-700"
            >
              <IoCloseSharp className="text-base" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <label htmlFor={name} className="cursor-pointer">
            <div
              className={cn(
                "h-36 border text-gray-500 border-gray-300 rounded-md flex flex-col items-center justify-center ",
                className
              )}
            >
              <IoCloudUpload className="text-2xl" />
              <p className="text-xs leading-tight text-center ">
                Upload Image <br /> insert image from media library
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
        className="text-red-700 text-sm mt-1.5"
      />
    </div>
  );
}
