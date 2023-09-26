import React from "react";

type InputProps = {
  label: string;
  id: string;
  isRequired?: boolean;
  className?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      label,
      id,
      isRequired = false,
      className = "",
      ...props
    }: InputProps,
    ref
  ) => {
    return (
      <>
        <div className="flex flex-col">
          <label className="text-slate-700" htmlFor={id}>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </label>
          <input
            className={`rounded-full border border-slate-300 px-2 h-9 text-slate-500 focus:outline-none focus:border-slate-600 read-only:bg-gray-200 ${className}`}
            id={id}
            ref={ref}
            {...props}
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
      </>
    );
  }
);

export default CustomInput;
