import { describe, test, expect } from 'vitest';
import { convertStylesToFigma } from '../../src/converter';
import { parseStyles } from '../../src/parser';

describe('Background Image Converter', () => {
  
  describe('Single background image', () => {
    test('should convert basic background image', () => {
      const styles = parseStyles('bg-[url("/image.jpg")]');
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills![0]).toEqual({
        type: 'IMAGE',
        imageUrl: '/image.jpg',
        scaleMode: 'FILL'
      });
    });

    test('should convert background image with opacity', () => {
      const styles = parseStyles('bg-[url("/image.jpg")]/50');
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills![0]).toEqual({
        type: 'IMAGE',
        imageUrl: '/image.jpg',
        scaleMode: 'FILL',
        opacity: 0.5
      });
    });

    test('should convert data URL image', () => {
      const styles = parseStyles('bg-[data:image/png;base64,iVBORw0KGgoAAAA...]');
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills![0]).toEqual({
        type: 'IMAGE',
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAA...',
        scaleMode: 'FILL'
      });
    });
  });

  describe('Background image with size properties', () => {
    test('should convert bg-cover', () => {
      const styles = parseStyles('bg-[url("/image.jpg")] bg-cover');
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills![0]).toEqual({
        type: 'IMAGE',
        imageUrl: '/image.jpg',
        scaleMode: 'FILL'
      });
    });

    test('should convert bg-contain', () => {
      const styles = parseStyles('bg-[url("/image.jpg")] bg-contain');
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills![0]).toEqual({
        type: 'IMAGE',
        imageUrl: '/image.jpg',
        scaleMode: 'FIT'
      });
    });

    test('should convert bg-auto', () => {
      const styles = parseStyles('bg-[url("/image.jpg")] bg-auto');
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills![0]).toEqual({
        type: 'IMAGE',
        imageUrl: '/image.jpg',
        scaleMode: 'CROP'
      });
    });
  });

  describe('Background image with repeat properties', () => {
    test('should convert bg-repeat', () => {
      const styles = parseStyles('bg-[url("/image.jpg")] bg-repeat');
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills![0]).toEqual({
        type: 'IMAGE',
        imageUrl: '/image.jpg',
        scaleMode: 'TILE'
      });
    });

    test('should convert bg-no-repeat', () => {
      const styles = parseStyles('bg-[url("/image.jpg")] bg-no-repeat');
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills![0]).toEqual({
        type: 'IMAGE',
        imageUrl: '/image.jpg',
        scaleMode: 'FILL'
      });
    });
  });

  describe('Background image with position properties', () => {
      test('should convert bg-center', () => {
    const styles = parseStyles('bg-[url("/image.jpg")] bg-center');
    const result = convertStylesToFigma(styles);
    
    expect(result.fills).toHaveLength(1);
    expect(result.fills![0]).toEqual({
      type: 'IMAGE',
      imageUrl: '/image.jpg',
      scaleMode: 'FILL',
      imageTransform: 'center'
    });
  });

    test('should convert bg-top', () => {
      const styles = parseStyles('bg-[url("/image.jpg")] bg-top');
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills![0]).toEqual({
        type: 'IMAGE',
        imageUrl: '/image.jpg',
        scaleMode: 'FILL',
        imageTransform: 'top'
      });
    });
  });

  describe('Combined properties', () => {
      test('should convert image with all properties', () => {
    const styles = parseStyles('bg-[url("/image.jpg")] bg-contain bg-center');
    const result = convertStylesToFigma(styles);
    
    expect(result.fills).toHaveLength(1);
    expect(result.fills![0]).toEqual({
      type: 'IMAGE',
      imageUrl: '/image.jpg',
      scaleMode: 'FIT',
      imageTransform: 'center'
    });
  });

    test('should convert image with opacity and position', () => {
      const styles = parseStyles('bg-[url("/image.jpg")]/75 bg-top');
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(1);
      expect(result.fills![0]).toEqual({
        type: 'IMAGE',
        imageUrl: '/image.jpg',
        scaleMode: 'FILL',
        opacity: 0.75,
        imageTransform: 'top'
      });
    });
  });

  describe('Multiple background images', () => {
    test('should convert multiple background images', () => {
      const styles = parseStyles('bg-[url("/image1.jpg")] bg-[url("/image2.png")] bg-contain');
      const result = convertStylesToFigma(styles);
      
      expect(result.fills).toHaveLength(2);
      expect(result.fills![0]).toEqual({
        type: 'IMAGE',
        imageUrl: '/image1.jpg',
        scaleMode: 'FILL'
      });
      expect(result.fills![1]).toEqual({
        type: 'IMAGE',
        imageUrl: '/image2.png',
        scaleMode: 'FIT'
      });
    });
  });

  describe('Mixed backgrounds (color and image)', () => {
      test('should convert both color and image backgrounds', () => {
    const styles = parseStyles('bg-purple-500 bg-[url("/bg.jpg")]');
    const result = convertStylesToFigma(styles);
    
    expect(result.fills).toHaveLength(2);
    // First fill should be the color (bg-purple-500)
    expect(result.fills![0]).toEqual({
      type: 'SOLID',
      color: { r: 0.66, g: 0.33, b: 0.97 }
    });
    // Second fill should be the image
    expect(result.fills![1]).toEqual({
      type: 'IMAGE',
      imageUrl: '/bg.jpg',
      scaleMode: 'FILL'
    });
  });
  });
}); 