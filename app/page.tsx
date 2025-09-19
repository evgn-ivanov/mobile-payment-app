'use client';

import React, { useState, useEffect } from 'react';
import { BottomSheet } from '@/components/BottomSheet';
import { TopBar } from '@/components/TopBar';
import { SearchBar } from '@/components/SearchBar';
import { AvatarItem, AvatarData } from '@/components/AvatarItem';
import { EmptyState } from '@/components/EmptyState';
import { LavaLamp } from '@/components/LavaLamp';
import { OnboardingText } from '@/components/OnboardingText';
import { ArrowRightIcon } from '@/components/icons';
import { avatarData } from '@/lib/data';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { useSearch } from '@/hooks/useSearch';

export default function Home() {
  const { isOpen: isBottomSheetOpen, open: openBottomSheet, close: closeBottomSheet } = useBottomSheet();
  const { searchValue, setSearchValue, clearSearch, filteredData: filteredAvatars } = useSearch(avatarData);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Динамическое изменение цвета статус-бара
  useEffect(() => {
    const updateThemeColor = (color: string) => {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', color);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = color;
        document.head.appendChild(meta);
      }
    };

    // Устанавливаем фиолетовый цвет только при открытии онбординга И если поиск не активен
    if (isOnboardingOpen && !isSearchActive) {
      updateThemeColor('#B35EF5');
    } else {
      // Возвращаем белый цвет во всех остальных случаях
      updateThemeColor('#ffffff');
    }
  }, [isBottomSheetOpen, isOnboardingOpen, isSearchActive]);

  const handleOpenBottomSheet = () => {
    openBottomSheet();
  };

  const handleCloseBottomSheet = () => {
    closeBottomSheet();
    clearSearch(); // Очищаем поиск при закрытии
    // Не сбрасываем состояние поиска - остается навсегда
  };

  const handleAvatarClick = (avatar: AvatarData) => {
    console.log('Clicked avatar:', avatar.name);
    // Здесь можно добавить логику для обработки клика по аватару
    // Например, переход к форме платежа или детальной информации
  };

  const handleOnboardingClick = () => {
    setIsOnboardingOpen(true);
  };

  const handleCloseOnboarding = () => {
    setIsOnboardingOpen(false);
    // Не сбрасываем состояние поиска - остается навсегда
  };

  // Обработка изменения поиска
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    
    // Если есть текст - активируем поиск навсегда
    if (value.length > 0) {
      setIsSearchActive(true);
    }
    // Не деактивируем поиск при очистке поля - остается навсегда
  };

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">
      {/* Две кнопки по центру экрана */}
      <div className="flex gap-8">
        {/* Кнопка Онбординг */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleOnboardingClick}
            className="w-16 h-16 bg-white border border-gray-200 hover:bg-gray-50 rounded-full flex items-center justify-center transition-colors shadow-xl"
            aria-label="Онбординг"
          >
            <ArrowRightIcon size={24} className="text-gray-800" />
          </button>
          <span className="text-gray-800 text-sm">Онбординг</span>
        </div>

        {/* Кнопка Старый юзер */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleOpenBottomSheet}
            className="w-16 h-16 bg-white border border-gray-200 hover:bg-gray-50 rounded-full flex items-center justify-center transition-colors shadow-xl"
            aria-label="Старый юзер"
          >
            <ArrowRightIcon size={24} className="text-gray-800" />
          </button>
          <span className="text-gray-800 text-sm">Старый юзер</span>
        </div>
      </div>

      {/* Bottom Sheet для старого юзера */}
      <BottomSheet isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        <TopBar onClose={handleCloseBottomSheet} />
        
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          autoFocus={true}
          isVisible={isBottomSheetOpen}
        />
        
        {/* Сетка аватаров */}
        <div className="pt-6 pb-4 px-2">
          {filteredAvatars.length > 0 ? (
            <div className="grid grid-cols-4 gap-x-0 gap-y-0">
              {filteredAvatars.map((avatar, index) => (
                <AvatarItem
                  key={index}
                  data={avatar}
                  onClick={() => handleAvatarClick(avatar)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🔍"
              title="Ничего не найдено"
              description="Попробуйте другой поисковый запрос"
            />
          )}
        </div>
      </BottomSheet>

      {/* Bottom Sheet для онбординга */}
      <BottomSheet isOpen={isOnboardingOpen} onClose={handleCloseOnboarding}>
        <LavaLamp isSearchActive={isSearchActive} />
                <TopBar onClose={handleCloseOnboarding} variant={isSearchActive ? "default" : "onboarding"} />
        
        <SearchBar 
          value={searchValue}
          onChange={handleSearchChange}
          autoFocus={true}
          variant={isSearchActive ? "default" : "onboarding"}
          isVisible={isOnboardingOpen}
        />
        
                <OnboardingText isSearchActive={isSearchActive} />
        
        {/* Сетка аватаров */}
        <div className="pt-6 pb-4 px-2">
          {filteredAvatars.length > 0 ? (
            <div className="grid grid-cols-4 gap-x-0 gap-y-0">
              {filteredAvatars.map((avatar, index) => (
                <AvatarItem
                  key={index}
                  data={avatar}
                  onClick={() => handleAvatarClick(avatar)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🔍"
              title="Ничего не найдено"
              description="Попробуйте другой поисковый запрос"
            />
          )}
        </div>
      </BottomSheet>
    </div>
  );
}
