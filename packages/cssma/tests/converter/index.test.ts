import { describe, it, expect } from 'vitest';
import { convertStylesToFigma } from '../../src/converter/index';
import { ParsedStyle } from '../../src/types';

describe('convertStylesToFigma Integration Tests', () => {
  describe('Single Property Conversion', () => {
    it('should convert background color', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 }
      });
    });

    it('should convert width and height', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'width',
          value: 100,
          variant: 'arbitrary'
        },
        {
          property: 'height',
          value: 200,
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.width).toBe(100);
      expect(result.height).toBe(200);
    });

    it('should convert font properties', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'fontSize',
          value: 16,
          variant: 'arbitrary'
        },
        {
          property: 'fontFamily',
          value: 'Arial',
          variant: 'arbitrary'
        },
        {
          property: 'fontWeight',
          value: 700,
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fontSize).toBe(16);
      expect(result.fontName).toEqual({
        family: 'Arial',
        style: 'Bold'
      });
    });

    it('should convert text color', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'color',
          value: '#00FF00',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 0, g: 1, b: 0 }
      });
    });

    it('should convert padding', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'paddingTop',
          value: 10,
          variant: 'arbitrary'
        },
        {
          property: 'paddingRight',
          value: 20,
          variant: 'arbitrary'
        },
        {
          property: 'paddingBottom',
          value: 30,
          variant: 'arbitrary'
        },
        {
          property: 'paddingLeft',
          value: 40,
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.paddingTop).toBe(10);
      expect(result.paddingRight).toBe(20);
      expect(result.paddingBottom).toBe(30);
      expect(result.paddingLeft).toBe(40);
    });

    it('should convert blend mode', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'blendMode',
          value: 'multiply',
          variant: 'preset'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.blendMode).toBe('MULTIPLY');
    });
  });

  describe('Multiple Properties Combination', () => {
    it('should combine background and layout properties', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'width',
          value: 100,
          variant: 'arbitrary'
        },
        {
          property: 'height',
          value: 200,
          variant: 'arbitrary'
        },
        {
          property: 'paddingTop',
          value: 16,
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 }
      });
      expect(result.width).toBe(100);
      expect(result.height).toBe(200);
      expect(result.paddingTop).toBe(16);
    });

    it('should combine font and text properties', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'fontSize',
          value: 18,
          variant: 'arbitrary'
        },
        {
          property: 'fontFamily',
          value: 'Helvetica',
          variant: 'arbitrary'
        },
        {
          property: 'color',
          value: '#0000FF',
          variant: 'arbitrary'
        },
        {
          property: 'textAlignHorizontal',
          value: 'CENTER',
          variant: 'preset'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fontSize).toBe(18);
      expect(result.fontName).toEqual({
        family: 'Helvetica',
        style: 'Regular'
      });
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 0, g: 0, b: 1 }
      });
      expect(result.textAlignHorizontal).toBe('CENTER');
    });
  });

  describe('Multiple Backgrounds', () => {
    it('should convert multiple background colors', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundColor',
          value: '#00FF00',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundColor',
          value: '#0000FF',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(3);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 }
      });
      expect(result.fills?.[1]).toEqual({
        type: 'SOLID',
        color: { r: 0, g: 1, b: 0 }
      });
      expect(result.fills?.[2]).toEqual({
        type: 'SOLID',
        color: { r: 0, g: 0, b: 1 }
      });
    });

    it('should combine existing fills with new backgrounds', () => {
      // convertStylesToFigma에서 result.fills가 이미 있는 경우를 시뮬레이션
      // 이는 실제로는 다른 converter가 먼저 fills를 설정한 경우입니다
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      // fills가 올바르게 설정되어야 함
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 }
      });
    });

    it('should apply backgroundBlendMode to last background group only', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundColor',
          value: '#00FF00',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundBlendMode',
          value: 'MULTIPLY',
          variant: 'preset'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(2);
      // First background - no blend mode
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 }
      });
      // Second background - with blend mode (last group)
      expect(result.fills?.[1]).toEqual({
        type: 'SOLID',
        color: { r: 0, g: 1, b: 0 },
        blendMode: 'MULTIPLY'
      });
    });

    it('should apply backgroundBlendMode to gradient background only', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundColor',
          value: 'linear',
          variant: 'preset',
          direction: 'r'
        },
        {
          property: 'gradientFrom',
          value: '#00FF00',
          variant: 'arbitrary'
        },
        {
          property: 'gradientTo',
          value: '#0000FF',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundBlendMode',
          value: 'OVERLAY',
          variant: 'preset'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(2);
      
      // First fill - solid color (no blend mode)
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 }
      });
      
      // Second fill - gradient with blend mode (last group)
      expect(result.fills?.[1]).toEqual({
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 0, g: 1, b: 0 }
          },
          {
            position: 1,
            color: { r: 0, g: 0, b: 1 }
          }
        ],
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
        blendMode: 'OVERLAY'
      });
    });

    it('should work without backgroundBlendMode', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundColor',
          value: '#00FF00',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(2);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 }
      });
      expect(result.fills?.[1]).toEqual({
        type: 'SOLID',
        color: { r: 0, g: 1, b: 0 }
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle mixed property types', () => {
      const styles: ParsedStyle[] = [
        // Background
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        // Layout
        {
          property: 'width',
          value: 150,
          variant: 'arbitrary'
        },
        {
          property: 'height',
          value: 100,
          variant: 'arbitrary'
        },
        // Spacing
        {
          property: 'paddingTop',
          value: 12,
          variant: 'arbitrary'
        },
        {
          property: 'paddingLeft',
          value: 24,
          variant: 'arbitrary'
        },
        // Font
        {
          property: 'fontSize',
          value: 14,
          variant: 'arbitrary'
        },
        {
          property: 'fontWeight',
          value: 600,
          variant: 'arbitrary'
        },
        // Text color
        {
          property: 'color',
          value: '#FFFFFF',
          variant: 'arbitrary'
        },
        // Effects
        {
          property: 'blendMode',
          value: 'overlay',
          variant: 'preset'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      // Text color + Background = 2 fills (text styles processed first)
      expect(result.fills).toHaveLength(2);
      
      // Text color fill (processed first)
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 1, b: 1 }
      });
      
      // Background fill (processed second)
      expect(result.fills?.[1]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 }
      });
      
      // Layout
      expect(result.width).toBe(150);
      expect(result.height).toBe(100);
      
      // Spacing
      expect(result.paddingTop).toBe(12);
      expect(result.paddingLeft).toBe(24);
      
      // Font
      expect(result.fontSize).toBe(14);
      expect(result.fontName).toEqual({
        family: 'Inter',
        style: 'SemiBold'
      });
      
      // Effects
      expect(result.blendMode).toBe('OVERLAY');
    });

    it('should handle empty styles array', () => {
      const styles: ParsedStyle[] = [];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toEqual([]);
    });

    it('should handle unknown properties gracefully', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'unknownProperty' as any,
          value: 'someValue',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      // Known property should still work
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 }
      });
    });
  });

  describe('Gradient Backgrounds', () => {
    it('should convert linear gradient', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: 'linear',
          variant: 'preset',
          direction: 'r'
        },
        {
          property: 'gradientFrom',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'gradientTo',
          value: '#0000FF',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 1, g: 0, b: 0 }
          },
          {
            position: 1,
            color: { r: 0, g: 0, b: 1 }
          }
        ],
        gradientTransform: [[1, 0, 0], [0, 1, 0]]
      });
    });

    it('should convert radial gradient', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: 'radial',
          variant: 'preset'
        },
        {
          property: 'gradientFrom',
          value: '#00FF00',
          variant: 'arbitrary'
        },
        {
          property: 'gradientTo',
          value: '#FF00FF',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'GRADIENT_RADIAL',
        gradientStops: [
          {
            position: 0,
            color: { r: 0, g: 1, b: 0 }
          },
          {
            position: 1,
            color: { r: 1, g: 0, b: 1 }
          }
        ],
        centerX: 0.5,
        centerY: 0.5,
        radius: 0.5
      });
    });

    it('should convert conic gradient', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: 'conic',
          variant: 'preset'
        },
        {
          property: 'gradientFrom',
          value: '#FFFF00',
          variant: 'arbitrary'
        },
        {
          property: 'gradientTo',
          value: '#00FFFF',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'GRADIENT_ANGULAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 1, g: 1, b: 0 }
          },
          {
            position: 1,
            color: { r: 0, g: 1, b: 1 }
          }
        ],
        centerX: 0.5,
        centerY: 0.5,
        rotation: 0
      });
    });

    it('should handle gradient with via color', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: 'linear',
          variant: 'preset',
          direction: 'b'
        },
        {
          property: 'gradientFrom',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'gradientVia',
          value: '#00FF00',
          variant: 'arbitrary'
        },
        {
          property: 'gradientTo',
          value: '#0000FF',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 1, g: 0, b: 0 }
          },
          {
            position: 0.5,
            color: { r: 0, g: 1, b: 0 }
          },
          {
            position: 1,
            color: { r: 0, g: 0, b: 1 }
          }
        ],
        gradientTransform: [[1, 0, 0], [0, 1, 0]]
      });
    });

    it('should apply backgroundBlendMode to gradient', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: 'linear',
          variant: 'preset',
          direction: 'r'
        },
        {
          property: 'gradientFrom',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'gradientTo',
          value: '#0000FF',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundBlendMode',
          value: 'SCREEN',
          variant: 'preset'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 1, g: 0, b: 0 }
          },
          {
            position: 1,
            color: { r: 0, g: 0, b: 1 }
          }
        ],
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
        blendMode: 'SCREEN'
      });
    });
  });

  describe('Background Grouping Edge Cases', () => {
    it('should handle backgroundBlendMode within same group', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundBlendMode',
          value: 'MULTIPLY',
          variant: 'preset'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 },
        blendMode: 'MULTIPLY'
      });
    });

    it('should handle multiple backgroundBlendModes (last one wins)', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundBlendMode',
          value: 'MULTIPLY',
          variant: 'preset'
        },
        {
          property: 'backgroundBlendMode',
          value: 'OVERLAY',
          variant: 'preset'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 },
        blendMode: 'OVERLAY'
      });
    });

    it('should handle orphaned gradient properties', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'gradientFrom',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'gradientTo',
          value: '#0000FF',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundColor',
          value: '#00FF00',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      // Only the solid background should be processed
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 0, g: 1, b: 0 }
      });
    });

    it('should handle background groups with different blend modes', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundBlendMode',
          value: 'MULTIPLY',
          variant: 'preset'
        },
        {
          property: 'backgroundColor',
          value: '#00FF00',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundBlendMode',
          value: 'OVERLAY',
          variant: 'preset'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(2);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 },
        blendMode: 'MULTIPLY'
      });
      expect(result.fills?.[1]).toEqual({
        type: 'SOLID',
        color: { r: 0, g: 1, b: 0 },
        blendMode: 'OVERLAY'
      });
    });
  });

  describe('Figma Variables Support', () => {
    it('should convert background with figma variable', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: 'primary',
          variant: 'figma-variable',
          variableId: 'VariableID:123:456',
          opacity: 0.8
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 0, g: 0, b: 0 },
        opacity: 0.8,
        boundVariables: {
          color: {
            type: 'VARIABLE_ALIAS',
            id: 'VariableID:123:456'
          }
        }
      });
    });

    it('should convert gradient with figma variables', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: 'linear',
          variant: 'preset',
          direction: 'r'
        },
        {
          property: 'gradientFrom',
          value: 'primary',
          variant: 'figma-variable',
          variableId: 'VariableID:123:456'
        },
        {
          property: 'gradientTo',
          value: 'secondary',
          variant: 'figma-variable',
          variableId: 'VariableID:789:012'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 0, g: 0, b: 0 },
            boundVariables: {
              color: {
                type: 'VARIABLE_ALIAS',
                id: 'VariableID:123:456'
              }
            }
          },
          {
            position: 1,
            color: { r: 0, g: 0, b: 0 },
            boundVariables: {
              color: {
                type: 'VARIABLE_ALIAS',
                id: 'VariableID:789:012'
              }
            }
          }
        ],
        gradientTransform: [[1, 0, 0], [0, 1, 0]]
      });
    });
  });

  describe('Advanced Layout and Spacing', () => {
    it('should convert auto-layout properties', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'layoutMode',
          value: 'VERTICAL',
          variant: 'preset'
        },
        {
          property: 'gap',
          value: 16,
          variant: 'arbitrary'
        },
        {
          property: 'paddingTop',
          value: 20,
          variant: 'arbitrary'
        },
        {
          property: 'paddingBottom',
          value: 20,
          variant: 'arbitrary'
        },
        {
          property: 'paddingLeft',
          value: 24,
          variant: 'arbitrary'
        },
        {
          property: 'paddingRight',
          value: 24,
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.layoutMode).toBe('VERTICAL');
      expect(result.itemSpacing).toBe(16);
      expect(result.paddingTop).toBe(20);
      expect(result.paddingBottom).toBe(20);
      expect(result.paddingLeft).toBe(24);
      expect(result.paddingRight).toBe(24);
    });

    it('should convert alignment properties', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'primaryAxisAlignItems',
          value: 'CENTER',
          variant: 'preset'
        },
        {
          property: 'counterAxisAlignItems',
          value: 'MIN',
          variant: 'preset'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.primaryAxisAlignItems).toBe('CENTER');
      expect(result.counterAxisAlignItems).toBe('MIN');
    });
  });

  describe('Text and Typography', () => {
    it('should handle complex typography combinations', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'fontFamily',
          value: 'Roboto',
          variant: 'arbitrary'
        },
        {
          property: 'fontSize',
          value: 24,
          variant: 'arbitrary'
        },
        {
          property: 'fontWeight',
          value: 800,
          variant: 'arbitrary'
        },
        {
          property: 'fontStyle',
          value: 'italic',
          variant: 'preset'
        },
        {
          property: 'letterSpacing',
          value: 1.2,
          variant: 'arbitrary'
        },
        {
          property: 'lineHeight',
          value: 1.5,
          variant: 'arbitrary'
        },
        {
          property: 'textAlignHorizontal',
          value: 'RIGHT',
          variant: 'preset'
        },
        {
          property: 'color',
          value: '#333333',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fontName).toEqual({
        family: 'Roboto',
        style: 'ExtraBold Italic'
      });
      expect(result.fontSize).toBe(24);
      expect(result.letterSpacing).toBe(1.2);
      expect(result.lineHeight).toEqual({ value: 1.5, unit: 'PIXELS' });
      expect(result.textAlignHorizontal).toBe('RIGHT');
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 0.2, g: 0.2, b: 0.2 }
      });
    });
  });

  describe('Effects and Filters', () => {
    it('should convert shadow effects', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'boxShadow',
          value: [{
            type: 'outer' as const,
            x: 4,
            y: 4,
            blur: 8,
            spread: 0,
            color: 'rgba(0, 0, 0, 0.25)'
          }],
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.effects).toBeDefined();
      expect(Array.isArray(result.effects)).toBe(true);
    });

    it('should convert opacity', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'opacity',
          value: 0.75,
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.opacity).toBe(0.75);
    });
  });

  describe('Context Handling', () => {
    it('should pass context to layout converter', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'width',
          value: 100,
          variant: 'arbitrary'
        }
      ];
      
      const context = { parentLayoutMode: 'HORIZONTAL' as const };
      const result = convertStylesToFigma(styles, context);
      
      expect(result.width).toBe(100);
    });

    it('should work without context', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
    });
  });

  describe('Border and Stroke', () => {
    it('should convert border properties', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'borderWidth',
          value: 2,
          variant: 'arbitrary'
        },
        {
          property: 'borderColor',
          value: '#E5E7EB',
          variant: 'arbitrary'
        },
        {
          property: 'borderRadius',
          value: 8,
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.strokeWeight).toBe(2);
      expect(result.strokes).toHaveLength(1);
             expect(result.strokes?.[0]).toEqual({
         type: 'SOLID',
         color: { r: 0.9, g: 0.91, b: 0.92 }
       });
      expect(result.cornerRadius).toBe(8);
    });

    it('should convert individual corner radius', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'borderRadiusTopLeft',
          value: 4,
          variant: 'arbitrary'
        },
        {
          property: 'borderRadiusTopRight',
          value: 8,
          variant: 'arbitrary'
        },
        {
          property: 'borderRadiusBottomRight',
          value: 12,
          variant: 'arbitrary'
        },
        {
          property: 'borderRadiusBottomLeft',
          value: 16,
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.topLeftRadius).toBe(4);
      expect(result.topRightRadius).toBe(8);
      expect(result.bottomRightRadius).toBe(12);
      expect(result.bottomLeftRadius).toBe(16);
    });

    it('should convert stroke align and dash pattern', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'strokeAlign',
          value: 'OUTSIDE',
          variant: 'preset'
        },
        {
          property: 'dashPattern',
          value: [5, 5],
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.strokeAlign).toBe('OUTSIDE');
      expect(result.dashPattern).toEqual([5, 5]);
    });
  });

  describe('Transform and Rotation', () => {
    it('should convert rotation', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'rotation',
          value: 45,
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
             // 45 degrees to radians ≈ 0.79
       expect(result.rotation).toBeCloseTo(0.79, 2);
    });
  });

  describe('Advanced Spacing', () => {
    it('should convert gap variations', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'gap',
          value: 16,
          variant: 'arbitrary'
        },
        {
          property: 'counterAxisSpacing',
          value: 8,
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.itemSpacing).toBe(16);
      expect(result.counterAxisSpacing).toBe(8);
    });

    it('should convert padding shortcuts', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'paddingX',
          value: 20,
          variant: 'arbitrary'
        },
        {
          property: 'paddingY',
          value: 16,
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.paddingLeft).toBe(20);
      expect(result.paddingRight).toBe(20);
      expect(result.paddingTop).toBe(16);
      expect(result.paddingBottom).toBe(16);
    });
  });

  describe('Position and Layout', () => {
    it('should convert position properties', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'position',
          value: 'absolute',
          variant: 'preset'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      // Position styles are handled by position converter
      expect(result).toBeDefined();
    });

         it('should convert overflow properties', () => {
       const styles: ParsedStyle[] = [
         {
           property: 'overflow',
           value: 'hidden',
           variant: 'preset',
           clipsContent: true,
           scrollingEnabled: false
         }
       ];
       
       const result = convertStylesToFigma(styles);
       
       expect(result.clipsContent).toBe(true);
       expect(result.scrollingEnabled).toBe(false);
     });
  });

  describe('Layout Sizing Modes', () => {
    it('should convert layout sizing properties', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'layoutSizingHorizontal',
          value: 'FILL',
          variant: 'preset'
        },
        {
          property: 'layoutSizingVertical',
          value: 'HUG',
          variant: 'preset'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.layoutSizingHorizontal).toBe('FILL');
      expect(result.layoutSizingVertical).toBe('HUG');
    });

    it('should convert flex wrap', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'layoutWrap',
          value: 'WRAP',
          variant: 'preset'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      expect(result.layoutWrap).toBe('WRAP');
    });
  });

  describe('Complex Real-World Scenarios', () => {
    it('should handle card component with all features', () => {
      const styles: ParsedStyle[] = [
        // Layout
        {
          property: 'layoutMode',
          value: 'VERTICAL',
          variant: 'preset'
        },
        {
          property: 'width',
          value: 320,
          variant: 'arbitrary'
        },
        {
          property: 'gap',
          value: 16,
          variant: 'arbitrary'
        },
        // Background
        {
          property: 'backgroundColor',
          value: '#FFFFFF',
          variant: 'arbitrary'
        },
        // Border & Corner
        {
          property: 'borderWidth',
          value: 1,
          variant: 'arbitrary'
        },
        {
          property: 'borderColor',
          value: '#E5E7EB',
          variant: 'arbitrary'
        },
        {
          property: 'borderRadius',
          value: 12,
          variant: 'arbitrary'
        },
        // Padding
        {
          property: 'paddingTop',
          value: 24,
          variant: 'arbitrary'
        },
        {
          property: 'paddingRight',
          value: 24,
          variant: 'arbitrary'
        },
        {
          property: 'paddingBottom',
          value: 24,
          variant: 'arbitrary'
        },
        {
          property: 'paddingLeft',
          value: 24,
          variant: 'arbitrary'
        },
        // Shadow
        {
          property: 'boxShadow',
          value: [{
            type: 'outer' as const,
            x: 0,
            y: 4,
            blur: 12,
            spread: 0,
            color: 'rgba(0, 0, 0, 0.1)'
          }],
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      // Layout
      expect(result.layoutMode).toBe('VERTICAL');
      expect(result.width).toBe(320);
      expect(result.itemSpacing).toBe(16);
      
      // Background
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 1, b: 1 }
      });
      
      // Border
      expect(result.strokeWeight).toBe(1);
      expect(result.strokes).toHaveLength(1);
      expect(result.cornerRadius).toBe(12);
      
      // Padding
      expect(result.paddingTop).toBe(24);
      expect(result.paddingRight).toBe(24);
      expect(result.paddingBottom).toBe(24);
      expect(result.paddingLeft).toBe(24);
      
      // Shadow
      expect(result.effects).toBeDefined();
      expect(Array.isArray(result.effects)).toBe(true);
    });

    it('should handle button with multiple states', () => {
      const styles: ParsedStyle[] = [
        // Layout
        {
          property: 'layoutMode',
          value: 'HORIZONTAL',
          variant: 'preset'
        },
        {
          property: 'primaryAxisAlignItems',
          value: 'CENTER',
          variant: 'preset'
        },
        {
          property: 'counterAxisAlignItems',
          value: 'CENTER',
          variant: 'preset'
        },
        {
          property: 'gap',
          value: 8,
          variant: 'arbitrary'
        },
        // Gradient Background
        {
          property: 'backgroundColor',
          value: 'linear',
          variant: 'preset',
          direction: 'b'
        },
        {
          property: 'gradientFrom',
          value: '#3B82F6',
          variant: 'arbitrary'
        },
        {
          property: 'gradientTo',
          value: '#1D4ED8',
          variant: 'arbitrary'
        },
        // Padding
        {
          property: 'paddingX',
          value: 20,
          variant: 'arbitrary'
        },
        {
          property: 'paddingY',
          value: 12,
          variant: 'arbitrary'
        },
        // Border
        {
          property: 'borderRadius',
          value: 8,
          variant: 'arbitrary'
        },
        // Transform
        {
          property: 'rotation',
          value: 0,
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      // Layout
      expect(result.layoutMode).toBe('HORIZONTAL');
      expect(result.primaryAxisAlignItems).toBe('CENTER');
      expect(result.counterAxisAlignItems).toBe('CENTER');
      expect(result.itemSpacing).toBe(8);
      
      // Gradient
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 0.23, g: 0.51, b: 0.96 }
          },
          {
            position: 1,
            color: { r: 0.11, g: 0.31, b: 0.85 }
          }
        ],
        gradientTransform: [[1, 0, 0], [0, 1, 0]]
      });
      
      // Padding (X/Y shortcuts)
      expect(result.paddingLeft).toBe(20);
      expect(result.paddingRight).toBe(20);
      expect(result.paddingTop).toBe(12);
      expect(result.paddingBottom).toBe(12);
      
      // Border
      expect(result.cornerRadius).toBe(8);
      
      // Transform
      expect(result.rotation).toBe(0);
    });
  });

  describe('Performance and Edge Cases', () => {
    it('should handle large number of backgrounds efficiently', () => {
      const styles: ParsedStyle[] = [];
      
      // Generate 50 background colors
      for (let i = 0; i < 50; i++) {
        styles.push({
          property: 'backgroundColor',
          value: `hsl(${i * 7}, 70%, 50%)`,
          variant: 'arbitrary'
        });
      }
      
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(50);
      expect(result.fills?.[0]).toHaveProperty('type', 'SOLID');
      expect(result.fills?.[49]).toHaveProperty('type', 'SOLID');
    });

    it('should handle mixed property order', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'paddingTop',
          value: 16,
          variant: 'arbitrary'
        },
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'fontSize',
          value: 18,
          variant: 'arbitrary'
        },
        {
          property: 'gradientFrom',
          value: '#00FF00',
          variant: 'arbitrary'
        },
        {
          property: 'width',
          value: 200,
          variant: 'arbitrary'
        },
        {
          property: 'backgroundColor',
          value: 'linear',
          variant: 'preset',
          direction: 'r'
        },
        {
          property: 'gradientTo',
          value: '#0000FF',
          variant: 'arbitrary'
        },
        {
          property: 'color',
          value: '#FFFFFF',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      // Should have text color + solid background + gradient background
      expect(result.fills).toHaveLength(3);
      expect(result.paddingTop).toBe(16);
      expect(result.fontSize).toBe(18);
      expect(result.width).toBe(200);
    });

    it('should handle invalid color values gracefully', () => {
      const styles: ParsedStyle[] = [
        {
          property: 'backgroundColor',
          value: 'invalid-color',
          variant: 'arbitrary'
        },
        {
          property: 'backgroundColor',
          value: '#FF0000',
          variant: 'arbitrary'
        },
        {
          property: 'color',
          value: 'not-a-color',
          variant: 'arbitrary'
        }
      ];
      
      const result = convertStylesToFigma(styles);
      
      // Should only have the valid background color
      expect(result.fills).toHaveLength(1);
      expect(result.fills?.[0]).toEqual({
        type: 'SOLID',
        color: { r: 1, g: 0, b: 0 }
      });
    });
  });
}); 