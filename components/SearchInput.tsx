import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getInputType } from '@/lib/binCodes';
import { formatPhoneInput, formatCardInput } from '@/lib/inputMasks';
import { QRCodeIcon, CrossIcon } from './icons';
import { IconButton } from './IconButton';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  variant?: 'default' | 'onboarding';
  isVisible?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Телефон, имя, карта или платеж",
  className,
  autoFocus = false,
  variant = 'default',
  isVisible = true
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [firstSymbol, setFirstSymbol] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Автоматический фокус при открытии шторки
  useEffect(() => {
    if (autoFocus && isVisible && inputRef.current) {
      // Небольшая задержка для корректной работы анимации
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [autoFocus, isVisible]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    setFirstSymbol(null);
    onChange('');
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Если поле пустое - сбрасываем первый символ
    if (newValue === '') {
      setFirstSymbol(null);
      onChange('');
      return;
    }
    
    // Если вводим первый символ
    if (value === '' && newValue.length === 1) {
      if (newValue === '+' || newValue === '7' || newValue === '8' || newValue === '9') {
        setFirstSymbol(newValue);
        onChange('+7');
        return;
      }
    }
    
    // Если удаляем до первого символа
    if (newValue === firstSymbol && value === '+7') {
      onChange(newValue);
      return;
    }
    
    // Если удаляем первый символ полностью
    if (newValue === '' && firstSymbol) {
      setFirstSymbol(null);
      onChange('');
      return;
    }
    
    const inputType = getInputType(newValue);
    
    let formattedValue = newValue;
    
    // Применяем маски в зависимости от типа ввода
    if (inputType === 'phone') {
      formattedValue = formatPhoneInput(newValue);
    } else if (inputType === 'card') {
      // Применяем маску карты только для известных BIN кодов и только при 6+ цифрах
      const digitsOnly = newValue.replace(/\D/g, '');
      if (digitsOnly.length >= 6) {
        formattedValue = formatCardInput(newValue);
      } else {
        // При <6 цифрах возвращаем только цифры без пробелов
        // Принудительно удаляем все пробелы из маски
        formattedValue = digitsOnly;
      }
    } else if (inputType === 'requisites') {
      // Для реквизитов НЕ применяем маску карты
      formattedValue = newValue;
    } else {
      // Для other (буквы) - убираем все маски
      formattedValue = newValue;
    }
    
    onChange(formattedValue);
  };

  const getLabel = () => {
    if (value.length === 0) return null;
    
    const inputType = getInputType(value);
    const digitsOnly = value.replace(/\D/g, '');
    
    switch (inputType) {
      case 'phone':
        // Если номер телефона превышает максимальную длину маски (+7 000 000-00-00 = 11 цифр всего, включая +7)
        if (digitsOnly.length > 11) {
          return null; // Отключаем лейбл
        }
        return 'По телефону';
      case 'card':
        // Если номер карты превышает максимальную длину маски (16 цифр)
        if (digitsOnly.length > 16) {
          return 'По реквизиту';
        }
        return 'По карте';
      case 'requisites':
        // Если меньше 6 цифр - показываем "По карте или реквизиту"
        if (digitsOnly.length < 6) {
          return 'По карте или реквизиту';
        }
        return 'По реквизиту';
      default:
        return null; // Для букв и символов лейбл не показываем
    }
  };

  const getInputMode = (): "text" | "numeric" | "tel" | "search" => {
    // Всегда QWERTY клавиатура
    return "text";
  };

  const showClearButton = value.length > 0;
  const label = getLabel();

  // Стили для онбординга
  const iconColorClass = variant === 'onboarding' 
    ? 'text-white' 
    : showClearButton ? 'text-[#9299a2]' : 'text-[#428bf9]';
  
  const placeholderColorClass = variant === 'onboarding' 
    ? 'placeholder-white/70' 
    : 'placeholder-[#9299a2]';
  
  const caretColorClass = variant === 'onboarding' 
    ? 'caret-white' 
    : 'caret-[#428BF9]';
  
  const borderClass = variant === 'onboarding' 
    ? 'border-t border-t-white/30 border-t-[1px]' 
    : '';

  return (
    <div className={cn("bg-[rgba(0,16,36,0.06)] relative rounded-[16px] size-full", borderClass, className)}>
      {/* IconButton - абсолютное позиционирование справа */}
      <div className="absolute h-[56px] right-0 top-0 w-[48px]">
        <IconButton
          onClick={showClearButton ? handleClear : undefined}
          size="md"
          className="w-12 h-14"
        >
          {showClearButton ? (
            <CrossIcon size={24} className={iconColorClass} />
          ) : (
            <QRCodeIcon size={24} className={iconColorClass} />
          )}
        </IconButton>
      </div>
      
      {/* TextContainer - абсолютное позиционирование слева */}
      <div className="absolute flex flex-col gap-[2px] h-[56px] items-start justify-center left-[12px] top-0 w-[283px]">
        {/* Label */}
        {label && (
          <div className="text-[#9299a2] text-[13px] tracking-[-0.08px] leading-[16px] w-full">
            {label}
          </div>
        )}
        
                {/* Input field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={value}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={label ? "" : placeholder}
                  inputMode={getInputMode()}
                  className={cn("w-full bg-transparent text-[17px] text-[#333333] tracking-[-0.41px] leading-[20px] focus:outline-none", placeholderColorClass, caretColorClass)}
                />
      </div>
    </div>
  );
};
