import { describe, it, expect } from 'vitest';
import { validateLayoutStyles } from '../../src/utils/validators';

describe('Style Validators', () => {
  describe('validateLayoutStyles', () => {
    it('should allow w-full and h-full when parent has layout mode', () => {
      const parent = { layoutMode: 'VERTICAL' } as BaseNode;
      const child = {} as SceneNode;
      const styles = ['w-full', 'h-full'];

      const result = validateLayoutStyles(parent, child, styles);
      expect(result).toEqual(styles);
    });

    it('should convert w-full to w-auto when parent has no layout mode', () => {
      const parent = {} as BaseNode;
      const child = {} as SceneNode;
      const styles = ['w-full', 'h-full'];

      const result = validateLayoutStyles(parent, child, styles);
      expect(result).toEqual(['w-auto', 'h-auto']);
    });

    it('should keep w-auto and h-auto regardless of parent layout mode', () => {
      const parent = {} as BaseNode;
      const child = {} as SceneNode;
      const styles = ['w-auto', 'h-auto'];

      const result = validateLayoutStyles(parent, child, styles);
      expect(result).toEqual(styles);
    });

    it('should keep fixed width and height regardless of parent layout mode', () => {
      const parent = {} as BaseNode;
      const child = {} as SceneNode;
      const styles = ['w-[100]', 'h-[200]'];

      const result = validateLayoutStyles(parent, child, styles);
      expect(result).toEqual(styles);
    });

    it('should handle mixed styles correctly', () => {
      const parent = { layoutMode: 'HORIZONTAL' } as BaseNode;
      const child = {} as SceneNode;
      const styles = ['w-full', 'h-[200]', 'flex-row'];

      const result = validateLayoutStyles(parent, child, styles);
      expect(result).toEqual(styles);
    });

    it('should handle empty styles array', () => {
      const parent = {} as BaseNode;
      const child = {} as SceneNode;
      const styles: string[] = [];

      const result = validateLayoutStyles(parent, child, styles);
      expect(result).toEqual([]);
    });

    it('should handle null parent', () => {
      const parent = null;
      const child = {} as SceneNode;
      const styles = ['w-full', 'h-full'];

      const result = validateLayoutStyles(parent, child, styles);
      expect(result).toEqual(['w-auto', 'h-auto']);
    });

    it('should preserve non-layout styles', () => {
      const parent = {} as BaseNode;
      const child = {} as SceneNode;
      const styles = ['w-full', 'text-lg', 'bg-blue-500', 'rounded-lg'];

      const result = validateLayoutStyles(parent, child, styles);
      expect(result).toEqual(['w-auto', 'text-lg', 'bg-blue-500', 'rounded-lg']);
    });
  });
});
