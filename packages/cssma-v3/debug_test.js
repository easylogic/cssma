// Debug the weight calculations for the failing test

// Simple debug: manually implement the key parts
const CATEGORY_WEIGHTS = {
  'arbitrary': 900
};

function calculateArbitraryComplexity(modifier) {
  let complexity = 0;
  
  console.log(`\n--- Analyzing: ${modifier} ---`);
  
  // Count pseudo-classes (:) - but exclude the initial [& part
  const content = modifier.slice(2, -1); // Remove [& and ]
  console.log(`  Content after removing [& and ]: "${content}"`);
  
  const pseudoClassCount = (content.match(/:/g) || []).length;
  const pseudoPoints = pseudoClassCount * 10;
  complexity += pseudoPoints;
  console.log(`  Pseudo-classes (:): ${pseudoClassCount} × 10 = ${pseudoPoints}`);
  
  // Count attribute selectors within the variant
  // Look for patterns like [attr], [attr=value], [attr^=value], etc.
  const attributeMatches = content.match(/\[[^\]]*\]/g) || [];
  const attributePoints = attributeMatches.length * 20;
  complexity += attributePoints;
  console.log(`  Attribute selectors: ${attributeMatches.length} × 20 = ${attributePoints}`);
  console.log(`    Found: ${JSON.stringify(attributeMatches)}`);
  
  // Add weight for combinators
  const hasCombinators = /[>+~]/.test(content);
  const combinatorPoints = hasCombinators ? 8 : 0;
  complexity += combinatorPoints;
  console.log(`  Combinators (>+~): ${hasCombinators} = ${combinatorPoints}`);
  
  // Add weight for parentheses (function calls like nth-child())
  const parenthesesCount = (content.match(/\(/g) || []).length;
  const parenthesesPoints = parenthesesCount * 15;
  complexity += parenthesesPoints;
  console.log(`  Parentheses: ${parenthesesCount} × 15 = ${parenthesesPoints}`);
  
  // Add weight for complex selectors (multiple parts)
  const selectorParts = content.split(/[>+~\s]+/).filter(Boolean);
  const multiPartPoints = selectorParts.length > 1 ? selectorParts.length * 3 : 0;
  complexity += multiPartPoints;
  console.log(`  Selector parts: ${JSON.stringify(selectorParts)} (${selectorParts.length}) → ${multiPartPoints}`);
  
  console.log(`  Total complexity: ${complexity}`);
  
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

console.log(`\n1. Simple: ${simple}`);
const simpleResult = getModifierPriority(simple);
console.log(`   Final weight: ${simpleResult.weight}`);

console.log(`\n2. Complex: ${complex}`);
const complexResult = getModifierPriority(complex);
console.log(`   Final weight: ${complexResult.weight}`);

console.log(`\n3. Very Complex: ${veryComplex}`);
const veryComplexResult = getModifierPriority(veryComplex);
console.log(`   Final weight: ${veryComplexResult.weight}`);

console.log('\n=== Summary ===');
console.log(`Simple [&>li]: ${simpleResult.weight}`);
console.log(`Complex [&:nth-child(3n+1)]: ${complexResult.weight}`);
console.log(`Very Complex [&[aria-checked]:hover]: ${veryComplexResult.weight}`);
console.log('');

console.log('Expected: veryComplex > complex > simple');
console.log(`Actual:   ${veryComplexResult.weight} > ${complexResult.weight} > ${simpleResult.weight}`);
console.log(`Test 1: ${veryComplexResult.weight > complexResult.weight ? 'PASS' : 'FAIL'} (veryComplex > complex)`);
console.log(`Test 2: ${complexResult.weight > simpleResult.weight ? 'PASS' : 'FAIL'} (complex > simple)`); 