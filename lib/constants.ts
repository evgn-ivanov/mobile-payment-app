// Константы для приложения

export const APP_CONFIG = {
  name: 'Mobile Payment App',
  description: 'A mobile payment application with bottom sheet interface',
  version: '1.0.0',
} as const;

export const SEARCH_CONFIG = {
  placeholder: 'Телефон, имя, карта или платеж',
  debounceMs: 300,
} as const;

export const ANIMATION_CONFIG = {
  bottomSheet: {
    duration: 0.3,
    damping: 25,
    stiffness: 200,
  },
  backdrop: {
    duration: 0.2,
  },
} as const;

export const UI_CONFIG = {
  avatarSize: 64, // 16 * 4 = 64px (w-16 h-16)
  gridColumns: 4,
  maxBottomSheetHeight: '80vh',
} as const;

export const COLORS = {
  primary: '#3b82f6', // blue-500
  secondary: '#6b7280', // gray-500
  success: '#10b981', // emerald-500
  warning: '#f59e0b', // amber-500
  error: '#ef4444', // red-500
} as const;
