import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (appearance)', () => {
  describe('appearance', () => {
    it('should parse Tailwind v4 appearance classes', () => {
      expect(parseUtility('appearance-none')).toEqual(baseUtility({ prefix: 'appearance', value: 'none', raw: 'appearance-none' }));
      expect(parseUtility('appearance-auto')).toEqual(baseUtility({ prefix: 'appearance', value: 'auto', raw: 'appearance-auto' }));
      expect(parseUtility('appearance-')).toEqual({ type: 'unknown', raw: 'appearance-' });
    });
  });
}); 