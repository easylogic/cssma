// modifier 파서 테스트 (추후 구현) 

import { describe, it, expect } from 'vitest';
import { parseModifier } from '../src/parser/parseModifier';
import { baseModifier } from './modifiers/base';

describe('parseModifier (단일 Tailwind modifier 파서)', () => {
  // 공식 문서/실전 예제/엣지/에러/조합 등 다양한 케이스를 대량으로 테스트
  const cases: Array<[string, any]> = [
    // --- 공식 문서/실전 예제 ---
    ['hover', baseModifier({ prefix: 'hover', value: '', raw: 'hover' })],
    ['focus', baseModifier({ prefix: 'focus', value: '', raw: 'focus' })],
    ['active', baseModifier({ prefix: 'active', value: '', raw: 'active' })],
    ['visited', baseModifier({ prefix: 'visited', value: '', raw: 'visited' })],
    ['focus-within', baseModifier({ prefix: 'focus-within', value: '', raw: 'focus-within' })],
    ['focus-visible', baseModifier({ prefix: 'focus-visible', value: '', raw: 'focus-visible' })],
    ['checked', baseModifier({ prefix: 'checked', value: '', raw: 'checked' })],
    ['disabled', baseModifier({ prefix: 'disabled', value: '', raw: 'disabled' })],
    ['enabled', baseModifier({ prefix: 'enabled', value: '', raw: 'enabled' })],
    ['first', baseModifier({ prefix: 'first', value: '', raw: 'first' })],
    ['last', baseModifier({ prefix: 'last', value: '', raw: 'last' })],
    ['odd', baseModifier({ prefix: 'odd', value: '', raw: 'odd' })],
    ['even', baseModifier({ prefix: 'even', value: '', raw: 'even' })],
    ['empty', baseModifier({ prefix: 'empty', value: '', raw: 'empty' })],
    ['required', baseModifier({ prefix: 'required', value: '', raw: 'required' })],
    ['optional', baseModifier({ prefix: 'optional', value: '', raw: 'optional' })],
    ['valid', baseModifier({ prefix: 'valid', value: '', raw: 'valid' })],
    ['invalid', baseModifier({ prefix: 'invalid', value: '', raw: 'invalid' })],
    ['user-valid', baseModifier({ prefix: 'user-valid', value: '', raw: 'user-valid' })],
    ['user-invalid', baseModifier({ prefix: 'user-invalid', value: '', raw: 'user-invalid' })],
    ['in-range', baseModifier({ prefix: 'in-range', value: '', raw: 'in-range' })],
    ['out-of-range', baseModifier({ prefix: 'out-of-range', value: '', raw: 'out-of-range' })],
    ['default', baseModifier({ prefix: 'default', value: '', raw: 'default' })],
    ['indeterminate', baseModifier({ prefix: 'indeterminate', value: '', raw: 'indeterminate' })],
    ['placeholder', baseModifier({ prefix: 'placeholder', value: '', raw: 'placeholder' })],
    ['autofill', baseModifier({ prefix: 'autofill', value: '', raw: 'autofill' })],
    ['read-only', baseModifier({ prefix: 'read-only', value: '', raw: 'read-only' })],
    ['details-content', baseModifier({ prefix: 'details-content', value: '', raw: 'details-content' })],
    // breakpoint
    ['sm', baseModifier({ prefix: 'sm', value: '', raw: 'sm' })],
    ['md', baseModifier({ prefix: 'md', value: '', raw: 'md' })],
    ['lg', baseModifier({ prefix: 'lg', value: '', raw: 'lg' })],
    ['xl', baseModifier({ prefix: 'xl', value: '', raw: 'xl' })],
    ['2xl', baseModifier({ prefix: '2xl', value: '', raw: '2xl' })],
    // media/dark/motion
    ['dark', baseModifier({ prefix: 'dark', value: '', raw: 'dark' })],
    ['motion-safe', baseModifier({ prefix: 'motion-safe', value: '', raw: 'motion-safe' })],
    ['motion-reduce', baseModifier({ prefix: 'motion-reduce', value: '', raw: 'motion-reduce' })],
    // group/peer
    ['group-hover', baseModifier({ prefix: 'group', value: 'hover', raw: 'group-hover' })],
    ['group-focus', baseModifier({ prefix: 'group', value: 'focus', raw: 'group-focus' })],
    ['peer-checked', baseModifier({ prefix: 'peer', value: 'checked', raw: 'peer-checked' })],
    ['peer-focus', baseModifier({ prefix: 'peer', value: 'focus', raw: 'peer-focus' })],
    // supports/media/container arbitrary
    ['supports-[display:grid]', baseModifier({ prefix: 'supports', value: 'display:grid', raw: 'supports-[display:grid]', arbitrary: true, arbitraryValue: 'display:grid' })],
    // arbitrary variant
    ['[&>*]', baseModifier({ prefix: 'arbitrary', value: '&>*', raw: '[&>*]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: '&>*' })],
    ['[.foo_bar]', baseModifier({ prefix: 'arbitrary', value: '.foo bar', raw: '[.foo_bar]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: '.foo bar' })],
    ['[role=button]', baseModifier({ prefix: 'arbitrary', value: 'role=button', raw: '[role=button]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: 'role=button' })],
    ['[data-state=open]', baseModifier({ prefix: 'arbitrary', value: 'data-state=open', raw: '[data-state=open]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: 'data-state=open' })],
    ['[aria-selected]', baseModifier({ prefix: 'arbitrary', value: 'aria-selected', raw: '[aria-selected]', arbitrary: true, arbitraryType: 'attribute', arbitraryValue: 'aria-selected' })],
    // data/aria attribute
    ['data-active', baseModifier({ prefix: 'data', value: 'active', raw: 'data-active' })],
    ['aria-checked', baseModifier({ prefix: 'aria', value: 'checked', raw: 'aria-checked' })],
    ['data-foo-bar', baseModifier({ prefix: 'data', value: 'foo-bar', raw: 'data-foo-bar' })],
    ['aria-expanded', baseModifier({ prefix: 'aria', value: 'expanded', raw: 'aria-expanded' })],
    // logical/state
    ['has-checked', baseModifier({ prefix: 'has', value: 'checked', raw: 'has-checked' })],
    ['not-focus', baseModifier({ prefix: 'not', value: 'focus', raw: 'not-focus' })],
    ['has-aria-checked', baseModifier({ prefix: 'has', value: 'aria-checked', raw: 'has-aria-checked' })],
    ['not-hover', baseModifier({ prefix: 'not', value: 'hover', raw: 'not-hover' })],
    // nth/nth-of-type/nth-last-of-type
    ['nth', baseModifier({ prefix: 'nth', value: '', raw: 'nth' })],
    ['nth-[3n+1]', baseModifier({ prefix: 'nth', value: '3n+1', raw: 'nth-[3n+1]', arbitrary: true, arbitraryValue: '3n+1' })],
    ['nth-of-type-2', baseModifier({ prefix: 'nth-of-type', value: '2', raw: 'nth-of-type-2', numeric: true })],
    ['nth-of-type-[2n+1]', baseModifier({ prefix: 'nth-of-type', value: '2n+1', raw: 'nth-of-type-[2n+1]', arbitrary: true, arbitraryValue: '2n+1' })],
    ['nth-last-of-type-4', baseModifier({ prefix: 'nth-last-of-type', value: '4', raw: 'nth-last-of-type-4', numeric: true })],
    ['nth-last-of-type-[3n+1]', baseModifier({ prefix: 'nth-last-of-type', value: '3n+1', raw: 'nth-last-of-type-[3n+1]', arbitrary: true, arbitraryValue: '3n+1' })],
    // pseudo-element
    ['before', baseModifier({ prefix: 'before', value: '', raw: 'before' })],
    ['after', baseModifier({ prefix: 'after', value: '', raw: 'after' })],
    ['placeholder', baseModifier({ prefix: 'placeholder', value: '', raw: 'placeholder' })],
    ['selection', baseModifier({ prefix: 'selection', value: '', raw: 'selection' })],
    ['marker', baseModifier({ prefix: 'marker', value: '', raw: 'marker' })],
    ['first-line', baseModifier({ prefix: 'first-line', value: '', raw: 'first-line' })],
    ['first-letter', baseModifier({ prefix: 'first-letter', value: '', raw: 'first-letter' })],
    ['backdrop', baseModifier({ prefix: 'backdrop', value: '', raw: 'backdrop' })],
    // direction/structural/state
    ['ltr', baseModifier({ prefix: 'ltr', value: '', raw: 'ltr' })],
    ['rtl', baseModifier({ prefix: 'rtl', value: '', raw: 'rtl' })],
    ['open', baseModifier({ prefix: 'open', value: '', raw: 'open' })],
    ['inert', baseModifier({ prefix: 'inert', value: '', raw: 'inert' })],
    ['[]', { type: 'unknown', raw: '[]' }],
    // ['data-', { type: 'data', attr: '' }],
    // ['aria-', { type: 'aria', attr: '' }],
    // ['has-', { type: 'logical', op: 'has', value: '' }],
    // ['not-', { type: 'logical', op: 'not', value: '' }],
    // ['nth-', { type: 'nth', value: '' }],
    // ['nth-of-type-', { type: 'nth-of-type', value: '' }],
    // ['nth-last-of-type-', { type: 'nth-last-of-type', value: '' }],
    // --- 엣지/에러 케이스 ---
    ['', { type: 'unknown', raw: '' }],
    ['hovered', { type: 'unknown', raw: 'hovered' }],
    ['group-', { type: 'unknown', raw: 'group-' }],
    ['!', { type: 'unknown', raw: '!' }],
    // --- 복합/중첩/실전 조합 ---
    // (토크나이저+파서 통합 테스트에서 별도 진행 권장)
    // --- 최신 TailwindCSS 공식 modifier 테스트 ---
    ['forced-colors', baseModifier({ prefix: 'forced-colors', value: '', raw: 'forced-colors' })],
    ['not-forced-colors', baseModifier({ prefix: 'not-forced-colors', value: '', raw: 'not-forced-colors' })],
    ['inverted-colors', baseModifier({ prefix: 'inverted-colors', value: '', raw: 'inverted-colors' })],
    ['pointer', baseModifier({ prefix: 'pointer', value: '', raw: 'pointer' })],
    ['any-pointer', baseModifier({ prefix: 'any-pointer', value: '', raw: 'any-pointer' })],
    ['portrait', baseModifier({ prefix: 'portrait', value: '', raw: 'portrait' })],
    ['landscape', baseModifier({ prefix: 'landscape', value: '', raw: 'landscape' })],
    ['noscript', baseModifier({ prefix: 'noscript', value: '', raw: 'noscript' })],
    ['not-supports', baseModifier({ prefix: 'not-supports', value: '', raw: 'not-supports' })],
    ['starting', baseModifier({ prefix: 'starting', value: '', raw: 'starting' })],
    ['theme', baseModifier({ prefix: 'theme', value: '', raw: 'theme' })],
    // --- TailwindCSS 확장/조합형 modifier 테스트 ---
    ['theme-midnight', baseModifier({ prefix: 'theme', value: 'midnight', raw: 'theme-midnight' })],
    ['theme-light', baseModifier({ prefix: 'theme', value: 'light', raw: 'theme-light' })],
    ['theme-dark', baseModifier({ prefix: 'theme', value: 'dark', raw: 'theme-dark' })],
    ['pointer-none', baseModifier({ prefix: 'pointer', value: 'none', raw: 'pointer-none' })],
    ['pointer-coarse', baseModifier({ prefix: 'pointer', value: 'coarse', raw: 'pointer-coarse' })],
    ['pointer-fine', baseModifier({ prefix: 'pointer', value: 'fine', raw: 'pointer-fine' })],
    ['any-pointer-none', baseModifier({ prefix: 'any-pointer', value: 'none', raw: 'any-pointer-none' })],
    ['any-pointer-coarse', baseModifier({ prefix: 'any-pointer', value: 'coarse', raw: 'any-pointer-coarse' })],
    ['any-pointer-fine', baseModifier({ prefix: 'any-pointer', value: 'fine', raw: 'any-pointer-fine' })],
    ['target-blank', baseModifier({ prefix: 'target', value: 'blank', raw: 'target-blank' })],
    ['target-self', baseModifier({ prefix: 'target', value: 'self', raw: 'target-self' })],
    ['target-parent', baseModifier({ prefix: 'target', value: 'parent', raw: 'target-parent' })],
    ['target-top', baseModifier({ prefix: 'target', value: 'top', raw: 'target-top' })],
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });

  // 추가: 실전에서 자주 쓰이는 modifier 조합을 위한 설명용 예시 (토크나이저+파서 통합 테스트에서 활용)
  // 예: sm:dark:hover:focus:bg-red-500! 등
}); 