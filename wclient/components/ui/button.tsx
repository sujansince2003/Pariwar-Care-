import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const base = "rounded-lg px-4 py-2 font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-[#5B9BD5] text-white hover:bg-blue-600"
      : "bg-white border border-[#5B9BD5] text-[#5B9BD5] hover:bg-[#5B9BD5] hover:text-white";

  return (
    <button className={`${base} ${styles} ${className} cursor-pointer`} {...props}>
      {children}
    </button>
  );
};
