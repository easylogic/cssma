// parseClassName 등 파서 전체 테스트 (추후 구현) 

import { describe, it, expect } from 'vitest';
import { tokenize } from '../src/parser/tokenizer';

describe('tokenize (Tailwind class string)', () => {
  it('should tokenize simple modifier/core', () => {
    expect(tokenize('md:hover:bg-blue-500/50')).toEqual([
      { type: 'modifier', value: 'md' },
      { type: 'modifier', value: 'hover' },
      { type: 'utility', value: 'bg-blue-500/50' },
    ]);
  });

  it('should handle arbitrary variant modifier', () => {
    expect(tokenize('[&>*]:bg-red-500')).toEqual([
      { type: 'modifier', value: '[&>*]' },
      { type: 'utility', value: 'bg-red-500' },
    ]);
  });

  it('should handle multiple complex modifiers', () => {
    expect(tokenize('dark:group-hover:[data-state=open]:bg-[rgb(34,197,94)]')).toEqual([
      { type: 'modifier', value: 'dark' },
      { type: 'modifier', value: 'group-hover' },
      { type: 'modifier', value: '[data-state=open]' },
      { type: 'utility', value: 'bg-[rgb(34,197,94)]' },
    ]);
  });

  it('should handle attribute and state modifiers', () => {
    expect(tokenize('sm:focus-within:aria-checked:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'modifier', value: 'focus-within' },
      { type: 'modifier', value: 'aria-checked' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
  });

  it('should handle arbitrary value in core', () => {
    expect(tokenize('w-[calc(100%-1rem)]')).toEqual([
      { type: 'utility', value: 'w-[calc(100%-1rem)]' },
    ]);
  });

  it('should handle only core utility', () => {
    expect(tokenize('flex')).toEqual([
      { type: 'utility', value: 'flex' },
    ]);
  });

  it('should handle empty string', () => {
    expect(tokenize('')).toEqual([]);
  });

  // 추가 케이스들
  it('should handle deeply nested brackets in arbitrary variant', () => {
    expect(tokenize('[&:not([hidden])]:bg-red-500')).toEqual([
      { type: 'modifier', value: '[&:not([hidden])]' },
      { type: 'utility', value: 'bg-red-500' },
    ]);
  });

  it('should handle multiple arbitrary variants', () => {
    expect(tokenize('[data-open]:[aria-selected]:bg-blue-500')).toEqual([
      { type: 'modifier', value: '[data-open]' },
      { type: 'modifier', value: '[aria-selected]' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
  });

  it('should handle arbitrary value with nested parentheses', () => {
    expect(tokenize('bg-[rgba(34,197,94,0.5)]')).toEqual([
      { type: 'utility', value: 'bg-[rgba(34,197,94,0.5)]' },
    ]);
  });

  it('should handle arbitrary value with colon inside', () => {
    expect(tokenize('bg-[url(https://figma.com/bg.png)]')).toEqual([
      { type: 'utility', value: 'bg-[url(https://figma.com/bg.png)]' },
    ]);
  });

  it('should handle group/peer and arbitrary variant mix', () => {
    expect(tokenize('group-hover:peer-focus:[data-state=open]:bg-blue-500/50')).toEqual([
      { type: 'modifier', value: 'group-hover' },
      { type: 'modifier', value: 'peer-focus' },
      { type: 'modifier', value: '[data-state=open]' },
      { type: 'utility', value: 'bg-blue-500/50' },
    ]);
  });

  it('should handle invalid/unclosed bracket gracefully', () => {
    expect(tokenize('md:[data-state=open:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'md' },
      { type: 'utility', value: '[data-state=open:bg-blue-500' },
    ]);
  });

  it('should handle multiple colons in arbitrary value', () => {
    expect(tokenize('bg-[url(data:image/svg+xml;utf8,<svg></svg>)]')).toEqual([
      { type: 'utility', value: 'bg-[url(data:image/svg+xml;utf8,<svg></svg>)]' },
    ]);
  });

  it('should handle whitespace trimming', () => {
    expect(tokenize('  md:focus:bg-blue-500  ')).toEqual([
      { type: 'modifier', value: 'md' },
      { type: 'modifier', value: 'focus' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
  });

  it('should handle whitespace, tab, newline', () => {
    expect(tokenize('  md:\tfocus:bg-blue-500\n')).toEqual([
      { type: 'modifier', value: 'md' },
      { type: 'modifier', value: 'focus' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
  });
});

describe('tokenize (Tailwind 4.1+ advanced cases)', () => {
  it('should handle nested arbitrary variant', () => {
    expect(tokenize('group-[.foo_&]:hover:bg-red-500')).toEqual([
      { type: 'modifier', value: 'group-[.foo_&]' },
      { type: 'modifier', value: 'hover' },
      { type: 'utility', value: 'bg-red-500' },
    ]);
  });

  it('should handle arbitrary variant + arbitrary value', () => {
    expect(tokenize('[&>*]:bg-[rgb(34,197,94)]')).toEqual([
      { type: 'modifier', value: '[&>*]' },
      { type: 'utility', value: 'bg-[rgb(34,197,94)]' },
    ]);
  });

  it('should handle arbitrary variant with nested parens', () => {
    expect(tokenize('[&:not(:first-child)]:text-blue-500')).toEqual([
      { type: 'modifier', value: '[&:not(:first-child)]' },
      { type: 'utility', value: 'text-blue-500' },
    ]);
  });

  it('should handle arbitrary value with multiple colons/semicolons/commas', () => {
    expect(tokenize("bg-[url(data:image/svg+xml;utf8,<svg fill='red'></svg>)]")).toEqual([
      { type: 'utility', value: "bg-[url(data:image/svg+xml;utf8,<svg fill='red'></svg>)]" },
    ]);
  });

  it('should handle slash in core', () => {
    expect(tokenize('bg-blue-500/50')).toEqual([
      { type: 'utility', value: 'bg-blue-500/50' },
    ]);
  });

  it('should handle dot in core', () => {
    expect(tokenize('text-[length:1.5rem]')).toEqual([
      { type: 'utility', value: 'text-[length:1.5rem]' },
    ]);
  });

  it('should handle multiple nested modifiers', () => {
    expect(tokenize('sm:dark:group-hover:focus:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'modifier', value: 'dark' },
      { type: 'modifier', value: 'group-hover' },
      { type: 'modifier', value: 'focus' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
  });

  it('should handle unclosed bracket gracefully', () => {
    expect(tokenize('md:[data-state=open:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'md' },
      { type: 'utility', value: '[data-state=open:bg-blue-500' },
    ]);
  });

  it('should handle whitespace, tab, newline', () => {
    expect(tokenize('  md:\tfocus:bg-blue-500\n')).toEqual([
      { type: 'modifier', value: 'md' },
      { type: 'modifier', value: 'focus' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
  });

  it('should handle escape characters', () => {
    expect(tokenize('hover:bg-\\[red\\]')).toEqual([
      { type: 'modifier', value: 'hover' },
      { type: 'utility', value: 'bg-\\[red\\]' },
    ]);
  });

  it('should handle weird combinations', () => {
    expect(tokenize('sm:[foo:bar]:bg-[rgba(0,0,0,0.5)]')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'modifier', value: '[foo:bar]' },
      { type: 'utility', value: 'bg-[rgba(0,0,0,0.5)]' },
    ]);
  });

  it('should handle multiple attribute selectors', () => {
    expect(tokenize('[data-state=open][aria-selected=true]:bg-blue-500')).toEqual([
      { type: 'modifier', value: '[data-state=open]' },
      { type: 'modifier', value: '[aria-selected=true]' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
  });

  it('should handle arbitrary variant with colon inside', () => {
    expect(tokenize("[aria-label^='foo:bar']:bg-blue-500")).toEqual([
      { type: 'modifier', value: "[aria-label^='foo:bar']" },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
  });

  it('should handle core utility with multiple brackets', () => {
    expect(tokenize('bg-[hsl(var(--color-primary)/0.5)]')).toEqual([
      { type: 'utility', value: 'bg-[hsl(var(--color-primary)/0.5)]' },
    ]);
  });

  it('should handle core utility with curly braces', () => {
    expect(tokenize('bg-[color:rgb(var(--color-primary))]')).toEqual([
      { type: 'utility', value: 'bg-[color:rgb(var(--color-primary))]' },
    ]);
  });

  it('should handle arbitrary variant with spaces and quotes', () => {
    expect(tokenize('[&[data-state="open"]]:bg-red-500')).toEqual([
      { type: 'modifier', value: '[&[data-state="open"]]' },
      { type: 'utility', value: 'bg-red-500' },
    ]);
  });

  it('should handle arbitrary value with complex expression', () => {
    expect(tokenize('w-[calc(100%-theme(spacing.4))]')).toEqual([
      { type: 'utility', value: 'w-[calc(100%-theme(spacing.4))]' },
    ]);
  });

  it('should handle multiple arbitrary variants in a row', () => {
    expect(tokenize('[.foo]:[.bar]:bg-red-500')).toEqual([
      { type: 'modifier', value: '[.foo]' },
      { type: 'modifier', value: '[.bar]' },
      { type: 'utility', value: 'bg-red-500' },
    ]);
  });

  it('should handle variant with unicode', () => {
    expect(tokenize('[data-😀]:bg-yellow-200')).toEqual([
      { type: 'modifier', value: '[data-😀]' },
      { type: 'utility', value: 'bg-yellow-200' },
    ]);
  });

  it('should handle variant with logical combinator', () => {
    expect(tokenize('[&:is(:hover,:focus)]:bg-blue-500')).toEqual([
      { type: 'modifier', value: '[&:is(:hover,:focus)]' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
  });

  it('should handle variant with pseudo-element', () => {
    expect(tokenize('[&::before]:content-["hi"]')).toEqual([
      { type: 'modifier', value: '[&::before]' },
      { type: 'utility', value: 'content-["hi"]' },
    ]);
  });

  it('should handle variant with important modifier', () => {
    expect(tokenize('hover:!bg-blue-500')).toEqual([
      { type: 'modifier', value: 'hover' },
      { type: 'utility', value: '!bg-blue-500' },
    ]);
  });

  it('should handle negative value in core', () => {
    expect(tokenize('-top-[10px]')).toEqual([
      { type: 'utility', value: '-top-[10px]' },
    ]);
  });

  it('should handle empty arbitrary value', () => {
    expect(tokenize('bg-[]')).toEqual([
      { type: 'utility', value: 'bg-[]' },
    ]);
  });

  it('should handle aspect-ratio utilities', () => {
    expect(tokenize('aspect-3/2')).toEqual([
      { type: 'utility', value: 'aspect-3/2' },
    ]);
    expect(tokenize('aspect-square')).toEqual([
      { type: 'utility', value: 'aspect-square' },
    ]);
    expect(tokenize('aspect-video')).toEqual([
      { type: 'utility', value: 'aspect-video' },
    ]);
    expect(tokenize('aspect-auto')).toEqual([
      { type: 'utility', value: 'aspect-auto' },
    ]);
    expect(tokenize('aspect-[calc(4*3+1)/3]')).toEqual([
      { type: 'utility', value: 'aspect-[calc(4*3+1)/3]' },
    ]);
    expect(tokenize('aspect-(--my-aspect-ratio)')).toEqual([
      { type: 'utility', value: 'aspect-(--my-aspect-ratio)' },
    ]);
    expect(tokenize('aspect-[var(--my-aspect-ratio)]')).toEqual([
      { type: 'utility', value: 'aspect-[var(--my-aspect-ratio)]' },
    ]);
  });

  it('should handle data/aria attribute variants', () => {
    expect(tokenize('data-[state=open]:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'data-[state=open]' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('aria-[checked=true]:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'aria-[checked=true]' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('data-active:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'data-active' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('aria-checked:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'aria-checked' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('data-foo-bar:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'data-foo-bar' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('aria-expanded:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'aria-expanded' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
  });

  it('should handle complex arbitrary value and custom selectors', () => {
    expect(tokenize('bg-(--var)')).toEqual([
      { type: 'utility', value: 'bg-(--var)' },
    ]);
    expect(tokenize('bg-[var(--my-color)]')).toEqual([
      { type: 'utility', value: 'bg-[var(--my-color)]' },
    ]);
    expect(tokenize('bg-[color:var(--my-color)]')).toEqual([
      { type: 'utility', value: 'bg-[color:var(--my-color)]' },
    ]);
    expect(tokenize('bg-[hsl(var(--color)/0.5)]')).toEqual([
      { type: 'utility', value: 'bg-[hsl(var(--color)/0.5)]' },
    ]);
    expect(tokenize('bg-[theme(spacing.4)]')).toEqual([
      { type: 'utility', value: 'bg-[theme(spacing.4)]' },
    ]);
    expect(tokenize('bg-[length:1.5rem]')).toEqual([
      { type: 'utility', value: 'bg-[length:1.5rem]' },
    ]);
    expect(tokenize("bg-[url('/img/bg.png')]")).toEqual([
      { type: 'utility', value: "bg-[url('/img/bg.png')]" },
    ]);
    expect(tokenize('bg-[rgba(0,0,0,0.5)]')).toEqual([
      { type: 'utility', value: 'bg-[rgba(0,0,0,0.5)]' },
    ]);
    expect(tokenize('bg-[linear-gradient(90deg,#fff,#000)]')).toEqual([
      { type: 'utility', value: 'bg-[linear-gradient(90deg,#fff,#000)]' },
    ]);
    expect(tokenize('border-[3px_solid_theme(colors.red.500)]')).toEqual([
      { type: 'utility', value: 'border-[3px_solid_theme(colors.red.500)]' },
    ]);
    expect(tokenize('ring-[2px]')).toEqual([
      { type: 'utility', value: 'ring-[2px]' },
    ]);
    expect(tokenize("content-['hello world']")).toEqual([
      { type: 'utility', value: "content-['hello world']" },
    ]);
  });

  it('should handle complex variant and value combinations', () => {
    expect(tokenize('sm:aspect-[4/3]')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'utility', value: 'aspect-[4/3]' },
    ]);
    expect(tokenize('md:focus:bg-[--var]')).toEqual([
      { type: 'modifier', value: 'md' },
      { type: 'modifier', value: 'focus' },
      { type: 'utility', value: 'bg-[--var]' },
    ]);
    expect(tokenize('dark:group-hover:[data-state=open]:bg-[rgba(0,0,0,0.5)]')).toEqual([
      { type: 'modifier', value: 'dark' },
      { type: 'modifier', value: 'group-hover' },
      { type: 'modifier', value: '[data-state=open]' },
      { type: 'utility', value: 'bg-[rgba(0,0,0,0.5)]' },
    ]);
    expect(tokenize('rtl:peer-focus:aspect-[var(--my-aspect-ratio)]')).toEqual([
      { type: 'modifier', value: 'rtl' },
      { type: 'modifier', value: 'peer-focus' },
      { type: 'utility', value: 'aspect-[var(--my-aspect-ratio)]' },
    ]);
    expect(tokenize('data-[state=open]:aria-[checked=true]:bg-[color:var(--my-color)]')).toEqual([
      { type: 'modifier', value: 'data-[state=open]' },
      { type: 'modifier', value: 'aria-[checked=true]' },
      { type: 'utility', value: 'bg-[color:var(--my-color)]' },
    ]);
  });

  it('should handle all Tailwind 4.1+ background-image syntaxes', () => {
    // Basic custom value
    expect(tokenize('bg-[url(/img/mountains.jpg)]')).toEqual([
      { type: 'utility', value: 'bg-[url(/img/mountains.jpg)]' },
    ]);
    // bg-none
    expect(tokenize('bg-none')).toEqual([
      { type: 'utility', value: 'bg-none' },
    ]);
    // Linear gradients
    expect(tokenize('bg-linear-to-r')).toEqual([
      { type: 'utility', value: 'bg-linear-to-r' },
    ]);
    expect(tokenize('bg-linear-to-tl')).toEqual([
      { type: 'utility', value: 'bg-linear-to-tl' },
    ]);
    expect(tokenize('bg-linear-65')).toEqual([
      { type: 'utility', value: 'bg-linear-65' },
    ]);
    expect(tokenize('-bg-linear-65')).toEqual([
      { type: 'utility', value: '-bg-linear-65' },
    ]);
    expect(tokenize('bg-linear-(--my-gradient)')).toEqual([
      { type: 'utility', value: 'bg-linear-(--my-gradient)' },
    ]);
    expect(tokenize('bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal]')).toEqual([
      { type: 'utility', value: 'bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal]' },
    ]);
    // Interpolation mode
    expect(tokenize('bg-linear-to-r/srgb')).toEqual([
      { type: 'utility', value: 'bg-linear-to-r/srgb' },
    ]);
    expect(tokenize('bg-linear-to-r/hsl')).toEqual([
      { type: 'utility', value: 'bg-linear-to-r/hsl' },
    ]);
    expect(tokenize('bg-linear-to-r/oklab')).toEqual([
      { type: 'utility', value: 'bg-linear-to-r/oklab' },
    ]);
    expect(tokenize('bg-linear-to-r/oklch')).toEqual([
      { type: 'utility', value: 'bg-linear-to-r/oklch' },
    ]);
    expect(tokenize('bg-linear-to-r/longer')).toEqual([
      { type: 'utility', value: 'bg-linear-to-r/longer' },
    ]);
    expect(tokenize('bg-linear-to-r/shorter')).toEqual([
      { type: 'utility', value: 'bg-linear-to-r/shorter' },
    ]);
    expect(tokenize('bg-linear-to-r/increasing')).toEqual([
      { type: 'utility', value: 'bg-linear-to-r/increasing' },
    ]);
    expect(tokenize('bg-linear-to-r/decreasing')).toEqual([
      { type: 'utility', value: 'bg-linear-to-r/decreasing' },
    ]);
    // Radial gradients
    expect(tokenize('bg-radial')).toEqual([
      { type: 'utility', value: 'bg-radial' },
    ]);
    expect(tokenize('bg-radial-[at_50%_75%]')).toEqual([
      { type: 'utility', value: 'bg-radial-[at_50%_75%]' },
    ]);
    expect(tokenize('bg-radial-[at_25%_25%]')).toEqual([
      { type: 'utility', value: 'bg-radial-[at_25%_25%]' },
    ]);
    // Conic gradients
    expect(tokenize('bg-conic')).toEqual([
      { type: 'utility', value: 'bg-conic' },
    ]);
    expect(tokenize('bg-conic-180')).toEqual([
      { type: 'utility', value: 'bg-conic-180' },
    ]);
    expect(tokenize('-bg-conic-180')).toEqual([
      { type: 'utility', value: '-bg-conic-180' },
    ]);
    expect(tokenize('bg-conic/decreasing')).toEqual([
      { type: 'utility', value: 'bg-conic/decreasing' },
    ]);
    expect(tokenize('bg-conic-(--my-conic)')).toEqual([
      { type: 'utility', value: 'bg-conic-(--my-conic)' },
    ]);
    // Gradient color stops
    expect(tokenize('from-indigo-500')).toEqual([
      { type: 'utility', value: 'from-indigo-500' },
    ]);
    expect(tokenize('via-purple-500')).toEqual([
      { type: 'utility', value: 'via-purple-500' },
    ]);
    expect(tokenize('to-pink-500')).toEqual([
      { type: 'utility', value: 'to-pink-500' },
    ]);
    expect(tokenize('from-10%')).toEqual([
      { type: 'utility', value: 'from-10%' },
    ]);
    expect(tokenize('via-30%')).toEqual([
      { type: 'utility', value: 'via-30%' },
    ]);
    expect(tokenize('to-90%')).toEqual([
      { type: 'utility', value: 'to-90%' },
    ]);
    expect(tokenize('from-(--my-color)')).toEqual([
      { type: 'utility', value: 'from-(--my-color)' },
    ]);
    expect(tokenize('via-(--my-color)')).toEqual([
      { type: 'utility', value: 'via-(--my-color)' },
    ]);
    expect(tokenize('to-(--my-color)')).toEqual([
      { type: 'utility', value: 'to-(--my-color)' },
    ]);
    expect(tokenize('from-[theme(colors.red.500)]')).toEqual([
      { type: 'utility', value: 'from-[theme(colors.red.500)]' },
    ]);
    expect(tokenize('via-[theme(colors.red.500)]')).toEqual([
      { type: 'utility', value: 'via-[theme(colors.red.500)]' },
    ]);
    expect(tokenize('to-[theme(colors.red.500)]')).toEqual([
      { type: 'utility', value: 'to-[theme(colors.red.500)]' },
    ]);
    // Responsive variant
    expect(tokenize('md:bg-linear-to-r')).toEqual([
      { type: 'modifier', value: 'md' },
      { type: 'utility', value: 'bg-linear-to-r' },
    ]);
    expect(tokenize('sm:from-purple-400')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'utility', value: 'from-purple-400' },
    ]);
    // Negative value
    expect(tokenize('-bg-linear-45')).toEqual([
      { type: 'utility', value: '-bg-linear-45' },
    ]);
    // Custom property shorthand
    expect(tokenize('bg-linear-(--my-gradient)')).toEqual([
      { type: 'utility', value: 'bg-linear-(--my-gradient)' },
    ]);
    // bg-linear-[var(--my-gradient)]
    expect(tokenize('bg-linear-[var(--my-gradient)]')).toEqual([
      { type: 'utility', value: 'bg-linear-[var(--my-gradient)]' },
    ]);
    // bg-conic-[conic-gradient(at_50%_50%,red,blue)]
    expect(tokenize('bg-conic-[conic-gradient(at_50%_50%,red,blue)]')).toEqual([
      { type: 'utility', value: 'bg-conic-[conic-gradient(at_50%_50%,red,blue)]' },
    ]);
    // bg-radial-[at_50%_50%]
    expect(tokenize('bg-radial-[at_50%_50%]')).toEqual([
      { type: 'utility', value: 'bg-radial-[at_50%_50%]' },
    ]);
    // bg-conic-(--my-conic)
    expect(tokenize('bg-conic-(--my-conic)')).toEqual([
      { type: 'utility', value: 'bg-conic-(--my-conic)' },
    ]);
  });

  it('should handle background-image utilities with all modifier combinations', () => {
    // 단일 modifier
    expect(tokenize('sm:bg-linear-to-r')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'utility', value: 'bg-linear-to-r' },
    ]);
    expect(tokenize('hover:bg-radial')).toEqual([
      { type: 'modifier', value: 'hover' },
      { type: 'utility', value: 'bg-radial' },
    ]);
    expect(tokenize('focus:bg-conic')).toEqual([
      { type: 'modifier', value: 'focus' },
      { type: 'utility', value: 'bg-conic' },
    ]);
    expect(tokenize('dark:bg-linear-to-tl')).toEqual([
      { type: 'modifier', value: 'dark' },
      { type: 'utility', value: 'bg-linear-to-tl' },
    ]);
    expect(tokenize('group-hover:bg-linear-65')).toEqual([
      { type: 'modifier', value: 'group-hover' },
      { type: 'utility', value: 'bg-linear-65' },
    ]);
    expect(tokenize('peer-focus:bg-conic-180')).toEqual([
      { type: 'modifier', value: 'peer-focus' },
      { type: 'utility', value: 'bg-conic-180' },
    ]);
    expect(tokenize('data-[state=open]:bg-radial')).toEqual([
      { type: 'modifier', value: 'data-[state=open]' },
      { type: 'utility', value: 'bg-radial' },
    ]);
    expect(tokenize('aria-[checked=true]:bg-linear-to-r')).toEqual([
      { type: 'modifier', value: 'aria-[checked=true]' },
      { type: 'utility', value: 'bg-linear-to-r' },
    ]);
    expect(tokenize('[&>*]:bg-conic')).toEqual([
      { type: 'modifier', value: '[&>*]' },
      { type: 'utility', value: 'bg-conic' },
    ]);
    // 복수 modifier chain
    expect(tokenize('sm:dark:bg-linear-to-r')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'modifier', value: 'dark' },
      { type: 'utility', value: 'bg-linear-to-r' },
    ]);
    expect(tokenize('md:group-hover:bg-radial')).toEqual([
      { type: 'modifier', value: 'md' },
      { type: 'modifier', value: 'group-hover' },
      { type: 'utility', value: 'bg-radial' },
    ]);
    expect(tokenize('lg:peer-focus:bg-conic-180')).toEqual([
      { type: 'modifier', value: 'lg' },
      { type: 'modifier', value: 'peer-focus' },
      { type: 'utility', value: 'bg-conic-180' },
    ]);
    expect(tokenize('dark:focus:bg-linear-to-tl')).toEqual([
      { type: 'modifier', value: 'dark' },
      { type: 'modifier', value: 'focus' },
      { type: 'utility', value: 'bg-linear-to-tl' },
    ]);
    expect(tokenize('sm:dark:group-hover:bg-linear-65')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'modifier', value: 'dark' },
      { type: 'modifier', value: 'group-hover' },
      { type: 'utility', value: 'bg-linear-65' },
    ]);
    expect(tokenize('md:data-[state=open]:bg-radial')).toEqual([
      { type: 'modifier', value: 'md' },
      { type: 'modifier', value: 'data-[state=open]' },
      { type: 'utility', value: 'bg-radial' },
    ]);
    expect(tokenize('lg:aria-[checked=true]:bg-linear-to-r')).toEqual([
      { type: 'modifier', value: 'lg' },
      { type: 'modifier', value: 'aria-[checked=true]' },
      { type: 'utility', value: 'bg-linear-to-r' },
    ]);
    expect(tokenize('sm:[&>*]:bg-conic')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'modifier', value: '[&>*]' },
      { type: 'utility', value: 'bg-conic' },
    ]);
    // 복합 arbitrary variant + chain
    expect(tokenize('dark:group-hover:[data-state=open]:bg-linear-to-r')).toEqual([
      { type: 'modifier', value: 'dark' },
      { type: 'modifier', value: 'group-hover' },
      { type: 'modifier', value: '[data-state=open]' },
      { type: 'utility', value: 'bg-linear-to-r' },
    ]);
    expect(tokenize('sm:focus:[aria-selected]:bg-radial')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'modifier', value: 'focus' },
      { type: 'modifier', value: '[aria-selected]' },
      { type: 'utility', value: 'bg-radial' },
    ]);
    expect(tokenize('md:peer-focus:[&>*]:bg-conic-180')).toEqual([
      { type: 'modifier', value: 'md' },
      { type: 'modifier', value: 'peer-focus' },
      { type: 'modifier', value: '[&>*]' },
      { type: 'utility', value: 'bg-conic-180' },
    ]);
    // gradient color stop + modifier
    expect(tokenize('hover:from-indigo-500')).toEqual([
      { type: 'modifier', value: 'hover' },
      { type: 'utility', value: 'from-indigo-500' },
    ]);
    expect(tokenize('dark:via-purple-500')).toEqual([
      { type: 'modifier', value: 'dark' },
      { type: 'utility', value: 'via-purple-500' },
    ]);
    expect(tokenize('group-hover:to-pink-500')).toEqual([
      { type: 'modifier', value: 'group-hover' },
      { type: 'utility', value: 'to-pink-500' },
    ]);
    // interpolation mode + modifier
    expect(tokenize('sm:bg-linear-to-r/srgb')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'utility', value: 'bg-linear-to-r/srgb' },
    ]);
    expect(tokenize('dark:bg-linear-to-r/oklab')).toEqual([
      { type: 'modifier', value: 'dark' },
      { type: 'utility', value: 'bg-linear-to-r/oklab' },
    ]);
    // negative value + modifier
    expect(tokenize('hover:-bg-linear-45')).toEqual([
      { type: 'modifier', value: 'hover' },
      { type: 'utility', value: '-bg-linear-45' },
    ]);
    // custom property + modifier
    expect(tokenize('focus:bg-linear-(--my-gradient)')).toEqual([
      { type: 'modifier', value: 'focus' },
      { type: 'utility', value: 'bg-linear-(--my-gradient)' },
    ]);
    // arbitrary value + modifier chain
    expect(tokenize('sm:dark:bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal]')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'modifier', value: 'dark' },
      { type: 'utility', value: 'bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal]' },
    ]);
  });

  it('should treat data-xxx and aria-xxx as modifiers, not core', () => {
    expect(tokenize('data-active:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'data-active' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('aria-checked:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'aria-checked' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('data-foo-bar:bg-linear-to-r')).toEqual([
      { type: 'modifier', value: 'data-foo-bar' },
      { type: 'utility', value: 'bg-linear-to-r' },
    ]);
    expect(tokenize('aria-expanded:bg-radial')).toEqual([
      { type: 'modifier', value: 'aria-expanded' },
      { type: 'utility', value: 'bg-radial' },
    ]);
    // 여러 modifier와 조합
    expect(tokenize('sm:data-active:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'modifier', value: 'data-active' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('dark:aria-checked:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'dark' },
      { type: 'modifier', value: 'aria-checked' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('group-hover:data-foo-bar:bg-linear-to-r')).toEqual([
      { type: 'modifier', value: 'group-hover' },
      { type: 'modifier', value: 'data-foo-bar' },
      { type: 'utility', value: 'bg-linear-to-r' },
    ]);
    expect(tokenize('peer-focus:aria-expanded:bg-radial')).toEqual([
      { type: 'modifier', value: 'peer-focus' },
      { type: 'modifier', value: 'aria-expanded' },
      { type: 'utility', value: 'bg-radial' },
    ]);
  });

  it('should treat logical/state modifiers like has-*, not-*, has-aria-*, has-data-* as modifiers', () => {
    expect(tokenize('has-checked:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'has-checked' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('not-focus:bg-red-500')).toEqual([
      { type: 'modifier', value: 'not-focus' },
      { type: 'utility', value: 'bg-red-500' },
    ]);
    expect(tokenize('not-hover:bg-green-500')).toEqual([
      { type: 'modifier', value: 'not-hover' },
      { type: 'utility', value: 'bg-green-500' },
    ]);
    expect(tokenize('has-aria-checked:bg-yellow-500')).toEqual([
      { type: 'modifier', value: 'has-aria-checked' },
      { type: 'utility', value: 'bg-yellow-500' },
    ]);
    expect(tokenize('has-data-state-open:bg-purple-500')).toEqual([
      { type: 'modifier', value: 'has-data-state-open' },
      { type: 'utility', value: 'bg-purple-500' },
    ]);
    // modifier chain
    expect(tokenize('sm:has-checked:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'modifier', value: 'has-checked' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('dark:not-focus:bg-red-500')).toEqual([
      { type: 'modifier', value: 'dark' },
      { type: 'modifier', value: 'not-focus' },
      { type: 'utility', value: 'bg-red-500' },
    ]);
    expect(tokenize('group-hover:has-aria-checked:bg-yellow-500')).toEqual([
      { type: 'modifier', value: 'group-hover' },
      { type: 'modifier', value: 'has-aria-checked' },
      { type: 'utility', value: 'bg-yellow-500' },
    ]);
    expect(tokenize('peer-focus:has-data-state-open:bg-purple-500')).toEqual([
      { type: 'modifier', value: 'peer-focus' },
      { type: 'modifier', value: 'has-data-state-open' },
      { type: 'utility', value: 'bg-purple-500' },
    ]);
  });

  it('should treat supports and feature query modifiers (supports, supports-[...], media, container, etc) as modifiers', () => {
    // supports
    expect(tokenize('supports-[display:grid]:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'supports-[display:grid]' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('supports-[backdrop-filter]:backdrop-blur')).toEqual([
      { type: 'modifier', value: 'supports-[backdrop-filter]' },
      { type: 'utility', value: 'backdrop-blur' },
    ]);
    // media
    expect(tokenize('media-[print]:text-black')).toEqual([
      { type: 'modifier', value: 'media-[print]' },
      { type: 'utility', value: 'text-black' },
    ]);
    // container
    expect(tokenize('container-[size>600px]:bg-green-500')).toEqual([
      { type: 'modifier', value: 'container-[size>600px]' },
      { type: 'utility', value: 'bg-green-500' },
    ]);
    // supports chain
    expect(tokenize('sm:supports-[display:grid]:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'modifier', value: 'supports-[display:grid]' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('dark:media-[print]:text-black')).toEqual([
      { type: 'modifier', value: 'dark' },
      { type: 'modifier', value: 'media-[print]' },
      { type: 'utility', value: 'text-black' },
    ]);
    expect(tokenize('group-hover:container-[size>600px]:bg-green-500')).toEqual([
      { type: 'modifier', value: 'group-hover' },
      { type: 'modifier', value: 'container-[size>600px]' },
      { type: 'utility', value: 'bg-green-500' },
    ]);
    // supports with arbitrary value
    expect(tokenize('supports-[display:flex]:flex')).toEqual([
      { type: 'modifier', value: 'supports-[display:flex]' },
      { type: 'utility', value: 'flex' },
    ]);
    expect(tokenize('supports-[aspect-ratio:1/1]:aspect-square')).toEqual([
      { type: 'modifier', value: 'supports-[aspect-ratio:1/1]' },
      { type: 'utility', value: 'aspect-square' },
    ]);
  });

  it('should treat pseudo-element, nth, direction, and structural modifiers as modifiers', () => {
    // Pseudo-elements
    expect(tokenize('before:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'before' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('after:content-["*"]')).toEqual([
      { type: 'modifier', value: 'after' },
      { type: 'utility', value: 'content-["*"]' },
    ]);
    expect(tokenize('placeholder:text-gray-400')).toEqual([
      { type: 'modifier', value: 'placeholder' },
      { type: 'utility', value: 'text-gray-400' },
    ]);
    expect(tokenize('selection:bg-yellow-200')).toEqual([
      { type: 'modifier', value: 'selection' },
      { type: 'utility', value: 'bg-yellow-200' },
    ]);
    expect(tokenize('marker:text-red-500')).toEqual([
      { type: 'modifier', value: 'marker' },
      { type: 'utility', value: 'text-red-500' },
    ]);
    expect(tokenize('first-line:uppercase')).toEqual([
      { type: 'modifier', value: 'first-line' },
      { type: 'utility', value: 'uppercase' },
    ]);
    expect(tokenize('first-letter:text-2xl')).toEqual([
      { type: 'modifier', value: 'first-letter' },
      { type: 'utility', value: 'text-2xl' },
    ]);
    expect(tokenize('backdrop:blur')).toEqual([
      { type: 'modifier', value: 'backdrop' },
      { type: 'utility', value: 'blur' },
    ]);
    // nth/nth-of-type/nth-last-of-type
    expect(tokenize('nth-3:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'nth-3' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('nth-[3n+1]:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'nth-[3n+1]' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('nth-of-type-2:text-red-500')).toEqual([
      { type: 'modifier', value: 'nth-of-type-2' },
      { type: 'utility', value: 'text-red-500' },
    ]);
    expect(tokenize('nth-last-of-type-[3n+1]:text-green-500')).toEqual([
      { type: 'modifier', value: 'nth-last-of-type-[3n+1]' },
      { type: 'utility', value: 'text-green-500' },
    ]);
    // direction
    expect(tokenize('rtl:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'rtl' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('ltr:text-right')).toEqual([
      { type: 'modifier', value: 'ltr' },
      { type: 'utility', value: 'text-right' },
    ]);
    // structural
    expect(tokenize('open:bg-green-500')).toEqual([
      { type: 'modifier', value: 'open' },
      { type: 'utility', value: 'bg-green-500' },
    ]);
    expect(tokenize('inert:opacity-50')).toEqual([
      { type: 'modifier', value: 'inert' },
      { type: 'utility', value: 'opacity-50' },
    ]);
    expect(tokenize('details-content:bg-gray-100')).toEqual([
      { type: 'modifier', value: 'details-content' },
      { type: 'utility', value: 'bg-gray-100' },
    ]);
    // modifier chain
    expect(tokenize('sm:before:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'modifier', value: 'before' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('dark:nth-3:bg-blue-500')).toEqual([
      { type: 'modifier', value: 'dark' },
      { type: 'modifier', value: 'nth-3' },
      { type: 'utility', value: 'bg-blue-500' },
    ]);
    expect(tokenize('rtl:placeholder:text-gray-400')).toEqual([
      { type: 'modifier', value: 'rtl' },
      { type: 'modifier', value: 'placeholder' },
      { type: 'utility', value: 'text-gray-400' },
    ]);
    expect(tokenize('group-hover:details-content:bg-gray-100')).toEqual([
      { type: 'modifier', value: 'group-hover' },
      { type: 'modifier', value: 'details-content' },
      { type: 'utility', value: 'bg-gray-100' },
    ]);
  });

  it('should handle important modifier (!) at the end of the utility (Tailwind official)', () => {
    // 단일 core
    expect(tokenize('bg-red-500!')).toEqual([
      { type: 'utility', value: 'bg-red-500!' },
    ]);
    expect(tokenize('text-xl!')).toEqual([
      { type: 'utility', value: 'text-xl!' },
    ]);
    // modifier + core!
    expect(tokenize('hover:bg-blue-500!')).toEqual([
      { type: 'modifier', value: 'hover' },
      { type: 'utility', value: 'bg-blue-500!' },
    ]);
    expect(tokenize('sm:text-right!')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'utility', value: 'text-right!' },
    ]);
    expect(tokenize('dark:focus:bg-green-500!')).toEqual([
      { type: 'modifier', value: 'dark' },
      { type: 'modifier', value: 'focus' },
      { type: 'utility', value: 'bg-green-500!' },
    ]);
    // important + arbitrary value
    expect(tokenize('bg-[url(/img/bg.png)]!')).toEqual([
      { type: 'utility', value: 'bg-[url(/img/bg.png)]!' },
    ]);
    expect(tokenize('hover:bg-[rgba(0,0,0,0.5)]!')).toEqual([
      { type: 'modifier', value: 'hover' },
      { type: 'utility', value: 'bg-[rgba(0,0,0,0.5)]!' },
    ]);
    // important + gradient
    expect(tokenize('bg-linear-to-r!')).toEqual([
      { type: 'utility', value: 'bg-linear-to-r!' },
    ]);
    expect(tokenize('hover:bg-radial!')).toEqual([
      { type: 'modifier', value: 'hover' },
      { type: 'utility', value: 'bg-radial!' },
    ]);
    // important + color stop
    expect(tokenize('from-indigo-500!')).toEqual([
      { type: 'utility', value: 'from-indigo-500!' },
    ]);
    expect(tokenize('hover:to-pink-500!')).toEqual([
      { type: 'modifier', value: 'hover' },
      { type: 'utility', value: 'to-pink-500!' },
    ]);
    // important + supports
    expect(tokenize('supports-[display:grid]:bg-blue-500!')).toEqual([
      { type: 'modifier', value: 'supports-[display:grid]' },
      { type: 'utility', value: 'bg-blue-500!' },
    ]);
    // important + pseudo-element
    expect(tokenize('before:bg-blue-500!')).toEqual([
      { type: 'modifier', value: 'before' },
      { type: 'utility', value: 'bg-blue-500!' },
    ]);
    // important + negative value
    expect(tokenize('-top-2!')).toEqual([
      { type: 'utility', value: '-top-2!' },
    ]);
    // important + chain + arbitrary
    expect(tokenize('sm:dark:bg-[theme(colors.red.500)]!')).toEqual([
      { type: 'modifier', value: 'sm' },
      { type: 'modifier', value: 'dark' },
      { type: 'utility', value: 'bg-[theme(colors.red.500)]!' },
    ]);
  });
}); 