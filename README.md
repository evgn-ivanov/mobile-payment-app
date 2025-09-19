# Mobile Payment App

React-приложение с Next.js, TailwindCSS и shadcn/ui, имитирующее интерфейс мобильного платежного приложения.

## Особенности

- ✅ Главная страница с большой белой областью
- ✅ Кнопка с иконкой стрелки внизу по центру
- ✅ Модальное окно (BottomSheet) с анимацией снизу вверх
- ✅ TopBar с кнопкой "Закрыть"
- ✅ SearchBar с placeholder и иконкой QR
- ✅ Сетка AvatarItem с различными типами аватаров
- ✅ Анимации с framer-motion
- ✅ Адаптивный дизайн с TailwindCSS

## Структура компонентов

```
components/
├── TopBar.tsx          # Заголовок и кнопка закрытия
├── SearchBar.tsx       # Поле поиска
├── AvatarItem.tsx      # Аватарка + подпись
└── BottomSheet.tsx     # Контейнер модалки с анимацией
```

## Установка и запуск

1. Установите зависимости:
```bash
npm install
```

2. Запустите проект в режиме разработки:
```bash
npm run dev
```

3. Откройте [http://localhost:3000](http://localhost:3000) в браузере

## Данные

Приложение использует массив `avatarData` с объектами:
- `name`: string - имя/название
- `avatar`: string - URL фото, инициалы или эмодзи
- `type`: 'photo' | 'initials' | 'icon' - тип аватара
- `badge`: number (опционально) - число для бейджа

## Кастомизация

Все компоненты легко настраиваются:
- Стили через TailwindCSS классы
- Анимации через framer-motion
- Данные через props
- Типы через TypeScript интерфейсы

## Технологии

- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- Framer Motion
- Lucide React (иконки)
- shadcn/ui утилиты
