# Документация компонентов

## Структура проекта

```
mobile-payment-app/
├── app/
│   ├── layout.tsx              # Корневой layout
│   └── page.tsx                # Главная страница
├── components/
│   ├── TopBar.tsx              # Заголовок модалки
│   ├── SearchBar.tsx           # Поле поиска
│   ├── AvatarItem.tsx          # Компонент аватара
│   ├── BottomSheet.tsx         # Модальное окно
│   └── EmptyState.tsx          # Пустое состояние
├── hooks/
│   ├── useBottomSheet.ts       # Хук для управления модалкой
│   └── useSearch.ts            # Хук для поиска
├── lib/
│   ├── utils.ts                # Утилиты
│   ├── data.ts                 # Данные
│   ├── constants.ts            # Константы
│   └── api.ts                  # API функции
├── types/
│   └── index.ts                # Типы TypeScript
└── styles/
    └── globals.css             # Глобальные стили
```

## Компоненты

### TopBar
Заголовок модального окна с кнопкой закрытия.

**Props:**
- `onClose: () => void` - функция закрытия модалки
- `className?: string` - дополнительные CSS классы

**Использование:**
```tsx
<TopBar onClose={handleClose} />
```

### SearchBar
Поле поиска с placeholder и иконкой QR.

**Props:**
- `value: string` - значение поля
- `onChange: (value: string) => void` - обработчик изменения
- `placeholder?: string` - placeholder текст
- `className?: string` - дополнительные CSS классы

**Использование:**
```tsx
<SearchBar 
  value={searchValue}
  onChange={setSearchValue}
  placeholder="Поиск..."
/>
```

### AvatarItem
Компонент аватара с подписью и бейджем.

**Props:**
- `data: AvatarData` - данные аватара
- `onClick?: () => void` - обработчик клика
- `className?: string` - дополнительные CSS классы

**Типы аватаров:**
- `photo` - фотография
- `initials` - инициалы
- `icon` - иконка/эмодзи

**Использование:**
```tsx
<AvatarItem 
  data={{
    name: "Иван Петров",
    avatar: "ИП",
    type: "initials"
  }}
  onClick={handleClick}
/>
```

### BottomSheet
Модальное окно с анимацией снизу вверх.

**Props:**
- `isOpen: boolean` - состояние открытия
- `onClose: () => void` - функция закрытия
- `children: React.ReactNode` - содержимое
- `className?: string` - дополнительные CSS классы

**Использование:**
```tsx
<BottomSheet isOpen={isOpen} onClose={handleClose}>
  <div>Содержимое модалки</div>
</BottomSheet>
```

### EmptyState
Компонент для отображения пустого состояния.

**Props:**
- `icon?: string` - иконка (эмодзи)
- `title: string` - заголовок
- `description?: string` - описание
- `className?: string` - дополнительные CSS классы

**Использование:**
```tsx
<EmptyState
  icon="🔍"
  title="Ничего не найдено"
  description="Попробуйте другой запрос"
/>
```

## Хуки

### useBottomSheet
Хук для управления состоянием модального окна.

**Возвращает:**
- `isOpen: boolean` - состояние открытия
- `open: () => void` - открыть модалку
- `close: () => void` - закрыть модалку
- `toggle: () => void` - переключить состояние

**Использование:**
```tsx
const { isOpen, open, close } = useBottomSheet();
```

### useSearch
Хук для работы с поиском.

**Параметры:**
- `data: AvatarData[]` - массив данных для поиска

**Возвращает:**
- `searchValue: string` - значение поиска
- `setSearchValue: (value: string) => void` - установить значение
- `clearSearch: () => void` - очистить поиск
- `filteredData: AvatarData[]` - отфильтрованные данные

**Использование:**
```tsx
const { searchValue, setSearchValue, filteredData } = useSearch(avatarData);
```

## Типы

### AvatarData
```tsx
interface AvatarData {
  name: string;           // Имя/название
  avatar: string;         // URL фото, инициалы или эмодзи
  badge?: number;         // Число для бейджа
  type?: AvatarType;      // Тип аватара
}
```

### AvatarType
```tsx
type AvatarType = 'photo' | 'initials' | 'icon';
```

## Кастомизация

### Стили
Все компоненты используют TailwindCSS классы и могут быть легко кастомизированы через props `className`.

### Анимации
Анимации настроены через framer-motion в компоненте `BottomSheet`. Можно изменить параметры в `lib/constants.ts`.

### Данные
Данные аватаров находятся в `lib/data.ts` и могут быть легко расширены или заменены на API вызовы.

### API интеграция
Примеры API функций находятся в `lib/api.ts` для будущего расширения функциональности.
