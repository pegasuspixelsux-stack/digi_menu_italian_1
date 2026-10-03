'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type BackgroundColor = 'default' | 'red' | 'blue' | 'green' | 'yellow';

interface ColorContextType {
  backgroundColor: BackgroundColor;
  setBackgroundColor: (color: BackgroundColor) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: ReactNode }) {
  const [backgroundColor, setBackgroundColor] = useState<BackgroundColor>('default');

  return (
    <ColorContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within ColorProvider');
  }
  return context;
}

export const colorValues: Record<BackgroundColor, string> = {
  default: '#f5f5f5',
  red: '#FF0000',
  blue: '#0000FF',
  green: '#00FF00',
  yellow: '#FFFF00',
};
