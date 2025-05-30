import React from 'react';

interface FormInputProps {
  label: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  icon?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  step,
  className = '',
  icon
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-200">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 ${
            icon ? 'pl-10' : 'pl-3'
          } ${className}`}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
};

export default FormInput;