const { BackgroundsParser } = require('./src/core/parsers/backgrounds-parser.ts');

const testClasses = [
  'bg-(image:--my-image)',
  'bg-(--custom-bg)',
  'bg-red-500',
  'bg-gradient-to-r'
];

testClasses.forEach(className => {
  console.log(`${className}: isValid=${BackgroundsParser.isValidClass(className)}`);
  const parsed = BackgroundsParser.parseValue(className);
  console.log(`  parseValue:`, parsed);
});
