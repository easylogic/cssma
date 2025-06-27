import { describe, it, expect } from 'vitest';
import { parseBorderColor } from '../../src/parser/utilities/borderColor';

describe('parseBorderColor', () => {
  it('parses basic border color presets', () => {
    expect(parseBorderColor('border-inherit')).toMatchObject({ type: 'border-color', side: 'all', preset: 'inherit', raw: 'border-inherit', arbitrary: false });
    expect(parseBorderColor('border-current')).toMatchObject({ type: 'border-color', side: 'all', preset: 'current', raw: 'border-current', arbitrary: false });
    expect(parseBorderColor('border-transparent')).toMatchObject({ type: 'border-color', side: 'all', preset: 'transparent', raw: 'border-transparent', arbitrary: false });
    expect(parseBorderColor('border-black')).toMatchObject({ type: 'border-color', side: 'all', preset: 'black', raw: 'border-black', arbitrary: false });
    expect(parseBorderColor('border-white')).toMatchObject({ type: 'border-color', side: 'all', preset: 'white', raw: 'border-white', arbitrary: false });
  });

  it('parses palette border color', () => {
    expect(parseBorderColor('border-red-500')).toMatchObject({ type: 'border-color', side: 'all', preset: 'red-500', raw: 'border-red-500', arbitrary: false });
    expect(parseBorderColor('border-blue-200/75')).toMatchObject({ type: 'border-color', side: 'all', preset: 'blue-200/75', raw: 'border-blue-200/75', arbitrary: false });
  });

  it('parses x and side palette border color', () => {
    expect(parseBorderColor('border-x-blue-500')).toMatchObject({ type: 'border-color', side: 'x', preset: 'blue-500', raw: 'border-x-blue-500', arbitrary: false });
    expect(parseBorderColor('border-t-indigo-500')).toMatchObject({ type: 'border-color', side: 't', preset: 'indigo-500', raw: 'border-t-indigo-500', arbitrary: false });
    expect(parseBorderColor('border-b-pink-200/50')).toMatchObject({ type: 'border-color', side: 'b', preset: 'pink-200/50', raw: 'border-b-pink-200/50', arbitrary: false });
  });

  it('parses arbitrary and custom property', () => {
    expect(parseBorderColor('border-[#243c5a]')).toMatchObject({ type: 'border-color', side: 'all', value: '#243c5a', raw: 'border-[#243c5a]', arbitrary: true });
    expect(parseBorderColor('border-(--my-border)')).toMatchObject({ type: 'border-color', side: 'all', value: 'var(--my-border)', raw: 'border-(--my-border)', arbitrary: true });
    expect(parseBorderColor('border-x-[#243c5a]')).toMatchObject({ type: 'border-color', side: 'x', value: '#243c5a', raw: 'border-x-[#243c5a]', arbitrary: true });
    expect(parseBorderColor('border-x-(--my-border)')).toMatchObject({ type: 'border-color', side: 'x', value: 'var(--my-border)', raw: 'border-x-(--my-border)', arbitrary: true });
    expect(parseBorderColor('border-t-[#243c5a]')).toMatchObject({ type: 'border-color', side: 't', value: '#243c5a', raw: 'border-t-[#243c5a]', arbitrary: true });
    expect(parseBorderColor('border-t-(--my-border)')).toMatchObject({ type: 'border-color', side: 't', value: 'var(--my-border)', raw: 'border-t-(--my-border)', arbitrary: true });
  });

  it('returns null for invalid', () => {
    expect(parseBorderColor('border-foo')).toBeNull();
    expect(parseBorderColor('border-x-')).toBeNull();
    expect(parseBorderColor('border-tl-red-500')).toBeNull();
  });
}); 