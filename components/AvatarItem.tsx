import React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarData {
  name: string;
  avatar: string;
  badge?: number;
  type?: 'photo' | 'initials' | 'icon';
}

interface AvatarItemProps {
  data: AvatarData;
  onClick?: () => void;
  className?: string;
}

export const AvatarItem: React.FC<AvatarItemProps> = ({ data, onClick, className }) => {
  const renderAvatar = () => {
    if (data.type === 'initials') {
      return (
        <div className="w-14 h-14 bg-[rgba(0,16,36,0.22)] rounded-full flex items-center justify-center relative">
          <span className="text-white font-medium text-2xl uppercase leading-none">{data.avatar}</span>
        </div>
      );
    }
    
    if (data.type === 'icon') {
      return (
        <div className="w-14 h-14 bg-[#428bf9] rounded-full flex items-center justify-center relative">
          <div className="text-white text-xl">{data.avatar}</div>
          {data.badge && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#f52222] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">{data.badge}</span>
            </div>
          )}
        </div>
      );
    }
    
    // Default photo type
    return (
      <div className="w-14 h-14 rounded-full overflow-hidden relative">
        <img 
          src={data.avatar} 
          alt={data.name}
          className="w-full h-full object-cover"
        />
        {data.badge && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#f52222] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">{data.badge}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-[6px] w-full hover:opacity-80 transition-opacity mb-[18px]",
        className
      )}
    >
      <div className="px-2">
        {renderAvatar()}
      </div>
      <div 
        className="text-[12px] leading-[14px] w-[72px] h-[28px] overflow-hidden text-center text-[#333333]"
        style={{
          wordBreak: "break-word"
        }}
      >
        {data.name}
      </div>
    </button>
  );
};
