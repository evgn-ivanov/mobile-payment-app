import React from 'react';
import { cn } from '@/lib/utils';

interface IconButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  className,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-14', 
    lg: 'w-16 h-16'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center transition-colors",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
};
