// src/components/Badge.jsx
const Badge = ({ children, variant = "primary" }) => {
  const variants = {
    primary: "bg-blue-100 text-blue-600",
    success: "bg-green-100 text-green-600",
    warning: "bg-yellow-100 text-yellow-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
