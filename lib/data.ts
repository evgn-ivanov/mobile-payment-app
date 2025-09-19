import { AvatarData } from '@/components/AvatarItem';

// Данные для аватаров с локальными изображениями
export const avatarData: AvatarData[] = [
  {
    name: "Мама",
    avatar: "/avatars/mama.png",
    type: "photo"
  },
  {
    name: "Олег Ремонт",
    avatar: "ОГ",
    type: "initials"
  },
  {
    name: "Андрей Дубковский",
    avatar: "/avatars/andrey.png",
    type: "photo"
  },
  {
    name: "Глеб Тренер",
    avatar: "/avatars/gleb.png",
    type: "photo"
  },
  {
    name: "Штрафы ГИБДД",
    avatar: "/avatars/gibdd.png",
    type: "photo",
    badge: 1
  },
  {
    name: "Оплата телефона",
    avatar: "/avatars/yota.png",
    type: "photo"
  },
  {
    name: "Себе на сбер",
    avatar: "/avatars/sber.png",
    type: "photo"
  },
  {
    name: "Между своими сче",
    avatar: "/avatars/MyAccounts.png",
    type: "photo"
  }
];

// Дополнительные данные для демонстрации
export const additionalAvatarData: AvatarData[] = [
  {
    name: "Анна Смирнова",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
    type: "photo"
  },
  {
    name: "Иван Петров",
    avatar: "ИП",
    type: "initials"
  },
  {
    name: "Коммунальные услуги",
    avatar: "🏠",
    type: "icon"
  },
  {
    name: "Интернет",
    avatar: "🌐",
    type: "icon"
  }
];

// Функция для фильтрации аватаров по поисковому запросу
export const filterAvatars = (avatars: AvatarData[], searchQuery: string): AvatarData[] => {
  if (!searchQuery.trim()) {
    return avatars;
  }
  
  const query = searchQuery.toLowerCase();
  return avatars.filter(avatar => 
    avatar.name.toLowerCase().includes(query)
  );
};
