// Test the column matching logic
const searchTerms = {
  category: ['category', 'categoría', 'categor', 'tipo'],
  title: ['item', 'nombre', 'name', 'title', 'producto', 'plato', 'dish'],
  description: ['description', 'descripción', 'desc', 'detail', 'detalles', 'notas'],
  price: ['price', 'precio', 'cost', 'valor', 'monto', 'tarifa']
};

// Simulate what XLSX.utils.sheet_to_json would return from template.csv
const testRow = {
  'Category': 'Entradas',
  'Item Name': 'Bruschetta Caprese',
  'Price': '6.50',
  'Description': 'Pan tostado'
};

console.log('Testing template column matching...\n');
console.log('Column headers:', Object.keys(testRow));
console.log('Row data:', testRow);
console.log('');

function findValueByKey(row, terms, fieldName) {
  for (const key of Object.keys(row)) {
    const lowerKey = key.toLowerCase().replace(/\s+/g, '');
    for (const term of terms) {
      const lowerTerm = term.toLowerCase().replace(/\s+/g, '');
      if (lowerKey.includes(lowerTerm) || lowerTerm.includes(lowerKey)) {
        console.log(`✅ ${fieldName}: found key "${key}" → value: "${row[key]}"`);
        return row[key];
      }
    }
  }
  console.log(`❌ ${fieldName}: NOT FOUND. Looked for: ${terms.join(', ')}`);
  return '';
}

const category = findValueByKey(testRow, searchTerms.category, 'Category');
const title = findValueByKey(testRow, searchTerms.title, 'Title');
const description = findValueByKey(testRow, searchTerms.description, 'Description');
const price = findValueByKey(testRow, searchTerms.price, 'Price');

console.log('\n--- Validation ---');
console.log(`Category: "${category}" - ${category.trim() ? '✅ VALID' : '❌ EMPTY'}`);
console.log(`Title: "${title}" - ${title.trim() ? '✅ VALID' : '❌ EMPTY'}`);
console.log(`Description: "${description}" - ${description.trim() ? '✅ VALID' : '❌ EMPTY'}`);
console.log(`Price: "${price}" - ${price.trim() ? '✅ VALID' : '❌ EMPTY'}`);

const wouldPass = category.trim() && title.trim();
console.log(`\nRow would ${wouldPass ? '✅ PASS' : '❌ FAIL'} validation (needs category + title)`);
