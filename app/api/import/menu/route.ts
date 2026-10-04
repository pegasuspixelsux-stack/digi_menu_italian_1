import { NextRequest, NextResponse } from 'next/server';
import { normalizeRows, groupByCategory, RawMenuRow, ImportResult } from '@/lib/utils/excel-parser';
import { store } from '@/lib/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const items = body.items as RawMenuRow[] | null;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'No items provided or items is not an array' },
        { status: 400 }
      );
    }

    const totalRows = items.length;

    if (totalRows === 0) {
      return NextResponse.json(
        { error: 'No items to import' },
        { status: 400 }
      );
    }

    // Normalize and validate rows
    const normalizedItems = normalizeRows(items);
    const skippedRows = totalRows - normalizedItems.length;

    // Group by category
    const itemsByCategory = groupByCategory(normalizedItems);

    // Get existing categories
    const existingCategories = new Set(
      store.getCategories().map(cat => cat.name.toLowerCase())
    );

    let categoriesCreated = 0;
    const errors: string[] = [];

    // Create missing categories and import items
    const importedItems = [];
    for (const [categoryName, items] of itemsByCategory) {
      const categoryLower = categoryName.toLowerCase();

      // Create category if it doesn't exist
      if (!existingCategories.has(categoryLower)) {
        try {
          store.addCategory({
            name: categoryName,
            displayName: categoryName,
            description: `Categoría importada: ${categoryName}`,
          });
          categoriesCreated++;
          existingCategories.add(categoryLower);
        } catch (error) {
          errors.push(`Failed to create category "${categoryName}"`);
        }
      }

      // Import items for this category
      for (const item of items) {
        try {
          const importedItem = store.addMenuItem({
            title: item.title,
            description: item.description,
            price: item.price,
            category: item.category,
            imageUrl: '',
            available: item.available,
          });
          importedItems.push(importedItem);
        } catch (error) {
          errors.push(`Failed to import item "${item.title}": ${error}`);
        }
      }
    }

    const result: ImportResult = {
      success: true,
      totalRows,
      categoriesCreated,
      itemsImported: importedItems.length,
      skippedRows,
      errors,
      summary: `✅ Importación completada: ${importedItems.length} artículos en ${itemsByCategory.size} categorías${categoriesCreated > 0 ? ` (${categoriesCreated} nuevas)` : ''}${skippedRows > 0 ? `. ${skippedRows} filas omitidas por datos inválidos` : ''}`,
    };

    return NextResponse.json({
      ...result,
      items: importedItems,
      categories: Array.from(itemsByCategory.keys()),
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
