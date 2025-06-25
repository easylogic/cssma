const { CSSParser } = require('./src/core/parser.ts');
const { DEFAULT_CONFIG } = require('./src/core/config.ts');
const DEFAULT_PRESET = {
  colors: {
    red: { '500': { r: 239, g: 68, b: 68 } }
  }
};

const parser = new CSSParser(DEFAULT_CONFIG, DEFAULT_PRESET);

console.log('=== bg-cover parsing ===');
const parsed = parser.parseClass('bg-cover');
console.log('Parsed result:', JSON.stringify(parsed, null, 2));

console.log('\n=== bg-cover style application ===');
const styles = parser.parse('bg-cover');
console.log('Applied styles:', JSON.stringify(styles, null, 2));
