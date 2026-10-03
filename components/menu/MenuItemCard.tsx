'use client';

import { useState } from 'react';
import { MenuItem } from '@/lib/types';
import Image from 'next/image';
import { QuantitySelector } from './QuantitySelector';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-4 py-4 px-5 bg-surface-secondary/50 dark:bg-surface-secondary-dark/50 border-b border-border dark:border-border-dark rounded-lg shadow-sm hover:shadow-md hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark transition-all">
      <div className="relative w-40 h-40 flex-shrink-0 overflow-hidden rounded-lg bg-surface-secondary dark:bg-surface-secondary-dark">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover"
          sizes="112px"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-semibold text-xs">Unavailable</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between px-4 py-3">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
            {item.title}
          </h3>
          <p className="text-xs text-text-secondary dark:text-text-secondary-dark line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-base font-bold text-text-primary dark:text-text-primary-dark">
            ${item.price.toFixed(2)}
          </p>
          <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
        </div>
      </div>
    </div>
  );
}
