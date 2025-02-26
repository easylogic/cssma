import { describe, it, expect } from 'vitest';
import { convertGeometry } from '../../src/converters/geometry';

describe('Geometry Converter', () => {
  describe('Border Radius', () => {
    it('should convert rounded corner classes', () => {
      expect(convertGeometry('rounded-sm')).toEqual({
        topLeftRadius: 2,
        topRightRadius: 2,
        bottomLeftRadius: 2,
        bottomRightRadius: 2
      });

      expect(convertGeometry('rounded')).toEqual({
        topLeftRadius: 4,
        topRightRadius: 4,
        bottomLeftRadius: 4,
        bottomRightRadius: 4
      });

      expect(convertGeometry('rounded-md')).toEqual({
        topLeftRadius: 6,
        topRightRadius: 6,
        bottomLeftRadius: 6,
        bottomRightRadius: 6
      });

      expect(convertGeometry('rounded-lg')).toEqual({
        topLeftRadius: 8,
        topRightRadius: 8,
        bottomLeftRadius: 8,
        bottomRightRadius: 8
      });

      expect(convertGeometry('rounded-xl')).toEqual({
        topLeftRadius: 12,
        topRightRadius: 12,
        bottomLeftRadius: 12,
        bottomRightRadius: 12
      });

      expect(convertGeometry('rounded-2xl')).toEqual({
        topLeftRadius: 16,
        topRightRadius: 16,
        bottomLeftRadius: 16,
        bottomRightRadius: 16
      });
    });

    it('should convert individual corner radius classes', () => {
      expect(convertGeometry('rounded-t-lg')).toEqual({
        topLeftRadius: 8,
        topRightRadius: 8
      });

      expect(convertGeometry('rounded-r-lg')).toEqual({
        topRightRadius: 8,
        bottomRightRadius: 8
      });

      expect(convertGeometry('rounded-b-lg')).toEqual({
        bottomLeftRadius: 8,
        bottomRightRadius: 8
      });

      expect(convertGeometry('rounded-l-lg')).toEqual({
        topLeftRadius: 8,
        bottomLeftRadius: 8
      });

      expect(convertGeometry('rounded-tl-lg')).toEqual({
        topLeftRadius: 8
      });

      expect(convertGeometry('rounded-tr-lg')).toEqual({
        topRightRadius: 8
      });

      expect(convertGeometry('rounded-br-lg')).toEqual({
        bottomRightRadius: 8
      });

      expect(convertGeometry('rounded-bl-lg')).toEqual({
        bottomLeftRadius: 8
      });
    });
  });

  describe('Border Width', () => {
    it('should convert border width classes', () => {
      expect(convertGeometry('border')).toEqual({
        strokeWeight: 1,
        strokeAlign: 'CENTER'
      });

      expect(convertGeometry('border-2')).toEqual({
        strokeWeight: 2,
        strokeAlign: 'CENTER'
      });

      expect(convertGeometry('border-4')).toEqual({
        strokeWeight: 4,
        strokeAlign: 'CENTER'
      });

      expect(convertGeometry('border-8')).toEqual({
        strokeWeight: 8,
        strokeAlign: 'CENTER'
      });
    });
  });

  describe('Border Position', () => {
    it('should convert border position classes', () => {
      expect(convertGeometry('stroke-inside')).toEqual({
        strokeAlign: 'INSIDE'
      });

      expect(convertGeometry('stroke-center')).toEqual({
        strokeAlign: 'CENTER'
      });

      expect(convertGeometry('stroke-outside')).toEqual({
        strokeAlign: 'OUTSIDE'
      });
    });
  });

  describe('Combined Properties', () => {
    it('should combine multiple geometry properties', () => {
      expect(convertGeometry('rounded-lg border-2 stroke-inside')).toEqual({
        topLeftRadius: 8,
        topRightRadius: 8,
        bottomLeftRadius: 8,
        bottomRightRadius: 8,
        strokeWeight: 2,
        strokeAlign: 'INSIDE'
      });

      expect(convertGeometry('rounded-t-lg border-4')).toEqual({
        topLeftRadius: 8,
        topRightRadius: 8,
        strokeWeight: 4,
        strokeAlign: 'CENTER'
      });
    });
  });
}); 