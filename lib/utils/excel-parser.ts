import * as XLSX from 'xlsx';

export interface RawMenuRow {
  category?: string;
  itemName?: string;
  name?: string;
  title?: string;
  description?: string;
  price?: string | number;
  available?: string | boolean;
  [key: string]: any;
}

export interface ParsedMenuItem {
  title: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

export interface ImportResult {
  success: boolean;
  totalRows: number;
  categoriesCreated: number;
  itemsImported: number;
  skippedRows: number;
  errors: string[];
  summary: string;
}

// Helper to find value by flexible key matching
function findValueByKey(row: RawMenuRow, searchTerms: string[]): string {
  for (const key of Object.keys(row)) {
    const lowerKey = key.toLowerCase().replace(/\s+/g, '');
    for (const term of searchTerms) {
      const lowerTerm = term.toLowerCase().replace(/\s+/g, '');
      if (lowerKey.includes(lowerTerm) || lowerTerm.includes(lowerKey)) {
        return (row[key] || '').toString().trim();
      }
    }
  }
  return '';
}

export function normalizeMenuRow(row: RawMenuRow): ParsedMenuItem | null {
  // Extract category - handle variations
  const category = findValueByKey(row, ['category', 'categoría', 'categor', 'tipo']) || '';

  // Extract title - handle variations
  const title = findValueByKey(row, ['item', 'nombre', 'name', 'title', 'producto', 'plato', 'dish']) || '';

  // Extract description
  const description = findValueByKey(row, ['description', 'descripción', 'desc', 'detail', 'detalles', 'notas']) || '';

  // Extract and parse price
  let price = 0;
  const rawPrice = findValueByKey(row, ['price', 'precio', 'cost', 'valor', 'monto', 'tarifa']) || '';
  if (rawPrice) {
    const priceStr = rawPrice.toString().replace(/[$,€¥₹\s]/g, '').replace(',', '.').trim();
    const parsed = parseFloat(priceStr);
    if (!isNaN(parsed) && parsed >= 0) {
      price = parseFloat(parsed.toFixed(2));
    }
  }

  // Extract available status
  let available = true;
  const rawAvailable = findValueByKey(row, ['available', 'disponible', 'active', 'activo', 'status']);
  if (rawAvailable) {
    const availStr = rawAvailable.toString().toLowerCase();
    available = availStr !== 'false' && availStr !== '0' && availStr !== 'no' && availStr !== 'n' && availStr !== 'false';
  }

  // Validate required fields
  if (!title.trim() || !category.trim()) {
    return null;
  }

  return {
    title: title.trim(),
    description: description.trim() || 'Sin descripción disponible',
    price: price || 0,
    category: category.trim(),
    available,
  };
}

export function normalizeRows(rows: RawMenuRow[]): ParsedMenuItem[] {
  return rows
    .map(normalizeMenuRow)
    .filter((item): item is ParsedMenuItem => item !== null);
}

export function groupByCategory(items: ParsedMenuItem[]): Map<string, ParsedMenuItem[]> {
  const grouped = new Map<string, ParsedMenuItem[]>();

  items.forEach(item => {
    const category = item.category.trim();
    if (!grouped.has(category)) {
      grouped.set(category, []);
    }
    grouped.get(category)!.push(item);
  });

  return grouped;
}
