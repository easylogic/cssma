import { describe, it, expect } from 'vitest';
import { parseBorderWidth } from '../../src/parser/utilities/borderWidth';

describe('parseBorderWidth', () => {
  it('parses basic border width', () => {
    expect(parseBorderWidth('border')).toMatchObject({ type: 'border-width', side: 'all', value: '1px', raw: 'border', arbitrary: false });
    expect(parseBorderWidth('border-2')).toMatchObject({ type: 'border-width', side: 'all', value: '2px', raw: 'border-2', arbitrary: false });
    expect(parseBorderWidth('border-8')).toMatchObject({ type: 'border-width', side: 'all', value: '8px', raw: 'border-8', arbitrary: false });
  });

  it('parses border-x and border-y', () => {
    expect(parseBorderWidth('border-x')).toMatchObject({ type: 'border-width', side: 'x', value: '1px', raw: 'border-x', arbitrary: false });
    expect(parseBorderWidth('border-x-4')).toMatchObject({ type: 'border-width', side: 'x', value: '4px', raw: 'border-x-4', arbitrary: false });
    expect(parseBorderWidth('border-y')).toMatchObject({ type: 'border-width', side: 'y', value: '1px', raw: 'border-y', arbitrary: false });
    expect(parseBorderWidth('border-y-3')).toMatchObject({ type: 'border-width', side: 'y', value: '3px', raw: 'border-y-3', arbitrary: false });
  });

  it('parses logical and side border width', () => {
    expect(parseBorderWidth('border-s')).toMatchObject({ type: 'border-width', side: 's', value: '1px', raw: 'border-s', arbitrary: false });
    expect(parseBorderWidth('border-e-2')).toMatchObject({ type: 'border-width', side: 'e', value: '2px', raw: 'border-e-2', arbitrary: false });
    expect(parseBorderWidth('border-t')).toMatchObject({ type: 'border-width', side: 't', value: '1px', raw: 'border-t', arbitrary: false });
    expect(parseBorderWidth('border-b-5')).toMatchObject({ type: 'border-width', side: 'b', value: '5px', raw: 'border-b-5', arbitrary: false });
    expect(parseBorderWidth('border-l-1')).toMatchObject({ type: 'border-width', side: 'l', value: '1px', raw: 'border-l-1', arbitrary: false });
    expect(parseBorderWidth('border-r-6')).toMatchObject({ type: 'border-width', side: 'r', value: '6px', raw: 'border-r-6', arbitrary: false });
  });

  it('parses arbitrary and custom property', () => {
    expect(parseBorderWidth('border-[2vw]')).toMatchObject({ type: 'border-width', side: 'all', value: '2vw', raw: 'border-[2vw]', arbitrary: true });
    expect(parseBorderWidth('border-x-[10px]')).toMatchObject({ type: 'border-width', side: 'x', value: '10px', raw: 'border-x-[10px]', arbitrary: true });
    expect(parseBorderWidth('border-t-[0.5rem]')).toMatchObject({ type: 'border-width', side: 't', value: '0.5rem', raw: 'border-t-[0.5rem]', arbitrary: true });
    expect(parseBorderWidth('border-(length:--my-border-width)')).toMatchObject({ type: 'border-width', side: 'all', value: 'var(--my-border-width)', raw: 'border-(length:--my-border-width)', arbitrary: true });
    expect(parseBorderWidth('border-y-(length:--foo)')).toMatchObject({ type: 'border-width', side: 'y', value: 'var(--foo)', raw: 'border-y-(length:--foo)', arbitrary: true });
  });

  it('returns null for invalid', () => {
    expect(parseBorderWidth('border-foo')).toBeNull();
    expect(parseBorderWidth('border-x-')).toBeNull();
    expect(parseBorderWidth('border-tl-2')).toBeNull();
  });
}); 