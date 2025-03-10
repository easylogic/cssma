import { describe, it, expect } from 'vitest';
import { processStyles } from '../src';
import { round } from '../src/utils/math';

interface FigmaNode {
  type: 'FRAME' | 'TEXT' | 'RECTANGLE' | 'ELLIPSE';
  name: string;
  styles?: string;
  children?: FigmaNode[];
  text?: string;
}

describe('Figma Node Style Processor', () => {
  describe('Basic Node Types', () => {
    it('should process FRAME node styles', () => {
      const node: FigmaNode = {
        type: 'FRAME',
        name: 'Container',
        styles: 'flex-col w-[390] h-[844] bg-[#F9FAFB] gap-[16]'
      };

      const styles = processStyles(node.styles);
      expect(styles).toMatchObject({
        width: 390,
        height: 844,
        layoutMode: 'VERTICAL',
        itemSpacing: 16,
        counterAxisSpacing: 16,
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'FIXED',
        fills: [{
          type: 'SOLID',
          color: { r: round(249/255), g: round(250/255), b: round(251/255) }
        }]
      });
    });

    it.only('should process TEXT node styles', () => {
      const node: FigmaNode = {
        type: 'TEXT',
        name: 'Title',
        styles: 'text-[#111827] font-bold text-xl w-full',
        text: '제목'
      };

      const styles = processStyles(node.styles);
      expect(styles).toMatchObject({
        layoutSizingHorizontal: 'FILL',
        fills: [{
          type: 'SOLID',
          color: { r: round(17/255), g: round(24/255), b: round(39/255) }
        }],
        fontSize: 20
      });
    });

    it('should process RECTANGLE node styles', () => {
      const node: FigmaNode = {
        type: 'RECTANGLE',
        name: 'Icon Background',
        styles: 'w-[48] h-[48] bg-[#E5E7EB] rounded-full'
      };

      const styles = processStyles(node.styles);
      expect(styles).toMatchObject({
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'FIXED',
        width: 48,
        height: 48,
        fills: [{
          type: 'SOLID',
          color: { r: round(229/255), g: round(231/255), b: round(235/255) }
        }],
        cornerRadius: 9999
      });
    });
  });

  describe('Layout Patterns', () => {
    it('should process navigation bar layout', () => {
      const node: FigmaNode = {
        type: 'FRAME',
        name: 'Navigation Bar',
        styles: 'w-full flex-row justify-between items-center p-[16] bg-white shadow-sm h-auto',
        children: []
      };

      const styles = processStyles(node.styles);
      expect(styles).toMatchObject({
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
          color: { r: 0, g: 0, b: 0, a: 0.05 },
          offset: { x: 0, y: 1 },
          radius: 2,
          spread: 0,
          visible: true,
          blendMode: 'NORMAL'
        }]
      });
    });

    it('should process card layout', () => {
      const node: FigmaNode = {
        type: 'FRAME',
        name: 'Card',
        styles: 'flex-col gap-[8] p-[16] bg-white rounded-lg shadow-md w-[280] h-auto',
        children: []
      };

      const styles = processStyles(node.styles);
      expect(styles).toMatchObject({
        layoutMode: 'VERTICAL',
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'HUG',
        itemSpacing: 8,
        counterAxisSpacing: 8,
          paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        width: 280,
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 }
        }],
        effects: [{
          type: 'DROP_SHADOW',
          color: { r: 0, g: 0, b: 0, a: 0.1 },
          offset: { x: 0, y: 4 },
          radius: 6,
          spread: -2,
          visible: true,
          blendMode: 'NORMAL'
        }],
        cornerRadius: 8
      });
    });
  });

  describe('Complex Components', () => {
    it('should process gradient feature card', () => {
      const node: FigmaNode = {
        type: 'FRAME',
        name: 'Feature Card',
        styles: 'w-[280] h-auto p-6 flex-col items-center gap-4 rounded-2xl shadow-lg bg-linear-to-r from-purple-500 to-pink-500',
        children: []
      };

      const styles = processStyles(node.styles);
      expect(styles).toMatchObject({
        layoutMode: 'VERTICAL',
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'HUG',
        width: 280,
        paddingTop: 24,
        paddingRight: 24,
        paddingBottom: 24,
        paddingLeft: 24,
        itemSpacing: 16,
        counterAxisSpacing: 16,
        cornerRadius: 16,
        fills: [{
          type: 'GRADIENT_LINEAR',
          gradientStops: [
            {
              position: 0,
              //   'purple-500': { r: round(168/255), g: round(85/255), b: round(247/255) },
              color: {
                r: round(168/255),
                g: round(85/255),
                b: round(247/255)
              }
            },
            {
              position: 1,
              //   'pink-500': { r: round(249/255), g: round(95/255), b: round(180/255) },
              color: {
                r: round(249/255),
                g: round(95/255),
                b: round(180/255)
              }
            }
          ],
          gradientTransform: [[1, 0, 0], [0, 1, 0]]
        }],
        effects: [{
          type: 'DROP_SHADOW',
          color: { r: 0, g: 0, b: 0, a: 0.1 },
          offset: { x: 0, y: 8 },
          radius: 10,
          spread: -3,
          visible: true,
          blendMode: 'NORMAL'
        }]
      });
    });

    it('should process avatar with badge', () => {
      const node: FigmaNode = {
        type: 'FRAME',
        name: 'Avatar',
        styles: 'flex-row items-center justify-center w-[40] h-[40] bg-[#E0E7FF] rounded-full relative',
        children: []
      };

      const styles = processStyles(node.styles);
      expect(styles).toMatchObject({
        layoutMode: 'HORIZONTAL',
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'FIXED',
        width: 40,
        height: 40,
        primaryAxisAlignItems: 'CENTER',
        counterAxisAlignItems: 'CENTER',
        fills: [{
          type: 'SOLID',
          color: { r: round(224/255), g: round(231/255), b: round(255/255) }
        }],
        cornerRadius: 9999
      });
    });
  });

  describe('Responsive Layouts', () => {
    it('should process responsive container', () => {
      const node: FigmaNode = {
        type: 'FRAME',
        name: 'Container',
        styles: 'w-full h-auto flex-col items-center gap-[16]',
        children: []
      };

      const styles = processStyles(node.styles, {
        parentLayoutMode: 'VERTICAL'
      });
      expect(styles).toMatchObject({
        layoutMode: 'VERTICAL',
        layoutSizingHorizontal: 'FILL',
        layoutSizingVertical: 'HUG',
        counterAxisAlignItems: 'CENTER',
        itemSpacing: 16,
        counterAxisSpacing: 16
      });
    });

    it('should process responsive grid item', () => {
      const node: FigmaNode = {
        type: 'FRAME',
        name: 'Grid Item',
        styles: 'w-[16px] h-auto p-[16] bg-white rounded-lg',
        children: []
      };

      const styles = processStyles(node.styles, {
        parentLayoutMode: 'HORIZONTAL'
      });
      expect(styles).toMatchObject({
        width: 16,
        layoutSizingHorizontal: 'FIXED',
        layoutSizingVertical: 'HUG',
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        cornerRadius: 8,
        fills: [{
          type: 'SOLID',
          color: { r: 1, g: 1, b: 1 }
        }]
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid style combinations', () => {
      const node: FigmaNode = {
        type: 'FRAME',
        name: 'Invalid Styles',
        styles: 'flex flex-col w-full flex-row w-[100]'
      };

      const styles = processStyles(node.styles);
      expect(styles).toMatchObject({
        layoutMode: 'HORIZONTAL',
        layoutSizingHorizontal: 'FIXED',
        width: 100
      });
    });

    it('should handle unsupported values', () => {
      const node: FigmaNode = {
        type: 'FRAME',
        name: 'Test Frame',
        styles: 'unsupported-property-[value]'
      };

      const styles = processStyles(node.styles);
      expect(styles).toEqual({
        fills: []
      });
    });

    it('should handle invalid rotation values', () => {
      const node: FigmaNode = {
        type: 'FRAME',
        name: 'Test Frame',
        styles: 'rotate-[invalid]'
      };

      const styles = processStyles(node.styles);
      expect(styles).toEqual({
        fills: []
      });
    });

    it('should handle empty styles', () => {
      const node: FigmaNode = {
        type: 'FRAME',
        name: 'Test Frame',
        styles: ''
      };

      const styles = processStyles(node.styles);
      expect(styles).toEqual({});
    });

    it('should handle null or undefined styles', () => {
      const node: FigmaNode = {
        type: 'FRAME',
        name: 'Test Frame',
        styles: undefined
      };

      const styles = processStyles(node.styles);
      expect(styles).toEqual({});
    });
  });
}); 