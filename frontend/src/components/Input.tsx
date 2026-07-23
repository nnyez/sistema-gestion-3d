import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input({
  label, error, className = '', id, ...props
}, ref) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`w-full px-4 py-2.5 border-2 rounded-xl outline-none transition-all duration-200
          ${error
            ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
            : 'border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
          }
          bg-white hover:border-gray-300
          ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-600 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
