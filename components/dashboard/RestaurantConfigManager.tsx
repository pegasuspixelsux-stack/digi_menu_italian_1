'use client';

import { useState } from 'react';
import { RestaurantConfig } from '@/lib/restaurant-config-context';

interface RestaurantConfigManagerProps {
  config: RestaurantConfig;
  onUpdate: (updates: Partial<RestaurantConfig>) => void;
}

export function RestaurantConfigManager({
  config,
  onUpdate,
}: RestaurantConfigManagerProps) {
  const [formData, setFormData] = useState(config);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field: keyof RestaurantConfig, value: string) => {
    setFormData({ ...formData, [field]: value });
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    setFormData(config);
    setIsSaved(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Section */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-6">Información General</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre del Restaurante</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="La Bella Italia"
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface dark:bg-surface-dark"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-6">Información de Contacto</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Número Telefónico</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface dark:bg-surface-dark"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp (Pedidos)</label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface dark:bg-surface-dark"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Dirección</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Calle Principal 123, Madrid"
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface dark:bg-surface-dark"
              />
            </div>
          </div>
        </div>

        {/* Operating Hours Section */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-6">Horario de Operación</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Lunes a Viernes</label>
              <input
                type="text"
                value={formData.hoursMonFri}
                onChange={(e) => handleChange('hoursMonFri', e.target.value)}
                placeholder="11:00 - 23:00"
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface dark:bg-surface-dark"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sábado a Domingo</label>
              <input
                type="text"
                value={formData.hoursSatSun}
                onChange={(e) => handleChange('hoursSatSun', e.target.value)}
                placeholder="12:00 - 00:00"
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface dark:bg-surface-dark"
              />
            </div>
          </div>
        </div>

        {/* Hero Images Section */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-6">Imágenes Hero</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">URL Imagen Hero (Escritorio - 16:9)</label>
              <input
                type="text"
                value={formData.heroDesktopUrl}
                onChange={(e) => handleChange('heroDesktopUrl', e.target.value)}
                placeholder="/images/hero/hero-desktop.webp"
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface dark:bg-surface-dark font-mono text-sm"
              />
              <p className="text-xs text-text-secondary mt-2">Recomendado: 1920x1080px mínimo</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">URL Imagen Hero (Móvil - 1:1)</label>
              <input
                type="text"
                value={formData.heroMobileUrl}
                onChange={(e) => handleChange('heroMobileUrl', e.target.value)}
                placeholder="/images/hero/hero-mobile.webp"
                className="w-full px-4 py-2 rounded-lg border border-border bg-surface dark:bg-surface-dark font-mono text-sm"
              />
              <p className="text-xs text-text-secondary mt-2">Recomendado: 768x768px mínimo</p>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 button-primary"
          >
            {isSaved ? '✓ Guardado' : 'Guardar Cambios'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-2 rounded-lg text-sm border border-border hover:bg-surface-secondary dark:hover:bg-surface-secondary-dark transition-colors"
          >
            Descartar
          </button>
        </div>
      </form>

      {/* Preview Section */}
      <div className="mt-8 card p-6">
        <h3 className="text-lg font-semibold mb-4">Vista Previa</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-text-secondary mb-2">Nombre del Restaurante</h4>
            <p className="text-2xl font-bold text-accent">{formData.name}</p>
          </div>

          <div className="pt-4 border-t border-border dark:border-border-dark">
            <h4 className="text-sm font-medium text-text-secondary mb-3">Contacto en el Pie de Página</h4>
            <div className="text-sm space-y-1">
              <p>📍 {formData.address}</p>
              <p>📞 {formData.phone}</p>
              <p>💬 {formData.whatsapp}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-border dark:border-border-dark">
            <h4 className="text-sm font-medium text-text-secondary mb-3">Horario</h4>
            <div className="text-sm space-y-1">
              <p>Lun - Vie: {formData.hoursMonFri}</p>
              <p>Sáb - Dom: {formData.hoursSatSun}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
