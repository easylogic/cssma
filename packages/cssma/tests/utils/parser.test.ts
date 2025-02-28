import { describe, it, expect } from 'vitest';
import { parseArbitraryValue, parseStyles } from '../../src/utils/parser';

describe('Parser Utils', () => {
  describe('parseArbitraryValue', () => {
    it('should parse arbitrary width values', () => {
      expect(parseArbitraryValue('w-[100]')).toEqual({
        property: 'width',
        value: 100
      });

      expect(parseArbitraryValue('w-[100px]')).toEqual({
        property: 'width',
        value: 100
      });
    });

    it('should parse arbitrary height values', () => {
      expect(parseArbitraryValue('h-[200]')).toEqual({
        property: 'height',
        value: 200
      });

      expect(parseArbitraryValue('h-[200px]')).toEqual({
        property: 'height',
        value: 200
      });
    });

    it('should parse arbitrary padding values', () => {
      expect(parseArbitraryValue('p-[16]')).toEqual({
        property: 'padding',
        value: 16
      });

      expect(parseArbitraryValue('pt-[8]')).toEqual({
        property: 'paddingTop',
        value: 8
      });

      expect(parseArbitraryValue('pr-[12]')).toEqual({
        property: 'paddingRight',
        value: 12
      });

      expect(parseArbitraryValue('pb-[20]')).toEqual({
        property: 'paddingBottom',
        value: 20
      });

      expect(parseArbitraryValue('pl-[10]')).toEqual({
        property: 'paddingLeft',
        value: 10
      });
    });

    it('should parse arbitrary gap values', () => {
      expect(parseArbitraryValue('gap-[24]')).toEqual({
        property: 'gap',
        value: 24
      });

      expect(parseArbitraryValue('gap-x-[16]')).toEqual({
        property: 'itemSpacing',
        value: 16
      });

      expect(parseArbitraryValue('gap-y-[20]')).toEqual({
        property: 'counterAxisSpacing',
        value: 20
      });
    });

    it('should parse arbitrary color values', () => {
      expect(parseArbitraryValue('bg-[#FF0000]')).toEqual({
        property: 'backgroundColor',
        value: '#FF0000'
      });

      expect(parseArbitraryValue('text-[#00FF00]')).toEqual({
        property: 'color',
        value: '#00FF00'
      });

      expect(parseArbitraryValue('border-[#0000FF]')).toEqual({
        property: 'borderColor',
        value: '#0000FF'
      });
    });

    it('should parse arbitrary opacity values', () => {
      expect(parseArbitraryValue('opacity-[0.5]')).toEqual({
        property: 'opacity',
        value: 0.5
      });
    });

    it('should handle invalid arbitrary values', () => {
      expect(parseArbitraryValue('w-invalid')).toBeNull();
      expect(parseArbitraryValue('h-[]')).toBeNull();
      expect(parseArbitraryValue('p-[abc]')).toBeNull();
    });

    it('should handle non-arbitrary values', () => {
      expect(parseArbitraryValue('w-full')).toBeNull();
      expect(parseArbitraryValue('h-auto')).toBeNull();
      expect(parseArbitraryValue('p-4')).toBeNull();
    });
  });

  describe('parseStyles', () => {
    it('should parse multiple style classes', () => {
      const input = 'w-[100] h-[200] p-[16] bg-[#FF0000] opacity-[0.5]';
      expect(parseStyles(input)).toEqual({
        width: 100,
        height: 200,
        padding: 16,
        backgroundColor: '#FF0000',
        opacity: 0.5
      });
    });

    it('should parse complex padding and gap combinations', () => {
      const input = 'pt-[10] pr-[20] pb-[30] pl-[40] gap-x-[16] gap-y-[24]';
      expect(parseStyles(input)).toEqual({
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 30,
        paddingLeft: 40,
        itemSpacing: 16,
        counterAxisSpacing: 24
      });
    });

    it('should parse multiple color properties', () => {
      const input = 'bg-[#FF0000] text-[#00FF00] border-[#0000FF]';
      expect(parseStyles(input)).toEqual({
        backgroundColor: '#FF0000',
        color: '#00FF00',
        borderColor: '#0000FF'
      });
    });

    it('should handle mixed valid and invalid values', () => {
      const input = 'w-[100] h-invalid p-[16] bg-[] text-[#00FF00]';
      expect(parseStyles(input)).toEqual({
        width: 100,
        padding: 16,
        color: '#00FF00'
      });
    });

    it('should handle empty input', () => {
      expect(parseStyles('')).toEqual({});
    });

    it('should handle input with only invalid values', () => {
      const input = 'w-full h-auto p-4 bg-red-500';
      expect(parseStyles(input)).toEqual({});
    });

    it('should parse real-world component example', () => {
      const input = 'w-[280] h-[180] p-[24] gap-[16] bg-[#4F46E5] opacity-[0.9]';
      expect(parseStyles(input)).toEqual({
        width: 280,
        height: 180,
        padding: 24,
        gap: 16,
        backgroundColor: '#4F46E5',
        opacity: 0.9
      });
    });
  });
});
