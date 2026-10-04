'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { Navigation } from '@/components/nav/Navigation';
import { useAuth } from '@/lib/auth-context';
import { useColor, colorValues } from '@/lib/color-context';
import { useRestaurantConfig } from '@/lib/restaurant-config-context';
import { ColorSelector } from '@/components/ui/ColorSelector';
import Link from 'next/link';
import { MenuItem } from '@/lib/types';
import { store } from '@/lib/store';

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { backgroundColor } = useColor();
  const { config } = useRestaurantConfig();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setMenuItems(store.getMenuItems());
      setIsLoading(false);
    }, 600);
  }, []);

  const categories = Array.from(
    new Set(menuItems.map(item => item.category || 'Other'))
  ).sort();

  return (
    <main className="min-h-screen" style={{ backgroundColor: colorValues[backgroundColor] }}>
      <Navigation />
      <section className="relative w-full aspect-square lg:h-[80vh] overflow-hidden">
        <picture>
          <source media="(min-width: 1024px)" srcSet={config.heroDesktopUrl} type="image/webp" />
          <source media="(min-width: 768px)" srcSet={config.heroDesktopUrl.replace('.webp', '-tablet.webp')} type="image/webp" />
          <Image
            src={config.heroMobileUrl}
            alt="La Bella Italia - Restaurant Hero"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
          />
        </picture>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 z-10">
          <div className="space-y-3">
            {config.heroEyebrow && (
              <p className="text-sm md:text-base text-gray-300 uppercase tracking-widest">
                {config.heroEyebrow}
              </p>
            )}
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              {config.name}
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-xl mx-auto">
              {config.slogan}
            </p>
          </div>
        </div>
      </section>

      <section className="container-safe py-12 md:py-16">
        <div
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-medium uppercase tracking-wide text-text-secondary dark:text-text-secondary-dark mb-2">
            Nuestro Menú
          </h2>
          <p className="text-text-secondary dark:text-text-secondary-dark">
            Selecciones cuidadosamente preparadas para todos los gustos
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div
              className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent"
            />
          </div>
        ) : (
          <div className="space-y-12">
            {/* Category Navigation Pills */}
            <div
              className="overflow-x-auto pb-2 -mx-6 px-6 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 scrollbar-hide"
            >
              <div className="flex gap-3 min-w-min">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                    selectedCategory === null
                      ? 'bg-accent text-white'
                      : 'border border-border dark:border-border-dark text-text-primary dark:text-text-primary-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark'
                  }`}
                >
                  Todo
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-accent text-white'
                        : 'border border-border dark:border-border-dark text-text-primary dark:text-text-primary-dark hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            {selectedCategory === null ? (
              <div className="space-y-16">
                {Array.from(
                  new Map(
                    menuItems.map(item => [item.category || 'Other', item])
                  ).entries()
                ).map(([category]) => {
                  const categoryItems = menuItems.filter(
                    item => (item.category || 'Other') === category
                  );
                  return (
                    <div
                      key={category}
                    >
                      <h3 className="text-2xl md:text-3xl font-medium uppercase tracking-wide text-text-secondary dark:text-text-secondary-dark mb-8">
                        {category}
                      </h3>
                      <MenuGrid items={categoryItems} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
              >
                <h3 className="text-2xl md:text-3xl font-medium uppercase tracking-wide text-text-secondary dark:text-text-secondary-dark mb-8">
                  {selectedCategory}
                </h3>
                <MenuGrid items={menuItems.filter(item => (item.category || 'Other') === selectedCategory)} />
              </div>
            )}
          </div>
        )}
      </section>

      <footer className="bg-black text-white py-8 md:py-12">
        <div className="container-safe space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-lg font-bold text-gray-100">{config.name}</h4>
              <p className="text-sm text-gray-300">
                {config.slogan}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-gray-100">Contacto</h4>
              <div className="space-y-1 text-sm text-gray-300">
                <p>📍 {config.address}</p>
                <p>📞 {config.phone}</p>
                <p>💬 {config.whatsapp}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-gray-100">Horarios</h4>
              <div className="space-y-1 text-sm text-gray-300">
                <p>Lun - Vie: {config.hoursMonFri}</p>
                <p>Sáb - Dom: {config.hoursSatSun}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-gray-100">Tema</h4>
              <ColorSelector />
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2026 {config.name}. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg font-medium border border-gray-600 text-gray-100 hover:bg-gray-900 transition-colors"
                >
                  Panel
                </Link>
              )}
              <Link
                href={isAuthenticated ? '/login' : '/login'}
                className="px-4 py-2 rounded-lg font-medium bg-accent text-white hover:opacity-90 transition-opacity"
              >
                {isAuthenticated ? 'Cuenta' : 'Iniciar Sesión'}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
