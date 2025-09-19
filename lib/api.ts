// Примеры API функций для будущего расширения

import { AvatarData } from '@/components/AvatarItem';

// Типы для API ответов
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaymentRequest {
  recipientId: string;
  amount: number;
  description?: string;
}

export interface PaymentResponse {
  transactionId: string;
  status: 'success' | 'pending' | 'failed';
  amount: number;
  timestamp: string;
}

// Моковые API функции
export const api = {
  // Получение списка контактов
  async getContacts(): Promise<ApiResponse<AvatarData[]>> {
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      data: [
        {
          name: "Мама",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
          type: "photo"
        },
        {
          name: "Олег Ремонт",
          avatar: "ОГ",
          type: "initials"
        },
        // ... остальные контакты
      ],
      success: true,
    };
  },

  // Поиск контактов
  async searchContacts(query: string): Promise<ApiResponse<AvatarData[]>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Здесь была бы логика поиска на сервере
    return {
      data: [],
      success: true,
    };
  },

  // Отправка платежа
  async sendPayment(payment: PaymentRequest): Promise<ApiResponse<PaymentResponse>> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      data: {
        transactionId: `tx_${Date.now()}`,
        status: 'success',
        amount: payment.amount,
        timestamp: new Date().toISOString(),
      },
      success: true,
      message: 'Платеж успешно отправлен',
    };
  },

  // Получение истории платежей
  async getPaymentHistory(): Promise<ApiResponse<PaymentResponse[]>> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      data: [],
      success: true,
    };
  },
};

// Хук для работы с API (пример)
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async <T>(apiCall: () => Promise<ApiResponse<T>>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall();
      
      if (!response.success) {
        throw new Error(response.message || 'Произошла ошибка');
      }
      
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, execute };
};

// Импорт useState для хука
import { useState } from 'react';
