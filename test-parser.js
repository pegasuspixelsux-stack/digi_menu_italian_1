// Test the excel parser logic with the template data
const { normalizeMenuRow, normalizeRows } = require('./lib/utils/excel-parser.ts');

// Simulate what XLSX.utils.sheet_to_json() would return from the template
const testRows = [
  {
    'Category': 'Entradas',
    'Item Name': 'Bruschetta Caprese',
    'Price': '6.50',
    'Description': 'Pan tostado con tomate mozzarella fresca y albahaca'
  },
  {
    'Category': 'Platos Fuertes',
    'Item Name': 'Filete de Res',
    'Price': '18.99',
    'Description': 'Filete premium a la parrilla con vegetales asados'
  }
];

console.log('=== Testing Parser ===');
console.log('Input rows:', JSON.stringify(testRows, null, 2));

try {
  const result = normalizeRows(testRows);
  console.log('\nResult:', JSON.stringify(result, null, 2));
  console.log(`\nParsed ${result.length} of ${testRows.length} rows`);

  if (result.length === 0) {
    console.log('\n❌ PROBLEM: No rows were parsed!');
    console.log('Testing individual row parsing...');
    testRows.forEach((row, i) => {
      const parsed = normalizeMenuRow(row);
      console.log(`Row ${i}:`, parsed ? 'OK' : 'FAILED');
      if (!parsed) {
        console.log('  Input:', row);
        console.log('  Categories would search for: category, categoría, categor, tipo');
        console.log('  Column keys available:', Object.keys(row));
      }
    });
  }
} catch (error) {
  console.error('Error:', error.message);
}
