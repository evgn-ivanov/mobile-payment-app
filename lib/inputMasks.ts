// Утилиты для работы с масками ввода

// Маска для телефона: +7[ ]000[ ]000-00-00
export const formatPhoneInput = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  const hasLetters = /[a-zA-Zа-яА-Я]/.test(value);
  
  // Если есть буквы - убираем маску
  if (hasLetters) {
    return value;
  }
  
  // Если введен только "+" - сразу возвращаем "+7"
  if (value === '+') {
    return '+7';
  }
  
  // Если введен только "7", "8" или "9" - сразу возвращаем "+7"
  if (value === '7' || value === '8' || value === '9') {
    return '+7';
  }
  
  if (digits.length === 0) return '';
  
  // Если начинается с +, 7, 8, 9 - добавляем +7
  if (value.startsWith('+') || digits.startsWith('7') || digits.startsWith('8') || digits.startsWith('9')) {
    const phoneDigits = digits.startsWith('7') ? digits.slice(1) : digits; // Убираем первую цифру только если начинается с 7
    
    if (phoneDigits.length === 0) return '+7';
    if (phoneDigits.length <= 3) return `+7 ${phoneDigits}`;
    if (phoneDigits.length <= 6) return `+7 ${phoneDigits.slice(0, 3)} ${phoneDigits.slice(3)}`;
    if (phoneDigits.length <= 8) return `+7 ${phoneDigits.slice(0, 3)} ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`;
    if (phoneDigits.length <= 10) return `+7 ${phoneDigits.slice(0, 3)} ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6, 8)}-${phoneDigits.slice(8)}`;
    
    // Если больше 10 цифр - убираем маску
    return `+7${phoneDigits}`;
  }
  
  return value;
};

// Маска для карты: 0000[ ]0000[ ]0000[ ]0000
export const formatCardInput = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  const hasLetters = /[a-zA-Zа-яА-Я]/.test(value);
  
  // Если есть буквы - убираем маску
  if (hasLetters) {
    return value;
  }
  
  if (digits.length === 0) return '';
  
  if (digits.length <= 4) return digits;
  if (digits.length <= 8) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  if (digits.length <= 12) return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`;
  if (digits.length <= 16) return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8, 12)} ${digits.slice(12)}`;
  
  // Если больше 16 цифр - убираем маску
  return digits;
};

// Функция для получения позиции курсора после форматирования
export const getCursorPosition = (oldValue: string, newValue: string, oldCursorPos: number): number => {
  const oldDigits = oldValue.replace(/\D/g, '');
  const newDigits = newValue.replace(/\D/g, '');
  
  if (newDigits.length > oldDigits.length) {
    // Добавление символов
    const addedDigits = newDigits.length - oldDigits.length;
    return Math.min(oldCursorPos + addedDigits, newValue.length);
  } else {
    // Удаление символов
    return Math.min(oldCursorPos, newValue.length);
  }
};
