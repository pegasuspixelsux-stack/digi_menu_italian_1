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
function findValueByKey(row: RawMenuRow, searchTerms: string[], fieldName?: string): string {
  for (const key of Object.keys(row)) {
    const lowerKey = key.toLowerCase().replace(/\s+/g, '');
    for (const term of searchTerms) {
      const lowerTerm = term.toLowerCase().replace(/\s+/g, '');
      if (lowerKey.includes(lowerTerm) || lowerTerm.includes(lowerKey)) {
        const value = (row[key] || '').toString().trim();
        if (fieldName && !value) {
          console.warn(`[Excel Parser] ${fieldName} column "${key}" found but value is empty for row:`, row);
        }
        return value;
      }
    }
  }
  if (fieldName) {
    console.warn(`[Excel Parser] Could not find ${fieldName} column. Available keys:`, Object.keys(row), 'Search terms:', searchTerms);
  }
  return '';
}

export function normalizeMenuRow(row: RawMenuRow): ParsedMenuItem | null {
  // Extract category - handle variations
  const category = findValueByKey(row, ['category', 'categoría', 'categor', 'tipo'], 'category') || '';

  // Extract title - handle variations
  const title = findValueByKey(row, ['item', 'nombre', 'name', 'title', 'producto', 'plato', 'dish'], 'title') || '';

  // Extract description
  const description = findValueByKey(row, ['description', 'descripción', 'desc', 'detail', 'detalles', 'notas'], 'description') || '';

  // Extract and parse price
  let price = 0;
  const rawPrice = findValueByKey(row, ['price', 'precio', 'cost', 'valor', 'monto', 'tarifa'], 'price') || '';
  if (rawPrice) {
    const priceStr = rawPrice.toString().replace(/[$,€¥₹\s]/g, '').replace(',', '.').trim();
    const parsed = parseFloat(priceStr);
    if (!isNaN(parsed) && parsed >= 0) {
      price = parseFloat(parsed.toFixed(2));
    }
  }

  // Extract available status
  let available = true;
  const rawAvailable = findValueByKey(row, ['available', 'disponible', 'active', 'activo', 'status'], 'available');
  if (rawAvailable) {
    const availStr = rawAvailable.toString().toLowerCase();
    available = availStr !== 'false' && availStr !== '0' && availStr !== 'no' && availStr !== 'n' && availStr !== 'false';
  }

  // Validate required fields
  if (!title.trim() || !category.trim()) {
    if (!title.trim()) console.warn('[Excel Parser] Row skipped: missing title', row);
    if (!category.trim()) console.warn('[Excel Parser] Row skipped: missing category', row);
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
