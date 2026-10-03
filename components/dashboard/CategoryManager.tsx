'use client';

import { useState } from 'react';
import { Category } from '@/lib/store';

interface CategoryManagerProps {
  categories: Category[];
  onAdd: (category: Omit<Category, 'id' | 'createdAt'>) => void;
  onUpdate: (id: string, updates: Partial<Category>) => void;
  onDelete: (id: string) => void;
}

export function CategoryManager({
  categories,
  onAdd,
  onUpdate,
  onDelete,
}: CategoryManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', displayName: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.displayName.trim()) return;

    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
    }
    setFormData({ name: '', displayName: '', description: '' });
    setIsAdding(false);
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      displayName: category.displayName,
      description: category.description || '',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar esta categoría?')) {
      onDelete(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? 'Editar Categoría' : 'Agregar Nueva Categoría'}
        </h3>

        {isAdding || editingId ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre Interno</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="p.ej., Entradas"
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface dark:bg-surface-dark"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nombre Mostrado</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                placeholder="p.ej., Entradas"
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface dark:bg-surface-dark"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Descripción (Opcional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descripción de la categoría..."
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface dark:bg-surface-dark resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 button-primary"
              >
                {editingId ? 'Actualizar' : 'Agregar'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  setFormData({ name: '', displayName: '', description: '' });
                }}
                className="flex-1 py-2 rounded-lg text-sm border border-border hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full button-primary"
          >
            + Agregar Categoría
          </button>
        )}
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Categorías Existentes ({categories.length})</h3>

        {categories.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-text-secondary">No hay categorías. Agregue una para comenzar.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="card p-4 md:p-6 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary dark:text-text-primary-dark">
                    {category.displayName}
                  </h4>
                  {category.description && (
                    <p className="text-sm text-text-secondary mt-1">{category.description}</p>
                  )}
                  <p className="text-xs text-text-secondary mt-2">ID: {category.name}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="px-3 py-2 rounded-lg text-sm border border-border hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="px-3 py-2 rounded-lg text-sm border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
