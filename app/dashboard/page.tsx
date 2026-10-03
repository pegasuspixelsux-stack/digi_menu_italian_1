'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { store } from '@/lib/store';
import { MenuItem } from '@/lib/types';
import { MenuItemForm } from '@/components/dashboard/MenuItemForm';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      loadMenuItems();
    }
  }, [isAuthenticated, router]);

  const loadMenuItems = () => {
    setMenuItems(store.getMenuItems());
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

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated) return null;

  const editingItem = editingId ? menuItems.find(item => item.id === editingId) : null;

  return (
    <main className="min-h-screen bg-surface dark:bg-surface-dark">
      <header className="border-b border-border dark:border-border-dark sticky top-0 z-40 bg-surface/95 dark:bg-surface-dark/95 backdrop-blur-sm">
        <div className="container-safe h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-bold text-accent">
              digi_menu
            </Link>
            <span className="text-sm text-text-secondary">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-secondary">{user?.email}</span>
            <motion.button onClick={handleLogout} className="px-4 py-2 rounded-lg text-sm font-medium border border-border" whileTap={{ scale: 0.95 }}>
              Sign Out
            </motion.button>
          </div>
        </div>
      </header>

      <div className="container-safe py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              {editingItem ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Edit Item</h3>
                  <MenuItemForm initialItem={editingItem} onSubmit={handleUpdateItem} isLoading={isLoading} />
                  <button onClick={() => setEditingId(null)} className="w-full py-2 rounded-lg text-sm border border-border">Cancel</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Add Item</h3>
                  {isAddingItem ? (
                    <div className="space-y-4">
                      <MenuItemForm onSubmit={handleAddItem} isLoading={isLoading} />
                      <button onClick={() => setIsAddingItem(false)} className="w-full py-2 rounded-lg text-sm border border-border">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setIsAddingItem(true)} className="w-full button-primary">New Item</button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Menu Items ({menuItems.length})</h2>
              {menuItems.length === 0 ? (
                <div className="card p-12 text-center">
                  <p className="text-text-secondary">No items yet. Add your first item.</p>
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
                          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">{item.available ? 'Available' : 'Unavailable'}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingId(item.id)} className="px-3 py-2 rounded-lg text-sm border border-border">Edit</button>
                        <button onClick={() => handleDeleteItem(item.id)} className="px-3 py-2 rounded-lg text-sm border border-red-300 text-red-600">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
