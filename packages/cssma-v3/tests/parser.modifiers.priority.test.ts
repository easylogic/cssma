import { ModifierPriorityService, ModifierCategory } from '../src/core/parsers/modifiers/modifier-priority-service';

describe('ModifierPriorityService', () => {
  describe('Modifier Categorization', () => {
    test('should categorize at-rule modifiers correctly', () => {
      const mediaModifier = ModifierPriorityService.getModifierPriority('[@media(min-width:640px)]');
      const containerModifier = ModifierPriorityService.getModifierPriority('[@container(min-width:400px)]');
      const supportsModifier = ModifierPriorityService.getModifierPriority('[@supports(display:grid)]');

      expect(mediaModifier.category).toBe(ModifierCategory.AT_RULE);
      expect(containerModifier.category).toBe(ModifierCategory.AT_RULE);
      expect(supportsModifier.category).toBe(ModifierCategory.AT_RULE);
    });

    test('should categorize arbitrary variants correctly', () => {
      const selectorModifier = ModifierPriorityService.getModifierPriority('[&:nth-child(3n+1)]');
      const descendantModifier = ModifierPriorityService.getModifierPriority('[&_img]');
      const siblingModifier = ModifierPriorityService.getModifierPriority('[&+*]');

      expect(selectorModifier.category).toBe(ModifierCategory.ARBITRARY);
      expect(descendantModifier.category).toBe(ModifierCategory.ARBITRARY);
      expect(siblingModifier.category).toBe(ModifierCategory.ARBITRARY);
    });

    test('should categorize responsive modifiers correctly', () => {
      const sm = ModifierPriorityService.getModifierPriority('sm');
      const lg = ModifierPriorityService.getModifierPriority('lg');
      const xl = ModifierPriorityService.getModifierPriority('xl');

      expect(sm.category).toBe(ModifierCategory.RESPONSIVE);
      expect(lg.category).toBe(ModifierCategory.RESPONSIVE);
      expect(xl.category).toBe(ModifierCategory.RESPONSIVE);
    });

    test('should categorize state modifiers correctly', () => {
      const hover = ModifierPriorityService.getModifierPriority('hover');
      const focus = ModifierPriorityService.getModifierPriority('focus');
      const active = ModifierPriorityService.getModifierPriority('active');

      expect(hover.category).toBe(ModifierCategory.STATE);
      expect(focus.category).toBe(ModifierCategory.STATE);
      expect(active.category).toBe(ModifierCategory.STATE);
    });

    test('should categorize dark mode modifiers correctly', () => {
      const dark = ModifierPriorityService.getModifierPriority('dark');
      const light = ModifierPriorityService.getModifierPriority('light');

      expect(dark.category).toBe(ModifierCategory.DARK_MODE);
      expect(light.category).toBe(ModifierCategory.DARK_MODE);
    });

    test('should categorize group/peer modifiers correctly', () => {
      const groupHover = ModifierPriorityService.getModifierPriority('group-hover');
      const peerFocus = ModifierPriorityService.getModifierPriority('peer-focus');

      expect(groupHover.category).toBe(ModifierCategory.GROUP_PEER);
      expect(peerFocus.category).toBe(ModifierCategory.GROUP_PEER);
    });

    test('should categorize pseudo-element modifiers correctly', () => {
      const before = ModifierPriorityService.getModifierPriority('before');
      const after = ModifierPriorityService.getModifierPriority('after');
      const placeholder = ModifierPriorityService.getModifierPriority('placeholder');

      expect(before.category).toBe(ModifierCategory.PSEUDO_ELEMENT);
      expect(after.category).toBe(ModifierCategory.PSEUDO_ELEMENT);
      expect(placeholder.category).toBe(ModifierCategory.PSEUDO_ELEMENT);
    });
  });

  describe('Priority Weights', () => {
    test('at-rule modifiers should have highest priority', () => {
      const atRule = ModifierPriorityService.getModifierPriority('[@media(min-width:640px)]');
      const responsive = ModifierPriorityService.getModifierPriority('lg');
      const state = ModifierPriorityService.getModifierPriority('hover');

      expect(atRule.weight).toBeGreaterThan(responsive.weight);
      expect(responsive.weight).toBeGreaterThan(state.weight);
    });

    test('container queries should have higher priority than media queries', () => {
      const container = ModifierPriorityService.getModifierPriority('[@container(min-width:400px)]');
      const media = ModifierPriorityService.getModifierPriority('[@media(min-width:640px)]');

      expect(container.weight).toBeGreaterThan(media.weight);
    });

    test('larger responsive breakpoints should have higher priority', () => {
      const sm = ModifierPriorityService.getModifierPriority('sm');
      const md = ModifierPriorityService.getModifierPriority('md');
      const lg = ModifierPriorityService.getModifierPriority('lg');
      const xl = ModifierPriorityService.getModifierPriority('xl');

      expect(xl.weight).toBeGreaterThan(lg.weight);
      expect(lg.weight).toBeGreaterThan(md.weight);
      expect(md.weight).toBeGreaterThan(sm.weight);
    });

    test('more specific state modifiers should have higher priority', () => {
      const checked = ModifierPriorityService.getModifierPriority('checked');
      const disabled = ModifierPriorityService.getModifierPriority('disabled');
      const hover = ModifierPriorityService.getModifierPriority('hover');

      expect(checked.weight).toBeGreaterThan(hover.weight);
      expect(disabled.weight).toBeGreaterThan(hover.weight);
    });

    test('arbitrary variants should have priority based on complexity', () => {
      const simple = ModifierPriorityService.getModifierPriority('[&>li]');
      const complex = ModifierPriorityService.getModifierPriority('[&:nth-child(3n+1)]');
      const veryComplex = ModifierPriorityService.getModifierPriority('[&[aria-checked]:hover]');

      expect(veryComplex.weight).toBeGreaterThan(complex.weight);
      expect(complex.weight).toBeGreaterThan(simple.weight);
    });
  });

  describe('Modifier Sorting', () => {
    test('should sort modifiers by priority correctly', () => {
      const modifiers = ['hover', 'lg', '[@media(min-width:640px)]', 'dark', '[&:nth-child(3n+1)]'];
      const sorted = ModifierPriorityService.sortModifiersByPriority(modifiers);

      // Should be: at-rule > arbitrary > responsive > dark-mode > state
      expect(sorted[0]).toBe('[@media(min-width:640px)]');
      expect(sorted[1]).toBe('[&:nth-child(3n+1)]');
      expect(sorted[2]).toBe('lg');
      expect(sorted[3]).toBe('dark');
      expect(sorted[4]).toBe('hover');
    });

    test('should handle complex real-world modifier combinations', () => {
      const modifiers = [
        'hover',
        'focus',
        'lg',
        'xl',
        'dark',
        '[@container(min-width:400px)]',
        '[&:nth-child(odd)]',
        'group-hover',
        'before',
        'motion-reduce'
      ];

      const sorted = ModifierPriorityService.sortModifiersByPriority(modifiers);

      // Verify category order
      const categories = sorted.map(m => ModifierPriorityService.getModifierPriority(m).category);
      
      let lastWeight = Infinity;
      for (const modifier of sorted) {
        const weight = ModifierPriorityService.getModifierPriority(modifier).weight;
        expect(weight).toBeLessThanOrEqual(lastWeight);
        lastWeight = weight;
      }
    });
  });

  describe('CSS Specificity Calculation', () => {
    test('should calculate correct specificity for state modifiers', () => {
      const specificity = ModifierPriorityService.calculateCSSSpecificity('hover');
      
      // Pseudo-class adds to class specificity
      expect(specificity).toEqual({ a: 0, b: 0, c: 2, d: 0 });
    });

    test('should calculate correct specificity for pseudo-elements', () => {
      const specificity = ModifierPriorityService.calculateCSSSpecificity('before');
      
      // Pseudo-element adds to element specificity
      expect(specificity).toEqual({ a: 0, b: 0, c: 1, d: 1 });
    });

    test('should calculate correct specificity for arbitrary variants', () => {
      const attrSpecificity = ModifierPriorityService.calculateCSSSpecificity('[&[aria-checked]]');
      const pseudoSpecificity = ModifierPriorityService.calculateCSSSpecificity('[&:hover]');
      
      expect(attrSpecificity.c).toBeGreaterThan(1); // Attribute selector adds specificity
      expect(pseudoSpecificity.c).toBeGreaterThan(1); // Pseudo-class adds specificity
    });

    test('should compare specificity values correctly', () => {
      const higher = { a: 0, b: 0, c: 2, d: 0 };
      const lower = { a: 0, b: 0, c: 1, d: 0 };
      
      expect(ModifierPriorityService.compareSpecificity(higher, lower)).toBeGreaterThan(0);
      expect(ModifierPriorityService.compareSpecificity(lower, higher)).toBeLessThan(0);
    });
  });

  describe('CSS Output Ordering', () => {
    test('should generate recommended CSS order', () => {
      const modifiers = [
        'hover',
        'focus',
        'lg', 
        'dark',
        '[@media(min-width:640px)]',
        '[&:nth-child(odd)]',
        'before'
      ];

      const ordered = ModifierPriorityService.getRecommendedCSSOrder(modifiers);
      
      // Verify the order follows Tailwind CSS v4.1 specification
      expect(ordered.indexOf('[@media(min-width:640px)]')).toBeLessThan(ordered.indexOf('[&:nth-child(odd)]'));
      expect(ordered.indexOf('[&:nth-child(odd)]')).toBeLessThan(ordered.indexOf('lg'));
      expect(ordered.indexOf('lg')).toBeLessThan(ordered.indexOf('dark'));
      expect(ordered.indexOf('dark')).toBeLessThan(ordered.indexOf('hover'));
      expect(ordered.indexOf('hover')).toBeLessThan(ordered.indexOf('before'));
    });

    test('should handle duplicate categories correctly', () => {
      const modifiers = ['sm', 'md', 'lg', 'xl', 'hover', 'focus', 'active'];
      const ordered = ModifierPriorityService.getRecommendedCSSOrder(modifiers);
      
      // All responsive should come before all states
      const responsiveIndices = ['sm', 'md', 'lg', 'xl'].map(m => ordered.indexOf(m));
      const stateIndices = ['hover', 'focus', 'active'].map(m => ordered.indexOf(m));
      
      expect(Math.max(...responsiveIndices)).toBeLessThan(Math.min(...stateIndices));
    });
  });

  describe('Cascade Layer Assignment', () => {
    test('should assign correct cascade layers', () => {
      expect(ModifierPriorityService.getCascadeLayer(ModifierCategory.AT_RULE)).toBe('at-rules');
      expect(ModifierPriorityService.getCascadeLayer(ModifierCategory.ARBITRARY)).toBe('arbitrary');
      expect(ModifierPriorityService.getCascadeLayer(ModifierCategory.RESPONSIVE)).toBe('responsive');
      expect(ModifierPriorityService.getCascadeLayer(ModifierCategory.STATE)).toBe('states');
      expect(ModifierPriorityService.getCascadeLayer(ModifierCategory.UNKNOWN)).toBe('utilities');
    });
  });

  describe('Modifier Comparison', () => {
    test('should correctly determine which modifier comes first', () => {
      expect(ModifierPriorityService.shouldComeFirst('[@media(min-width:640px)]', 'hover')).toBe(true);
      expect(ModifierPriorityService.shouldComeFirst('lg', 'hover')).toBe(true);
      expect(ModifierPriorityService.shouldComeFirst('hover', 'before')).toBe(true);
      expect(ModifierPriorityService.shouldComeFirst('xl', 'lg')).toBe(true);
    });

    test('should handle equal priority modifiers consistently', () => {
      const result1 = ModifierPriorityService.shouldComeFirst('hover', 'focus');
      const result2 = ModifierPriorityService.shouldComeFirst('focus', 'hover');
      
      // One should consistently be before the other
      expect(result1).not.toBe(result2);
    });
  });
}); 