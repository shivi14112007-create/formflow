import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helpText, id, disabled, ...props }, ref) => {
    const uniqueId = id || React.useId();

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={uniqueId}
            className="text-xs font-semibold uppercase tracking-wider text-zinc-450 select-none"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={uniqueId}
            type={type}
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full h-10 px-3.5 py-2 rounded-[12px] text-sm text-[#FAFAFA] bg-[#09090B] border border-white/[0.08] placeholder-zinc-500 transition-all duration-200 outline-none hover:border-white/[0.16] hover:bg-[#111113] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 disabled:opacity-50 disabled:pointer-events-none",
              error && "border-rose-500/50 hover:border-rose-500 focus:border-rose-500 focus:ring-rose-500/20",
              className
            )}
            {...props}
          />
        </div>
        {error ? (
          <span className="text-xs font-medium text-rose-400 mt-0.5">{error}</span>
        ) : helpText ? (
          <span className="text-xs text-zinc-500 mt-0.5">{helpText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
