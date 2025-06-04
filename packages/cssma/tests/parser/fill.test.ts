import { parseStyleValue } from '../../src/parser';

describe('fill- class parsing', () => {
  test('should parse fill-white', () => {
    const result = parseStyleValue('fill-white');
    expect(result).toEqual({
      property: 'backgroundColor',
      value: { r: 1, g: 1, b: 1 },
      variant: 'preset'
    });
  });

  test('should parse fill-red-500', () => {
    const result = parseStyleValue('fill-red-500');
    expect(result).toEqual({
      property: 'backgroundColor',
      value: { r: 0.94, g: 0.27, b: 0.27 },
      variant: 'preset'
    });
  });

  test('should parse fill-[#FF0000]', () => {
    const result = parseStyleValue('fill-[#FF0000]');
    expect(result).toEqual({
      property: 'backgroundColor',
      value: '#FF0000',
      variant: 'arbitrary'
    });
  });

  test('should parse fill-none', () => {
    const result = parseStyleValue('fill-none');
    expect(result).toEqual({
      property: 'backgroundColor',
      value: { r: 0, g: 0, b: 0, a: 0 },
      variant: 'preset'
    });
  });

  test('should parse fill-transparent', () => {
    const result = parseStyleValue('fill-transparent');
    expect(result).toEqual({
      property: 'backgroundColor',
      value: { r: 0, g: 0, b: 0, a: 0 },
      variant: 'preset'
    });
  });

  test('should parse fill-blue-500/50', () => {
    const result = parseStyleValue('fill-blue-500/50');
    expect(result).toEqual({
      property: 'backgroundColor',
      value: { r: 0.23, g: 0.51, b: 0.96 },
      variant: 'preset',
      opacity: 0.5
    });
  });
}); 