// Debug script to check the weights
const { ModifierPriorityService } = require('./src/core/parsers/modifiers/modifier-priority-service.ts');

const simple = ModifierPriorityService.getModifierPriority('[&>li]');
const complex = ModifierPriorityService.getModifierPriority('[&:nth-child(3n+1)]');
const veryComplex = ModifierPriorityService.getModifierPriority('[&[aria-checked]:hover]');

console.log('Simple [&>li]:', simple);
console.log('Complex [&:nth-child(3n+1)]:', complex);
console.log('Very Complex [&[aria-checked]:hover]:', veryComplex);
