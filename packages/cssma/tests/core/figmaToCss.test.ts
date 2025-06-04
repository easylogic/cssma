import { describe, test, expect } from 'vitest';
import { figmaToCss } from '../../src/core/figmaToCss';

describe('Figma to Css Converter', () => {
  describe('Position and Constraints', () => {
    test('should convert position type', () => {
      expect(figmaToCss({ layoutPositioning: 'ABSOLUTE' })).toBe('absolute');
      expect(figmaToCss({ layoutPositioning: 'AUTO' })).toBe('');
    });

    test('should convert special constraint combinations', () => {
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

    test('should convert horizontal constraints with coordinates', () => {
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

    test('should convert vertical constraints with coordinates', () => {
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

    test('should convert scale constraints with coordinates', () => {
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

    test('should convert individual constraints without coordinates', () => {
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

    test('should convert stretch constraints', () => {
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

    test('should handle coordinates without constraints', () => {
      expect(figmaToCss({ 
        parent: { layoutMode: 'NONE' }, x: 10, y: 20 
      })).toBe('left-[10px] top-[20px]');

      expect(figmaToCss({ 
        parent: { layoutMode: 'NONE' }, x: 0, y: 0 
      })).toBe('');
    });

    test('should combine position type with constraints', () => {
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

describe('figmaToCss - Multiple Backgrounds and Blend Modes', () => {
  
  describe('Single Background', () => {
    test('should convert solid background', () => {
      const styles = {
        type: 'FRAME',
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 0, b: 0 },
          opacity: 1
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-[#ff0000]');
    });

    test('should convert solid background with opacity', () => {
      const styles = {
        type: 'FRAME',
        fills: [{
          type: 'SOLID',
          color: { r: 0, g: 1, b: 0 },
          opacity: 0.5
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-[#00ff00]/50');
    });

    test('should convert text color', () => {
      const styles = {
        type: 'TEXT',
        fills: [{
          type: 'SOLID',
          color: { r: 0, g: 0, b: 1 },
          opacity: 1
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('text-[#0000ff]');
    });
  });

  describe('Multiple Backgrounds', () => {
    test('should convert multiple solid backgrounds', () => {
      const styles = {
        type: 'FRAME',
        fills: [
          {
            type: 'SOLID',
            color: { r: 1, g: 0, b: 0 },
            opacity: 1
          },
          {
            type: 'SOLID',
            color: { r: 0, g: 1, b: 0 },
            opacity: 0.7
          }
        ]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-[#ff0000]');
      expect(result).toContain('bg-[#00ff00]/70');
    });

    test('should convert mixed background types', () => {
      const styles = {
        type: 'FRAME',
        fills: [
          {
            type: 'SOLID',
            color: { r: 1, g: 0, b: 0 },
            opacity: 1
          },
          {
            type: 'GRADIENT_LINEAR',
            gradientTransform: [[1, 0, 0], [0, 1, 0]],
            gradientStops: [
              { position: 0, color: { r: 0, g: 0, b: 1 } },
              { position: 1, color: { r: 1, g: 1, b: 1 } }
            ]
          }
        ]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-[#ff0000]');
      expect(result).toContain('bg-linear-to-r');
      expect(result).toContain('from-[#0000ff]');
      expect(result).toContain('to-[#ffffff]');
    });
  });

  describe('Background Blend Modes', () => {
    test('should convert solid background with blend mode', () => {
      const styles = {
        type: 'FRAME',
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 0, b: 0 },
          opacity: 1,
          blendMode: 'MULTIPLY'
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-[#ff0000]');
      expect(result).toContain('bg-blend-multiply');
    });

    test('should convert multiple backgrounds with different blend modes', () => {
      const styles = {
        type: 'FRAME',
        fills: [
          {
            type: 'SOLID',
            color: { r: 1, g: 0, b: 0 },
            opacity: 1,
            blendMode: 'MULTIPLY'
          },
          {
            type: 'SOLID',
            color: { r: 0, g: 1, b: 0 },
            opacity: 1,
            blendMode: 'SCREEN'
          }
        ]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-[#ff0000]');
      expect(result).toContain('bg-blend-multiply');
      expect(result).toContain('bg-[#00ff00]');
      expect(result).toContain('bg-blend-screen');
    });

    test('should not add blend mode for text fills', () => {
      const styles = {
        type: 'TEXT',
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 0, b: 0 },
          opacity: 1,
          blendMode: 'MULTIPLY'
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('text-[#ff0000]');
      expect(result).not.toContain('bg-blend-multiply');
    });

    test('should handle NORMAL blend mode correctly', () => {
      const styles = {
        type: 'FRAME',
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 0, b: 0 },
          opacity: 1,
          blendMode: 'NORMAL'
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-[#ff0000]');
      expect(result).not.toContain('bg-blend-');
    });
  });

  describe('Gradient Backgrounds', () => {
    test('should convert linear gradient', () => {
      const styles = {
        type: 'FRAME',
        fills: [{
          type: 'GRADIENT_LINEAR',
          gradientTransform: [[1, 0, 0], [0, 1, 0]],
          gradientStops: [
            { position: 0, color: { r: 1, g: 0, b: 0 } },
            { position: 1, color: { r: 0, g: 0, b: 1 } }
          ]
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-linear-to-r');
      expect(result).toContain('from-[#ff0000]');
      expect(result).toContain('to-[#0000ff]');
    });

    test('should convert radial gradient', () => {
      const styles = {
        type: 'FRAME',
        fills: [{
          type: 'GRADIENT_RADIAL',
          gradientStops: [
            { position: 0, color: { r: 1, g: 1, b: 1 } },
            { position: 1, color: { r: 0, g: 0, b: 0 } }
          ]
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-radial');
      expect(result).toContain('from-[#ffffff]');
      expect(result).toContain('to-[#000000]');
    });

    test('should convert conic gradient', () => {
      const styles = {
        type: 'FRAME',
        fills: [{
          type: 'GRADIENT_ANGULAR',
          rotation: 0,
          gradientStops: [
            { position: 0, color: { r: 1, g: 0, b: 0 } },
            { position: 1, color: { r: 0, g: 1, b: 0 } }
          ]
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-conic');
      expect(result).toContain('from-[#ff0000]');
      expect(result).toContain('to-[#00ff00]');
    });

    test('should convert conic gradient with rotation', () => {
      const styles = {
        type: 'FRAME',
        fills: [{
          type: 'GRADIENT_ANGULAR',
          rotation: 45,
          gradientStops: [
            { position: 0, color: { r: 1, g: 0, b: 0 } },
            { position: 1, color: { r: 0, g: 1, b: 0 } }
          ]
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-conic-[45deg]');
      expect(result).toContain('from-[#ff0000]');
      expect(result).toContain('to-[#00ff00]');
    });

    test('should convert gradient with blend mode', () => {
      const styles = {
        type: 'FRAME',
        fills: [{
          type: 'GRADIENT_LINEAR',
          gradientTransform: [[1, 0, 0], [0, 1, 0]],
          gradientStops: [
            { position: 0, color: { r: 1, g: 0, b: 0 } },
            { position: 1, color: { r: 0, g: 0, b: 1 } }
          ],
          blendMode: 'OVERLAY'
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-linear-to-r');
      expect(result).toContain('from-[#ff0000]');
      expect(result).toContain('to-[#0000ff]');
      expect(result).toContain('bg-blend-overlay');
    });
  });

  describe('Gradient Stops', () => {
    test('should convert gradient with via stops', () => {
      const styles = {
        type: 'FRAME',
        fills: [{
          type: 'GRADIENT_LINEAR',
          gradientTransform: [[1, 0, 0], [0, 1, 0]],
          gradientStops: [
            { position: 0, color: { r: 1, g: 0, b: 0 } },
            { position: 0.5, color: { r: 0, g: 1, b: 0 } },
            { position: 1, color: { r: 0, g: 0, b: 1 } }
          ]
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-linear-to-r');
      expect(result).toContain('from-[#ff0000]');
      expect(result).toContain('via-[#00ff00]');
      expect(result).toContain('to-[#0000ff]');
    });

    test('should convert gradient with multiple via stops', () => {
      const styles = {
        type: 'FRAME',
        fills: [{
          type: 'GRADIENT_LINEAR',
          gradientTransform: [[1, 0, 0], [0, 1, 0]],
          gradientStops: [
            { position: 0, color: { r: 1, g: 0, b: 0 } },
            { position: 0.25, color: { r: 1, g: 1, b: 0 } },
            { position: 0.75, color: { r: 0, g: 1, b: 1 } },
            { position: 1, color: { r: 0, g: 0, b: 1 } }
          ]
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-linear-to-r');
      expect(result).toContain('from-[#ff0000]');
      expect(result).toContain('via-[#ffff00]');
      expect(result).toContain('via-[#00ffff]');
      expect(result).toContain('to-[#0000ff]');
    });
  });

  describe('Blend Mode Mapping', () => {
    const blendModeTests = [
      { figma: 'MULTIPLY', css: 'multiply' },
      { figma: 'SCREEN', css: 'screen' },
      { figma: 'OVERLAY', css: 'overlay' },
      { figma: 'DARKEN', css: 'darken' },
      { figma: 'LIGHTEN', css: 'lighten' },
      { figma: 'COLOR_DODGE', css: 'color-dodge' },
      { figma: 'COLOR_BURN', css: 'color-burn' },
      { figma: 'HARD_LIGHT', css: 'hard-light' },
      { figma: 'SOFT_LIGHT', css: 'soft-light' },
      { figma: 'DIFFERENCE', css: 'difference' },
      { figma: 'EXCLUSION', css: 'exclusion' },
      { figma: 'HUE', css: 'hue' },
      { figma: 'SATURATION', css: 'saturation' },
      { figma: 'COLOR', css: 'color' },
      { figma: 'LUMINOSITY', css: 'luminosity' }
    ];

    test.each(blendModeTests)('should convert $figma to $css', ({ figma, css }) => {
      const styles = {
        type: 'FRAME',
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 0, b: 0 },
          opacity: 1,
          blendMode: figma
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain(`bg-blend-${css}`);
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty fills array', () => {
      const styles = {
        type: 'FRAME',
        fills: []
      };
      
      const result = figmaToCss(styles);
      expect(result).not.toContain('bg-');
      expect(result).not.toContain('text-');
    });

    test('should handle missing fills property', () => {
      const styles = {
        type: 'FRAME'
      };
      
      const result = figmaToCss(styles);
      expect(result).not.toContain('bg-');
      expect(result).not.toContain('text-');
    });

    test('should handle unknown blend mode', () => {
      const styles = {
        type: 'FRAME',
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 0, b: 0 },
          opacity: 1,
          blendMode: 'UNKNOWN_MODE'
        }]
      };
      
      const result = figmaToCss(styles);
      expect(result).toContain('bg-[#ff0000]');
      expect(result).not.toContain('bg-blend-unknown');
    });
  });
}); 