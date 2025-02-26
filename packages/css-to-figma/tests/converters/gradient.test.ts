import { describe, it, expect } from 'vitest';
import { convertGradient } from '../../src/converters/gradient';

describe('Gradient Converter', () => {
  describe('Linear Gradients', () => {
    it('should convert basic linear gradient', () => {
      expect(convertGradient('bg-gradient-to-r from-[#FF0000] to-[#0000FF]')).toEqual({
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
        gradientTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ]
      });
    });

    it('should convert gradient with three colors', () => {
      expect(convertGradient('bg-gradient-to-r from-[#FF0000] via-[#00FF00] to-[#0000FF]')).toEqual({
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
        gradientTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ]
      });
    });

    it('should handle different gradient directions', () => {
      const directions = [
        { input: 'bg-linear-to-t', matrix: [[1, 0, 0], [0, -1, 1]] },
        { input: 'bg-linear-to-r', matrix: [[1, 0, 0], [0, 1, 0]] },
        { input: 'bg-linear-to-b', matrix: [[1, 0, 0], [0, 1, 0]] },
        { input: 'bg-linear-to-l', matrix: [[-1, 0, 1], [0, 1, 0]] },
        { input: 'bg-linear-to-tr', matrix: [[0.7071, -0.7071, 0], [0.7071, 0.7071, 0]] },
        { input: 'bg-linear-to-tl', matrix: [[-0.7071, -0.7071, 1], [0.7071, -0.7071, 0]] },
        { input: 'bg-linear-to-br', matrix: [[0.7071, 0.7071, 0], [-0.7071, 0.7071, 0]] },
        { input: 'bg-linear-to-bl', matrix: [[-0.7071, 0.7071, 1], [-0.7071, -0.7071, 1]] }
      ];

      directions.forEach(({ input, matrix }) => {
        const result = convertGradient(`${input} from-[#FF0000] to-[#0000FF]`);
        expect(result.gradientTransform).toEqual(matrix);
      });
    });
  });

  describe('Radial Gradients', () => {
    it('should convert basic radial gradient', () => {
      expect(convertGradient('bg-radial from-[#FF0000] to-[#0000FF]')).toEqual({
        type: 'GRADIENT_RADIAL',
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
        centerX: 0.5,
        centerY: 0.5,
        radius: 0.5
      });
    });

    it('should convert radial gradient with three colors', () => {
      expect(convertGradient('bg-radial from-[#FF0000] via-[#00FF00] to-[#0000FF]')).toEqual({
        type: 'GRADIENT_RADIAL',
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
        centerX: 0.5,
        centerY: 0.5,
        radius: 0.5
      });
    });
  });

  describe('Conic Gradients', () => {
    it('should convert basic conic gradient', () => {
      expect(convertGradient('bg-conic from-[#FF0000] to-[#0000FF]')).toEqual({
        type: 'GRADIENT_ANGULAR',
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
        centerX: 0.5,
        centerY: 0.5,
        rotation: 0
      });
    });

    it('should convert conic gradient with three colors', () => {
      expect(convertGradient('bg-conic from-[#FF0000] via-[#00FF00] to-[#0000FF]')).toEqual({
        type: 'GRADIENT_ANGULAR',
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
        centerX: 0.5,
        centerY: 0.5,
        rotation: 0
      });
    });
  });

  describe('Color Parsing', () => {
    it('should handle hex colors with different formats', () => {
      expect(convertGradient('bg-gradient-to-r from-[#F00] to-[#00F]')).toEqual({
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
        gradientTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ]
      });
    });

    it('should handle hex colors with alpha', () => {
      expect(convertGradient('bg-gradient-to-r from-[#FF0000AA] to-[#0000FF80]')).toEqual({
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 1, g: 0, b: 0, a: 0.67 }
          },
          {
            position: 1,
            color: { r: 0, g: 0, b: 1, a: 0.5 }
          }
        ],
        gradientTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ]
      });
    });

    it('should handle rgb/rgba colors', () => {
      expect(convertGradient('bg-gradient-to-r from-[rgb(255,0,0)] to-[rgba(0,0,255,0.5)]')).toEqual({
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 1, g: 0, b: 0 }
          },
          {
            position: 1,
            color: { r: 0, g: 0, b: 1, a: 0.5 }
          }
        ],
        gradientTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ]
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle missing color stops', () => {
      expect(convertGradient('bg-gradient-to-r')).toEqual({
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 0, g: 0, b: 0 }
          },
          {
            position: 1,
            color: { r: 0, g: 0, b: 0 }
          }
        ],
        gradientTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ]
      });
    });

    it('should handle invalid color values', () => {
      expect(convertGradient('bg-gradient-to-r from-[invalid] to-[#0000FF]')).toEqual({
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 0, g: 0, b: 0 }
          },
          {
            position: 1,
            color: { r: 0, g: 0, b: 1 }
          }
        ],
        gradientTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ]
      });
    });
  });

  describe('Complex Gradients', () => {
    it('should handle preset color values', () => {
      expect(convertGradient('bg-gradient-to-r from-blue-500 to-purple-500')).toEqual({
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 0.23, g: 0.51, b: 0.96 }
          },
          {
            position: 1,
            color: { r: 0.66, g: 0.33, b: 0.97 }
          }
        ],
        gradientTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ]
      });
    });

    it('should handle mixed preset and arbitrary values', () => {
      expect(convertGradient('bg-gradient-to-r from-blue-500 via-[#00FF00] to-purple-500')).toEqual({
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 0.23, g: 0.51, b: 0.96 }
          },
          {
            position: 0.5,
            color: { r: 0, g: 1, b: 0 }
          },
          {
            position: 1,
            color: { r: 0.66, g: 0.33, b: 0.97 }
          }
        ],
        gradientTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ]
      });
    });
  });

  describe('Gradients', () => {
    it('should convert linear gradient with two colors', () => {
      const result = convertGradient('bg-gradient-to-r from-red-500 to-blue-500');
      expect(result).toEqual({
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 0.94, g: 0.27, b: 0.27 } // red-500
          },
          {
            position: 1,
            color: { r: 0.23, g: 0.51, b: 0.96 } // blue-500
          }
        ],
        gradientTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ]
      });
    });

    it('should convert linear gradient with three colors', () => {
      const result = convertGradient('bg-linear-to-r from-red-500 via-purple-500 to-blue-500');
      expect(result).toEqual({
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          {
            position: 0,
            color: { r: 0.94, g: 0.27, b: 0.27 } // red-500
          },
          {
            position: 0.5,
            color: { r: 0.66, g: 0.33, b: 0.97 } // purple-500
          },
          {
            position: 1,
            color: { r: 0.23, g: 0.51, b: 0.96 } // blue-500
          }
        ],
        gradientTransform: [
          [1, 0, 0],
          [0, 1, 0]
        ]
      });
    });
  });
}); 