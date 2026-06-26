import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, disabled, checked, ...props }, ref) => {
    const uniqueId = id || React.useId();

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={uniqueId}
          className={cn(
            "inline-flex items-start gap-3 cursor-pointer select-none text-zinc-350 hover:text-[#FAFAFA] text-sm",
            disabled && "opacity-50 pointer-events-none"
          )}
        >
          <div className="relative flex items-center mt-0.5">
            <input
              id={uniqueId}
              type="checkbox"
              ref={ref}
              disabled={disabled}
              checked={checked}
              className="peer sr-only"
              {...props}
            />
            <div className="h-5 w-5 rounded-md border border-white/[0.08] bg-[#09090B] transition-all duration-200 peer-checked:bg-[#6366F1] peer-checked:border-[#6366F1] peer-focus-visible:ring-2 peer-focus-visible:ring-[#6366F1]/40 flex items-center justify-center hover:border-white/[0.16] peer-checked:hover:bg-[#6366F1]/90">
              <svg
                className="h-3 w-3 text-white scale-0 transition-transform duration-200 peer-checked:scale-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          {label && <span className="font-medium select-none">{label}</span>}
        </label>
        {error && <span className="text-xs font-medium text-rose-400 pl-8">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
