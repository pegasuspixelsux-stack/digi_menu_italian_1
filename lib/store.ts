import { MenuItem, User } from './types';

export interface Category {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  createdAt: Date;
}

// Default categories
const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Entradas', displayName: 'Entradas', description: 'Aperitivos y entrada', createdAt: new Date() },
  { id: 'cat-2', name: 'Platos Fuertes', displayName: 'Platos Fuertes', description: 'Platos principales', createdAt: new Date() },
  { id: 'cat-3', name: 'Bebidas', displayName: 'Bebidas', description: 'Bebidas variadas', createdAt: new Date() },
  { id: 'cat-4', name: 'Postres', displayName: 'Postres', description: 'Postres y dulces', createdAt: new Date() },
];

// Helper: Load from localStorage if available
const loadFromStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback; // SSR safety
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

// Helper: Save to localStorage
const saveToStorage = (key: string, data: any) => {
  if (typeof window === 'undefined') return; // SSR safety
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`💾 Saved to localStorage: ${key} (${data.length} items)`);
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
};

// Simulated in-memory store with localStorage persistence
let categories: Category[] = loadFromStorage('digi_menu_categories', DEFAULT_CATEGORIES);
let menuItems: MenuItem[] = loadFromStorage('digi_menu_items', [
  {
    id: '1',
    title: 'Bruschetta Caprese',
    description: 'Pan tostado con tomate, mozzarella fresca y albahaca',
    price: 6.50,
    imageUrl: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?w=500&h=500&fit=crop',
    category: 'Entradas',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Camarones al Ajillo',
    description: 'Camarones frescos salteados con ajo y limón',
    price: 8.99,
    imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    category: 'Entradas',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Tabla de Quesos',
    description: 'Selección de quesos artesanales con jamón ibérico',
    price: 10.50,
    imageUrl: 'https://images.pexels.com/photos/5632637/pexels-photo-5632637.jpeg?w=500&h=500&fit=crop',
    category: 'Entradas',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'Croquetas de Jamón',
    description: 'Croquetas caseras rellenas de jamón serrano',
    price: 7.99,
    imageUrl: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?w=500&h=500&fit=crop',
    category: 'Entradas',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '5',
    title: 'Filete de Res',
    description: 'Filete premium a la parrilla con vegetales asados',
    price: 18.99,
    imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    category: 'Platos Fuertes',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '6',
    title: 'Salmón a la Mantequilla',
    description: 'Salmón fresco cocido en salsa de limón y mantequilla',
    price: 16.99,
    imageUrl: 'https://images.pexels.com/photos/958546/pexels-photo-958546.jpeg?w=500&h=500&fit=crop',
    category: 'Platos Fuertes',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '7',
    title: 'Pollo al Horno',
    description: 'Pollo tierno horneado con hierbas aromáticas',
    price: 13.99,
    imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    category: 'Platos Fuertes',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '8',
    title: 'Pasta Primavera',
    description: 'Pasta fresca con vegetales de temporada en salsa blanca',
    price: 12.50,
    imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    category: 'Platos Fuertes',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '9',
    title: 'Agua Fresca',
    description: 'Bebida refrescante de frutas tropicales naturales',
    price: 3.50,
    imageUrl: 'https://images.pexels.com/photos/3819588/pexels-photo-3819588.jpeg?w=500&h=500&fit=crop',
    category: 'Bebidas',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '10',
    title: 'Limonada Casera',
    description: 'Limonada artesanal con limones frescos y hielo',
    price: 3.99,
    imageUrl: 'https://images.pexels.com/photos/3819588/pexels-photo-3819588.jpeg?w=500&h=500&fit=crop',
    category: 'Bebidas',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '11',
    title: 'Vino Tinto Reserva',
    description: 'Vino tinto de cosecha propia, cuerpo medio y afrutado',
    price: 7.99,
    imageUrl: 'https://images.pexels.com/photos/3407817/pexels-photo-3407817.jpeg?w=500&h=500&fit=crop',
    category: 'Bebidas',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '12',
    title: 'Café Espresso',
    description: 'Café espresso premium recién preparado',
    price: 2.50,
    imageUrl: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?w=500&h=500&fit=crop',
    category: 'Bebidas',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '13',
    title: 'Flan Casero',
    description: 'Flan tradicional con caramelo casero y crema',
    price: 4.99,
    imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    category: 'Postres',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '14',
    title: 'Churros con Chocolate',
    description: 'Churros crujientes acompañados de chocolate caliente',
    price: 5.50,
    imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    category: 'Postres',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '15',
    title: 'Tiramisú',
    description: 'Postre italiano clásico con mascarpone y café',
    price: 6.50,
    imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    category: 'Postres',
    available: true,
    createdAt: new Date(),
  },
  {
    id: '16',
    title: 'Helado Artesanal',
    description: 'Helado casero en varios sabores de fruta y chocolate',
    price: 4.50,
    imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=500&h=500&fit=crop',
    category: 'Postres',
    available: true,
    createdAt: new Date(),
  },
]);

let currentUser: User | null = {
  id: '1',
  email: 'admin@digi-menu.com',
  name: 'Admin',
  isAdmin: true,
};

export const store = {
  // Menu Items
  getMenuItems: () => [...menuItems],
  addMenuItem: (item: Omit<MenuItem, 'id' | 'createdAt'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    menuItems.push(newItem);
    saveToStorage('digi_menu_items', menuItems);
    return newItem;
  },
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => {
    const index = menuItems.findIndex(item => item.id === id);
    if (index > -1) {
      menuItems[index] = { ...menuItems[index], ...updates };
      saveToStorage('digi_menu_items', menuItems);
      return menuItems[index];
    }
    return null;
  },
  deleteMenuItem: (id: string) => {
    menuItems = menuItems.filter(item => item.id !== id);
    saveToStorage('digi_menu_items', menuItems);
  },

  // Categories
  getCategories: () => [...categories],
  addCategory: (category: Omit<Category, 'id' | 'createdAt'>) => {
    const newCategory: Category = {
      ...category,
      id: `cat-${Date.now()}`,
      createdAt: new Date(),
    };
    categories.push(newCategory);
    saveToStorage('digi_menu_categories', categories);
    return newCategory;
  },
  updateCategory: (id: string, updates: Partial<Category>) => {
    const index = categories.findIndex(cat => cat.id === id);
    if (index > -1) {
      categories[index] = { ...categories[index], ...updates };
      saveToStorage('digi_menu_categories', categories);
      return categories[index];
    }
    return null;
  },
  deleteCategory: (id: string) => {
    categories = categories.filter(cat => cat.id !== id);
  },

  // User
  getCurrentUser: () => currentUser,
  setCurrentUser: (user: User | null) => {
    currentUser = user;
  },
};
