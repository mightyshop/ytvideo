import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
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
        <select
          value={value}
          onChange={onChange}
          className={`w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white ${
            icon ? 'pl-10' : 'pl-3'
          } ${className}`}
          required={required}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormSelect;