import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-green text-cream hover:bg-green-600 focus-visible:ring-green shadow-sm",
        secondary:
          "border border-border bg-surface text-foreground hover:border-green/50 hover:text-green focus-visible:ring-green",
        ghost: "hover:bg-navy/5 text-foreground focus-visible:ring-navy",
        danger: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400",
        navy: "bg-navy text-cream hover:bg-navy-800 focus-visible:ring-navy",
        outline:
          "border border-navy/20 text-navy hover:bg-navy hover:text-cream focus-visible:ring-navy",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
