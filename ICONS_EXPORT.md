# Экспорт SVG иконок из Figma

## 📁 Папка для файлов
Создана папка: `public/icons/`

## 🎨 SVG иконки для экспорта

Экспортируйте из Figma в папку `public/icons/` со следующими именами:

### Основные иконки интерфейса
- `arrow-right.svg` - Стрелка вправо (кнопка открытия модалки)
- `qr-code.svg` - QR код (в поле поиска)
- `search.svg` - Иконка поиска (если нужна)
- `close.svg` - Иконка закрытия (если нужна)

### Иконки для аватаров (альтернатива PNG)
- `gibdd.svg` - Штрафы ГИБДД (с бейджем 1)
- `phone.svg` - Оплата телефона
- `self-sber.svg` - Себе на сбер
- `accounts.svg` - Между своими счетами

### Дополнительные иконки (если планируете использовать)
- `user.svg` - Пользователь
- `card.svg` - Банковская карта
- `wallet.svg` - Кошелек
- `transfer.svg` - Перевод
- `payment.svg` - Платеж
- `settings.svg` - Настройки
- `notification.svg` - Уведомления
- `help.svg` - Помощь

## 📋 Как экспортировать из Figma

1. Выделите каждую иконку в Figma
2. В правой панели найдите "Export"
3. Выберите формат **SVG**
4. Установите размер 1x (24px) или 2x (48px)
5. Нажмите "Export [имя файла]"
6. Сохраните в папку `public/icons/` с правильным именем

## ⚙️ Настройки экспорта SVG

### Рекомендуемые настройки:
- **Format**: SVG
- **Size**: 1x (24px) или 2x (48px)
- **Include "id" attribute**: ❌ (отключить)
- **Simplify stroke**: ✅ (включить)
- **Use current color**: ✅ (включить)

### Дополнительные настройки:
- **Minify**: ✅ (включить для уменьшения размера)
- **Remove unused groups**: ✅ (включить)

## ✅ Проверка

После экспорта структура должна быть:
```
public/
├── avatars/          # PNG/JPG аватары
│   ├── mama.jpg
│   ├── andrey.jpg
│   ├── gleb.jpg
│   ├── gibdd.png
│   ├── phone.png
│   ├── self-sber.png
│   └── accounts.png
└── icons/            # SVG иконки
    ├── arrow-right.svg
    ├── qr-code.svg
    ├── search.svg
    ├── close.svg
    ├── gibdd.svg
    ├── phone.svg
    ├── self-sber.svg
    ├── accounts.svg
    └── ... (другие иконки)
```

## 🔄 Обновление кода

### Текущее состояние:
- Проект использует библиотеку `lucide-react` для иконок
- Основные иконки: `ArrowRight`, `QrCode`, `Search`
- Аватары используют PNG/JPG изображения

### Возможные изменения:
1. **Заменить lucide-react на SVG файлы** (если нужно)
2. **Добавить SVG иконки для аватаров** (альтернатива PNG)
3. **Создать компонент Icon** для работы с SVG

## 📝 Пример использования SVG

```tsx
// Компонент для SVG иконок
import { cn } from '@/lib/utils';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, className }) => {
  return (
    <img
      src={`/icons/${name}.svg`}
      alt={name}
      width={size}
      height={size}
      className={cn("inline-block", className)}
    />
  );
};

// Использование
<Icon name="arrow-right" size={24} className="text-gray-800" />
<Icon name="qr-code" size={20} className="text-gray-400" />
```

## 🎯 Приоритеты экспорта

### Высокий приоритет (обязательно):
1. `arrow-right.svg` - основная кнопка
2. `qr-code.svg` - поле поиска

### Средний приоритет (рекомендуется):
3. `gibdd.svg` - для аватара
4. `phone.svg` - для аватара
5. `self-sber.svg` - для аватара
6. `accounts.svg` - для аватара

### Низкий приоритет (опционально):
7. Остальные иконки по необходимости

## 💡 Советы

1. **Консистентность**: Используйте одинаковый стиль для всех иконок
2. **Размеры**: Экспортируйте в нескольких размерах (1x, 2x)
3. **Цвета**: Используйте `currentColor` для гибкости стилизации
4. **Оптимизация**: Минимизируйте SVG для лучшей производительности
5. **Тестирование**: Проверьте иконки на разных размерах экрана
