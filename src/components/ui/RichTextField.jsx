import { useField } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { cn } from "../../lib/utils";

export default function RichTextField({
  label,
  name,
  required,
  className,
  placeholder,
  editorHeight = 150,
}) {
  const [field, meta, helpers] = useField(name);
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

      <div
        className={cn(
          "border rounded focus:outline-none w-full transition-all resize-none placeholder:text-sm",
          hasError
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-content-400/20 focus:border-primary focus:ring-2 focus:ring-primary/30",
          className
        )}
      >
        <Editor
          id={name}
          apiKey="s1k8ehsl3a9j2d96i2cd0xxssthi1q50yyl4b6nxkhzepflg"
          value={field.value}
          onEditorChange={(content) => helpers.setValue(content)}
          init={{
            height: editorHeight,
            menubar: false,
            branding: false,
            statusbar: false,
            plugins: [
              "advlist autolink lists link charmap anchor",
              "textcolor",
            ],
            toolbar:
              "undo redo | formatselect fontsizeselect | " +
              "bold italic underline forecolor backcolor | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | link | removeformat",
            placeholder: placeholder,
          }}
        />
      </div>

      {hasError && (
        <div className="text-red-700 text-sm mt-1.5">{meta.error}</div>
      )}
    </div>
  );
}
