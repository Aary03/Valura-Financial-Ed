import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-xl border bg-surface px-4 py-2",
            "text-sm text-foreground placeholder:text-muted",
            "border-border transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-400 focus-visible:ring-red-400",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-red-500 ps-1">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
