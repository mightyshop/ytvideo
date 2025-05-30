import React from 'react';

interface FormCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  checked,
  onChange,
  className = ''
}) => {
  return (
    <label className={`flex items-center space-x-3 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-600 bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
      />
      <span className="text-sm text-gray-200">{label}</span>
    </label>
  );
};

export default FormCheckbox;