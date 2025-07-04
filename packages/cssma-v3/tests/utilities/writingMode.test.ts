import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (writing-mode)', () => {
  describe('writing-mode', () => {
    it('should parse Tailwind v4 writing-mode classes', () => {
      expect(parseUtility('writing-mode-horizontal-tb')).toEqual(baseUtility({ prefix: 'writing-mode', value: 'horizontal-tb', raw: 'writing-mode-horizontal-tb' }));
      expect(parseUtility('writing-mode-vertical-rl')).toEqual(baseUtility({ prefix: 'writing-mode', value: 'vertical-rl', raw: 'writing-mode-vertical-rl' }));
      expect(parseUtility('writing-mode-vertical-lr')).toEqual(baseUtility({ prefix: 'writing-mode', value: 'vertical-lr', raw: 'writing-mode-vertical-lr' }));
      expect(parseUtility('writing-mode-')).toEqual({ type: 'unknown', raw: 'writing-mode-' });
      expect(parseUtility('writing-mode-foo')).toEqual({ type: 'unknown', raw: 'writing-mode-foo' });
    });
  });
}); 