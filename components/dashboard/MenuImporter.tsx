'use client';

import { useState, useRef } from 'react';
import { ImportResult } from '@/lib/utils/excel-parser';

export function MenuImporter() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/import/menu', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Import failed');
        return;
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Importar Menú desde Excel</h3>

        <div className="space-y-4">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Seleccionar archivo Excel (.xlsx, .xls)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface dark:bg-surface-dark disabled:opacity-50"
            />
            <p className="text-xs text-text-secondary mt-2">
              Columnas esperadas: Categoría, Nombre del Artículo, Descripción, Precio
            </p>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
              <span className="text-sm text-blue-700 dark:text-blue-300">Importando menú...</span>
            </div>
          )}

          {/* Success */}
          {result && result.success && (
            <div className="space-y-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✅</div>
                <div className="flex-1">
                  <p className="font-semibold text-green-900 dark:text-green-100">
                    {result.summary}
                  </p>
                  <div className="mt-2 space-y-1 text-sm text-green-800 dark:text-green-200">
                    <p>📊 Total de filas procesadas: {result.totalRows}</p>
                    <p>✅ Artículos importados: {result.itemsImported}</p>
                    {result.categoriesCreated > 0 && (
                      <p>📁 Categorías creadas: {result.categoriesCreated}</p>
                    )}
                    {result.skippedRows > 0 && (
                      <p>⚠️ Filas omitidas: {result.skippedRows}</p>
                    )}
                  </div>
                  {result.errors.length > 0 && (
                    <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                      <p className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">Errores encontrados:</p>
                      <ul className="list-disc list-inside space-y-1 text-yellow-800 dark:text-yellow-200">
                        {result.errors.slice(0, 5).map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                        {result.errors.length > 5 && (
                          <li>... y {result.errors.length - 5} errores más</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-start gap-3">
                <div className="text-xl">❌</div>
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-100">Error en la importación</p>
                  <p className="text-sm text-red-800 dark:text-red-200 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          {!result && !error && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-text-secondary font-medium mb-2">📋 Formato esperado del Excel:</p>
              <div className="text-xs text-text-secondary space-y-1 font-mono">
                <div>Categoría | Nombre del Artículo | Descripción | Precio</div>
                <div>----------|----------------------|-------------|-------</div>
                <div>Entradas | Bruschetta | Pan tostado con tomate | 6.50</div>
                <div>Platos | Filete de Res | Parrilla con vegetales | 18.99</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
