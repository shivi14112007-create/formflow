import * as React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverEffect = false, children, ...props }, ref) => {
    const Component = hoverEffect ? motion.div : 'div';

    // Variant classes mapping to high-fidelity dashboard design
    const variantClasses = {
      default: "bg-[#111113] border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
      outlined: "bg-transparent border border-white/[0.06]",
      elevated: "bg-[#161619] border border-white/[0.12] shadow-[0_12px_32px_rgba(0,0,0,0.5)]",
    };

    const motionProps = hoverEffect
      ? {
          whileHover: { y: -4, transition: { duration: 0.2 } },
          className: cn(
            "rounded-[12px] transition-colors duration-300 hover:border-white/[0.16]",
            variantClasses[variant],
            className
          ),
        }
      : {
          className: cn(
            "rounded-[12px]",
            variantClasses[variant],
            className
          ),
        };

    return (
      <Component
        ref={ref as any}
        {...motionProps}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1.5 p-6 border-b border-white/[0.06]", className)} {...props}>
    {children}
  </div>
);

export const CardContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6", className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center p-6 border-t border-white/[0.06]", className)} {...props}>
    {children}
  </div>
);
