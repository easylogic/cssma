import { describe, it, expect } from 'vitest';
import { parseUtility } from '../../src/parser/parseUtility';
import { baseUtility } from './base';

describe('parseUtility (list)', () => {
  describe('list-style-type', () => {
    it('should parse Tailwind v4 list style type classes', () => {
      expect(parseUtility('list-none')).toEqual(baseUtility({ prefix: 'list', value: 'none', raw: 'list-none' }));
      expect(parseUtility('list-disc')).toEqual(baseUtility({ prefix: 'list', value: 'disc', raw: 'list-disc' }));
      expect(parseUtility('list-decimal')).toEqual(baseUtility({ prefix: 'list', value: 'decimal', raw: 'list-decimal' }));
      expect(parseUtility('list-image-[url(https://example.com/list.svg)]')).toEqual(baseUtility({ prefix: 'list-image', value: 'url(https://example.com/list.svg)', arbitrary: true, arbitraryValue: 'url(https://example.com/list.svg)', raw: 'list-image-[url(https://example.com/list.svg)]' }));
      expect(parseUtility('list-')).toEqual({ type: 'unknown', raw: 'list-' });
    });
  });

  describe('list-style-position', () => {
    it('should parse Tailwind v4 list style position classes', () => {
      expect(parseUtility('list-inside')).toEqual(baseUtility({ prefix: 'list', value: 'inside', raw: 'list-inside' }));
      expect(parseUtility('list-outside')).toEqual(baseUtility({ prefix: 'list', value: 'outside', raw: 'list-outside' }));
      expect(parseUtility('list-style-position-')).toEqual({ type: 'unknown', raw: 'list-style-position-' });
    });
  });

  describe('marker', () => {
    it('should parse Tailwind v4 marker classes', () => {
      expect(parseUtility('marker')).toEqual(baseUtility({ prefix: 'marker', raw: 'marker' }));
      expect(parseUtility('marker-start')).toEqual(baseUtility({ prefix: 'marker', value: 'start', raw: 'marker-start' }));
      expect(parseUtility('marker-mid')).toEqual(baseUtility({ prefix: 'marker', value: 'mid', raw: 'marker-mid' }));
      expect(parseUtility('marker-end')).toEqual(baseUtility({ prefix: 'marker', value: 'end', raw: 'marker-end' }));
      expect(parseUtility('marker-[url(https://example.com/marker.svg)]')).toEqual(baseUtility({ prefix: 'marker', value: 'url(https://example.com/marker.svg)', arbitrary: true, arbitraryValue: 'url(https://example.com/marker.svg)', raw: 'marker-[url(https://example.com/marker.svg)]' }));
      expect(parseUtility('marker-')).toEqual({ type: 'unknown', raw: 'marker-' });
    });
  });
}); 