import { describe, it, expect } from 'vitest';
import { figmaToStyle } from '../src/figmaToStyle';

export function normalizeClasses(classString: string): string[] {
  return classString.split(' ').sort();
}

export function expectClassesEqual(received: string, expected: string) {
  const normalizedReceived = normalizeClasses(received);
  const normalizedExpected = normalizeClasses(expected);
  
  expect(normalizedReceived).toEqual(normalizedExpected);
}

describe('figmaToStyle', () => {
  describe('Layout', () => {
    it('should convert layout mode', () => {
      expectClassesEqual(figmaToStyle({ layoutMode: 'HORIZONTAL' }), 'flex-row');
      expectClassesEqual(figmaToStyle({ layoutMode: 'VERTICAL' }), 'flex-col');
    });

    it('should convert sizing', () => {
      expectClassesEqual(figmaToStyle({ 
        layoutSizingHorizontal: 'FILL',
        layoutSizingVertical: 'HUG'
      }), 'w-full h-auto');

      expectClassesEqual(figmaToStyle({ 
        width: 100,
        height: 200
      }), 'w-[100] h-[200]');
    });

    it('should convert alignment', () => {
      expectClassesEqual(figmaToStyle({
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER'
      }), 'justify-center items-center');
    });

    it('should convert spacing', () => {
      expectClassesEqual(figmaToStyle({
        itemSpacing: 16,
        paddingTop: 24,
        paddingRight: 24,
        paddingBottom: 24,
        paddingLeft: 24
      }), 'gap-[16] p-[24]');

      expectClassesEqual(figmaToStyle({
        paddingTop: 8,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16
      }), 'pt-[8] pr-[16] pb-[8] pl-[16]');
    });
  });

  describe('Colors', () => {
    it('should convert solid colors', () => {
      expectClassesEqual(figmaToStyle({
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 0, b: 0 }
        }]
      }), 'bg-[#ff0000]');
    });

    it('should convert gradients', () => {
      expectClassesEqual(figmaToStyle({
        fills: [{
          type: 'GRADIENT_LINEAR',
          gradientStops: [
            { position: 0, color: { r: 1, g: 0, b: 0 } },
            { position: 1, color: { r: 0, g: 0, b: 1 } }
          ]
        }]
      }), 'bg-linear-to-r from-[#ff0000] to-[#0000ff]');
    });
  });

  describe('Typography', () => {
    it('should convert font size', () => {
      expectClassesEqual(figmaToStyle({ fontSize: 20 }), 'text-xl');
      expectClassesEqual(figmaToStyle({ fontSize: 15 }), 'text-[15]');
    });

    it('should convert font weight', () => {
      expectClassesEqual(figmaToStyle({
        fontName: { family: 'Inter', style: 'Bold' }
      }), 'font-bold');
    });
  });

  describe('Effects', () => {
    it('should convert shadows', () => {
      expectClassesEqual(figmaToStyle({
        effects: [{
          type: 'DROP_SHADOW',
          radius: 6,
          spread: -2
        }]
      }), 'shadow-md');
    });

    it('should convert opacity', () => {
      expectClassesEqual(figmaToStyle({ opacity: 0.5 }), 'opacity-[0.5]');
    });
  });

  describe('Geometry', () => {
    it('should convert border radius', () => {
      expectClassesEqual(figmaToStyle({ cornerRadius: 8 }), 'rounded-lg');
      expectClassesEqual(figmaToStyle({ cornerRadius: 9999 }), 'rounded-full');
      expectClassesEqual(figmaToStyle({ cornerRadius: 10 }), 'rounded-[10]');
    });
  });

  describe('Combined Properties', () => {
    it('should convert multiple properties', () => {
      const styles = {
        layoutMode: 'VERTICAL',
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'HUG',
        width: 280,
        itemSpacing: 16,
        paddingTop: 24,
        paddingRight: 24,
        paddingBottom: 24,
        paddingLeft: 24,
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 }
        }],
        effects: [{
          type: 'DROP_SHADOW',
          radius: 6,
          spread: -2
        }],
        cornerRadius: 8
      };

      expectClassesEqual(figmaToStyle(styles),
        'flex-col w-[280] h-auto gap-[16] p-[24] bg-[#ffffff] shadow-md rounded-lg'
      );
    });
  });

  describe('Real World Cases', () => {
    it('should convert card component styles', () => {
      const styles = {
        layoutMode: 'VERTICAL',
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'HUG',
        width: 320,
        itemSpacing: 16,
        paddingTop: 24,
        paddingRight: 24,
        paddingBottom: 24,
        paddingLeft: 24,
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 }
        }],
        effects: [{
          type: 'DROP_SHADOW',
          radius: 6,
          spread: -2
        }],
        cornerRadius: 8
      };

      expectClassesEqual(figmaToStyle(styles),
        'flex-col w-[320] h-auto gap-[16] p-[24] bg-[#ffffff] shadow-md rounded-lg'
      );
    });

    it('should convert button component styles', () => {
      const styles = {
        layoutMode: 'HORIZONTAL',
        layoutSizingHorizontal: 'HUG',
        layoutSizingVertical: 'HUG',
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        paddingTop: 12,
        paddingRight: 20,
        paddingBottom: 12,
        paddingLeft: 20,
        fills: [{
          type: 'SOLID',
          color: { r: 0.24, g: 0.47, b: 0.95 }
        }],
        cornerRadius: 6,
        itemSpacing: 8
      };

      expectClassesEqual(figmaToStyle(styles),
        'flex-row w-auto h-auto justify-center items-center gap-[8] pt-[12] pr-[20] pb-[12] pl-[20] bg-[#3d78f2] rounded-md'
      );
    });

    it('should convert text styles with gradient background', () => {
      const styles = {
        fontSize: 24,
        fontName: {
          family: 'Inter',
          style: 'Bold'
        },
        fills: [{
          type: 'GRADIENT_LINEAR',
          gradientStops: [
            { position: 0, color: { r: 0.24, g: 0.47, b: 0.95 } },
            { position: 1, color: { r: 0.4, g: 0.2, b: 0.8 } }
          ]
        }]
      };

      expectClassesEqual(figmaToStyle(styles),
        'text-2xl font-bold bg-linear-to-r from-[#3d78f2] to-[#6633cc]'
      );
    });

    it('should convert text styles with radial gradient background', () => {
      const styles = {
        fontSize: 24,
        fontName: {
          family: 'Inter',
          style: 'Bold'
        },
        fills: [{
          type: 'GRADIENT_RADIAL',
          gradientStops: [
            { position: 0, color: { r: 0.24, g: 0.47, b: 0.95 } },
            { position: 1, color: { r: 0.4, g: 0.2, b: 0.8 } }
          ],
          centerX: 0.5,
          centerY: 0.5,
          radius: 0.5
        }]
      };

      expectClassesEqual(figmaToStyle(styles),
        'text-2xl font-bold bg-radial from-[#3d78f2] to-[#6633cc]'
      );
    });


    it('should convert navigation bar styles', () => {
      const styles = {
        layoutMode: 'HORIZONTAL',
        layoutSizingHorizontal: 'FILL',
        layoutSizingVertical: 'HUG',
        primaryAxisAlignItems: 'SPACE_BETWEEN',
        counterAxisAlignItems: 'CENTER',
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 }
        }],
        effects: [{
          type: 'DROP_SHADOW',
          radius: 2,
          spread: 0
        }]
      };

      expectClassesEqual(figmaToStyle(styles),
        'flex-row w-full h-auto justify-between items-center p-[16] bg-[#ffffff] shadow-sm'
      );
    });

    it('should convert avatar component styles', () => {
      const styles = {
        layoutMode: 'HORIZONTAL',
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'FIXED',
        width: 40,
        height: 40,
        cornerRadius: 9999,
        fills: [{
          type: 'SOLID',
          color: { r: 0.95, g: 0.97, b: 1 }
        }],
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER'
      };

      expectClassesEqual(figmaToStyle(styles),
        'flex-row w-[40] h-[40] justify-center items-center bg-[#f2f7ff] rounded-full'
      );
    });

    it('should convert input field styles', () => {
      const styles = {
        layoutMode: 'HORIZONTAL',
        layoutSizingHorizontal: 'FILL',
        layoutSizingVertical: 'HUG',
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 12,
        paddingLeft: 16,
        cornerRadius: 6,
        fills: [{
          type: 'SOLID',
          color: { r: 0.96, g: 0.97, b: 0.98 }
        }],
        strokes: [{
          type: 'SOLID',
          color: { r: 0.87, g: 0.89, b: 0.91 }
        }]
      };

      expectClassesEqual(figmaToStyle(styles),
        'flex-row w-full h-auto pt-[12] pr-[16] pb-[12] pl-[16] bg-[#f5f7fa] border-[#dee3e8] rounded-md'
      );
    });

    it('should convert complex layout with nested styles', () => {
      const styles = {
        layoutMode: 'VERTICAL',
        layoutSizingHorizontal: 'FILL',
        layoutSizingVertical: 'HUG',
        itemSpacing: 24,
        paddingTop: 32,
        paddingRight: 32,
        paddingBottom: 32,
        paddingLeft: 32,
        fills: [{
          type: 'GRADIENT_LINEAR',
          gradientStops: [
            { position: 0, color: { r: 0.95, g: 0.97, b: 1 } },
            { position: 1, color: { r: 1, g: 1, b: 1 } }
          ]
        }],
        effects: [{
          type: 'DROP_SHADOW',
          radius: 10,
          spread: -3
        }],
        cornerRadius: 16
      };

      expectClassesEqual(figmaToStyle(styles),
        'flex-col w-full h-auto gap-[24] p-[32] bg-linear-to-r from-[#f2f7ff] to-[#ffffff] shadow-lg rounded-2xl'
      );
    });
  });
}); 