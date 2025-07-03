import { describe, it, expect } from 'vitest';
import { parseModifier } from '../../src/parser/parseModifier';
import { baseModifier } from './base';

describe('parseModifier', () => {
  const cases: Array<[string, any]> = [
    ['@container', baseModifier({ prefix: '@container', value: '', raw: '@container' })],
    ['@min', baseModifier({ prefix: '@min', value: '', raw: '@min' })],
    ['@max', baseModifier({ prefix: '@max', value: '', raw: '@max' })],
    // 잘못된 값
    ['container-', { type: 'unknown', raw: 'container-' }],
    ['container', { type: 'unknown', raw: 'container' }],
    ['', { type: 'unknown', raw: '' }],
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });

  it('should parse container modifier correctly', () => {
    const result = parseModifier('@container');
    expect(result).toEqual(baseModifier({ prefix: '@container', value: '', raw: '@container' }));
  });

  it('should parse min modifier correctly', () => {
    const result = parseModifier('@min');
    expect(result).toEqual(baseModifier({ prefix: '@min', value: '', raw: '@min' }));
  });

  it('should parse max modifier correctly', () => {
    const result = parseModifier('@max');
    expect(result).toEqual(baseModifier({ prefix: '@max', value: '', raw: '@max' }));
  });

  it('should parse container- modifier correctly', () => {
    const result = parseModifier('container-');
    expect(result).toEqual({ type: 'unknown', raw: 'container-' });
  });

  it('should parse container modifier correctly', () => {
    const result = parseModifier('container');
    expect(result).toEqual({ type: 'unknown', raw: 'container' });
  });

  it('should parse empty string correctly', () => {
    const result = parseModifier('');
    expect(result).toEqual({ type: 'unknown', raw: '' });
  });

  it('should parse hover modifier correctly', () => {
    const result = parseModifier('hover');
    expect(result).toEqual(baseModifier({ prefix: 'hover', value: '', raw: 'hover' }));
  });
}); 