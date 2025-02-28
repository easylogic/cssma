import { describe, it, expect } from 'vitest';
import { convertShadowToFigma } from '../../src/converter/shadow';
import { ParsedStyle } from '../../src/types';

describe('Shadow Converter', () => {
  describe('Drop Shadow', () => {
    it('should convert basic shadow values', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'boxShadow',
            value: [{
              type: 'outer',
              x: 0,
              y: 1,
              blur: 2,
              spread: 0,
              color: 'rgba(0,0,0,0.05)'
            }],
            variant: 'preset'
          },
          expected: {
            effects: [{
              type: 'DROP_SHADOW',
              color: { r: 0, g: 0, b: 0, a: 0.05 },
              offset: { x: 0, y: 1 },
              radius: 2,
              spread: 0,
              visible: true,
              blendMode: 'NORMAL'
            }]
          }
        },
        {
          input: {
            property: 'boxShadow',
            value: [{
              type: 'outer',
              x: 0,
              y: 4,
              blur: 6,
              spread: -2,
              color: 'rgba(0,0,0,0.1)'
            }],
            variant: 'preset'
          },
          expected: {
            effects: [{
              type: 'DROP_SHADOW',
              color: { r: 0, g: 0, b: 0, a: 0.1 },
              offset: { x: 0, y: 4 },
              radius: 6,
              spread: -2,
              visible: true,
              blendMode: 'NORMAL'
            }]
          }
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertShadowToFigma(input)).toEqual(expected);
      });
    });

    it('should convert colored shadows', () => {
      const input: ParsedStyle = {
        property: 'boxShadow',
        value: [{
          type: 'outer',
          x: 0,
          y: 2,
          blur: 4,
          spread: -1,
          color: { r: 0.23, g: 0.51, b: 0.96, a: 0.5 }
        }],
        variant: 'preset'
      };

      expect(convertShadowToFigma(input)).toEqual({
        effects: [{
          type: 'DROP_SHADOW',
          color: { r: 0.23, g: 0.51, b: 0.96, a: 0.5 },
          offset: { x: 0, y: 2 },
          radius: 4,
          spread: -1,
          visible: true,
          blendMode: 'NORMAL'
        }]
      });
    });
  });

  describe('Inner Shadow', () => {
    it('should convert inner shadow values', () => {
      const input: ParsedStyle = {
        property: 'boxShadow',
        value: [{
          type: 'inner',
          x: 0,
          y: 2,
          blur: 4,
          spread: 0,
          color: 'rgba(0,0,0,0.06)'
        }],
        variant: 'preset'
      };

      expect(convertShadowToFigma(input)).toEqual({
        effects: [{
          type: 'INNER_SHADOW',
          color: { r: 0, g: 0, b: 0, a: 0.06 },
          offset: { x: 0, y: 2 },
          radius: 4,
          spread: 0,
          visible: true,
          blendMode: 'NORMAL'
        }]
      });
    });
  });

  describe('Multiple Shadows', () => {
    it('should handle multiple shadows', () => {
      const input: ParsedStyle = {
        property: 'boxShadow',
        value: [
          {
            type: 'outer',
            x: 0,
            y: 2,
            blur: 4,
            spread: -1,
            color: 'rgba(0,0,0,0.1)'
          },
          {
            type: 'outer',
            x: 0,
            y: 4,
            blur: 6,
            spread: -2,
            color: 'rgba(0,0,0,0.05)'
          }
        ],
        variant: 'preset'
      };

      expect(convertShadowToFigma(input)).toEqual({
        effects: [
          {
            type: 'DROP_SHADOW',
            color: { r: 0, g: 0, b: 0, a: 0.1 },
            offset: { x: 0, y: 2 },
            radius: 4,
            spread: -1,
            visible: true,
            blendMode: 'NORMAL'
          },
          {
            type: 'DROP_SHADOW',
            color: { r: 0, g: 0, b: 0, a: 0.05 },
            offset: { x: 0, y: 4 },
            radius: 6,
            spread: -2,
            visible: true,
            blendMode: 'NORMAL'
          }
        ]
      });
    });
  });

  describe('Invalid Values', () => {
    it('should handle invalid values gracefully', () => {
      const testCases: { input: ParsedStyle; expected: any }[] = [
        {
          input: {
            property: 'boxShadow',
            value: 'invalid',
            variant: 'arbitrary'
          },
          expected: {}
        },
        {
          input: {
            property: 'boxShadow',
            value: [],
            variant: 'preset'
          },
          expected: {}
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(convertShadowToFigma(input)).toEqual(expected);
      });
    });
  });
}); 