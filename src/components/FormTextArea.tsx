import React from 'react';

interface FormTextAreaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  className = ''
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-200">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 ${className}`}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormTextArea;