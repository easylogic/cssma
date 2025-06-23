import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { TypographyParser } from '../src/core/parsers/typography-parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 타이포그래피(Typography) - Tailwind v4', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('Typography 클래스 인식', () => {
    it('폰트 크기 클래스를 인식해야 함', () => {
      expect(TypographyParser.isTypographyClass('text-xs')).toBe(true);
      expect(TypographyParser.isTypographyClass('text-sm')).toBe(true);
      expect(TypographyParser.isTypographyClass('text-base')).toBe(true);
      expect(TypographyParser.isTypographyClass('text-lg')).toBe(true);
      expect(TypographyParser.isTypographyClass('text-xl')).toBe(true);
      expect(TypographyParser.isTypographyClass('text-2xl')).toBe(true);
    });
    
    it('폰트 두께 클래스를 인식해야 함', () => {
      expect(TypographyParser.isTypographyClass('font-thin')).toBe(true);
      expect(TypographyParser.isTypographyClass('font-normal')).toBe(true);
      expect(TypographyParser.isTypographyClass('font-bold')).toBe(true);
      expect(TypographyParser.isTypographyClass('font-black')).toBe(true);
    });
    
    it('폰트 패밀리 클래스를 인식해야 함', () => {
      expect(TypographyParser.isTypographyClass('font-sans')).toBe(true);
      expect(TypographyParser.isTypographyClass('font-serif')).toBe(true);
      expect(TypographyParser.isTypographyClass('font-mono')).toBe(true);
    });
    
    it('자간 클래스를 인식해야 함', () => {
      expect(TypographyParser.isTypographyClass('tracking-tight')).toBe(true);
      expect(TypographyParser.isTypographyClass('tracking-normal')).toBe(true);
      expect(TypographyParser.isTypographyClass('tracking-wide')).toBe(true);
    });
    
    it('행간 클래스를 인식해야 함', () => {
      expect(TypographyParser.isTypographyClass('leading-none')).toBe(true);
      expect(TypographyParser.isTypographyClass('leading-normal')).toBe(true);
      expect(TypographyParser.isTypographyClass('leading-relaxed')).toBe(true);
    });
    
    it('텍스트 정렬 클래스를 인식해야 함', () => {
      expect(TypographyParser.isTypographyClass('text-left')).toBe(true);
      expect(TypographyParser.isTypographyClass('text-center')).toBe(true);
      expect(TypographyParser.isTypographyClass('text-right')).toBe(true);
    });
    
    it('텍스트 변형 클래스를 인식해야 함', () => {
      expect(TypographyParser.isTypographyClass('uppercase')).toBe(true);
      expect(TypographyParser.isTypographyClass('lowercase')).toBe(true);
      expect(TypographyParser.isTypographyClass('capitalize')).toBe(true);
    });
    
    it('텍스트 장식 클래스를 인식해야 함', () => {
      expect(TypographyParser.isTypographyClass('underline')).toBe(true);
      expect(TypographyParser.isTypographyClass('line-through')).toBe(true);
      expect(TypographyParser.isTypographyClass('no-underline')).toBe(true);
    });
    
    it('폰트 스타일 클래스를 인식해야 함', () => {
      expect(TypographyParser.isTypographyClass('italic')).toBe(true);
      expect(TypographyParser.isTypographyClass('not-italic')).toBe(true);
    });
    
    it('임의 값 클래스를 인식해야 함', () => {
      expect(TypographyParser.isTypographyClass('text-[20px]')).toBe(true);
      expect(TypographyParser.isTypographyClass('font-[500]')).toBe(true);
      expect(TypographyParser.isTypographyClass('tracking-[0.1em]')).toBe(true);
      expect(TypographyParser.isTypographyClass('leading-[1.5]')).toBe(true);
    });
    
    it('Typography가 아닌 클래스는 인식하지 않아야 함', () => {
      expect(TypographyParser.isTypographyClass('bg-red-500')).toBe(false);
      expect(TypographyParser.isTypographyClass('p-4')).toBe(false);
      expect(TypographyParser.isTypographyClass('w-full')).toBe(false);
    });
  });
  
  describe('Typography 클래스 파싱', () => {
    it('폰트 크기 클래스를 올바르게 파싱해야 함', () => {
      const result = parser.parseClassName('text-lg');
      expect(result).toMatchObject({
        baseClassName: 'text-lg',
        category: 'typography',
        property: 'text',
        value: 'lg',
        isArbitrary: false
      });
    });
    
    it('폰트 두께 클래스를 올바르게 파싱해야 함', () => {
      const result = parser.parseClassName('font-bold');
      expect(result).toMatchObject({
        baseClassName: 'font-bold',
        category: 'typography',
        property: 'font',
        value: 'bold',
        isArbitrary: false
      });
    });
    
    it('자간 클래스를 올바르게 파싱해야 함', () => {
      const result = parser.parseClassName('tracking-wide');
      expect(result).toMatchObject({
        baseClassName: 'tracking-wide',
        category: 'typography',
        property: 'tracking',
        value: 'wide',
        isArbitrary: false
      });
    });
    
    it('행간 클래스를 올바르게 파싱해야 함', () => {
      const result = parser.parseClassName('leading-normal');
      expect(result).toMatchObject({
        baseClassName: 'leading-normal',
        category: 'typography',
        property: 'leading',
        value: 'normal',
        isArbitrary: false
      });
    });
    
    it('임의 값 폰트 크기를 올바르게 파싱해야 함', () => {
      const result = parser.parseClassName('text-[20px]');
      expect(result).toMatchObject({
        baseClassName: 'text-[20px]',
        category: 'typography',
        property: 'text',
        value: '20px',
        isArbitrary: true
      });
    });
    
    it('임의 값 폰트 두께를 올바르게 파싱해야 함', () => {
      const result = parser.parseClassName('font-[500]');
      expect(result).toMatchObject({
        baseClassName: 'font-[500]',
        category: 'typography',
        property: 'font',
        value: '500',
        isArbitrary: true
      });
    });
    
    it('값이 없는 클래스를 올바르게 파싱해야 함', () => {
      const result = parser.parseClassName('uppercase');
      expect(result).toMatchObject({
        baseClassName: 'uppercase',
        category: 'typography',
        property: 'uppercase',
        value: '',
        isArbitrary: false
      });
    });
  });
  
  describe('Typography 스타일 적용', () => {
    it('기본 폰트 크기를 올바르게 적용해야 함', () => {
      const result = parser.parse('text-lg');
      expect(result.typography).toEqual({
        fontSize: 18,
        lineHeight: 1.5555555555555556
      });
    });
    
    it('폰트 두께를 올바르게 적용해야 함', () => {
      const result = parser.parse('font-bold');
      expect(result.typography).toEqual({
        fontWeight: 700
      });
    });
    
    it('폰트 패밀리를 올바르게 적용해야 함', () => {
      const result = parser.parse('font-sans');
      expect(result.typography).toEqual({
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif'
      });
    });
    
    it('자간을 올바르게 적용해야 함', () => {
      const result = parser.parse('tracking-wide');
      expect(result.typography).toEqual({
        letterSpacing: '0.025em'
      });
    });
    
    it('행간을 올바르게 적용해야 함', () => {
      const result = parser.parse('leading-normal');
      expect(result.typography).toEqual({
        lineHeight: 1.5
      });
    });
    
    it('텍스트 정렬을 올바르게 적용해야 함', () => {
      const result = parser.parse('text-center');
      expect(result.typography).toEqual({
        textAlign: 'center'
      });
    });
    
    it('텍스트 변형을 올바르게 적용해야 함', () => {
      const result = parser.parse('uppercase');
      expect(result.typography).toEqual({
        textTransform: 'uppercase'
      });
    });
    
    it('텍스트 장식을 올바르게 적용해야 함', () => {
      const result = parser.parse('underline');
      expect(result.typography).toEqual({
        textDecorationLine: 'underline'
      });
    });
    
    it('폰트 스타일을 올바르게 적용해야 함', () => {
      const result = parser.parse('italic');
      expect(result.typography).toEqual({
        fontStyle: 'italic'
      });
    });
    
    it('임의 값 폰트 크기를 올바르게 적용해야 함', () => {
      const result = parser.parse('text-[20px]');
      expect(result.typography).toEqual({
        fontSize: '20px'
      });
    });
    
    it('임의 값 폰트 두께를 올바르게 적용해야 함', () => {
      const result = parser.parse('font-[500]');
      expect(result.typography).toEqual({
        fontWeight: '500'
      });
    });
    
    it('임의 값 자간을 올바르게 적용해야 함', () => {
      const result = parser.parse('tracking-[0.1em]');
      expect(result.typography).toEqual({
        letterSpacing: '0.1em'
      });
    });
    
    it('임의 값 행간을 올바르게 적용해야 함', () => {
      const result = parser.parse('leading-[1.5]');
      expect(result.typography).toEqual({
        lineHeight: 1.5
      });
    });
    
    it('임의 값 폰트 패밀리를 올바르게 적용해야 함', () => {
      const result = parser.parse('font-[Arial,sans-serif]');
      expect(result.typography).toEqual({
        fontFamily: 'Arial,sans-serif'
      });
    });
    
    it('다중 Typography 클래스를 결합해야 함', () => {
      const result = parser.parse('text-lg font-bold text-center');
      expect(result.typography).toEqual({
        fontSize: 18,
        lineHeight: 1.5555555555555556,
        fontWeight: 700,
        textAlign: 'center'
      });
    });
    
    it('소수점 값 폰트 크기를 올바르게 적용해야 함', () => {
      const result = parser.parse('text-[1.5rem]');
      expect(result.typography).toEqual({
        fontSize: '1.5rem'
      });
    });
    
    it('텍스트 장식 스타일을 올바르게 적용해야 함', () => {
      const result = parser.parse('decoration-dashed');
      expect(result.typography).toEqual({
        textDecorationStyle: 'dashed'
      });
    });
    
    it('텍스트 장식 두께를 올바르게 적용해야 함', () => {
      const result = parser.parse('decoration-2');
      expect(result.typography).toEqual({
        textDecorationThickness: '2px'
      });
    });
    
    it('밑줄 오프셋을 올바르게 적용해야 함', () => {
      const result = parser.parse('underline-offset-4');
      expect(result.typography).toEqual({
        textUnderlineOffset: '4px'
      });
    });
    
    it('텍스트 들여쓰기를 올바르게 적용해야 함', () => {
      const result = parser.parse('indent-4');
      expect(result.typography).toEqual({
        textIndent: '1rem'
      });
    });
  });
  
  describe('CSS 출력', () => {
    it('Typography 스타일을 CSS로 변환해야 함', () => {
      const result = parser.parse('text-lg font-bold text-center');
      const css = TypographyParser.toCSSProperties(result.typography!);
      
      expect(css).toEqual({
        'font-size': '18px',
        'font-weight': '700',
        'line-height': '1.5555555555555556',
        'text-align': 'center'
      });
    });
    
    it('임의 값을 포함한 CSS 출력', () => {
      const result = parser.parse('text-[1.25rem] font-[600] tracking-[0.05em]');
      const css = TypographyParser.toCSSProperties(result.typography!);
      
      expect(css).toEqual({
        'font-size': '1.25rem',
        'font-weight': '600',
        'letter-spacing': '0.05em'
      });
    });
  });

  describe('Text Wrap Utilities (v4.1)', () => {
    it('should parse text wrap utilities', () => {
      expect(parser.parseClass('wrap-normal')?.category).toBe('typography');
      expect(parser.parseClass('wrap-break-word')?.category).toBe('typography');
      expect(parser.parseClass('wrap-anywhere')?.category).toBe('typography');
    });

    it('should apply text wrap styles correctly', () => {
      const wrapNormalResult = parser.parse('wrap-normal');
      expect(wrapNormalResult.typography?.overflowWrap).toBe('normal');

      const wrapBreakWordResult = parser.parse('wrap-break-word');
      expect(wrapBreakWordResult.typography?.overflowWrap).toBe('break-word');

      const wrapAnywhereResult = parser.parse('wrap-anywhere');
      expect(wrapAnywhereResult.typography?.overflowWrap).toBe('anywhere');
    });

    it('should work with modifiers', () => {
      const result = parser.parse('hover:wrap-anywhere md:wrap-break-word');
      
      expect(result.states?.[':hover']?.typography?.overflowWrap).toBe('anywhere');
      expect(result.breakpoints?.md?.typography?.overflowWrap).toBe('break-word');
    });

    it('should output correct CSS for text wrap utilities', () => {
      const wrapNormalResult = parser.parse('wrap-normal');
      const wrapBreakWordResult = parser.parse('wrap-break-word');
      const wrapAnywhereResult = parser.parse('wrap-anywhere');

      const css1 = TypographyParser.toCSSProperties(wrapNormalResult.typography!);
      const css2 = TypographyParser.toCSSProperties(wrapBreakWordResult.typography!);
      const css3 = TypographyParser.toCSSProperties(wrapAnywhereResult.typography!);

      expect(css1['overflow-wrap']).toBe('normal');
      expect(css2['overflow-wrap']).toBe('break-word');
      expect(css3['overflow-wrap']).toBe('anywhere');
    });
  });
}); 