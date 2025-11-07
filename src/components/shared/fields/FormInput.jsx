const FormInput = ({
  type = "text",
  name,
  label,
  value,
  error,
  info,
  placeholder,
  isRequired,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium">
          {label} {isRequired ? "*" : null}
        </label>
      )}
      <input
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        className={`w-full h-10 px-4 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-300 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {info && <p className="text-xs text-gray-400">{info}</p>}
    </div>
  );
};

export default FormInput;
