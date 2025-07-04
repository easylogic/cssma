import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (accent)', () => {
  describe('accent', () => {
    it('should parse Tailwind v4 accent classes', () => {
      expect(parseUtility('accent-inherit')).toEqual(baseUtility({ prefix: 'accent', value: 'inherit', raw: 'accent-inherit' }));
      expect(parseUtility('accent-current')).toEqual(baseUtility({ prefix: 'accent', value: 'current', raw: 'accent-current' }));
      expect(parseUtility('accent-transparent')).toEqual(baseUtility({ prefix: 'accent', value: 'transparent', raw: 'accent-transparent' }));
      expect(parseUtility('accent-black')).toEqual(baseUtility({ prefix: 'accent', value: 'black', raw: 'accent-black' }));
      expect(parseUtility('accent-white')).toEqual(baseUtility({ prefix: 'accent', value: 'white', raw: 'accent-white' }));
      expect(parseUtility('accent-red-500')).toEqual(baseUtility({ prefix: 'accent', value: 'red-500', raw: 'accent-red-500' }));
      expect(parseUtility('accent-[color:rebeccapurple]')).toEqual(baseUtility({ prefix: 'accent', value: 'color:rebeccapurple', arbitrary: true, arbitraryValue: 'color:rebeccapurple', raw: 'accent-[color:rebeccapurple]' }));
      expect(parseUtility('accent-')).toEqual({ type: 'unknown', raw: 'accent-' });
    });
  });
}); 