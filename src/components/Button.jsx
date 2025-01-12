// src/components/Button.jsx
const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const baseClass = "px-4 py-2 rounded-lg font-medium transition";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
