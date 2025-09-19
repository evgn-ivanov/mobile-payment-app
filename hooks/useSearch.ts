import { useState, useMemo, useCallback } from 'react';
import { AvatarData } from '@/components/AvatarItem';
import { filterAvatars } from '@/lib/data';

export interface UseSearchReturn {
  searchValue: string;
  setSearchValue: (value: string) => void;
  clearSearch: () => void;
  filteredData: AvatarData[];
}

export const useSearch = (data: AvatarData[]): UseSearchReturn => {
  const [searchValue, setSearchValue] = useState('');

  const filteredData = useMemo(() => {
    return filterAvatars(data, searchValue);
  }, [data, searchValue]);

  const clearSearch = useCallback(() => {
    setSearchValue('');
  }, []);

  return {
    searchValue,
    setSearchValue,
    clearSearch,
    filteredData,
  };
};
