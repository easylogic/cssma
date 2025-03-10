import { describe, it, expect } from 'vitest';
import { figmaToCss } from '../src/core/figmaToCss';

export function normalizeClasses(classString: string): string[] {
  return classString.split(' ').sort();
}

export function expectClassesEqual(received: string, expected: string) {
  const normalizedReceived = normalizeClasses(received);
  const normalizedExpected = normalizeClasses(expected);
  
  expect(normalizedReceived).toEqual(normalizedExpected);
}

describe('figmaToCss', () => {
  describe('Layout', () => {
    it('should convert layout mode', () => {
      expectClassesEqual(figmaToCss({ layoutMode: 'HORIZONTAL' }), 'flex-row');
      expectClassesEqual(figmaToCss({ layoutMode: 'VERTICAL' }), 'flex-col');
    });

    it('should convert sizing', () => {
      expectClassesEqual(figmaToCss({ 
        layoutSizingHorizontal: 'FILL',
        layoutSizingVertical: 'HUG'
      }), 'w-full h-auto');

      expectClassesEqual(figmaToCss({ 
        width: 100,
        height: 200
      }), 'w-[100] h-[200]');
    });

    it('should convert alignment', () => {
      expectClassesEqual(figmaToCss({
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER'
      }), 'justify-center items-center');
    });

    it('should convert spacing', () => {
      expectClassesEqual(figmaToCss({
        itemSpacing: 16,
        paddingTop: 24,
        paddingRight: 24,
        paddingBottom: 24,
        paddingLeft: 24
      }), 'gap-[16] p-[24]');

      expectClassesEqual(figmaToCss({
        paddingTop: 8,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16
      }), 'pt-[8] pr-[16] pb-[8] pl-[16]');
    });
  });

  describe('Colors', () => {
    it('should convert solid colors', () => {
      expectClassesEqual(figmaToCss({
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 0, b: 0 }
        }]
      }), 'bg-[#ff0000]');

      expectClassesEqual(figmaToCss({
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 0, b: 0 },
          opacity: 0.5
        }]
      }), 'bg-[#ff0000]/50');
    });

    it('should convert gradients', () => {
      expectClassesEqual(figmaToCss({
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
      expectClassesEqual(figmaToCss({ fontSize: 20 }), 'text-xl');
      expectClassesEqual(figmaToCss({ fontSize: 15 }), 'text-[15]');
    });

    it('should convert font weight', () => {
      expectClassesEqual(figmaToCss({
        fontName: { family: 'Inter', style: 'Bold' }
      }), 'font-bold');
    });

    it('should convert font style', () => {
      expectClassesEqual(
        figmaToCss({
          fontName: { family: 'Inter', style: 'Italic' }
        }),
        'italic'
      );

      expectClassesEqual(
        figmaToCss({
          fontName: { family: 'Inter', style: 'Regular' }
        }),
        ''
      );
    });
  });

  describe('Effects', () => {
    it('should convert shadows', () => {
      expectClassesEqual(figmaToCss({
        effects: [{
          type: 'DROP_SHADOW',
          radius: 6,
          spread: -2
        }]
      }), 'shadow-md');
    });

    it('should convert opacity', () => {
      expectClassesEqual(figmaToCss({ opacity: 0.5 }), 'opacity-50');
    });
  });

  describe('Geometry', () => {
    it('should convert border radius', () => {
      expectClassesEqual(figmaToCss({ cornerRadius: 8 }), 'rounded-lg');
      expectClassesEqual(figmaToCss({ cornerRadius: 9999 }), 'rounded-full');
      expectClassesEqual(figmaToCss({ cornerRadius: 10 }), 'rounded-[10]');
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

      expectClassesEqual(figmaToCss(styles),
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

      expectClassesEqual(figmaToCss(styles),
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

      expectClassesEqual(figmaToCss(styles),
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

      expectClassesEqual(figmaToCss(styles),
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

      expectClassesEqual(figmaToCss(styles),
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

      expectClassesEqual(figmaToCss(styles),
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

      expectClassesEqual(figmaToCss(styles),
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

      expectClassesEqual(figmaToCss(styles),
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

      expectClassesEqual(figmaToCss(styles),
        'flex-col w-full h-auto gap-[24] p-[32] bg-linear-to-r from-[#f2f7ff] to-[#ffffff] shadow-lg rounded-2xl'
      );
    });
  });

  describe('Border', () => {
    it('should convert border weight', () => {
      expectClassesEqual(
        figmaToCss({ strokeWeight: 2 }),
        'border-[2]'
      );

      expectClassesEqual(
        figmaToCss({ strokeWeight: 0 }),
        'border-0'
      );
    });

    it('should convert individual border weights', () => {
      expectClassesEqual(
        figmaToCss({
          strokeTopWeight: 1,
          strokeRightWeight: 2,
          strokeBottomWeight: 3,
          strokeLeftWeight: 4
        }),
        'border-t-[1] border-r-[2] border-b-[3] border-l-[4]'
      );

      expectClassesEqual(
        figmaToCss({
          strokeWeight: 1,
          strokeTopWeight: 1,
          strokeRightWeight: 1,
          strokeBottomWeight: 1,
          strokeLeftWeight: 1
        }),
        ''
      );
    });

    it('should convert border alignment', () => {
      expectClassesEqual(
        figmaToCss({ strokeAlign: 'INSIDE' }),
        'border-inset'
      );

      expectClassesEqual(
        figmaToCss({ strokeAlign: 'OUTSIDE' }),
        'border-outset'
      );
    });
  });

  describe('Shadow', () => {
    it('should convert predefined shadows', () => {
      expectClassesEqual(
        figmaToCss({
          effects: [{
            type: 'DROP_SHADOW',
            radius: 2,
            spread: 0
          }]
        }),
        'shadow-sm'
      );

      expectClassesEqual(
        figmaToCss({
          effects: [{
            type: 'DROP_SHADOW',
            radius: 10,
            spread: -3
          }]
        }),
        'shadow-lg'
      );
    });

    it('should convert custom shadows', () => {
      expectClassesEqual(
        figmaToCss({
          effects: [{
            type: 'DROP_SHADOW',
            radius: 15,
            spread: -4,
            offset: { x: 0, y: 5 },
            color: { r: 0, g: 0, b: 0, a: 0.5 }
          }]
        }),
        'shadow-[0_5px_15px_-4px_#00000050]'
      );
    });
  });

  describe('Position', () => {
    it('should convert layout positioning', () => {
      expectClassesEqual(
        figmaToCss({ layoutPositioning: 'ABSOLUTE' }),
        'absolute'
      );

      expectClassesEqual(
        figmaToCss({ layoutPositioning: 'AUTO' }),
        ''
      );
    });

    it('should convert x and y coordinates with constraints', () => {
      expectClassesEqual(
        figmaToCss({
          layoutPositioning: 'ABSOLUTE',
          x: 100,
          y: 200,
          constraints: { horizontal: 'MIN', vertical: 'MIN' }
        }),
        'absolute left-[100px] top-[200px]'
      );

      expectClassesEqual(
        figmaToCss({
          layoutPositioning: 'ABSOLUTE',
          x: 100,
          y: 200,
          constraints: { horizontal: 'MAX', vertical: 'MAX' }
        }),
        'absolute right-[100px] bottom-[200px]'
      );
    });

    it('should convert center constraints', () => {
      expectClassesEqual(
        figmaToCss({
          layoutPositioning: 'ABSOLUTE',
          x: 0,
          y: 0,
          constraints: { horizontal: 'CENTER', vertical: 'CENTER' }
        }),
        'absolute left-[0px] top-[0px] center-x center-y'
      );

      // With offset
      expectClassesEqual(
        figmaToCss({
          layoutPositioning: 'ABSOLUTE',
          x: 20,
          y: 10,
          constraints: { horizontal: 'CENTER', vertical: 'CENTER' }
        }),
        'absolute left-[20px] top-[10px] center-x center-y'
      );
    });

    it('should convert stretch constraints', () => {
      expectClassesEqual(
        figmaToCss({
          layoutPositioning: 'ABSOLUTE',
          constraints: { horizontal: 'STRETCH', vertical: 'STRETCH' }
        }),
        'absolute left-[0px] right-[0px] top-[0px] bottom-[0px] stretch-x stretch-y'
      );

      // With offset
      expectClassesEqual(
        figmaToCss({
          layoutPositioning: 'ABSOLUTE',
          x: 20,
          y: 20,
          constraints: { horizontal: 'STRETCH', vertical: 'STRETCH' }
        }),
        'absolute left-[20px] right-[20px] top-[20px] bottom-[20px] stretch-x stretch-y'
      );
    });

    it('should convert mixed constraints', () => {
      expectClassesEqual(
        figmaToCss({
          layoutPositioning: 'ABSOLUTE',
          x: 100,
          y: 0,
          constraints: { horizontal: 'MIN', vertical: 'CENTER' }
        }),
        'absolute center-y left-[100px] top-[0px]'
      );

      expectClassesEqual(
        figmaToCss({
          layoutPositioning: 'ABSOLUTE',
          x: 0,
          y: 200,
          constraints: { horizontal: 'STRETCH', vertical: 'MAX' }
        }),
        'absolute left-[0px] right-[0px] bottom-[200px] stretch-x'
      );
    });

    it('should handle z-index (order)', () => {
      expectClassesEqual(
        figmaToCss({
          layoutPositioning: 'ABSOLUTE',
          x: 100,
          y: 100,
          order: 10,
          constraints: { horizontal: 'MIN', vertical: 'MIN' }
        }),
        'absolute left-[100px] top-[100px] z-[10]'
      );
    });

    it('should handle auto layout positioning', () => {
      // Auto layout (default) should not generate position classes
      expectClassesEqual(
        figmaToCss({
          layoutMode: 'HORIZONTAL',
          x: 100,
          y: 100
        }),
        'flex-row left-[100px] top-[100px]'
      );

      // Only absolute positioning should generate position classes
      expectClassesEqual(
        figmaToCss({
          layoutMode: 'HORIZONTAL',
          layoutPositioning: 'ABSOLUTE',
          x: 100,
          y: 100,
          constraints: { horizontal: 'MIN', vertical: 'MIN' }
        }),
        'flex-row absolute left-[100px] top-[100px]'
      );
    });
  });

  describe('Size Constraints', () => {
    it('should convert min/max constraints', () => {
      expectClassesEqual(
        figmaToCss({
          minWidth: 100,
          maxWidth: 500,
          minHeight: 50,
          maxHeight: 300
        }),
        'min-w-[100] max-w-[500] min-h-[50] max-h-[300]'
      );

      expectClassesEqual(
        figmaToCss({
          minWidth: null,
          maxWidth: null,
          minHeight: null,
          maxHeight: null
        }),
        ''
      );
    });
  });

  describe('Flex', () => {
    it('should convert flex properties', () => {
      expectClassesEqual(
        figmaToCss({
          layoutMode: 'HORIZONTAL',
          layoutGrow: 1,
          layoutShrink: 1,
          layoutWrap: 'WRAP'
        }),
        'flex-row flex-grow flex-shrink wrap'
      );
    });
  });

  describe('Complex Real-World Cases', () => {
    it('should convert modal styles', () => {
      const styles = {
        position: 'FIXED',
        layoutMode: 'VERTICAL',
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'HUG',
        width: 480,
        x: 0,
        y: 0,
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
          radius: 20,
          spread: -5,
          color: { r: 0, g: 0, b: 0, a: 0.2 }
        }],
        cornerRadius: 16,
        itemSpacing: 20
      };

      expectClassesEqual(
        figmaToCss(styles),
        'flex-col w-[480] h-auto left-[0px] top-[0px] p-[24] bg-[#ffffff] shadow-xl rounded-2xl gap-[20]'
      );
    });

    it('should convert form field styles', () => {
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
          color: { r: 0.98, g: 0.98, b: 0.98 }
        }],
        strokeWeight: 1,
        strokes: [{
          type: 'SOLID',
          color: { r: 0.9, g: 0.9, b: 0.9 }
        }],
        effects: [{
          type: 'DROP_SHADOW',
          radius: 2,
          spread: 0,
          color: { r: 0, g: 0, b: 0, a: 0.05 }
        }]
      };

      expectClassesEqual(
        figmaToCss(styles),
        'flex-row w-full h-auto pt-[12] pr-[16] pb-[12] pl-[16] rounded-md bg-[#fafafa] border-[#e6e6e6] shadow-sm'
      );
    });
  });

  describe('Typography Extended', () => {
    it('should convert text alignment', () => {
      expectClassesEqual(
        figmaToCss({ textAlignHorizontal: 'LEFT' }),
        'text-left'
      );
      expectClassesEqual(
        figmaToCss({ textAlignHorizontal: 'CENTER' }),
        'text-center'
      );
      expectClassesEqual(
        figmaToCss({ textAlignHorizontal: 'RIGHT' }),
        'text-right'
      );
      expectClassesEqual(
        figmaToCss({ textAlignHorizontal: 'JUSTIFIED' }),
        'text-justify'
      );
    });

    it('should convert text transform', () => {
      expectClassesEqual(
        figmaToCss({ textCase: 'UPPER' }),
        'uppercase'
      );
      expectClassesEqual(
        figmaToCss({ textCase: 'LOWER' }),
        'lowercase'
      );
      expectClassesEqual(
        figmaToCss({ textCase: 'TITLE' }),
        'capitalize'
      );
      expectClassesEqual(
        figmaToCss({ textCase: 'ORIGINAL' }),
        ''
      );
    });

    it('should convert text vertical alignment', () => {
      expectClassesEqual(
        figmaToCss({ textAlignVertical: 'TOP' }),
        'align-top'
      );
      expectClassesEqual(
        figmaToCss({ textAlignVertical: 'CENTER' }),
        'align-middle'
      );
      expectClassesEqual(
        figmaToCss({ textAlignVertical: 'BOTTOM' }),
        'align-bottom'
      );
    });

    it('should convert text auto-size', () => {
      expectClassesEqual(
        figmaToCss({ textAutoSize: 'NONE' }),
        'text-auto-none'
      );
      expectClassesEqual(
        figmaToCss({ textAutoSize: 'WIDTH_AND_HEIGHT' }),
        'text-auto-wh'
      );
      expectClassesEqual(
        figmaToCss({ textAutoSize: 'TRUNCATE' }),
        'text-truncate'
      );
      expectClassesEqual(
        figmaToCss({ textAutoSize: 'HEIGHT' }),
        'text-auto-h'
      );
    });

    it('should convert text wrap', () => {
      expectClassesEqual(
        figmaToCss({ textWrap: 'BALANCE' }),
        'text-wrap-balance'
      );
      expectClassesEqual(
        figmaToCss({ textWrap: 'WRAP' }),
        'text-wrap'
      );
      expectClassesEqual(
        figmaToCss({ textWrap: 'TRUNCATE' }),
        'text-wrap-truncate'
      );
    });

    it('should convert text decoration', () => {
      expectClassesEqual(
        figmaToCss({ textDecoration: 'UNDERLINE' }),
        'underline'
      );
      expectClassesEqual(
        figmaToCss({ textDecoration: 'STRIKETHROUGH' }),
        'line-through'
      );
      expectClassesEqual(
        figmaToCss({ textDecoration: 'NONE' }),
        ''
      );
    });

    it('should convert line height', () => {
      expectClassesEqual(
        figmaToCss({ 
          lineHeight: { value: 100, unit: 'PERCENT' }
        }),
        'leading-none'
      );
      expectClassesEqual(
        figmaToCss({ 
          lineHeight: { value: 125, unit: 'PERCENT' }
        }),
        'leading-tight'
      );
      expectClassesEqual(
        figmaToCss({ 
          lineHeight: { value: 150, unit: 'PERCENT' }
        }),
        'leading-normal'
      );
      expectClassesEqual(
        figmaToCss({ 
          lineHeight: { value: 24, unit: 'PIXELS' }
        }),
        'leading-[24px]'
      );
    });

    it('should convert letter spacing', () => {
      expectClassesEqual(
        figmaToCss({ letterSpacing: -0.4 }),
        'tracking-tight'
      );

      expectClassesEqual(
        figmaToCss({ letterSpacing: 0 }),
        'tracking-normal'
      );

      expectClassesEqual(
        figmaToCss({ letterSpacing: 0.4 }),
        'tracking-wide'
      );

      expectClassesEqual(
        figmaToCss({ letterSpacing: 0.8 }),
        'tracking-[0.8]'
      );
    });
  });

  describe('Border Extended', () => {
    it('should convert border style', () => {
      expectClassesEqual(
        figmaToCss({ borderStyle: 'SOLID' }),
        'border-solid'
      );

      expectClassesEqual(
        figmaToCss({ borderStyle: 'DASHED' }),
        'border-dashed'
      );

      expectClassesEqual(
        figmaToCss({ borderStyle: '' }),
        ''
      );      

      expectClassesEqual(
        figmaToCss({ borderStyle: 'DOTTED' }),
        'border-dotted'
      );
    });

    it('should convert border dash pattern', () => {
      expectClassesEqual(
        figmaToCss({ dashPattern: [4, 2] }),
        'border-dashed-[4,2]'
      );

      expectClassesEqual(
        figmaToCss({ dashPattern: [5, 3, 2] }),
        'border-dashed-[5,3,2]'
      );

      expectClassesEqual(
        figmaToCss({ dashPattern: [] }),
        ''
      );
    });

    it('should convert border with opacity', () => {
      expectClassesEqual(
        figmaToCss({
          strokes: [{
            type: 'SOLID',
            color: { r: 1, g: 0, b: 0 },
            opacity: 0.5
          }]
        }),
        'border-[#ff0000]/50'
      );
    });
  });

  describe('Gradient Fills', () => {
    it('should convert linear gradient', () => {
      expectClassesEqual(
        figmaToCss({
          fills: [{
            type: 'GRADIENT_LINEAR',
            gradientStops: [
              { position: 0, color: { r: 1, g: 0, b: 0 } },
              { position: 1, color: { r: 0, g: 0, b: 1 } }
            ],
            gradientTransform: [[1, 0, 0], [0, 1, 0]]
          }]
        }),
        'bg-linear-to-r from-[#ff0000] to-[#0000ff]'
      );
    });

    it('should convert multi-stop gradient', () => {
      expectClassesEqual(
        figmaToCss({
          fills: [{
            type: 'GRADIENT_LINEAR',
            gradientStops: [
              { position: 0, color: { r: 1, g: 0, b: 0 } },
              { position: 0.5, color: { r: 0, g: 1, b: 0 } },
              { position: 1, color: { r: 0, g: 0, b: 1 } }
            ],
            gradientTransform: [[1, 0, 0], [0, 1, 0]]
          }]
        }),
        'bg-linear-to-r from-[#ff0000] via-[#00ff00] to-[#0000ff]'
      );
    });

    it('should convert radial gradient', () => {
      expectClassesEqual(
        figmaToCss({
          fills: [{
            type: 'GRADIENT_RADIAL',
            gradientStops: [
              { position: 0, color: { r: 1, g: 0, b: 0 } },
              { position: 1, color: { r: 0, g: 0, b: 1 } }
            ]
          }]
        }),
        'bg-radial from-[#ff0000] to-[#0000ff]'
      );
    });

    it('should convert angular gradient', () => {
      expectClassesEqual(
        figmaToCss({
          fills: [{
            type: 'GRADIENT_ANGULAR',
            gradientStops: [
              { position: 0, color: { r: 1, g: 0, b: 0 } },
              { position: 1, color: { r: 0, g: 0, b: 1 } }
            ]
          }]
        }),
        'bg-conic from-[#ff0000] to-[#0000ff]'
      );
    });
  });
}); 