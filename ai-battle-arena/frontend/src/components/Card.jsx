import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Reusable Card component with clean, minimal borders and subtle background.
 */
export function Card({ children, className, ...props }) {
  return (
    <div
      className={twMerge(
        clsx("bg-neutral-900 border border-neutral-800 rounded-xl p-6", className)
      )}
      {...props}
    >
      {children}
    </div>
  );
}
