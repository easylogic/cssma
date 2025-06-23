import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 효과(Effects)', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('효과 클래스 파싱', () => {
    it('테두리 반경 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClass('rounded-lg');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('rounded-lg');
      expect(result?.category).toBe('borders');
      expect(result?.property).toBe('rounded');
      expect(result?.value).toBe('lg');
    });
    
    it('방향성 테두리 반경 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClass('rounded-t-lg');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('rounded-t-lg');
      expect(result?.category).toBe('borders');
      expect(result?.property).toBe('rounded-t');
      expect(result?.value).toBe('lg');
    });
    
    it('그림자 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('shadow-md');
      expect(result).toBeDefined();
      expect(result?.className).toBe('shadow-md');
      expect(result?.category).toBe('effects');
      expect(result?.property).toBe('shadow');
      expect(result?.value).toBe('md');
    });
    
    it('불투명도 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('opacity-50');
      expect(result).toBeDefined();
      expect(result?.className).toBe('opacity-50');
      expect(result?.category).toBe('effects');
      expect(result?.property).toBe('opacity');
      expect(result?.value).toBe('50');
    });
    
    it('테두리 너비 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClass('border-2');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('border-2');
      expect(result?.category).toBe('borders');
      expect(result?.property).toBe('border');
      expect(result?.value).toBe('2');
    });
    
    it('방향성 테두리 너비 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClass('border-t-2');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('border-t-2');
      expect(result?.category).toBe('borders');
      expect(result?.property).toBe('border-t');
      expect(result?.value).toBe('2');
    });
  });
  
  describe('효과 스타일 적용', () => {
    it('테두리 반경 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('rounded-lg');
      expect(result.borders.borderRadius).toBeDefined();
      expect(result.borders.borderRadius).toBe('8px');
    });
    
    it('그림자 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('shadow-md');
      expect(result.effects.boxShadow).toBeDefined();
      expect(result.effects.boxShadow).toEqual(
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      );
    });
    
    it('불투명도 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('opacity-50');
      expect(result.effects.opacity).toBeDefined();
      expect(result.effects.opacity).toBe(0.5);
    });
    
    it('테두리 너비 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('border-2');
      expect(result.borders.borderWidth).toBeDefined();
      expect(result.borders.borderWidth).toBe('2px');
    });
    
    it('방향성 테두리 너비 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('border-t-2');
      expect(result.borders.borderTopWidth).toBeDefined();
      expect(result.borders.borderTopWidth).toBe('2px');
    });
    
    it('여러 효과 스타일을 함께 적용할 수 있어야 함', () => {
      const result = parser.parse('rounded-lg shadow-md opacity-50 border-2');
      expect(result.borders.borderRadius).toBe('8px');
      expect(result.effects.boxShadow).toBeDefined();
      expect(result.effects.opacity).toBe(0.5);
      expect(result.borders.borderWidth).toBe('2px');
    });
  });

  describe('필터 스타일 적용', () => {
    describe('기본 필터 효과', () => {
      it('blur 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('blur-sm');
        expect(result.effects.filter).toBeDefined();
        expect(result.effects.filter).toContain('blur(4px)');
      });

      it('brightness 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('brightness-125');
        expect(result.effects.filter).toBeDefined();
        expect(result.effects.filter).toContain('brightness(1.25)');
      });

      it('contrast 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('contrast-150');
        expect(result.effects.filter).toBeDefined();
        expect(result.effects.filter).toContain('contrast(1.5)');
      });

      it('drop-shadow 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('drop-shadow-lg');
        expect(result.effects.filter).toBeDefined();
        expect(result.effects.filter).toContain('drop-shadow');
      });

      it('grayscale 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('grayscale');
        expect(result.effects.filter).toBeDefined();
        expect(result.effects.filter).toContain('grayscale(100%)');
      });

      it('hue-rotate 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('hue-rotate-90');
        expect(result.effects.filter).toBeDefined();
        expect(result.effects.filter).toContain('hue-rotate(90deg)');
      });

      it('invert 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('invert');
        expect(result.effects.filter).toBeDefined();
        expect(result.effects.filter).toContain('invert(100%)');
      });

      it('saturate 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('saturate-150');
        expect(result.effects.filter).toBeDefined();
        expect(result.effects.filter).toContain('saturate(1.5)');
      });

      it('sepia 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('sepia');
        expect(result.effects.filter).toBeDefined();
        expect(result.effects.filter).toContain('sepia(100%)');
      });

      it('text-shadow 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('text-shadow-lg');
        expect(result.effects.textShadow).toBeDefined();
        expect(typeof result.effects.textShadow).toBe('string');
      });
    });

    describe('Backdrop 필터 효과', () => {
      it('backdrop-blur 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('backdrop-blur-sm');
        expect(result.effects.backdropFilter).toBeDefined();
        expect(result.effects.backdropFilter).toContain('blur(4px)');
      });

      it('backdrop-brightness 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('backdrop-brightness-125');
        expect(result.effects.backdropFilter).toBeDefined();
        expect(result.effects.backdropFilter).toContain('brightness(1.25)');
      });

      it('backdrop-contrast 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('backdrop-contrast-150');
        expect(result.effects.backdropFilter).toBeDefined();
        expect(result.effects.backdropFilter).toContain('contrast(1.5)');
      });

      it('backdrop-grayscale 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('backdrop-grayscale');
        expect(result.effects.backdropFilter).toBeDefined();
        expect(result.effects.backdropFilter).toContain('grayscale(100%)');
      });

      it('backdrop-hue-rotate 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('backdrop-hue-rotate-90');
        expect(result.effects.backdropFilter).toBeDefined();
        expect(result.effects.backdropFilter).toContain('hue-rotate(90deg)');
      });

      it('backdrop-invert 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('backdrop-invert');
        expect(result.effects.backdropFilter).toBeDefined();
        expect(result.effects.backdropFilter).toContain('invert(100%)');
      });

      it('backdrop-opacity 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('backdrop-opacity-50');
        expect(result.effects.backdropFilter).toBeDefined();
        expect(result.effects.backdropFilter).toContain('opacity(0.5)');
      });

      it('backdrop-saturate 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('backdrop-saturate-150');
        expect(result.effects.backdropFilter).toBeDefined();
        expect(result.effects.backdropFilter).toContain('saturate(1.5)');
      });

      it('backdrop-sepia 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('backdrop-sepia');
        expect(result.effects.backdropFilter).toBeDefined();
        expect(result.effects.backdropFilter).toContain('sepia(100%)');
      });
    });

    describe('복합 필터 효과', () => {
      it('여러 필터를 함께 적용할 수 있어야 함', () => {
        const result = parser.parse('blur-sm brightness-125 contrast-150');
        expect(result.effects.filter).toBeDefined();
        expect(result.effects.filter).toContain('blur(4px)');
        expect(result.effects.filter).toContain('brightness(1.25)');
        expect(result.effects.filter).toContain('contrast(1.5)');
      });

      it('여러 backdrop 필터를 함께 적용할 수 있어야 함', () => {
        const result = parser.parse('backdrop-blur-sm backdrop-brightness-125 backdrop-opacity-50');
        expect(result.effects.backdropFilter).toBeDefined();
        expect(result.effects.backdropFilter).toContain('blur(4px)');
        expect(result.effects.backdropFilter).toContain('brightness(1.25)');
        expect(result.effects.backdropFilter).toContain('opacity(0.5)');
      });

      it('필터와 기본 효과를 함께 적용할 수 있어야 함', () => {
        const result = parser.parse('blur-sm opacity-75 shadow-lg');
        expect(result.effects.filter).toBeDefined();
        expect(result.effects.filter).toContain('blur(4px)');
        expect(result.effects.opacity).toBe(0.75);
        expect(result.effects.boxShadow).toBeDefined();
      });
    });

    describe('임의값 필터 효과', () => {
      it('임의 blur 값을 적용할 수 있어야 함', () => {
        const result = parser.parse('blur-[10px]');
        expect(result.effects.filter).toBeDefined();
        expect(result.effects.filter).toContain('blur(10px)');
      });

      it('임의 brightness 값을 적용할 수 있어야 함', () => {
        const result = parser.parse('brightness-[1.75]');
        expect(result.effects.filter).toBeDefined();
        expect(result.effects.filter).toContain('brightness(1.75)');
      });

      it('임의 hue-rotate 값을 적용할 수 있어야 함', () => {
        const result = parser.parse('hue-rotate-[45deg]');
        expect(result.effects.filter).toBeDefined();
        expect(result.effects.filter).toContain('hue-rotate(45deg)');
      });

      it('임의 backdrop-blur 값을 적용할 수 있어야 함', () => {
        const result = parser.parse('backdrop-blur-[5px]');
        expect(result.effects.backdropFilter).toBeDefined();
        expect(result.effects.backdropFilter).toContain('blur(5px)');
      });
    });
  });
}); 