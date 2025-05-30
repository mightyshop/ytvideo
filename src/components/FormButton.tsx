import React from 'react';

interface FormButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

const FormButton: React.FC<FormButtonProps> = ({
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  icon,
  children,
  variant = 'primary'
}) => {
  const baseStyles = 'flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default FormButton;