import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:     "border-transparent bg-gradient-to-r from-primary to-accent2 text-primary-foreground shadow-glow-sm",
        secondary:   "border-white/10 bg-secondary text-secondary-foreground",
        outline:     "border-border text-foreground",
        success:     "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
        info:        "border-sky-500/20 bg-sky-500/10 text-sky-400",
        warning:     "border-amber-500/20 bg-amber-500/10 text-amber-400",
        destructive: "border-red-500/20 bg-red-500/10 text-red-400",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const DOT_COLOR = {
  default: "bg-primary-foreground",
  success: "bg-emerald-400",
  info: "bg-sky-400",
  warning: "bg-amber-400",
  destructive: "bg-red-400",
};

function Badge({ className, variant, dot = false, children, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {dot ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", DOT_COLOR[variant] || DOT_COLOR.default)} />
          <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", DOT_COLOR[variant] || DOT_COLOR.default)} />
        </span>
      ) : null}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
