'use client';

import { useColor } from '@/lib/color-context';

export function ColorSelector() {
  const { backgroundColor, setBackgroundColor } = useColor();

  const colors = [
    { value: 'default' as const, label: 'Default', color: 'bg-surface dark:bg-surface-dark' },
    { value: 'red' as const, label: 'Red', color: 'bg-red-500' },
    { value: 'blue' as const, label: 'Blue', color: 'bg-blue-500' },
    { value: 'green' as const, label: 'Green', color: 'bg-emerald-500' },
    { value: 'yellow' as const, label: 'Yellow', color: 'bg-amber-500' },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-text-secondary dark:text-text-secondary-dark">Tema:</span>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => setBackgroundColor(color.value)}
            className={`w-6 h-6 rounded-full border-2 transition-all ${
              backgroundColor === color.value
                ? 'border-accent scale-110'
                : 'border-border dark:border-border-dark hover:scale-105'
            } ${color.color}`}
            title={color.label}
          />
        ))}
      </div>
    </div>
  );
}
