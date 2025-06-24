// Debug the weight calculations for the failing test
const fs = require('fs');

// Read the TypeScript file and convert it for debugging
const tsContent = fs.readFileSync('./src/core/parsers/modifiers/modifier-priority-service.ts', 'utf8');

// Simple debug: manually implement the key parts
const CATEGORY_WEIGHTS = {
  'arbitrary': 900
};

function calculateArbitraryComplexity(modifier) {
  let complexity = 0;
  
  // Count pseudo-classes (:) - but exclude the initial [& part
  const content = modifier.slice(2, -1); // Remove [& and ]
  const pseudoClassCount = (content.match(/:/g) || []).length;
  complexity += pseudoClassCount * 10;
  
  // Count attribute selectors within the variant
  // Look for patterns like [attr], [attr=value], [attr^=value], etc.
  const attributeMatches = content.match(/\[[^\]]*\]/g) || [];
  complexity += attributeMatches.length * 20; // Increased weight for attribute selectors
  
  // Add weight for combinators
  if (/[>+~]/.test(content)) complexity += 8;
  
  // Add weight for parentheses (function calls like nth-child())
  const parenthesesCount = (content.match(/\(/g) || []).length;
  complexity += parenthesesCount * 15;
  
  // Add weight for complex selectors (multiple parts)
  const selectorParts = content.split(/[>+~\s]+/).filter(Boolean);
  if (selectorParts.length > 1) complexity += selectorParts.length * 3;
  
  return complexity;
}

function getModifierPriority(modifier) {
  const baseWeight = CATEGORY_WEIGHTS['arbitrary'];
  const complexity = calculateArbitraryComplexity(modifier);
  return {
    weight: baseWeight + complexity,
    complexity
  };
}

// Test the three cases
const simple = '[&>li]';
const complex = '[&:nth-child(3n+1)]';
const veryComplex = '[&[aria-checked]:hover]';

console.log('=== Debugging Arbitrary Variant Complexity ===');
console.log('');

console.log(`Simple: ${simple}`);
const simpleResult = getModifierPriority(simple);
console.log(`  Content: ${simple.slice(2, -1)}`);
console.log(`  Complexity: ${simpleResult.complexity}`);
console.log(`  Weight: ${simpleResult.weight}`);
console.log('');

console.log(`Complex: ${complex}`);
const complexResult = getModifierPriority(complex);
console.log(`  Content: ${complex.slice(2, -1)}`);
console.log(`  Complexity: ${complexResult.complexity}`);
console.log(`  Weight: ${complexResult.weight}`);
console.log('');

console.log(`Very Complex: ${veryComplex}`);
const veryComplexResult = getModifierPriority(veryComplex);
console.log(`  Content: ${veryComplex.slice(2, -1)}`);
console.log(`  Complexity: ${veryComplexResult.complexity}`);
console.log(`  Weight: ${veryComplexResult.weight}`);
console.log('');

console.log('=== Expected Order (highest to lowest weight) ===');
console.log('1. Very Complex should be highest');
console.log('2. Complex should be middle'); 
console.log('3. Simple should be lowest');
console.log('');

console.log('=== Actual Order ===');
const results = [
  { name: 'Simple', modifier: simple, ...simpleResult },
  { name: 'Complex', modifier: complex, ...complexResult },
  { name: 'Very Complex', modifier: veryComplex, ...veryComplexResult }
].sort((a, b) => b.weight - a.weight);

results.forEach((result, index) => {
  console.log(`${index + 1}. ${result.name}: ${result.weight}`);
}); 