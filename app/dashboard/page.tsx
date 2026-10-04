'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { store, Category } from '@/lib/store';
import { useRestaurantConfig } from '@/lib/restaurant-config-context';
import { MenuItem } from '@/lib/types';
import { MenuItemForm } from '@/components/dashboard/MenuItemForm';
import { CategoryManager } from '@/components/dashboard/CategoryManager';
import { RestaurantConfigManager } from '@/components/dashboard/RestaurantConfigManager';
import { MenuImporter } from '@/components/dashboard/MenuImporter';
import Link from 'next/link';

type DashboardTab = 'items' | 'categories' | 'settings' | 'import';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { config, updateConfig } = useRestaurantConfig();
  const [activeTab, setActiveTab] = useState<DashboardTab>('items');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      loadMenuItems();
      loadCategories();
    }
  }, [isAuthenticated, router]);

  const loadMenuItems = () => {
    setMenuItems(store.getMenuItems());
  };

  const loadCategories = () => {
    setCategories(store.getCategories());
  };

  const handleAddItem = async (data: Omit<MenuItem, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    store.addMenuItem(data);
    loadMenuItems();
    setIsAddingItem(false);
    setIsLoading(false);
  };

  const handleUpdateItem = async (data: Omit<MenuItem, 'id' | 'createdAt'>) => {
    if (!editingId) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    store.updateMenuItem(editingId, data);
    loadMenuItems();
    setEditingId(null);
    setIsLoading(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure?')) {
      store.deleteMenuItem(id);
      loadMenuItems();
    }
  };

  const handleAddCategory = (data: Omit<Category, 'id' | 'createdAt'>) => {
    store.addCategory(data);
    loadCategories();
  };

  const handleUpdateCategory = (id: string, updates: Partial<Category>) => {
    store.updateCategory(id, updates);
    loadCategories();
  };

  const handleDeleteCategory = (id: string) => {
    store.deleteCategory(id);
    loadCategories();
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated) return null;

  const editingItem = editingId ? menuItems.find(item => item.id === editingId) : null;

  return (
    <main className="min-h-screen bg-surface dark:bg-surface-dark">
      <header className="border-b border-border dark:border-border-dark sticky top-0 z-40 bg-surface/95 dark:bg-surface-dark/95 backdrop-blur-sm">
        <div className="container-safe py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-lg font-bold text-accent">
                digi_menu
              </Link>
              <span className="text-sm text-text-secondary">Panel de Control</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-text-secondary">{user?.email}</span>
              <motion.button onClick={handleLogout} className="px-4 py-2 rounded-lg text-sm font-medium border border-border" whileTap={{ scale: 0.95 }}>
                Cerrar Sesión
              </motion.button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-border dark:border-border-dark -mb-4">
            <button
              onClick={() => setActiveTab('items')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'items'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-secondary hover:text-text-primary dark:hover:text-text-primary-dark'
              }`}
            >
              Elementos del Menú
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'categories'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-secondary hover:text-text-primary dark:hover:text-text-primary-dark'
              }`}
            >
              Categorías
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-secondary hover:text-text-primary dark:hover:text-text-primary-dark'
              }`}
            >
              Configuración
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'import'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-secondary hover:text-text-primary dark:hover:text-text-primary-dark'
              }`}
            >
              Importar Menú
            </button>
          </div>
        </div>
      </header>

      <div className="container-safe py-12">
        {activeTab === 'items' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-32">
              {editingItem ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Editar Elemento</h3>
                  <MenuItemForm initialItem={editingItem} onSubmit={handleUpdateItem} isLoading={isLoading} />
                  <button onClick={() => setEditingId(null)} className="w-full py-2 rounded-lg text-sm border border-border">Cancelar</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Agregar Elemento</h3>
                  {isAddingItem ? (
                    <div className="space-y-4">
                      <MenuItemForm onSubmit={handleAddItem} isLoading={isLoading} />
                      <button onClick={() => setIsAddingItem(false)} className="w-full py-2 rounded-lg text-sm border border-border">Cancelar</button>
                    </div>
                  ) : (
                    <button onClick={() => setIsAddingItem(true)} className="w-full button-primary">+ Agregar Elemento</button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Elementos del Menú ({menuItems.length})</h2>
              {menuItems.length === 0 ? (
                <div className="card p-12 text-center">
                  <p className="text-text-secondary">Sin elementos aún. Agregue el primer elemento.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {menuItems.map((item) => (
                    <div key={item.id} className="card p-4 md:p-6 flex items-center gap-4">
                      <img src={item.imageUrl} alt={item.title} className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-text-secondary line-clamp-1">{item.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg font-bold text-accent">${item.price.toFixed(2)}</span>
                          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">{item.available ? 'Disponible' : 'No Disponible'}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingId(item.id)} className="px-3 py-2 rounded-lg text-sm border border-border">Editar</button>
                        <button onClick={() => handleDeleteItem(item.id)} className="px-3 py-2 rounded-lg text-sm border border-red-300 text-red-600">Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        ) : activeTab === 'categories' ? (
          <CategoryManager
            categories={categories}
            onAdd={handleAddCategory}
            onUpdate={handleUpdateCategory}
            onDelete={handleDeleteCategory}
          />
        ) : activeTab === 'settings' ? (
          <div className="py-4">
            <h2 className="text-2xl font-bold mb-8">Configuración del Restaurante</h2>
            <RestaurantConfigManager
              config={config}
              onUpdate={updateConfig}
            />
          </div>
        ) : (
          <div className="py-4">
            <h2 className="text-2xl font-bold mb-8">Importar Menú desde Excel</h2>
            <MenuImporter />
          </div>
        )}
      </div>
    </main>
  );
}
