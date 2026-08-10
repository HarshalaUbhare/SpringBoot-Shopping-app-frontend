import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-primary to-accent2 text-primary-foreground shadow-glow-sm hover:shadow-glow hover:-translate-y-px",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm shadow-destructive/30 hover:bg-destructive/90 hover:shadow-md hover:shadow-destructive/40",
        outline:
          "border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-sm hover:bg-accent hover:border-primary/40 hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/70",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm:      "h-8 rounded-md px-3 text-xs",
        lg:      "h-11 rounded-lg px-6",
        icon:    "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, children, ...props }, ref) => {
  if (asChild) {
    return (
      <Slot className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
      </Slot>
    );
  }

  const showShine = !variant || variant === "default";
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
      {children}
      {showShine ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:animate-shine"
        />
      ) : null}
    </button>
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
