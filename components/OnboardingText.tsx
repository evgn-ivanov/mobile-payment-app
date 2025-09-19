import React from 'react';
import { cn } from '@/lib/utils';

interface OnboardingTextProps {
  className?: string;
  isSearchActive?: boolean;
}

export const OnboardingText: React.FC<OnboardingTextProps> = ({ className, isSearchActive = false }) => {
  // Скрываем текст если поиск активен
  if (isSearchActive) {
    return null;
  }

  return (
    <div className={cn("w-full pt-1 pb-3 px-4 flex flex-col items-center", className)}>
      <p className="text-[17px] tracking-[-0.41px] leading-[20px] text-white text-center">
        Все платежи и переводы
      </p>
      <p className="text-[17px] tracking-[-0.41px] leading-[20px] text-white text-center">
        в одной <span className="font-bold">умной строке</span>
      </p>
    </div>
  );
};
