import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 위치 및 변형', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('위치 클래스 파싱', () => {
    it('position 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('absolute');
      expect(result).toBeDefined();
      expect(result?.className).toBe('absolute');
      expect(result?.category).toBe('position');
      expect(result?.property).toBe('absolute');
    });
    
    it('top/right/bottom/left 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('top-0');
      expect(result).toBeDefined();
      expect(result?.className).toBe('top-0');
      expect(result?.category).toBe('position');
      expect(result?.property).toBe('top');
      expect(result?.value).toBe('0');
    });
    
    it('z-index 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('z-10');
      expect(result).toBeDefined();
      expect(result?.className).toBe('z-10');
      expect(result?.category).toBe('position');
      expect(result?.property).toBe('z');
      expect(result?.value).toBe('10');
    });
  });
  
  describe('변형 클래스 파싱', () => {
    it('rotate 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('rotate-45');
      expect(result).toBeDefined();
      expect(result?.className).toBe('rotate-45');
      expect(result?.category).toBe('transform');
      expect(result?.property).toBe('rotate');
      expect(result?.value).toBe('45');
    });
    
    it('scale 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('scale-150');
      expect(result).toBeDefined();
      expect(result?.className).toBe('scale-150');
      expect(result?.category).toBe('transform');
      expect(result?.property).toBe('scale');
      expect(result?.value).toBe('150');
    });
    
    it('translate 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('translate-x-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('translate-x-4');
      expect(result?.category).toBe('transform');
      expect(result?.property).toBe('translate-x');
      expect(result?.value).toBe('4');
    });
    
    it('skew 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('skew-y-6');
      expect(result).toBeDefined();
      expect(result?.className).toBe('skew-y-6');
      expect(result?.category).toBe('transform');
      expect(result?.property).toBe('skew-y');
      expect(result?.value).toBe('6');
    });
  });
  
  describe('위치 스타일 적용', () => {
    it('position 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('absolute');
      expect(result.position.type).toBeDefined();
      expect(result.position.type).toBe('absolute');
    });
    
    it('top/right/bottom/left 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('top-0 right-0 bottom-0 left-0');
      expect(result.position.top).toBe(0);
      expect(result.position.right).toBe(0);
      expect(result.position.bottom).toBe(0);
      expect(result.position.left).toBe(0);
    });
    
    it('z-index 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('z-10');
      expect(result.position.zIndex).toBeDefined();
      expect(result.position.zIndex).toBe(10);
    });
    
    it('여러 위치 스타일을 함께 적용할 수 있어야 함', () => {
      const result = parser.parse('absolute top-0 left-0 z-10');
      expect(result.position.type).toBe('absolute');
      expect(result.position.top).toBe(0);
      expect(result.position.left).toBe(0);
      expect(result.position.zIndex).toBe(10);
    });
  });
  
  describe('변형 스타일 적용', () => {
    it('rotate 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('rotate-45');
      expect(result.transform.rotate).toBeDefined();
      expect(result.transform.rotate).toBe(45);
    });
    
    it('scale 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('scale-150');
      expect(result.transform.scale).toBeDefined();
      expect(result.transform.scale).toBe(1.5);
    });
    
    it('translate 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('translate-x-4');
      expect(result.transform.translateX).toBeDefined();
      expect(result.transform.translateX).toBe(16);
    });
    
    it('skew 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('skew-y-6');
      expect(result.transform.skewY).toBeDefined();
      expect(result.transform.skewY).toBe(6);
    });
    
    it('여러 변형 스타일을 함께 적용할 수 있어야 함', () => {
      const result = parser.parse('rotate-45 scale-150 translate-x-4');
      expect(result.transform.rotate).toBe(45);
      expect(result.transform.scale).toBe(1.5);
      expect(result.transform.translateX).toBe(16);
    });
    
    it('임의 변형 값을 적용할 수 있어야 함', () => {
      const result = parser.parse('rotate-[30deg]');
      expect(result.transform.rotate).toBe(30);
    });
  });

  describe('3D Transform Utilities (v4.1)', () => {
    describe('3D 회전 클래스 파싱', () => {
      it('rotate-x 클래스를 파싱할 수 있어야 함', () => {
        const result = parser.parseClassName('rotate-x-45');
        expect(result).toBeDefined();
        expect(result?.className).toBe('rotate-x-45');
        expect(result?.category).toBe('transform');
        expect(result?.property).toBe('rotate-x');
        expect(result?.value).toBe('45');
      });

      it('rotate-y 클래스를 파싱할 수 있어야 함', () => {
        const result = parser.parseClassName('rotate-y-90');
        expect(result).toBeDefined();
        expect(result?.className).toBe('rotate-y-90');
        expect(result?.category).toBe('transform');
        expect(result?.property).toBe('rotate-y');
        expect(result?.value).toBe('90');
      });

      it('rotate-z 클래스를 파싱할 수 있어야 함', () => {
        const result = parser.parseClassName('rotate-z-180');
        expect(result).toBeDefined();
        expect(result?.className).toBe('rotate-z-180');
        expect(result?.category).toBe('transform');
        expect(result?.property).toBe('rotate-z');
        expect(result?.value).toBe('180');
      });
    });

    describe('3D 스케일 클래스 파싱', () => {
      it('scale-z 클래스를 파싱할 수 있어야 함', () => {
        const result = parser.parseClassName('scale-z-110');
        expect(result).toBeDefined();
        expect(result?.className).toBe('scale-z-110');
        expect(result?.category).toBe('transform');
        expect(result?.property).toBe('scale-z');
        expect(result?.value).toBe('110');
      });
    });

    describe('3D 이동 클래스 파싱', () => {
      it('translate-z 클래스를 파싱할 수 있어야 함', () => {
        const result = parser.parseClassName('translate-z-12');
        expect(result).toBeDefined();
        expect(result?.className).toBe('translate-z-12');
        expect(result?.category).toBe('transform');
        expect(result?.property).toBe('translate-z');
        expect(result?.value).toBe('12');
      });
    });

    describe('3D 변형 스타일 적용', () => {
      it('rotate-x 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('rotate-x-45');
        expect(result.transform.rotateX).toBeDefined();
        expect(result.transform.rotateX).toBe(45);
      });

      it('rotate-y 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('rotate-y-90');
        expect(result.transform.rotateY).toBeDefined();
        expect(result.transform.rotateY).toBe(90);
      });

      it('rotate-z 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('rotate-z-180');
        expect(result.transform.rotateZ).toBeDefined();
        expect(result.transform.rotateZ).toBe(180);
      });

      it('scale-z 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('scale-z-110');
        expect(result.transform.scaleZ).toBeDefined();
        expect(result.transform.scaleZ).toBe(1.1);
      });

      it('translate-z 스타일을 적용할 수 있어야 함', () => {
        const result = parser.parse('translate-z-12');
        expect(result.transform.translateZ).toBeDefined();
        expect(result.transform.translateZ).toBe('48px');
      });

      it('3D 변형 임의값을 적용할 수 있어야 함', () => {
        const result = parser.parse('rotate-x-[30deg] rotate-y-[45deg] translate-z-[10px]');
        expect(result.transform.rotateX).toBe(30);
        expect(result.transform.rotateY).toBe(45);
        expect(result.transform.translateZ).toBe('10px');
      });

      it('2D와 3D 변형을 함께 적용할 수 있어야 함', () => {
        const result = parser.parse('rotate-45 rotate-x-30 scale-150 scale-z-110 translate-x-4 translate-z-8');
        expect(result.transform.rotate).toBe(45);
        expect(result.transform.rotateX).toBe(30);
        expect(result.transform.scale).toBe(1.5);
        expect(result.transform.scaleZ).toBe(1.1);
        expect(result.transform.translateX).toBe(16);
        expect(result.transform.translateZ).toBe('32px');
      });
    });

    describe('모디파이어와 3D 변형', () => {
      it('반응형 3D 변형을 적용할 수 있어야 함', () => {
        const result = parser.parse('hover:rotate-x-45 md:rotate-y-90');
        expect(result.states?.[':hover']?.transform?.rotateX).toBe(45);
        expect(result.breakpoints?.md?.transform?.rotateY).toBe(90);
      });
    });
  });
}); 