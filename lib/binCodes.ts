// BIN коды карт для определения типа платежа
export const CARD_BIN_CODES = [
  '220222', // Первый BIN код
  // Здесь можно добавить другие BIN коды
];

// Функция для проверки BIN кода
export const checkBinCode = (input: string): boolean => {
  const firstSixDigits = input.replace(/\D/g, '').slice(0, 6);
  return CARD_BIN_CODES.some(bin => firstSixDigits.startsWith(bin));
};

// Функция для определения типа ввода
export const getInputType = (input: string): 'phone' | 'card' | 'requisites' | 'other' => {
  const digitsOnly = input.replace(/\D/g, '');
  const hasLetters = /[a-zA-Zа-яА-Я]/.test(input);
  
  // Если есть буквы - убираем лейбл (other)
  if (hasLetters) {
    return 'other';
  }
  
  // Если есть символы кроме цифр, +, - и пробелов - убираем лейбл (other)
  const hasSpecialChars = /[^0-9+\-\s]/.test(input);
  if (hasSpecialChars) {
    return 'other';
  }
  
  if (digitsOnly.length === 0) {
    return 'other';
  }
  
  // Проверяем на телефон (7, 8, 9 или начинается с +)
  if (digitsOnly.startsWith('7') || digitsOnly.startsWith('8') || digitsOnly.startsWith('9') || input.startsWith('+')) {
    return 'phone';
  }
  
  // Проверяем на карту (ровно 6+ цифр)
  if (digitsOnly.length >= 6) {
    if (checkBinCode(digitsOnly)) {
      return 'card';
    } else {
      return 'requisites';
    }
  }
  
  // Если меньше 6 цифр и не телефон - "По карте или реквизиту"
  return 'requisites';
};
