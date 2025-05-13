import { useField, useFormikContext } from "formik";

export default function CheckboxGroupField({
  label,
  name,
  options = [],
  required,
}) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const valueArray = field.value || [];
  const hasError = meta.touched && meta.error;

  const handleChange = (checkedValue) => {
    if (valueArray.includes(checkedValue)) {
      setFieldValue(
        name,
        valueArray.filter((v) => v !== checkedValue)
      );
    } else {
      setFieldValue(name, [...valueArray, checkedValue]);
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block font-medium text-sm text-content-400 mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <div className="grid grid-cols-2 gap-3">
        {options.map((option, idx) => (
          <label
            key={idx}
            className="capitalize flex cursor-pointer items-center gap-2 text-content-200 text-sm"
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={valueArray.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="form-checkbox text-blue-600 size-3"
            />
            {option.label}
          </label>
        ))}
      </div>

      {hasError && (
        <div className="text-red-700 text-sm mt-1.5">{meta.error}</div>
      )}
    </div>
  );
}
