'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '@/lib/types';

interface MenuItemFormProps {
  onSubmit: (data: Omit<MenuItem, 'id' | 'createdAt'>) => void;
  initialItem?: MenuItem;
  isLoading?: boolean;
}

export function MenuItemForm({ onSubmit, initialItem, isLoading = false }: MenuItemFormProps) {
  const [formData, setFormData] = useState({
    title: initialItem?.title || '',
    description: initialItem?.description || '',
    price: initialItem?.price?.toString() || '',
    imageUrl: initialItem?.imageUrl || '',
    category: initialItem?.category || '',
    available: initialItem?.available ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl,
      category: formData.category,
      available: formData.available,
    });
  };

  const inputClass = "w-full px-4 py-2 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-secondary-dark text-text-primary dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent transition-all";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className={inputClass}
          placeholder="Item name"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className={inputClass}
          placeholder="Item description"
          rows={3}
          required
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            className={inputClass}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className={inputClass}
            placeholder="e.g., Burgers"
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
          className={inputClass}
          placeholder="https://..."
          required
          disabled={isLoading}
        />
        {formData.imageUrl && (
          <div className="mt-2 relative w-full h-40 rounded-lg overflow-hidden bg-surface-secondary dark:bg-surface-secondary-dark">
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="available"
          checked={formData.available}
          onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
          className="w-4 h-4 rounded border-border dark:border-border-dark"
          disabled={isLoading}
        />
        <label htmlFor="available" className="text-sm font-medium cursor-pointer">
          Available
        </label>
      </div>

      <motion.button
        type="submit"
        className="w-full button-primary"
        whileTap={{ scale: 0.98 }}
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save Item'}
      </motion.button>
    </motion.form>
  );
}
