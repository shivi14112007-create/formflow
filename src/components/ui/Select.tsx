import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: SelectOption[];
  error?: string;
  helpText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, children, error, helpText, id, disabled, ...props }, ref) => {
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
          <select
            id={uniqueId}
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full h-10 pl-3.5 pr-10 py-2 rounded-lg text-sm text-[#FAFAFA] bg-[#09090B] border border-white/[0.08] transition-all duration-200 outline-none hover:border-white/[0.16] hover:bg-[#111113] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 disabled:opacity-50 disabled:pointer-events-none appearance-none cursor-pointer",
              error && "border-rose-500/50 hover:border-rose-500 focus:border-rose-500 focus:ring-rose-500/20",
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#111113] text-[#FAFAFA]">
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-zinc-500">
            <svg
              className="h-4 w-4 animate-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
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

Select.displayName = 'Select';
