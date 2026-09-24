function InputField({
  label,
  value,
  onChange,
  type = "number",
  placeholder = "",
  min,
  max,
  step = "any",
  unit = "",
  required = false,
  disabled = false,
}) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">
        {label}

        {unit && (
          <span className="text-muted ms-1">
            ({unit})
          </span>
        )}
      </label>

      <input
        type={type}
        className="form-control"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}

export default InputField;