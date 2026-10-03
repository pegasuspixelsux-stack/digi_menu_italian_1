'use client';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function QuantitySelector({ quantity, onQuantityChange }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3 px-3 py-1 border border-accent rounded-full">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="text-accent font-medium text-sm w-5 h-5 flex items-center justify-center hover:opacity-70 transition-opacity"
      >
        −
      </button>
      <span className="text-accent font-medium text-sm w-4 text-center">{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="text-accent font-medium text-sm w-5 h-5 flex items-center justify-center hover:opacity-70 transition-opacity"
      >
        +
      </button>
    </div>
  );
}
