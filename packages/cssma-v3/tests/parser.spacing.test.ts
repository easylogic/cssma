import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { SpacingParser } from '../src/core/parsers/spacing-parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 간격(Spacing) - Tailwind v4', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('Spacing 클래스 인식', () => {
    it('기본 padding 클래스를 인식해야 함', () => {
      expect(SpacingParser.isSpacingClass('p-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('pt-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('px-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('py-4')).toBe(true);
    });
    
    it('논리적 속성 padding 클래스를 인식해야 함', () => {
      expect(SpacingParser.isSpacingClass('ps-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('pe-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('padding-inline-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('padding-block-4')).toBe(true);
    });
    
    it('기본 margin 클래스를 인식해야 함', () => {
      expect(SpacingParser.isSpacingClass('m-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('mt-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('mx-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('my-4')).toBe(true);
    });
    
    it('논리적 속성 margin 클래스를 인식해야 함', () => {
      expect(SpacingParser.isSpacingClass('ms-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('me-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('margin-inline-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('margin-block-4')).toBe(true);
    });
    
    it('음수 spacing 클래스를 인식해야 함', () => {
      expect(SpacingParser.isSpacingClass('-m-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('-mt-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('-mx-auto')).toBe(true);
    });
    
    it('gap 클래스를 인식해야 함', () => {
      expect(SpacingParser.isSpacingClass('gap-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('gap-x-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('gap-y-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('column-gap-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('row-gap-4')).toBe(true);
    });
    
    it('space-between 클래스를 인식해야 함', () => {
      expect(SpacingParser.isSpacingClass('space-x-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('space-y-4')).toBe(true);
      expect(SpacingParser.isSpacingClass('space-x-reverse')).toBe(true);
      expect(SpacingParser.isSpacingClass('space-y-reverse')).toBe(true);
    });
    
    it('임의 값 클래스를 인식해야 함', () => {
      expect(SpacingParser.isSpacingClass('p-[20px]')).toBe(true);
      expect(SpacingParser.isSpacingClass('m-[1.5rem]')).toBe(true);
      expect(SpacingParser.isSpacingClass('gap-[2ch]')).toBe(true);
    });
    
    it('잘못된 클래스는 인식하지 않아야 함', () => {
      expect(SpacingParser.isSpacingClass('text-red')).toBe(false);
      expect(SpacingParser.isSpacingClass('bg-blue')).toBe(false);
      expect(SpacingParser.isSpacingClass('invalid')).toBe(false);
    });
  });
  
  describe('Spacing 파싱', () => {
    it('기본 padding 클래스를 파싱해야 함', () => {
      const result = SpacingParser.parseSpacing('p-4');
      expect(result).toEqual({
        property: 'p',
        value: '4',
        isNegative: false
      });
    });
    
    it('논리적 속성을 파싱해야 함', () => {
      const result = SpacingParser.parseSpacing('ps-4');
      expect(result).toEqual({
        property: 'ps',
        value: '4',
        isNegative: false
      });
    });
    
    it('음수 값을 파싱해야 함', () => {
      const result = SpacingParser.parseSpacing('-m-4');
      expect(result).toEqual({
        property: 'm',
        value: '4',
        isNegative: true
      });
    });
    
    it('소수점 값을 파싱해야 함', () => {
      const result = SpacingParser.parseSpacing('p-0.5');
      expect(result).toEqual({
        property: 'p',
        value: '0.5',
        isNegative: false
      });
    });
    
    it('전체 속성명을 파싱해야 함', () => {
      const result = SpacingParser.parseSpacing('padding-top-4');
      expect(result).toEqual({
        property: 'padding-top',
        value: '4',
        isNegative: false
      });
    });
  });
  
  describe('Spacing 클래스 파싱', () => {
    it('기본 padding 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('p-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('p-4');
      expect(result?.category).toBe('spacing');
      expect(result?.property).toBe('p');
      expect(result?.value).toBe('4');
    });
    
    it('논리적 속성 padding을 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('ps-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('ps-4');
      expect(result?.category).toBe('spacing');
      expect(result?.property).toBe('ps');
      expect(result?.value).toBe('4');
    });
    
    it('음수 margin 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('-m-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('-m-4');
      expect(result?.category).toBe('spacing');
    });
    
    it('소수점 값 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('p-0.5');
      expect(result).toBeDefined();
      expect(result?.className).toBe('p-0.5');
      expect(result?.category).toBe('spacing');
      expect(result?.property).toBe('p');
      expect(result?.value).toBe('0.5');
    });
    
    it('큰 값 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('p-96');
      expect(result).toBeDefined();
      expect(result?.className).toBe('p-96');
      expect(result?.category).toBe('spacing');
      expect(result?.property).toBe('p');
      expect(result?.value).toBe('96');
    });
    
    it('space-between 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('space-x-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('space-x-4');
      expect(result?.category).toBe('spacing');
      expect(result?.property).toBe('space-x');
      expect(result?.value).toBe('4');
    });
    
    it('임의 값 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('p-[20px]');
      expect(result).toBeDefined();
      expect(result?.className).toBe('p-[20px]');
      expect(result?.category).toBe('spacing');
      expect(result?.isArbitrary).toBe(true);
    });
  });
  
  describe('Spacing 스타일 적용', () => {
    it('기본 padding 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('p-4');
      expect(result.spacing.padding).toBeDefined();
      expect(result.spacing.padding).toEqual({ 
        top: 16, 
        right: 16, 
        bottom: 16, 
        left: 16 
      });
    });
    
    it('논리적 속성 padding을 적용할 수 있어야 함', () => {
      const result = parser.parse('ps-4');
      expect(result.spacing.paddingInline).toBeDefined();
      expect(result.spacing.paddingInline).toEqual({ start: 16 });
    });
    
    it('음수 margin 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('-m-4');
      expect(result.spacing.margin).toBeDefined();
      expect(result.spacing.margin).toEqual({ 
        top: -16, 
        right: -16, 
        bottom: -16, 
        left: -16 
      });
    });
    
    it('소수점 값 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('p-0.5');
      expect(result.spacing.padding).toBeDefined();
      expect(result.spacing.padding).toEqual({ 
        top: 2, 
        right: 2, 
        bottom: 2, 
        left: 2 
      });
    });
    
    it('px 값 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('p-px');
      expect(result.spacing.padding).toBeDefined();
      expect(result.spacing.padding).toEqual({ 
        top: 1, 
        right: 1, 
        bottom: 1, 
        left: 1 
      });
    });
    
    it('큰 값 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('p-96');
      expect(result.spacing.padding).toBeDefined();
      expect(result.spacing.padding).toEqual({ 
        top: 384, 
        right: 384, 
        bottom: 384, 
        left: 384 
      });
    });
    
    it('동적 값 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('p-13'); // 동적 값
      expect(result.spacing.padding).toBeDefined();
      expect(result.spacing.padding).toEqual({ 
        top: 52, // 13 * 4px
        right: 52, 
        bottom: 52, 
        left: 52 
      });
    });
    
    it('gap 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('gap-4 gap-x-8');
      expect(result.spacing.gap).toBeDefined();
      expect(result.spacing.gap).toEqual({ row: 16, column: 32 });
    });
    
    it('space-between 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('space-x-4');
      expect(result.spacing.spaceBetween).toBeDefined();
      expect(result.spacing.spaceBetween).toEqual({ x: 16 });
    });
    
    it('임의 값 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('p-[20px]');
      expect(result.spacing.padding).toBeDefined();
      expect(result.spacing.padding).toEqual({ 
        top: '20px', 
        right: '20px', 
        bottom: '20px', 
        left: '20px' 
      });
    });
    
    it('임의 값 (rem) 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('m-[1.5rem]');
      expect(result.spacing.margin).toBeDefined();
      expect(result.spacing.margin).toEqual({ 
        top: '1.5rem', 
        right: '1.5rem', 
        bottom: '1.5rem', 
        left: '1.5rem' 
      });
    });
    
    it('음수 임의 값 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('-m-[20px]');
      expect(result.spacing.margin).toBeDefined();
      expect(result.spacing.margin).toEqual({ 
        top: '-20px', 
        right: '-20px', 
        bottom: '-20px', 
        left: '-20px' 
      });
    });
    
    it('여러 spacing 스타일을 함께 적용할 수 있어야 함', () => {
      const result = parser.parse('p-4 m-2 gap-8 ps-6');
      expect(result.spacing.padding).toEqual({ 
        top: 16, 
        right: 16, 
        bottom: 16, 
        left: 16 
      });
      expect(result.spacing.margin).toEqual({ 
        top: 8, 
        right: 8, 
        bottom: 8, 
        left: 8 
      });
      expect(result.spacing.gap).toBe(32);
      expect(result.spacing.paddingInline).toEqual({ start: 24 });
    });
    
    it('복합 방향성 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('pt-4 pr-6 pb-8 pl-2');
      expect(result.spacing.padding).toEqual({ 
        top: 16, 
        right: 24, 
        bottom: 32, 
        left: 8 
      });
    });
  });
  
  describe('CSS 속성 변환', () => {
    it('padding을 CSS 속성으로 변환할 수 있어야 함', () => {
      const result = parser.parse('p-4');
      const css = SpacingParser.toCSSProperties(result.spacing);
      expect(css).toEqual({
        'padding-top': '16px',
        'padding-right': '16px',
        'padding-bottom': '16px',
        'padding-left': '16px'
      });
    });
    
    it('논리적 속성을 CSS로 변환할 수 있어야 함', () => {
      const result = parser.parse('ps-4 pe-6');
      const css = SpacingParser.toCSSProperties(result.spacing);
      expect(css).toEqual({
        'padding-inline-start': '16px',
        'padding-inline-end': '24px'
      });
    });
    
    it('gap을 CSS 속성으로 변환할 수 있어야 함', () => {
      const result = parser.parse('gap-x-4 gap-y-6');
      const css = SpacingParser.toCSSProperties(result.spacing);
      expect(css).toEqual({
        'row-gap': '24px',
        'column-gap': '16px'
      });
    });
    
    it('space-between을 CSS 변수로 변환할 수 있어야 함', () => {
      const result = parser.parse('space-x-4');
      const css = SpacingParser.toCSSProperties(result.spacing);
      expect(css).toEqual({
        '--space-x': '16px'
      });
    });
    
    it('임의 값을 CSS로 변환할 수 있어야 함', () => {
      const result = parser.parse('p-[1.5rem]');
      const css = SpacingParser.toCSSProperties(result.spacing);
      expect(css).toEqual({
        'padding-top': '1.5rem',
        'padding-right': '1.5rem',
        'padding-bottom': '1.5rem',
        'padding-left': '1.5rem'
      });
    });
    
    it('0 값을 올바르게 변환할 수 있어야 함', () => {
      const result = parser.parse('p-0');
      const css = SpacingParser.toCSSProperties(result.spacing);
      expect(css).toEqual({
        'padding-top': '0',
        'padding-right': '0',
        'padding-bottom': '0',
        'padding-left': '0'
      });
    });
  });
}); 