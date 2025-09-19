import React from 'react';
import { SearchInput } from './SearchInput';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  variant?: 'default' | 'onboarding';
  isVisible?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = "Телефон, имя, карта или платеж",
  className,
  autoFocus = false,
  variant = 'default',
  isVisible = true
}) => {
  return (
    <div className={cn("w-full h-[72px] px-4 py-2", className)}>
      <SearchInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-[56px]"
        autoFocus={autoFocus}
        variant={variant}
        isVisible={isVisible}
      />
    </div>
  );
};
