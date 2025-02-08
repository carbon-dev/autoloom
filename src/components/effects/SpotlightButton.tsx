import React from 'react';
import { cn } from '../../utils/cn';

interface SpotlightButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const SpotlightButton = React.forwardRef<HTMLButtonElement, SpotlightButtonProps>(
  ({ children, className, ...props }, ref) => {
    const [position, setPosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(buttonRef.current);
        } else {
          ref.current = buttonRef.current;
        }
      }
    }, [ref]);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    return (
      <button
        ref={buttonRef}
        className={cn(
          'relative overflow-hidden bg-slate-900 px-6 py-3 rounded-lg text-white',
          'transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25',
          'group',
          className
        )}
        onMouseMove={handleMouseMove}
        {...props}
      >
        <div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(99,102,241,.1), transparent 40%)`,
          }}
        />
        <div className="relative z-10">{children}</div>
      </button>
    );
  }
);

SpotlightButton.displayName = 'SpotlightButton';