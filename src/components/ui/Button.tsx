import * as React from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const isActuallyDisabled = disabled || isLoading;

    // Base button structure matching premium Linear/Vercel aesthetic
    const baseStyle =
      "relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 select-none outline-none rounded-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    // Size styles
    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
    };

    // Variant styles
    const variantStyles = {
      primary:
        "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_-1px_0_rgba(0,0,0,0.3)_inset,0_2px_8px_rgba(99,102,241,0.25)] border border-indigo-600 active:scale-[0.98]",
      secondary:
        "bg-white/[0.03] border border-white/[0.08] text-zinc-200 hover:bg-white/[0.08] hover:text-white hover:border-white/[0.14] active:scale-[0.98]",
      ghost:
        "bg-transparent text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
      destructive:
        "bg-rose-600 text-white hover:bg-rose-500 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_-1px_0_rgba(0,0,0,0.3)_inset,0_2px_8px_rgba(244,63,94,0.25)] border border-rose-600 active:scale-[0.98]",
    };

    return (
      <motion.button
        ref={ref}
        disabled={isActuallyDisabled}
        whileTap={isActuallyDisabled ? {} : { scale: 0.98 }}
        className={cn(baseStyle, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center justify-center shrink-0 mr-1"
            >
              <svg
                className="animate-spin h-3.5 w-3.5 text-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left Icon (only if not loading, or depending on design) */}
        {!isLoading && leftIcon && (
          <span className="flex items-center justify-center shrink-0">{leftIcon}</span>
        )}

        <span className="truncate">{children}</span>

        {/* Right Icon */}
        {!isLoading && rightIcon && (
          <span className="flex items-center justify-center shrink-0">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
