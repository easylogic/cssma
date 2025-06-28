// modifier 파서 테스트 (추후 구현) 

import { describe, it, expect } from 'vitest';
import { parseModifier } from '../src/parser/parseModifier';

describe('parseModifier (단일 Tailwind modifier 파서)', () => {
  // 공식 문서/실전 예제/엣지/에러/조합 등 다양한 케이스를 대량으로 테스트
  const cases: Array<[string, any]> = [
    // --- 공식 문서/실전 예제 ---
    ['hover', { type: 'pseudo', name: 'hover' }],
    ['focus', { type: 'pseudo', name: 'focus' }],
    ['active', { type: 'pseudo', name: 'active' }],
    ['visited', { type: 'pseudo', name: 'visited' }],
    ['focus-within', { type: 'pseudo', name: 'focus-within' }],
    ['focus-visible', { type: 'pseudo', name: 'focus-visible' }],
    ['checked', { type: 'pseudo', name: 'checked' }],
    ['disabled', { type: 'pseudo', name: 'disabled' }],
    ['enabled', { type: 'pseudo', name: 'enabled' }],
    ['first', { type: 'pseudo', name: 'first' }],
    ['last', { type: 'pseudo', name: 'last' }],
    ['odd', { type: 'pseudo', name: 'odd' }],
    ['even', { type: 'pseudo', name: 'even' }],
    ['empty', { type: 'pseudo', name: 'empty' }],
    ['required', { type: 'pseudo', name: 'required' }],
    ['optional', { type: 'pseudo', name: 'optional' }],
    ['valid', { type: 'pseudo', name: 'valid' }],
    ['invalid', { type: 'pseudo', name: 'invalid' }],
    ['user-valid', { type: 'pseudo', name: 'user-valid' }],
    ['user-invalid', { type: 'pseudo', name: 'user-invalid' }],
    ['in-range', { type: 'pseudo', name: 'in-range' }],
    ['out-of-range', { type: 'pseudo', name: 'out-of-range' }],
    ['default', { type: 'pseudo', name: 'default' }],
    ['indeterminate', { type: 'pseudo', name: 'indeterminate' }],
    ['placeholder-shown', { type: 'pseudo', name: 'placeholder-shown' }],
    ['autofill', { type: 'pseudo', name: 'autofill' }],
    ['read-only', { type: 'pseudo', name: 'read-only' }],
    ['details-content', { type: 'pseudo', name: 'details-content' }],
    // breakpoint
    ['sm', { type: 'breakpoint', name: 'sm' }],
    ['md', { type: 'breakpoint', name: 'md' }],
    ['lg', { type: 'breakpoint', name: 'lg' }],
    ['xl', { type: 'breakpoint', name: 'xl' }],
    ['2xl', { type: 'breakpoint', name: '2xl' }],
    // media/dark/motion
    ['dark', { type: 'darkmode', mode: 'dark' }],
    ['motion-safe', { type: 'media', name: 'motion-safe' }],
    ['motion-reduce', { type: 'media', name: 'motion-reduce' }],
    // group/peer
    ['group-hover', { type: 'group', state: 'hover' }],
    ['group-focus', { type: 'group', state: 'focus' }],
    ['peer-checked', { type: 'peer', state: 'checked' }],
    ['peer-focus', { type: 'peer', state: 'focus' }],
    // supports/media/container arbitrary
    ['supports-[display:grid]', { type: 'supports', query: 'display:grid' }],
    // arbitrary variant
    ['[&>*]', { type: 'arbitrary', selector: '&>*' }],
    ['[data-state=open]', { type: 'arbitrary', selector: 'data-state=open' }],
    ['[aria-selected]', { type: 'arbitrary', selector: 'aria-selected' }],
    ['[.foo_bar]', { type: 'arbitrary', selector: '.foo_bar' }],
    ['[role=button]', { type: 'arbitrary', selector: 'role=button' }],
    // data/aria attribute
    ['data-active', { type: 'data', attr: 'active', value: 'true' }],
    ['aria-checked', { type: 'aria', attr: 'checked', value: 'true' }],
    ['data-foo-bar', { type: 'data', attr: 'foo-bar', value: 'true' }],
    ['aria-expanded', { type: 'aria', attr: 'expanded', value: 'true' }],
    // logical/state
    ['has-checked', { type: 'logical', op: 'has', value: 'checked' }],
    ['not-focus', { type: 'logical', op: 'not', value: 'focus' }],
    ['has-aria-checked', { type: 'logical', op: 'has', value: 'aria-checked' }],
    ['not-hover', { type: 'logical', op: 'not', value: 'hover' }],
    // nth/nth-of-type/nth-last-of-type
    ['nth-3', { type: 'nth', value: '3' }],
    ['nth-[3n+1]', { type: 'nth', value: '3n+1' }],
    ['nth-of-type-2', { type: 'nth-of-type', value: '2' }],
    ['nth-of-type-[2n+1]', { type: 'nth-of-type', value: '2n+1' }],
    ['nth-last-of-type-4', { type: 'nth-last-of-type', value: '4' }],
    ['nth-last-of-type-[3n+1]', { type: 'nth-last-of-type', value: '3n+1' }],
    // pseudo-element
    ['before', { type: 'pseudo-element', name: 'before' }],
    ['after', { type: 'pseudo-element', name: 'after' }],
    ['placeholder', { type: 'pseudo-element', name: 'placeholder' }],
    ['selection', { type: 'pseudo-element', name: 'selection' }],
    ['marker', { type: 'pseudo-element', name: 'marker' }],
    ['first-line', { type: 'pseudo-element', name: 'first-line' }],
    ['first-letter', { type: 'pseudo-element', name: 'first-letter' }],
    ['backdrop', { type: 'pseudo-element', name: 'backdrop' }],
    // direction/structural/state
    ['rtl', { type: 'direction', value: 'rtl' }],
    ['ltr', { type: 'direction', value: 'ltr' }],
    ['open', { type: 'state', value: 'open' }],
    ['inert', { type: 'state', value: 'inert' }],
    // --- 엣지/에러 케이스 ---
    ['', { type: 'unknown', raw: '' }],
    ['hovered', { type: 'unknown', raw: 'hovered' }],
    ['group-', { type: 'unknown', raw: 'group-' }],
    ['!', { type: 'unknown', raw: '!' }],
    ['[]', { type: 'arbitrary', selector: '' }],
    ['data-', { type: 'data', attr: '' }],
    ['aria-', { type: 'aria', attr: '' }],
    ['has-', { type: 'logical', op: 'has', value: '' }],
    ['not-', { type: 'logical', op: 'not', value: '' }],
    ['nth-', { type: 'nth', value: '' }],
    ['nth-of-type-', { type: 'nth-of-type', value: '' }],
    ['nth-last-of-type-', { type: 'nth-last-of-type', value: '' }],
    // --- 복합/중첩/실전 조합 ---
    // (토크나이저+파서 통합 테스트에서 별도 진행 권장)
  ];

  it.each(cases)('parseModifier(%s)', (input, expected) => {
    expect(parseModifier(input)).toEqual(expected);
  });

  // 추가: 실전에서 자주 쓰이는 modifier 조합을 위한 설명용 예시 (토크나이저+파서 통합 테스트에서 활용)
  // 예: sm:dark:hover:focus:bg-red-500! 등
}); 