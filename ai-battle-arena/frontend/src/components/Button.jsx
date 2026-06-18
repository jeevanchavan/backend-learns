import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Reusable Button component with primary (Indigo) and secondary variants.
 */
export function Button({ 
  children, 
  variant = "primary", 
  className, 
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
    secondary: "bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700 focus:ring-neutral-500",
    ghost: "bg-transparent hover:bg-neutral-800 text-neutral-300 hover:text-white focus:ring-neutral-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      className={twMerge(
        clsx(baseStyles, variants[variant], sizes.md, className)
      )}
      {...props}
    >
      {children}
    </button>
  );
}
