import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Bubble {
  id: number;
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  zoneLeft: number;
  zoneTop: number;
  zoneWidth: number;
  zoneHeight: number;
  radius: number;
}

interface LavaLampProps {
  isSearchActive?: boolean;
}

export const LavaLamp: React.FC<LavaLampProps> = ({ isSearchActive = false }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Создаем 40 шариков
    const bubbleCount = 40;
    const newBubbles: Bubble[] = [];

    // Цвета на основе HSL(274, 88%, 66%) с вариациями Hue
    const colors = [
      // 85% шариков: Hue 274±15 (259-289)
      'hsl(259, 88%, 66%)', // фиолетовый
      'hsl(264, 88%, 66%)', // фиолетовый
      'hsl(269, 88%, 66%)', // фиолетовый
      'hsl(274, 88%, 66%)', // эталонный фиолетовый
      'hsl(279, 88%, 66%)', // фиолетовый
      'hsl(284, 88%, 66%)', // фиолетовый
      'hsl(289, 88%, 66%)', // фиолетовый
      // 15% шариков: переход к Hue 37±15 (22-52)
      'hsl(22, 88%, 66%)',  // оранжевый
      'hsl(27, 88%, 66%)',  // оранжевый
      'hsl(32, 88%, 66%)',  // оранжевый
      'hsl(37, 88%, 66%)',  // эталонный оранжевый
      'hsl(42, 88%, 66%)',  // оранжевый
      'hsl(47, 88%, 66%)',  // оранжевый
      'hsl(52, 88%, 66%)',  // оранжевый
    ];

    // Определяем границы CirclesZone (100% ширины экрана x 200px)
    const zoneWidth = window.innerWidth; // 100% ширины вьюпорта
    const zoneHeight = 200; // Высота зоны
    const zoneLeft = 0; // Начинаем с левого края экрана
    const zoneTop = 0; // Начинаем с верха экрана

    for (let i = 0; i < bubbleCount; i++) {
      const size = Math.random() * 30 + 150; // 150-180px
      // 85% шариков получают фиолетовые цвета (Hue 274±15), 15% - оранжевые (Hue 37±15)
      const isPurple = Math.random() < 0.85; // 85% вероятность
      const purpleColors = colors.slice(0, 7); // первые 7 цветов (фиолетовые)
      const orangeColors = colors.slice(7, 14); // последние 7 цветов (оранжевые)
      const color = isPurple 
        ? purpleColors[Math.floor(Math.random() * purpleColors.length)]
        : orangeColors[Math.floor(Math.random() * orangeColors.length)];
      
      // Позиционируем центр шарика в диапазоне от -100x-180y до 400x-180y
      const radius = size / 2;
      const initialX = -100 + Math.random() * 500; // от -100 до 400
      const initialY = -180 + Math.random() * 0; // от -180 до -180 (только -180)
      
      // Анимация: 12-16 секунд
      const duration = Math.random() * 4 + 12;
      const delay = Math.random() * 2; // Задержка 0-2 секунды

      newBubbles.push({
        id: i,
        size,
        color,
        initialX,
        initialY,
        duration,
        delay,
        // Добавляем границы зоны для анимации
        zoneLeft,
        zoneTop,
        zoneWidth,
        zoneHeight,
        radius, // Добавляем радиус для расчетов
      });
    }

    setBubbles(newBubbles);
  }, []);

  return (
    <motion.div 
      className="absolute top-0 left-0 w-full h-[200px] pointer-events-none -z-10"
      style={{
        width: '100%',
        height: '200px',
      }}
      animate={{
        opacity: isSearchActive ? 0 : 1
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full blur-[40px]"
          style={{
            width: bubble.size,
            height: bubble.size,
            backgroundColor: bubble.color,
          }}
          initial={{
            x: bubble.initialX,
            y: bubble.initialY,
          }}
          animate={{
            x: [
              bubble.initialX,
              -100 + Math.random() * 575, // от -100 до 475
              -100 + Math.random() * 575,
              -100 + Math.random() * 575,
              bubble.initialX,
            ],
            y: [
              bubble.initialY,
              -100 + Math.random() * 100, // от -100 до 0
              -100 + Math.random() * 100,
              -100 + Math.random() * 100,
              bubble.initialY,
            ],
            scale: [
              1,
              Math.random() * 0.3 + 0.8, // 0.8-1.1
              Math.random() * 0.3 + 0.8,
              Math.random() * 0.3 + 0.8,
              1,
            ],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};
