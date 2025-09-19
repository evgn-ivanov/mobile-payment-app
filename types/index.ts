// Типы для аватаров
export type AvatarType = 'photo' | 'initials' | 'icon';

export interface AvatarData {
  name: string;
  avatar: string;
  badge?: number;
  type?: AvatarType;
}

// Типы для компонентов
export interface TopBarProps {
  onClose: () => void;
  className?: string;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface AvatarItemProps {
  data: AvatarData;
  onClick?: () => void;
  className?: string;
}

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  className?: string;
}

// Типы для утилит
export type ClassValue = string | number | boolean | undefined | null | ClassValue[];

// Типы для анимаций
export interface AnimationVariants {
  initial: any;
  animate: any;
  exit: any;
}
