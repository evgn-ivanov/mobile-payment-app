import React from 'react';
import { cn } from '@/lib/utils';

interface TopBarProps {
  onClose: () => void;
  className?: string;
  variant?: 'default' | 'onboarding';
}

export const TopBar: React.FC<TopBarProps> = ({ onClose, className, variant = 'default' }) => {
  const buttonColorClass = variant === 'onboarding' 
    ? 'text-white hover:text-gray-200' 
    : 'text-[#428bf9] hover:text-blue-700';

  return (
    <div className={cn("w-full h-[44px] flex items-center justify-start", className)}>
      <div className="w-[100px] h-[44px] flex items-center justify-start px-[16px]">
        <button
          onClick={onClose}
          className={cn(
            "font-['SF_Pro_Text:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[17px] text-nowrap tracking-[-0.41px] transition-colors",
            buttonColorClass
          )}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};
