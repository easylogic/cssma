import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('Pointer & Input Device Variants Parser', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('Pointer Precision Variants', () => {
    it('should parse pointer-fine modifier', () => {
      const result = parser.parseClassName('pointer-fine:bg-blue-500');
      
      expect(result).toBeDefined();
      expect(result?.modifiers?.state).toBe('@media (pointer: fine)');
      expect(result?.baseClassName).toBe('bg-blue-500');
    });

    it('should parse pointer-coarse modifier', () => {
      const result = parser.parseClassName('pointer-coarse:text-lg');
      
      expect(result).toBeDefined();
      expect(result?.modifiers?.state).toBe('@media (pointer: coarse)');
      expect(result?.baseClassName).toBe('text-lg');
    });

    it('should parse pointer-none modifier', () => {
      const result = parser.parseClassName('pointer-none:cursor-default');
      
      expect(result).toBeDefined();
      expect(result?.modifiers?.state).toBe('@media (pointer: none)');
      expect(result?.baseClassName).toBe('cursor-default');
    });
  });

  describe('Any-Pointer Variants', () => {
    it('should parse any-pointer-fine modifier', () => {
      const result = parser.parseClassName('any-pointer-fine:hover:scale-105');
      
      expect(result).toBeDefined();
      expect(result?.modifiers?.state).toBe('@media (any-pointer: fine)');
      expect(result?.baseClassName).toBe('hover:scale-105');
    });

    it('should parse any-pointer-coarse modifier', () => {
      const result = parser.parseClassName('any-pointer-coarse:p-6');
      
      expect(result).toBeDefined();
      expect(result?.modifiers?.state).toBe('@media (any-pointer: coarse)');
      expect(result?.baseClassName).toBe('p-6');
    });

    it('should parse any-pointer-none modifier', () => {
      const result = parser.parseClassName('any-pointer-none:hidden');
      
      expect(result).toBeDefined();
      expect(result?.modifiers?.state).toBe('@media (any-pointer: none)');
      expect(result?.baseClassName).toBe('hidden');
    });
  });

  describe('Complex Combinations', () => {
    it('should work with responsive modifiers', () => {
      const result = parser.parseClassName('md:pointer-fine:bg-gray-100');
      
      expect(result).toBeDefined();
      expect(result?.modifiers?.responsive).toEqual({ md: '@media (min-width: 768px)' });
      expect(result?.modifiers?.state).toBe('@media (pointer: fine)');
      expect(result?.baseClassName).toBe('bg-gray-100');
    });

    it('should work with state modifiers', () => {
      const result = parser.parseClassName('pointer-coarse:hover:shadow-lg');
      
      expect(result).toBeDefined();
      expect(result?.modifiers?.state).toBe('@media (pointer: coarse) and :hover');
      expect(result?.baseClassName).toBe('shadow-lg');
    });

    it('should chain multiple pointer conditions', () => {
      const result = parser.parseClassName('any-pointer-fine:pointer-coarse:text-sm');
      
      expect(result).toBeDefined();
      // 마지막 pointer 조건이 우선순위를 가짐
      expect(result?.modifiers?.state).toBe('@media (pointer: coarse)');
      expect(result?.baseClassName).toBe('text-sm');
    });
  });

  describe('Style Application', () => {
    it('should apply pointer-fine styles correctly', () => {
      const styles = parser.parse('pointer-fine:bg-blue-500');
      
      expect(styles.states?.['@media (pointer: fine)']).toBeDefined();
      expect(styles.states?.['@media (pointer: fine)']?.backgrounds?.backgroundColor).toBe('#3b82f6');
    });

    it('should apply any-pointer-coarse styles correctly', () => {
      const styles = parser.parse('any-pointer-coarse:p-4');
      
      expect(styles.states?.['@media (any-pointer: coarse)']).toBeDefined();
      expect(styles.states?.['@media (any-pointer: coarse)']?.spacing?.padding).toBe('1rem');
    });

    it('should handle multiple pointer variants in one parse', () => {
      const styles = parser.parse('pointer-fine:bg-blue-500 pointer-coarse:bg-red-500');
      
      expect(styles.states?.['@media (pointer: fine)']).toBeDefined();
      expect(styles.states?.['@media (pointer: coarse)']).toBeDefined();
      expect(styles.states?.['@media (pointer: fine)']?.backgrounds?.backgroundColor).toBe('#3b82f6');
      expect(styles.states?.['@media (pointer: coarse)']?.backgrounds?.backgroundColor).toBe('#ef4444');
    });
  });

  describe('Real-world Use Cases', () => {
    it('should handle touch-optimized interactions', () => {
      const styles = parser.parse('pointer-coarse:p-6 pointer-fine:p-3');
      
      // 터치 장치에서는 더 큰 패딩
      expect(styles.states?.['@media (pointer: coarse)']?.spacing?.padding).toBe('1.5rem');
      // 정밀한 포인팅 장치에서는 작은 패딩
      expect(styles.states?.['@media (pointer: fine)']?.spacing?.padding).toBe('0.75rem');
    });

    it('should handle device-specific hover states', () => {
      const styles = parser.parse('any-pointer-fine:hover:bg-gray-100 pointer-coarse:active:bg-gray-200');
      
      // 정밀한 포인팅 장치가 있을 때만 hover 적용
      expect(styles.states?.['@media (any-pointer: fine) and :hover']).toBeDefined();
      expect(styles.states?.['@media (any-pointer: fine) and :hover']?.backgrounds?.backgroundColor).toBe('#f3f4f6');
      
      // 터치 장치에서는 active 상태 사용
      expect(styles.states?.['@media (pointer: coarse) and :active']).toBeDefined();
      expect(styles.states?.['@media (pointer: coarse) and :active']?.backgrounds?.backgroundColor).toBe('#e5e7eb');
    });

    it('should handle mixed device environments', () => {
      const styles = parser.parse('any-pointer-fine:text-sm pointer-coarse:text-lg any-pointer-coarse:select-none');
      
      // 정밀한 포인팅 장치가 있으면 작은 텍스트
      expect(styles.states?.['@media (any-pointer: fine)']?.typography?.fontSize).toBe('0.875rem');
      // 터치 포인팅만 있으면 큰 텍스트  
      expect(styles.states?.['@media (pointer: coarse)']?.typography?.fontSize).toBe('1.125rem');
      // 터치 장치가 하나라도 있으면 텍스트 선택 비활성화
      expect(styles.states?.['@media (any-pointer: coarse)']?.interactivity?.userSelect).toBe('none');
    });
  });

  describe('Invalid Classes', () => {
    it('should reject invalid pointer modifiers', () => {
      const invalidClasses = [
        'pointer-medium:bg-blue-500',
        'pointer:bg-blue-500',
        'any-pointer:bg-blue-500',
        'pointer-fine-coarse:bg-blue-500'
      ];

      invalidClasses.forEach(className => {
        const result = parser.parseClassName(className);
        // 이런 클래스들은 fallback parser에 의해 처리되거나 null을 반환해야 함
        if (result) {
          expect(result.category).not.toBe('pointer'); // pointer 카테고리로 파싱되면 안됨
        }
      });
    });
  });
}); 