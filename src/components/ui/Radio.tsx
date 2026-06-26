import * as React from 'react';
import { cn } from '../../lib/utils';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, id, disabled, ...props }, ref) => {
    const uniqueId = id || React.useId();

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={uniqueId}
          className={cn(
            "inline-flex items-center gap-3 cursor-pointer select-none text-zinc-355 hover:text-[#FAFAFA] text-sm",
            disabled && "opacity-50 pointer-events-none"
          )}
        >
          <div className="relative flex items-center">
            <input
              id={uniqueId}
              type="radio"
              ref={ref}
              disabled={disabled}
              className="peer sr-only"
              {...props}
            />
            <div className="h-5 w-5 rounded-full border border-white/[0.08] bg-[#09090B] transition-all duration-200 peer-checked:border-[#6366F1] peer-focus-visible:ring-2 peer-focus-visible:ring-[#6366F1]/40 flex items-center justify-center hover:border-white/[0.16]">
              <div className="h-2.5 w-2.5 rounded-full bg-[#6366F1] scale-0 transition-transform duration-200 peer-checked:scale-100" />
            </div>
          </div>
          {label && <span className="font-medium select-none">{label}</span>}
        </label>
        {error && <span className="text-xs font-medium text-rose-400 pl-8">{error}</span>}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
