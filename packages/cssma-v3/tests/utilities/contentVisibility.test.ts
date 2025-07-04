import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (content-visibility)', () => {
  describe('content-visibility', () => {
    it('should parse Tailwind v4 content-visibility classes', () => {
      expect(parseUtility('content-visibility-auto')).toEqual(baseUtility({ prefix: 'content-visibility', value: 'auto', raw: 'content-visibility-auto' }));
      expect(parseUtility('content-visibility-hidden')).toEqual(baseUtility({ prefix: 'content-visibility', value: 'hidden', raw: 'content-visibility-hidden' }));
      expect(parseUtility('content-visibility-visible')).toEqual(baseUtility({ prefix: 'content-visibility', value: 'visible', raw: 'content-visibility-visible' }));
      expect(parseUtility('content-visibility-')).toEqual({ type: 'unknown', raw: 'content-visibility-' });
      expect(parseUtility('content-visibility-foo')).toEqual({ type: 'unknown', raw: 'content-visibility-foo' });
    });
  });
}); 