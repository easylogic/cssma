import { describe, it, expect } from 'vitest';
import { figmaToCss } from '../../src/core/figmaToCss';

describe('Figma to Css Converter', () => {
  describe('Position and Constraints', () => {
    it('should convert position type', () => {
      expect(figmaToCss({ layoutPositioning: 'ABSOLUTE' })).toBe('absolute');
      expect(figmaToCss({ layoutPositioning: 'AUTO' })).toBe('');
    });

    it('should convert special constraint combinations', () => {
      expect(figmaToCss({ 
        width: 100,
        height: 100,
        parent: {
            width: 200,
            height: 200
        },
        constraints: { horizontal: 'CENTER', vertical: 'CENTER' } ,
        layoutPositioning: 'ABSOLUTE',
        x: 0,
        y: 0,
      })).toBe('w-[100] h-[100] absolute center-x left-[50px] right-[50px] center-y top-[50px] bottom-[50px]');

      expect(figmaToCss({ 
        width: 100,
        height: 100,
        parent: {
            width: 200,
            height: 200
        },
        constraints: { horizontal: 'STRETCH', vertical: 'STRETCH' },
        layoutPositioning: 'ABSOLUTE',
        x: 0,
        y: 0,
      })).toBe('w-[100] h-[100] absolute stretch-x right-[100px] stretch-y bottom-[100px]');

      expect(figmaToCss({ 
        width: 100,
        height: 100,
        parent: {
            width: 200,
            height: 200
        },
        constraints: { horizontal: 'SCALE', vertical: 'SCALE' },
        layoutPositioning: 'ABSOLUTE',
        x: 0,
        y: 0,
      })).toBe('w-[100] h-[100] absolute scale-x right-[100px] scale-y bottom-[100px]');
    });

    it('should convert horizontal constraints with coordinates', () => {
      expect(figmaToCss({ 
        width: 100,
        height: 100,
        parent: {
            width: 200,
            height: 200
        },
        constraints: { horizontal: 'MIN' }, x: 0 
      })).toBe('w-[100] h-[100]');

      expect(figmaToCss({ 
        width: 100,
        height: 100,
        parent: {
            width: 200,
            height: 200
        },
        constraints: { horizontal: 'MIN' }, x: 10 
      })).toBe('w-[100] h-[100] left-[10px]');

      expect(figmaToCss({ 
        width: 100,
        height: 100,
        parent: {
            width: 200,
            height: 200
        },
        constraints: { horizontal: 'MAX' }, x: 0 
      })).toBe('w-[100] h-[100] right-[0px]');

      expect(figmaToCss({ 
        width: 100,
        height: 100,
        parent: {
            width: 200,
            height: 200
        },
        constraints: { horizontal: 'MAX' }, x: 20 
      })).toBe('w-[100] h-[100] right-[20px]');
    });

    it('should convert vertical constraints with coordinates', () => {
      expect(figmaToCss({ 
        constraints: { vertical: 'MIN' }, y: 0 
      })).toBe('');

      expect(figmaToCss({ 
        constraints: { vertical: 'MIN' }, y: 10 
      })).toBe('top-[10px]');

      expect(figmaToCss({ 
        constraints: { vertical: 'MAX' }, y: 0,
        parent: { 
            width: 100,
            height: 100 
        },
        layoutPositioning: 'ABSOLUTE',
        width: 100,
        height: 100,
      })).toBe('w-[100] h-[100] absolute bottom-[0px]');

      expect(figmaToCss({ 
        constraints: { vertical: 'MAX' }, y: 0, 
        parent: { 
            width: 100,
            height: 100 
        },
        layoutPositioning: 'ABSOLUTE',
        width: 100,
        height: 100,
      })).toBe('w-[100] h-[100] absolute bottom-[0px]');
    });

    it('should convert scale constraints with coordinates', () => {
      expect(figmaToCss({ 
        width: 100,
        height: 100,
        parent: {
            width: 200,
            height: 200
        },
        constraints: { horizontal: 'SCALE', vertical: 'SCALE' }, x: 0, y: 0 
      })).toBe('w-[100] h-[100] scale-x right-[100px] scale-y bottom-[100px]');

      expect(figmaToCss({ 
        width: 100,
        height: 100,
        parent: {
            width: 200,
            height: 200
        },
        constraints: { horizontal: 'SCALE', vertical: 'SCALE' }, x: 10, y: 10 
      })).toBe('w-[100] h-[100] scale-x left-[10px] right-[90px] scale-y top-[10px] bottom-[90px]');
    });

    it('should convert individual constraints without coordinates', () => {
      expect(figmaToCss({ 
        x: 0,   
        width: 100,
        height: 100,
        parent: {
          width: 200,
          height: 200
        },
        constraints: { horizontal: 'MIN' } 
      })).toBe('w-[100] h-[100]');

      expect(figmaToCss({ 
        x: 0,   
        width: 100,
        height: 100,
        parent: {
          width: 200,
          height: 200
        },
        constraints: { horizontal: 'MAX' } 
      })).toBe('w-[100] h-[100] right-[0px]');

      expect(figmaToCss({ 
        y: 0,   
        width: 100,
        height: 100,
        parent: {
          width: 200,
          height: 200
        },
        constraints: { vertical: 'MIN' } 
      })).toBe('w-[100] h-[100]');

      expect(figmaToCss({ 
        y: 0,   
        width: 100,
        height: 100,
        parent: {
          width: 200,
          height: 200
        },
        constraints: { vertical: 'MAX' } 
      })).toBe('w-[100] h-[100] bottom-[0px]');

      expect(figmaToCss({ 
        x: 0,   
        width: 100,
        height: 100,
        parent: {
          width: 200,
          height: 200
        },
        constraints: { horizontal: 'CENTER' } 
      })).toBe('w-[100] h-[100] center-x left-[50px] right-[50px]');

      expect(figmaToCss({ 
        y: 0,   
        width: 100,
        height: 100,
        parent: {
          width: 200,
          height: 200
        },
        constraints: { vertical: 'CENTER' } 
      })).toBe('w-[100] h-[100] center-y top-[50px] bottom-[50px]');
    });

    it('should convert stretch constraints', () => {
      expect(figmaToCss({ 
        constraints: { horizontal: 'STRETCH' },
        width: 100,
        height: 100,
        parent: {
          width: 200,
          height: 200
        }
      })).toBe('w-[100] h-[100] stretch-x right-[100px]');

      expect(figmaToCss({ 
        constraints: { vertical: 'STRETCH' },
        width: 100,
        height: 100,
        parent: {
          width: 200,
          height: 200
        }
      })).toBe('w-[100] h-[100] stretch-y bottom-[100px]');
    });

    it('should handle coordinates without constraints', () => {
      expect(figmaToCss({ 
        parent: { layoutMode: 'NONE' }, x: 10, y: 20 
      })).toBe('left-[10px] top-[20px]');

      expect(figmaToCss({ 
        parent: { layoutMode: 'NONE' }, x: 0, y: 0 
      })).toBe('');
    });

    it('should combine position type with constraints', () => {
      expect(figmaToCss({ 
        layoutPositioning: 'ABSOLUTE',
        constraints: { horizontal: 'MIN', vertical: 'MIN' },
        x: 10,
        y: 20,
        width: 100,
        height: 100,
        parent: {
          width: 200,
          height: 200
        }
      })).toBe('w-[100] h-[100] absolute left-[10px] top-[20px]');
    });
  });
}); 