import "./Input.css";

function Input({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  mono = false,
  as = "input",
  rows = 3,
  maxLength,
}) {
  const Tag = as;

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <Tag
        id={id}
        type={as === "input" ? type : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={as === "textarea" ? rows : undefined}
        maxLength={maxLength}
        aria-label={label || placeholder}
        aria-live={error ? "polite" : undefined}
        className={`input-field ${mono ? "input-mono" : ""} ${error ? "input-error" : ""}`}
      />
      {error && (
        <span className="input-error-text" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;