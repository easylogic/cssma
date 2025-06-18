import { describe, it, expect } from "vitest";
import { CSSEngine } from '../src/core/engine';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSEngine', () => {
  const engine = new CSSEngine(loadConfig(), loadPreset());
  
  describe('기본 기능', () => {
    it('인스턴스가 생성되어야 함', () => {
      expect(engine).toBeInstanceOf(CSSEngine);
    });
    
    it('빈 클래스 문자열을 처리할 수 있어야 함', () => {
      const result = engine.process('');
      expect(result).toBeDefined();
      expect(result.parsed).toBeDefined();
      expect(result.cssObject).toBeDefined();
      expect(result.cssString).toBeDefined();
      expect(result.reactStyles).toBeDefined();
      expect(result.figmaStyles).toBeDefined();
    });
  });
  
  describe('클래스 처리', () => {
    it('기본 클래스를 처리할 수 있어야 함', () => {
      const result = engine.process('text-blue-500 p-4');
      
      // 파싱 결과 확인
      expect(result.parsed.colors.text).toBeDefined();
      expect(result.parsed.spacing.padding).toBeDefined();
      
      // CSS 객체 확인
      expect(result.cssObject.color).toBeDefined();
      expect(result.cssObject.padding).toBeDefined();
      
      // CSS 문자열 확인
      expect(result.cssString).toContain('color:');
      expect(result.cssString).toContain('padding:');
      
      // React 스타일 확인
      expect(result.reactStyles.color).toBeDefined();
      expect(result.reactStyles.padding).toBeDefined();
      
      // Figma 스타일 확인
      expect(result.figmaStyles.textFill).toBeDefined();
      expect(result.figmaStyles.paddingTop).toBeDefined();
      expect(result.figmaStyles.paddingRight).toBeDefined();
      expect(result.figmaStyles.paddingBottom).toBeDefined();
      expect(result.figmaStyles.paddingLeft).toBeDefined();
    });
    
    it('복잡한 클래스 조합을 처리할 수 있어야 함', () => {
      const result = engine.process('flex p-4 text-blue-500 hover:bg-red-500 md:text-lg rounded-lg shadow-md');
      
      // 파싱 결과 확인
      expect(result.parsed.layout.display).toBe('flex');
      expect(result.parsed.spacing.padding).toBeDefined();
      expect(result.parsed.colors.text).toBeDefined();
      expect(result.parsed.effects.borderRadius).toBeDefined();
      expect(result.parsed.effects.boxShadow).toBeDefined();
      
      // 상태 모디파이어 확인
      expect(result.parsed.states?.hover?.colors).toBeDefined();
      
      // 반응형 모디파이어 확인
      expect(result.parsed.breakpoints?.md?.typography).toBeDefined();
      
      // CSS 객체 확인
      expect(result.cssObject.display).toBe('flex');
      expect(result.cssObject.padding).toBeDefined();
      expect(result.cssObject.color).toBeDefined();
      expect(result.cssObject.borderRadius).toBeDefined();
      expect(result.cssObject.boxShadow).toBeDefined();
      
      // CSS 문자열 확인
      expect(result.cssString).toContain('display: flex;');
      expect(result.cssString).toContain('padding:');
      expect(result.cssString).toContain('color:');
      expect(result.cssString).toContain('border-radius:');
      expect(result.cssString).toContain('box-shadow:');
    });
  });
  
  describe('출력 형식', () => {
    it('다양한 출력 형식을 지원해야 함', () => {
      const classes = 'text-blue-500 p-4 flex';
      
      // CSS 객체 형식
      const cssObject = engine.toCSSObject(classes);
      expect(cssObject).toBeDefined();
      expect(cssObject.color).toBeDefined();
      expect(cssObject.padding).toBeDefined();
      expect(cssObject.display).toBe('flex');
      
      // CSS 문자열 형식
      const cssString = engine.toCSSString(classes);
      expect(cssString).toContain('color:');
      expect(cssString).toContain('padding:');
      expect(cssString).toContain('display: flex;');
      
      // React 스타일 형식
      const reactStyles = engine.toReactStyles(classes);
      expect(reactStyles).toBeDefined();
      expect(reactStyles.color).toBeDefined();
      expect(reactStyles.padding).toBeDefined();
      expect(reactStyles.display).toBe('flex');
      
      // Figma 스타일 형식
      const figmaStyles = engine.toFigmaStyles(classes);
      expect(figmaStyles).toBeDefined();
      expect(figmaStyles.textFill).toBeDefined();
      expect(figmaStyles.paddingTop).toBeDefined();
      expect(figmaStyles.paddingRight).toBeDefined();
      expect(figmaStyles.paddingBottom).toBeDefined();
      expect(figmaStyles.paddingLeft).toBeDefined();
    });
  });
  
  describe('설정 및 프리셋', () => {
    it('커스텀 설정으로 인스턴스를 생성할 수 있어야 함', () => {
      const customConfig = { prefix: 'tw-', important: true };
      const customEngine = new CSSEngine(loadConfig(customConfig), loadPreset());
      
      // 접두사가 있는 클래스 처리
      const result = customEngine.process('tw-text-blue-500 tw-p-4');
      
      expect(result.parsed.colors.text).toBeDefined();
      expect(result.parsed.spacing.padding).toBeDefined();
      expect(result.cssObject.color).toBeDefined();
      expect(result.cssObject.padding).toBeDefined();
    });
    
    it('커스텀 프리셋으로 인스턴스를 생성할 수 있어야 함', () => {
      const customPreset = {
        name: 'custom',
        colors: {
          brand: { r: 0.1, g: 0.2, b: 0.8 },
        },
      };
      const customEngine = new CSSEngine(loadConfig(), loadPreset(customPreset));
      
      // 커스텀 색상 처리
      const result = customEngine.process('text-brand');
      
      expect(result.parsed.colors.text).toEqual({ r: 0.1, g: 0.2, b: 0.8 });
      expect(result.cssObject.color).toBeDefined();
    });
  });
});
