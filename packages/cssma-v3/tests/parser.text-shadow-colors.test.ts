import { describe, it, expect } from 'vitest';
import { EffectsParser } from '../src/core/parsers/effects-parser';
import { DesignPreset } from '../src/types';

describe('Text Shadow Colors & Opacity - v4.1 Feature', () => {
  const mockPreset: DesignPreset = {
    colorPalette: {
      red: { 500: '#ef4444' },
      blue: { 500: '#3b82f6' },
      green: { 500: '#22c55e' }
    }
  } as DesignPreset;

  describe('Class Recognition', () => {
    it('should recognize basic text-shadow classes', () => {
      expect(EffectsParser.isValidClass('text-shadow')).toBe(true);
      expect(EffectsParser.isValidClass('text-shadow-lg')).toBe(true);
      expect(EffectsParser.isValidClass('text-shadow-none')).toBe(true);
    });

    it('should recognize text-shadow color classes', () => {
      expect(EffectsParser.isValidClass('text-shadow-red-500')).toBe(true);
      expect(EffectsParser.isValidClass('text-shadow-blue-500')).toBe(true);
      expect(EffectsParser.isValidClass('text-shadow-green-500')).toBe(true);
      expect(EffectsParser.isValidClass('text-shadow-slate-400')).toBe(true);
      expect(EffectsParser.isValidClass('text-shadow-purple-600')).toBe(true);
    });

    it('should recognize text-shadow special colors', () => {
      expect(EffectsParser.isValidClass('text-shadow-black')).toBe(true);
      expect(EffectsParser.isValidClass('text-shadow-white')).toBe(true);
      expect(EffectsParser.isValidClass('text-shadow-transparent')).toBe(true);
      expect(EffectsParser.isValidClass('text-shadow-current')).toBe(true);
    });

    it('should recognize text-shadow with opacity modifiers', () => {
      expect(EffectsParser.isValidClass('text-shadow-lg/50')).toBe(true);
      expect(EffectsParser.isValidClass('text-shadow-red-500/25')).toBe(true);
      expect(EffectsParser.isValidClass('text-shadow-blue-500/75')).toBe(true);
    });

    it('should reject invalid text-shadow classes', () => {
      expect(EffectsParser.isValidClass('text-shadow-invalid')).toBe(false);
      expect(EffectsParser.isValidClass('text-shadow-999')).toBe(false);
      expect(EffectsParser.isValidClass('text-shadow-red-1000')).toBe(false);
    });
  });

  describe('Value Parsing', () => {
    it('should parse basic text-shadow classes', () => {
      expect(EffectsParser.parseValue('text-shadow')).toEqual({
        property: 'text-shadow',
        value: 'DEFAULT',
        isArbitrary: false
      });
      
      expect(EffectsParser.parseValue('text-shadow-lg')).toEqual({
        property: 'text-shadow',
        value: 'lg',
        isArbitrary: false
      });
    });

    it('should parse text-shadow color classes', () => {
      expect(EffectsParser.parseValue('text-shadow-red-500')).toEqual({
        property: 'text-shadow',
        value: 'red-500',
        isArbitrary: false
      });
      
      expect(EffectsParser.parseValue('text-shadow-blue-600')).toEqual({
        property: 'text-shadow',
        value: 'blue-600',
        isArbitrary: false
      });
    });

    it('should parse text-shadow special colors', () => {
      expect(EffectsParser.parseValue('text-shadow-black')).toEqual({
        property: 'text-shadow',
        value: 'black',
        isArbitrary: false
      });
      
      expect(EffectsParser.parseValue('text-shadow-white')).toEqual({
        property: 'text-shadow',
        value: 'white',
        isArbitrary: false
      });
    });

    it('should parse text-shadow with opacity modifiers', () => {
      expect(EffectsParser.parseValue('text-shadow-lg/50')).toEqual({
        property: 'text-shadow',
        value: 'lg/50',
        isArbitrary: false
      });
      
      expect(EffectsParser.parseValue('text-shadow-red-500/25')).toEqual({
        property: 'text-shadow',
        value: 'red-500/25',
        isArbitrary: false
      });
    });

    it('should parse arbitrary text-shadow values', () => {
      expect(EffectsParser.parseValue('text-shadow-[2px_2px_4px_red]')).toEqual({
        property: 'text-shadow',
        value: '2px_2px_4px_red',
        isArbitrary: true
      });
    });
  });

  describe('Style Application', () => {
    it('should apply basic text-shadow styles', () => {
      const styles = { effects: {} };
      
      EffectsParser.applyEffectStyle(
        { property: 'text-shadow', value: 'DEFAULT', isArbitrary: false },
        styles,
        mockPreset
      );

      expect(styles.effects.textShadow).toBe('0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06)');
    });

    it('should apply text-shadow size variants', () => {
      const styles = { effects: {} };
      
      EffectsParser.applyEffectStyle(
        { property: 'text-shadow', value: 'lg', isArbitrary: false },
        styles,
        mockPreset
      );

      expect(styles.effects.textShadow).toBe('0 10px 15px rgb(0 0 0 / 0.1), 0 4px 6px rgb(0 0 0 / 0.05)');
    });

    it('should apply text-shadow color variants', () => {
      const styles = { effects: {} };
      
      EffectsParser.applyEffectStyle(
        { property: 'text-shadow', value: 'red-500', isArbitrary: false },
        styles,
        mockPreset
      );

      // Should replace black colors with red
      expect(styles.effects.textShadow).toContain('rgb(239 68 68 / 1)');
      expect(styles.effects.textShadow).not.toContain('rgb(0 0 0');
    });

    it('should apply text-shadow special colors', () => {
      const styles1 = { effects: {} };
      EffectsParser.applyEffectStyle(
        { property: 'text-shadow', value: 'black', isArbitrary: false },
        styles1,
        mockPreset
      );
      expect(styles1.effects.textShadow).toContain('rgb(0 0 0 / 1)');

      const styles2 = { effects: {} };
      EffectsParser.applyEffectStyle(
        { property: 'text-shadow', value: 'white', isArbitrary: false },
        styles2,
        mockPreset
      );
      expect(styles2.effects.textShadow).toContain('rgb(255 255 255 / 1)');

      const styles3 = { effects: {} };
      EffectsParser.applyEffectStyle(
        { property: 'text-shadow', value: 'current', isArbitrary: false },
        styles3,
        mockPreset
      );
      expect(styles3.effects.textShadow).toContain('currentColor');
    });

    it('should apply text-shadow with opacity modifiers', () => {
      const styles = { effects: {} };
      
      EffectsParser.applyEffectStyle(
        { property: 'text-shadow', value: 'lg/50', isArbitrary: false },
        styles,
        mockPreset
      );

      // Opacity should be reduced to 50%
      expect(styles.effects.textShadow).toContain('/ 0.05'); // 0.1 * 0.5 = 0.05
      expect(styles.effects.textShadow).toContain('/ 0.025'); // 0.05 * 0.5 = 0.025
    });

    it('should apply text-shadow color with opacity modifiers', () => {
      const styles = { effects: {} };
      
      EffectsParser.applyEffectStyle(
        { property: 'text-shadow', value: 'red-500/25', isArbitrary: false },
        styles,
        mockPreset
      );

      // Should use red color with 25% opacity
      expect(styles.effects.textShadow).toContain('rgb(239 68 68 / 0.25)');
    });

    it('should apply arbitrary text-shadow values', () => {
      const styles = { effects: {} };
      
      EffectsParser.applyEffectStyle(
        { property: 'text-shadow', value: '2px_2px_4px_rgba(255,0,0,0.5)', isArbitrary: true },
        styles,
        mockPreset
      );

      expect(styles.effects.textShadow).toBe('2px 2px 4px rgba(255,0,0,0.5)');
    });

    it('should handle text-shadow none', () => {
      const styles = { effects: {} };
      
      EffectsParser.applyEffectStyle(
        { property: 'text-shadow', value: 'none', isArbitrary: false },
        styles,
        mockPreset
      );

      expect(styles.effects.textShadow).toBe('none');
    });
  });

  describe('Color Resolution', () => {
    it('should resolve all standard Tailwind colors', () => {
      const colorTests = [
        { name: 'slate', weight: 500, expected: '#64748b' },
        { name: 'gray', weight: 500, expected: '#6b7280' },
        { name: 'zinc', weight: 500, expected: '#71717a' },
        { name: 'red', weight: 500, expected: '#ef4444' },
        { name: 'orange', weight: 500, expected: '#f97316' },
        { name: 'amber', weight: 500, expected: '#f59e0b' },
        { name: 'yellow', weight: 500, expected: '#eab308' },
        { name: 'lime', weight: 500, expected: '#84cc16' },
        { name: 'green', weight: 500, expected: '#22c55e' },
        { name: 'emerald', weight: 500, expected: '#10b981' },
        { name: 'teal', weight: 500, expected: '#14b8a6' },
        { name: 'cyan', weight: 500, expected: '#06b6d4' },
        { name: 'sky', weight: 500, expected: '#0ea5e9' },
        { name: 'blue', weight: 500, expected: '#3b82f6' },
        { name: 'indigo', weight: 500, expected: '#6366f1' },
        { name: 'violet', weight: 500, expected: '#8b5cf6' },
        { name: 'purple', weight: 500, expected: '#a855f7' },
        { name: 'fuchsia', weight: 500, expected: '#d946ef' },
        { name: 'pink', weight: 500, expected: '#ec4899' },
        { name: 'rose', weight: 500, expected: '#f43f5e' }
      ];

      colorTests.forEach(({ name, weight, expected }) => {
        const styles = { effects: {} };
        
        EffectsParser.applyEffectStyle(
          { property: 'text-shadow', value: `${name}-${weight}`, isArbitrary: false },
          styles,
          mockPreset
        );

        const hexValue = expected.replace('#', '');
        const r = parseInt(hexValue.substring(0, 2), 16);
        const g = parseInt(hexValue.substring(2, 4), 16);
        const b = parseInt(hexValue.substring(4, 6), 16);
        
        expect(styles.effects.textShadow).toContain(`rgb(${r} ${g} ${b} / 1)`);
      });
    });

    it('should handle different color weights', () => {
      const weightTests = [
        { weight: 50, color: 'blue' },
        { weight: 100, color: 'blue' },
        { weight: 200, color: 'blue' },
        { weight: 300, color: 'blue' },
        { weight: 400, color: 'blue' },
        { weight: 500, color: 'blue' },
        { weight: 600, color: 'blue' },
        { weight: 700, color: 'blue' },
        { weight: 800, color: 'blue' },
        { weight: 900, color: 'blue' },
        { weight: 950, color: 'blue' }
      ];

      weightTests.forEach(({ weight, color }) => {
        const styles = { effects: {} };
        
        EffectsParser.applyEffectStyle(
          { property: 'text-shadow', value: `${color}-${weight}`, isArbitrary: false },
          styles,
          mockPreset
        );

        expect(styles.effects.textShadow).toBeDefined();
        expect(styles.effects.textShadow).not.toContain('rgb(0 0 0');
      });
    });
  });

  describe('Integration Tests', () => {
    it('should handle complex combinations', () => {
      // Test multiple scenarios to ensure they work correctly
      const testCases = [
        {
          className: 'text-shadow-red-500/50',
          description: 'colored shadow with opacity'
        },
        {
          className: 'text-shadow-xl/25',
          description: 'large shadow with low opacity'
        },
        {
          className: 'text-shadow-current',
          description: 'current color shadow'
        },
        {
          className: 'text-shadow-transparent',
          description: 'transparent shadow'
        }
      ];

      testCases.forEach(({ className, description }) => {
        const parsed = EffectsParser.parseValue(className);
        expect(parsed).toBeTruthy();
        
        const styles = { effects: {} };
        EffectsParser.applyEffectStyle(parsed!, styles, mockPreset);
        expect(styles.effects.textShadow).toBeDefined();
      });
    });

    it('should maintain backward compatibility', () => {
      // Ensure existing text-shadow functionality still works
      const legacyTests = [
        'text-shadow',
        'text-shadow-sm',
        'text-shadow-lg',
        'text-shadow-xl',
        'text-shadow-2xl',
        'text-shadow-none'
      ];

      legacyTests.forEach(className => {
        const parsed = EffectsParser.parseValue(className);
        expect(parsed).toBeTruthy();
        
        const styles = { effects: {} };
        EffectsParser.applyEffectStyle(parsed!, styles, mockPreset);
        expect(styles.effects.textShadow).toBeDefined();
      });
    });
  });
}); 