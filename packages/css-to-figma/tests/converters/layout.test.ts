import { describe, it, expect } from 'vitest';
import { convertLayout } from '../../src/converters/layout';

describe('Layout Converter', () => {
  describe('Flex Direction', () => {
    it('should convert flex-row', () => {
      expect(convertLayout('flex flex-row')).toEqual({
        layoutMode: 'HORIZONTAL',
        layoutWrap: 'NO_WRAP'
      });
    });

    it('should convert flex-col', () => {
      expect(convertLayout('flex flex-col')).toEqual({
        layoutMode: 'VERTICAL',
        layoutWrap: 'NO_WRAP'
      });
    });

    it('should handle flex direction changes', () => {
      expect(convertLayout('flex flex-row flex-col')).toEqual({
        layoutMode: 'VERTICAL',
        layoutWrap: 'NO_WRAP'
      });
    });

    it('should combine flex direction with other layout properties', () => {
      expect(convertLayout('flex flex-col gap-[16] p-[24]')).toEqual({
        layoutMode: 'VERTICAL',
        layoutWrap: 'NO_WRAP',
        itemSpacing: 64,
        counterAxisSpacing: 64,
        paddingTop: 96,
        paddingRight: 96,
        paddingBottom: 96,
        paddingLeft: 96
      });
    });
  });

  describe('Gap', () => {
    it('should convert gap values', () => {
      expect(convertLayout('gap-[16]')).toEqual({
        itemSpacing: 64,
        counterAxisSpacing: 64
      });
    });

    it('should convert directional gap values', () => {
      expect(convertLayout('gap-x-[16] gap-y-[24]')).toEqual({
        itemSpacing: 96,
        counterAxisSpacing: 96
      });
    });
  });

  describe('Padding', () => {
    it('should convert padding values', () => {
      expect(convertLayout('p-[16]')).toEqual({
        paddingTop: 64,
        paddingRight: 64,
        paddingBottom: 64,
        paddingLeft: 64
      });
    });

    it('should convert directional padding values', () => {
      expect(convertLayout('pt-[8] pr-[16] pb-[24] pl-[12]')).toEqual({
        paddingTop: 32,
        paddingRight: 64,
        paddingBottom: 96,
        paddingLeft: 48
      });
    });
  });

  describe('Flex Layout', () => {
    it('should convert flex wrap', () => {
      expect(convertLayout('flex flex-wrap')).toEqual({
        layoutMode: 'HORIZONTAL',
        layoutWrap: 'WRAP'
      });

      expect(convertLayout('flex flex-nowrap')).toEqual({
        layoutMode: 'HORIZONTAL',
        layoutWrap: 'NO_WRAP'
      });
    });

    it('should convert justify content', () => {
      expect(convertLayout('flex justify-start')).toEqual({
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'MIN',
        layoutWrap: 'NO_WRAP'
      });

      expect(convertLayout('flex justify-center')).toEqual({
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'CENTER',
        layoutWrap: 'NO_WRAP'
      });

      expect(convertLayout('flex justify-end')).toEqual({
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'MAX',
        layoutWrap: 'NO_WRAP'
      });

      expect(convertLayout('flex justify-between')).toEqual({
        layoutMode: 'HORIZONTAL',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        layoutWrap: 'NO_WRAP'
      });
    });

    it('should convert align items', () => {
      expect(convertLayout('flex items-start')).toEqual({
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'MIN',
        layoutWrap: 'NO_WRAP'
      });

      expect(convertLayout('flex items-center')).toEqual({
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'CENTER',
        layoutWrap: 'NO_WRAP'
      });

      expect(convertLayout('flex items-end')).toEqual({
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'MAX',
        layoutWrap: 'NO_WRAP'
      });

      expect(convertLayout('flex items-baseline')).toEqual({
        layoutMode: 'HORIZONTAL',
        counterAxisAlignItems: 'BASELINE',
        layoutWrap: 'NO_WRAP'
      });
    });

    it('should convert gap', () => {
      expect(convertLayout('flex gap-4')).toEqual({
        layoutMode: 'HORIZONTAL',
        counterAxisSpacing: 16,
        itemSpacing: 16,
        layoutWrap: 'NO_WRAP'
      });

      expect(convertLayout('flex gap-x-4 gap-y-6')).toEqual({
        layoutMode: 'HORIZONTAL',
        itemSpacing: 24,
        counterAxisSpacing: 24,
        layoutWrap: 'NO_WRAP'
      });
    });
  });

  describe('Combined Properties', () => {
    it('should handle multiple layout properties together', () => {
      expect(convertLayout('flex flex-col gap-[16] p-[24] items-center justify-between')).toEqual({
        layoutMode: 'VERTICAL',
        layoutWrap: 'NO_WRAP',
        itemSpacing: 64,
        counterAxisSpacing: 64,
        paddingTop: 96,
        paddingRight: 96,
        paddingBottom: 96,
        paddingLeft: 96,
        counterAxisAlignItems: 'CENTER',
        primaryAxisAlignItems: 'SPACE_BETWEEN'
      });
    });
  });
});
