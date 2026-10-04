'use client';

import React, { createContext, useContext, useState } from 'react';

export interface RestaurantConfig {
  name: string;
  slogan: string;
  phone: string;
  whatsapp: string;
  address: string;
  hoursMonFri: string;
  hoursSatSun: string;
  heroDesktopUrl: string;
  heroMobileUrl: string;
}

const DEFAULT_CONFIG: RestaurantConfig = {
  name: 'El Amigo Food truck',
  slogan: 'Comida Mexicana Auténtica',
  phone: '+1 (555) 123-4567',
  whatsapp: '+1 (555) 123-4567',
  address: '307 N Frederick ave ,Gaithersburg MD',
  hoursMonFri: '11:00 - 23:00',
  hoursSatSun: '12:00 - 00:00',
  heroDesktopUrl: '/images/hero/hero-desktop.webp',
  heroMobileUrl: '/images/hero/hero-mobile.webp',
};

interface RestaurantConfigContextType {
  config: RestaurantConfig;
  updateConfig: (updates: Partial<RestaurantConfig>) => void;
}

const RestaurantConfigContext = createContext<RestaurantConfigContextType | undefined>(undefined);

export function RestaurantConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<RestaurantConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('restaurantConfig');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to ensure all required fields exist (handles migration from old configs)
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    }
    return DEFAULT_CONFIG;
  });

  const updateConfig = (updates: Partial<RestaurantConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    if (typeof window !== 'undefined') {
      localStorage.setItem('restaurantConfig', JSON.stringify(newConfig));
    }
  };

  return (
    <RestaurantConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </RestaurantConfigContext.Provider>
  );
}

export function useRestaurantConfig() {
  const context = useContext(RestaurantConfigContext);
  if (!context) {
    throw new Error('useRestaurantConfig must be used within RestaurantConfigProvider');
  }
  return context;
}
