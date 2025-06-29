import { CssmaContext } from './../../src/types';
import { describe, it, expect } from 'vitest';
import { parseContextColorUtility } from '../../src/parser/utils/colorParser';
import { theme as themeGetter } from '../../src/config/theme-getter';

const mockThemeObj = {
  colors: {
    red: { "500": "#f00" },
    blue: { "200": "#00f" },
    rose: { "500": "#f33" }
  }
};
const mockContext: CssmaContext = { 
  theme: (...args: any[]) => themeGetter(mockThemeObj, ...args),
  config: () => {},
  plugins: []
};

describe('parseContextColorUtility', () => {
  it('parses palette color', () => {
    expect(parseContextColorUtility({
      token: 'bg-blue-200',
      prefix: 'bg',
      type: 'background-color',
      context: mockContext,
      allowOpacity: true
    })).toEqual({
      type: 'background-color',
      value: 'blue-200',
      raw: 'bg-blue-200',
      arbitrary: false,
      customProperty: false,
      preset: 'colors.blue.200'
    });
  });

  it('parses palette color with opacity', () => {
    expect(parseContextColorUtility({
      token: 'bg-blue-200/50',
      prefix: 'bg',
      type: 'background-color',
      context: mockContext,
      allowOpacity: true
    })).toEqual({
      type: 'background-color',
      value: 'blue-200',
      raw: 'bg-blue-200/50',
      arbitrary: false,
      customProperty: false,
      preset: 'colors.blue.200',
      opacity: 50
    });
  });

  it('returns null for missing palette', () => {
    expect(parseContextColorUtility({
      token: 'bg-foo-100',
      prefix: 'bg',
      type: 'background-color',
      context: mockContext,
      allowOpacity: true
    })).toBeNull();
  });
});

describe('parseContextColorUtility (디테일)', () => {
  it('정규식 매칭 결과를 직접 확인', () => {
    const token = 'bg-blue-200/50';
    const re = new RegExp(`^bg-([a-zA-Z0-9-]+)(?:/(\\d{1,3}))?$`);
    const match = token.match(re);
    expect(match?.[1]).toBe('blue-200');
    expect(match?.[2]).toBe('50');
  });

  it('opacity가 포함된 경우의 전체 동작', () => {
    const token = 'bg-blue-200/50';
    const result = parseContextColorUtility({
      token,
      prefix: 'bg',
      type: 'background-color',
      context: mockContext,
      allowOpacity: true
    });
    expect(result).toEqual({
      type: 'background-color',
      value: 'blue-200',
      raw: 'bg-blue-200/50',
      arbitrary: false,
      customProperty: false,
      preset: 'colors.blue.200',
      opacity: 50
    });
  });

  it('opacity가 없는 경우의 전체 동작', () => {
    const token = 'bg-blue-200';
    const result = parseContextColorUtility({
      token,
      prefix: 'bg',
      type: 'background-color',
      context: mockContext,
      allowOpacity: true
    });
    expect(result).toEqual({
      type: 'background-color',
      value: 'blue-200',
      raw: 'bg-blue-200',
      arbitrary: false,
      customProperty: false,
      preset: 'colors.blue.200'
    });
  });

  it('정상적으로 없는 palette는 null', () => {
    const token = 'bg-foo-100/50';
    const result = parseContextColorUtility({
      token,
      prefix: 'bg',
      type: 'background-color',
      context: mockContext,
      allowOpacity: true
    });
    expect(result).toBeNull();
  });
});

describe('parseContextColorUtility (정규식 매칭 디버그)', () => {
  it('paletteKey와 opacity 분리 확인', () => {
    const token = 'bg-blue-200/50';
    const re = /^bg-([a-zA-Z0-9-]+)(?:\/(\d{1,3}))?$/;
    const match = token.match(re);
    const paletteKey = match ? match[1] : undefined;
    const opacity = match && match[2] ? parseInt(match[2], 10) : undefined;
    expect(paletteKey).toBe('blue-200');
    expect(opacity).toBe(50);
  });
});

it.only('palette color with opacity - 내부 상태 파일 로그', () => {
  const token = 'bg-blue-200/50';
  const prefix = 'bg';
  const type = 'background-color';
  const allowOpacity = true;
  const re = allowOpacity
    ? new RegExp(`^${prefix}-([a-zA-Z0-9-]+)(?:\/(\\d{1,3}))?$`)
    : new RegExp(`^${prefix}-([a-zA-Z0-9-]+)$`);
  const match = token.match(re);
  const paletteKey = match ? match[1] : undefined;
  const opacity = match && match[2] ? parseInt(match[2], 10) : undefined;
  const themePath = paletteKey ? `colors.${paletteKey.replace(/-/g, '.')}` : undefined;
  const themeValue = themePath ? mockContext.theme(themePath) : undefined;
  const result = parseContextColorUtility({ token, prefix, type, context: mockContext, allowOpacity });
  expect(result).toEqual({
    type: 'background-color',
    value: 'blue-200',
    raw: 'bg-blue-200/50',
    arbitrary: false,
    customProperty: false,
    preset: 'colors.blue.200',
    opacity: 50
  });
}); 