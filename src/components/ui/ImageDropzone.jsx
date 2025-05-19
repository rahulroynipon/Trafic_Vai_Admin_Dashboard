import React, { useEffect, useRef, useState } from "react";
import { useField, useFormikContext } from "formik";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { cn } from "../../lib/utils";

export default function ImageDropzone({
  name,
  label,
  required,
  className = "",
}) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const fileInputRef = useRef();
  const hasError = meta.touched && meta.error;
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (field.value && typeof field.value === "object") {
      const objectUrl = URL.createObjectURL(field.value);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [field.value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue(name, file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFieldValue(name, file);
    }
  };

  const clearImage = (e) => {
    e.stopPropagation();
    setFieldValue(name, "");
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="font-medium mb-1 text-sm text-content-400 block"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={cn(
          "relative w-full border-2 border-dashed rounded-md cursor-pointer transition overflow-hidden",
          hasError
            ? "border-red-500 bg-red-50"
            : "border-gray-200 hover:border-primary/50 hover:bg-blue-50",
          className
        )}
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full z-10"
              onClick={clearImage}
            >
              <FiX size={14} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-content-400 h-full p-6">
            <FiUploadCloud className="text-3xl text-blue-400 mb-2" />
            <p className="font-medium text-sm">Drop file or browse</p>
            <p className="text-xs text-content-300 mt-1">
              Format: .jpeg, .png • Max file size: 5 MB
            </p>
            <button
              type="button"
              className="cursor-pointer mt-3 px-4 py-1.5 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600"
            >
              Browse Files
            </button>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          name={name}
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {hasError && <p className="text-red-600 text-sm mt-1.5">{meta.error}</p>}
    </div>
  );
}
