# CSSMA-V3

CSS to Figma 변환기 - 모든 CSS/Tailwind 기능을 완벽하게 지원합니다.

## 소개

CSSMA-V3는 CSS 클래스를 Figma 스타일로 변환하고, Figma 스타일을 CSS 클래스로 변환하는 라이브러리입니다. 반응형 디자인, 상태 모디파이어, 임의 값 등 모든 CSS/Tailwind 기능을 완벽하게 지원합니다.

## 설치

```bash
# npm
npm install cssma-v3

# yarn
yarn add cssma-v3

# pnpm
pnpm add cssma-v3
```

## 기능

- **완전한 CSS/Tailwind 지원**: 모든 CSS/Tailwind 기능을 지원합니다.
- **반응형 디자인**: 브레이크포인트 기반 반응형 스타일을 지원합니다.
- **상태 모디파이어**: hover, focus, active 등의 상태 모디파이어를 지원합니다.
- **임의 값**: 색상, 크기 등의 임의 값을 지원합니다.
- **Figma 통합**: Figma API와 완벽하게 통합됩니다.
- **양방향 변환**: CSS → Figma, Figma → CSS 양방향 변환을 지원합니다.
- **커스텀 설정**: 사용자 정의 설정과 프리셋을 지원합니다.

## 사용 방법

### 기본 사용법

```typescript
import { engine } from 'cssma-v3';

// CSS → Figma 변환
const figmaStyles = engine.cssToFigma('bg-blue-500 text-white p-4 rounded-lg');

// Figma → CSS 변환
const cssClasses = engine.figmaToCss(figmaStyles);
```

### 커스텀 설정

```typescript
import { StyleEngine, loadConfig, loadPreset } from 'cssma-v3';

// 커스텀 설정
const config = loadConfig({
  enableArbitraryValues: true,
  enableStateModifiers: true,
  enableResponsiveModifiers: true,
  separator: ':',
  strict: false
});

// 커스텀 프리셋
const preset = loadPreset('minimal');

// 커스텀 엔진 생성
const engine = new StyleEngine(config, preset);

// CSS → Figma 변환
const figmaStyles = engine.cssToFigma('bg-blue-500 text-white p-4 rounded-lg');
```

### 단일 클래스 파싱

```typescript
import { CSSParser, loadConfig, loadPreset } from 'cssma-v3';

// 파서 생성
const parser = new CSSParser(loadConfig(), loadPreset());

// 단일 클래스 파싱
const parsedClass = parser.parseClassName('hover:bg-blue-500');
```

## API 문서

### StyleEngine

CSS 파서와 변환기를 통합하는 엔진입니다.

```typescript
class StyleEngine {
  constructor(config?: ParserConfig, preset?: DesignPreset);
  
  // CSS → Figma 변환
  cssToFigma(cssClasses: string): any;
  
  // Figma → CSS 변환
  figmaToCss(figmaStyles: any): ConversionResult;
  
  // 단일 클래스 파싱
  parseClass(className: string): any;
  
  // 설정 및 프리셋 관리
  getConfig(): ParserConfig;
  getPreset(): DesignPreset;
  updateConfig(config: Partial<ParserConfig>): void;
  updatePreset(preset: DesignPreset): void;
}
```

### CSSParser

CSS 클래스를 파싱하여 구조화된 데이터로 변환합니다.

```typescript
class CSSParser {
  constructor(config?: ParserConfig, preset?: DesignPreset);
  
  // CSS 클래스 문자열 파싱
  parse(classNames: string): any;
  
  // 단일 CSS 클래스 파싱
  parseClassName(className: string): ParsedClass | null;
  
  // 브레이크포인트 설정 가져오기
  getBreakpointConfig(name: string): BreakpointConfig | null;
}
```

### StyleConverter

CSS와 Figma 스타일 간의 변환을 담당합니다.

```typescript
class StyleConverter {
  // CSS → Figma 변환
  cssToFigma(parsedData: any): any;
  
  // Figma → CSS 변환
  figmaToCss(figmaStyles: any): ConversionResult;
}
```

## 라이선스

MIT 