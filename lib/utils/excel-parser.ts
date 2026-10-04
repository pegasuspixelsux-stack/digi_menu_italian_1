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

export function parseExcelFile(file: File): Promise<RawMenuRow[]> {
  return new Promise((resolve, reject) => {
    // Verify FileReader is available on client-side
    if (typeof window === 'undefined' || !('FileReader' in window)) {
      reject(new Error('FileReader is not available - this must run on the client side'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];

        if (!sheetName) {
          reject(new Error('No sheets found in workbook'));
          return;
        }

        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet) as RawMenuRow[];
        resolve(rows);
      } catch (error) {
        reject(new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : String(error)}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    try {
      reader.readAsArrayBuffer(file);
    } catch (error) {
      reject(new Error(`Error reading file: ${error instanceof Error ? error.message : String(error)}`));
    }
  });
}

export function normalizeMenuRow(row: RawMenuRow): ParsedMenuItem | null {
  // Extract category - handle variations
  const category = (row.category || row.Category || row.CATEGORY || '').toString().trim();

  // Extract title - handle variations (itemName, name, title, Item Name, etc.)
  const title = (
    row.itemName ||
    row.ItemName ||
    row.name ||
    row.Name ||
    row.title ||
    row.Title ||
    row.ITEM_NAME ||
    ''
  ).toString().trim();

  // Extract description
  const description = (row.description || row.Description || row.DESCRIPTION || '').toString().trim();

  // Extract and parse price
  let price = 0;
  const rawPrice = row.price || row.Price || row.PRICE || '';
  if (rawPrice) {
    const priceStr = rawPrice.toString().replace(/[$,]/g, '').trim();
    const parsed = parseFloat(priceStr);
    if (!isNaN(parsed) && parsed >= 0) {
      price = parseFloat(parsed.toFixed(2));
    }
  }

  // Extract available status
  let available = true;
  const rawAvailable = row.available || row.Available || row.AVAILABLE;
  if (rawAvailable !== undefined && rawAvailable !== null) {
    const availStr = rawAvailable.toString().toLowerCase();
    available = availStr !== 'false' && availStr !== '0' && availStr !== 'no';
  }

  // Validate required fields
  if (!title || !category) {
    return null;
  }

  return {
    title,
    description: description || 'Sin descripción disponible',
    price: price || 0,
    category,
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
