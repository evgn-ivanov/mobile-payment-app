import React from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon = "🔍", 
  title, 
  description, 
  className 
}) => {
  return (
    <div className={cn("text-center py-8", className)}>
      <div className="text-gray-400 text-4xl mb-4">{icon}</div>
      <p className="text-gray-500 text-lg font-medium mb-2">{title}</p>
      {description && (
        <p className="text-gray-400 text-sm">{description}</p>
      )}
    </div>
  );
};
