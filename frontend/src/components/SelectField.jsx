function SelectField({
  label,
  value,
  onChange,
  options = [],
  unit = "",
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

      <select
        className="form-select"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        disabled={disabled}
      >
        {options.map((option) => {
          const item =
            typeof option === "string"
              ? {
                  value: option,
                  label: option,
                }
              : option;

          return (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectField;