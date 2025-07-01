import { resolveTheme } from '../src/config/resolve-theme';
import { deepMerge, shallowMerge } from '../src/config/merge-utils';
import { CssmaConfig, CssmaTheme } from '../src/theme-types';
import { describe, expect, it } from 'vitest';

describe('config/theme merging', () => {
  const baseTheme: CssmaTheme = {
    colors: { red: { '500': '#f00', '600': '#c00' }, blue: { '500': '#00f' } },
    spacing: { '4': '16px', '8': '32px' },
    custom: { a: 1 },
  } as any;

  const preset1 = { theme: { colors: { red: { '500': '#ff0000' } }, spacing: { '4': '1rem' } } };
  const preset2 = { theme: { colors: { green: { '500': '#0f0' } }, custom: { b: 2 } } };

  it('deepMerge: 확장', () => {
    const merged = deepMerge(baseTheme, { colors: { red: { 700: '#a00' } }, custom: { b: 2 } });
    expect(merged.colors?.red['500']).toBe('#f00');
    expect(merged.colors?.red[700]).toBe('#a00');
    expect(merged.custom.a).toBe(1);
    expect(merged.custom.b).toBe(2);
  });

  it('shallowMerge: 덮어쓰기', () => {
    const merged = shallowMerge(baseTheme, { colors: { red: { 900: '#900' } } });
    expect(merged.colors?.red[900]).toBe('#900');
    expect(merged.colors?.red['500']).toBeUndefined(); // 완전 교체
  });

  it('resolveTheme: presets + override + extend', () => {
    const config: CssmaConfig = {
      presets: [preset1 as any, preset2 as any],
      theme: {
        colors: { blue: { '700': '#007' } }, // override (덮어쓰기)
        extend: {
          colors: { red: { '800': '#800' } }, // 확장
          spacing: { '16': '64px' },
        },
      } as any,
    };
    const theme = resolveTheme(config);
    // override에 colors가 있으면 기존 colors 전체가 교체됨 (업계 표준 동작)
    expect(theme.colors?.red).toEqual({ '800': '#800' }); // extend에서 추가된 값만 남음
    expect(theme.colors?.blue['700']).toBe('#007');
    // extend 적용
    expect(theme.colors?.red['800']).toBe('#800');
    expect(theme.spacing?.['16']).toBe('64px');
  });
});

describe('복잡한 config 병합 시나리오', () => {
  it('여러 preset, override, extend가 중첩된 경우', () => {
    const presetA = { theme: { colors: { red: { '500': '#a00', '600': '#a60' }, blue: { '500': '#00a' } }, spacing: { '2': '8px' }, arr: [1, 2] } };
    const presetB = { theme: { colors: { red: { '700': '#a70' }, green: { '500': '#0a0' } }, spacing: { '4': '16px' }, arr: [3] } };
    const config: CssmaConfig = {
      presets: [presetA as any, presetB as any],
      theme: {
        colors: { blue: { '500': '#00f', '900': '#009' } }, // override (덮어쓰기)
        spacing: { '2': '0.5rem' }, // override
        arr: [9, 8], // override (배열은 완전 교체)
        extend: {
          colors: { red: { '800': '#a80' }, green: { '600': '#0a6' } }, // 확장
          spacing: { '8': '32px' },
          obj: { x: 1 },
        },
      } as any,
    };
    const theme = resolveTheme(config);
    // override에 colors가 있으면 기존 colors 전체가 교체됨 (업계 표준 동작)
    expect(theme.colors?.red['500']).toBeUndefined(); // red는 사라짐
    expect(theme.colors?.blue['500']).toBe('#00f');
    expect(theme.colors?.blue['900']).toBe('#009');
    // extend 적용
    expect(theme.colors?.red['800']).toBe('#a80');
    expect(theme.colors?.green['600']).toBe('#0a6');
    expect(theme.spacing?.['8']).toBe('32px');
    expect(theme.obj?.x).toBe(1);
  });

  it('객체/배열/타입 혼합: deepMerge vs shallowMerge', () => {
    const base = { a: { b: 1, c: 2 }, arr: [1, 2], val: 10 } as any;
    const ext = { a: { c: 3 }, arr: [3], val: 20 };
    const deep = deepMerge(base, ext);
    const shallow = shallowMerge(base, ext);
    // deepMerge: 객체는 병합, 배열/원시값은 교체
    expect(deep.a?.b).toBe(1);
    expect(deep.a?.c).toBe(3); // deepMerge는 c가 3으로 덮어써짐
    expect(deep.arr).toEqual([3]);
    expect(deep.val).toBe(20);
    // shallowMerge: 1단계만 교체
    expect(shallow.a).toEqual({ c: 3 });
    expect(shallow.arr).toEqual([3]);
    expect(shallow.val).toBe(20);
  });

  it('extend에서만 deepMerge, override는 완전 교체', () => {
    const config: CssmaConfig = {
      theme: {
        colors: { red: { 500: '#f00', 600: '#c00' } },
        extend: { colors: { red: { 700: '#a00' }, blue: { 500: '#00f' } } },
      } as any,
    };
    const theme = resolveTheme(config);
    // override
    expect(theme.colors?.red['500']).toBe('#f00');
    expect(theme.colors?.red['600']).toBe('#c00');
    // extend
    expect(theme.colors?.red['700']).toBe('#a00');
    expect(theme.colors?.blue['500']).toBe('#00f');
  });

  it('deepMerge: 배열은 완전 교체, 객체만 병합', () => {
    const a = { arr: [1, 2], obj: { x: 1 } } as any;
    const b = { arr: [3], obj: { y: 2 } } as any;
    const merged = deepMerge(a, b);
    expect(merged.arr).toEqual([3]); // 배열은 완전 교체
    expect(merged.obj?.x).toBe(1);
    expect(merged.obj?.y).toBe(2);
  });

});

describe('현실적인 config 병합 시나리오', () => {
  it('keyframes: extend로 새로운 key 추가', () => {
    const config: CssmaConfig = {
      theme: {
        keyframes: { spin: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } } },
        extend: {
          keyframes: {
            bounce: { '0%, 100%': { transform: 'translateY(-25%)' }, '50%': { transform: 'none' } }
          }
        }
      } as any
    };
    const theme = resolveTheme(config);
    expect(theme.keyframes.spin.from.transform).toBe('rotate(0deg)');
    expect(theme.keyframes.bounce['0%, 100%'].transform).toBe('translateY(-25%)');
  });

  it('keyframes: extend로 기존 key의 일부만 덮어쓰기', () => {
    const config: CssmaConfig = {
      theme: {
        keyframes: { spin: { from: { opacity: 0.5 }, to: { opacity: 1 } } },
        extend: {
          keyframes: {
            spin: { to: { opacity: 0.8 }, mid: { opacity: 0.2 } }
          }
        }
      } as any
    };
    const theme = resolveTheme(config);
    // from은 유지, to는 덮어쓰기, mid는 추가
    expect(theme.keyframes.spin.from.opacity).toBe(0.5);
    expect(theme.keyframes.spin.to.opacity).toBe(0.8);
    expect(theme.keyframes.spin.mid.opacity).toBe(0.2);
  });

  it('keyframes: override로 기존 key 완전 교체', () => {
    const config: CssmaConfig = {
      theme: {
        keyframes: { spin: { from: { opacity: 0.1 } } },
        extend: {
          keyframes: {
            spin: { to: { opacity: 0.9 } }
          }
        }
      } as any
    };
    // override로 spin 전체 교체
    const overrideConfig: CssmaConfig = {
      theme: {
        keyframes: { spin: { only: { opacity: 1 } } }
      } as any
    };
    const theme = resolveTheme(config);
    const themeOverride = resolveTheme(overrideConfig);
    // extend: 기존 + 일부만 병합
    expect(theme.keyframes.spin.from.opacity).toBe(0.1);
    expect(theme.keyframes.spin.to.opacity).toBe(0.9);
    // override: 완전 교체
    expect(themeOverride.keyframes.spin.only.opacity).toBe(1);
    expect(themeOverride.keyframes.spin.from).toBeUndefined();
  });

  it('animation: deeply nested extend/override', () => {
    const config: CssmaConfig = {
      theme: {
        animation: {
          spin: 'spin 1s linear infinite',
          bounce: 'bounce 1s infinite'
        },
        extend: {
          animation: {
            spin: 'spin 2s linear infinite', // override
            ping: 'ping 1s cubic-bezier(0,0,0.2,1) infinite'
          }
        }
      } as any
    };
    const theme = resolveTheme(config);
    expect(theme.animation.spin).toBe('spin 2s linear infinite'); // extend에서 덮어씀
    expect(theme.animation.bounce).toBe('bounce 1s infinite'); // 기존 유지
    expect(theme.animation.ping).toBe('ping 1s cubic-bezier(0,0,0.2,1) infinite'); // extend에서 추가
  });

  it('keyframes: deeply nested 객체 병합', () => {
    const config: CssmaConfig = {
      theme: {
        keyframes: {
          complex: {
            from: { opacity: 0, transform: 'scale(0.95)' },
            to: { opacity: 1, transform: 'scale(1)' }
          }
        },
        extend: {
          keyframes: {
            complex: {
              from: { opacity: 0.5 },
              mid: { opacity: 0.8 }
            }
          }
        }
      } as any
    };
    const theme = resolveTheme(config);
    // from.opacity는 덮어쓰기, from.transform은 유지, to는 유지, mid는 추가
    expect(theme.keyframes.complex.from.opacity).toBe(0.5);
    expect(theme.keyframes.complex.from.transform).toBe('scale(0.95)');
    expect(theme.keyframes.complex.to.opacity).toBe(1);
    expect(theme.keyframes.complex.mid.opacity).toBe(0.8);
  });
}); 