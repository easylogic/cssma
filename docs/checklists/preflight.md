# Tailwind CSS v4.1 Preflight 체크리스트

## 📋 개요
Preflight는 Tailwind CSS의 기본 스타일 시스템으로, modern-normalize 기반의 일관된 브라우저 동작을 제공합니다.
**참조**: [Tailwind CSS v4.1 Preflight 문서](https://tailwindcss.com/docs/preflight)

## ✅ 핵심 Preflight 기능 (총 65개 항목)

---

## 1. Base Reset System
**Priority: Critical | Items: 15/15**

### 1.1 Universal Reset
- [ ] **Universal Box Sizing** - `*, ::before, ::after { box-sizing: border-box; }`
- [ ] **Universal Margin Reset** - `*, ::before, ::after { margin: 0; }`
- [ ] **Universal Padding Reset** - `*, ::before, ::after { padding: 0; }`
- [ ] **Backdrop Reset** - `::backdrop { margin: 0; padding: 0; }`
- [ ] **File Selector Button Reset** - `::file-selector-button { margin: 0; padding: 0; }`

### 1.2 Border Reset
- [ ] **Default Border Style** - `*, ::before, ::after { border: 0 solid; }`
- [ ] **Border Box Sizing** - 모든 요소에 `border-box` 적용
- [ ] **Border Color Inheritance** - `border-color: currentColor` 기본값
- [ ] **Solid Border Default** - `border` 클래스 사용 시 1px solid 보장

### 1.3 Implementation Status
- [ ] Universal reset implementation
- [ ] Border system reset
- [ ] Pseudo-element reset
- [ ] File input reset
- [ ] Box sizing consistency

### 🧪 Test Cases
```html
<!-- Border reset test -->
<div class="border">Should have 1px solid currentColor border</div>
<div class="border border-red-500">Should have 1px solid red border</div>

<!-- Box sizing test -->
<div class="w-20 p-4 border-2">Width should include padding and border</div>
```

---

## 2. Typography Reset
**Priority: High | Items: 12/12**

### 2.1 Heading Reset
- [ ] **H1-H6 Font Size** - `h1, h2, h3, h4, h5, h6 { font-size: inherit; }`
- [ ] **H1-H6 Font Weight** - `h1, h2, h3, h4, h5, h6 { font-weight: inherit; }`
- [ ] **Semantic vs Visual** - 시각적 스타일과 의미적 구조 분리
- [ ] **Unstyled Headings** - 기본 브라우저 스타일 제거

### 2.2 List Reset
- [ ] **List Style None** - `ol, ul, menu { list-style: none; }`
- [ ] **Ordered List Reset** - 기본 번호 제거
- [ ] **Unordered List Reset** - 기본 불릿 제거
- [ ] **Menu Element Reset** - HTML5 menu 요소 스타일 제거

### 2.3 Accessibility Considerations
- [ ] **VoiceOver List Support** - `role="list"` 추천 사항
- [ ] **Screen Reader Compatibility** - 리스트 의미 유지
- [ ] **Semantic HTML** - 구조적 의미 보존

### 2.4 Implementation Status
- [ ] Heading reset system
- [ ] List reset system
- [ ] Accessibility compliance
- [ ] Screen reader support

### 🧪 Test Cases
```html
<!-- Heading reset test -->
<h1>Should inherit parent font size and weight</h1>
<h2 class="text-2xl font-bold">Should use utility classes for styling</h2>

<!-- List reset test -->
<ul>
  <li>Should have no bullets</li>
  <li>Should have no default styling</li>
</ul>

<!-- Accessible list -->
<ul role="list" class="list-disc list-inside">
  <li>Accessible list with styling</li>
  <li>Announces as list in screen readers</li>
</ul>
```

---

## 3. Media Element Reset
**Priority: High | Items: 10/10**

### 3.1 Block Display
- [ ] **Image Block Display** - `img { display: block; }`
- [ ] **SVG Block Display** - `svg { display: block; }`
- [ ] **Video Block Display** - `video { display: block; }`
- [ ] **Canvas Block Display** - `canvas { display: block; }`
- [ ] **Audio Block Display** - `audio { display: block; }`
- [ ] **Iframe Block Display** - `iframe { display: block; }`
- [ ] **Embed Block Display** - `embed { display: block; }`
- [ ] **Object Block Display** - `object { display: block; }`

### 3.2 Vertical Alignment
- [ ] **Middle Alignment** - `img, svg, video, canvas, audio, iframe, embed, object { vertical-align: middle; }`
- [ ] **Inline Override** - `inline` 유틸리티로 재정의 가능

### 3.3 Image Constraints
- [ ] **Max Width 100%** - `img, video { max-width: 100%; }`
- [ ] **Height Auto** - `img, video { height: auto; }`
- [ ] **Aspect Ratio Preservation** - 고유 비율 유지
- [ ] **Responsive by Default** - 컨테이너 넘침 방지

### 3.4 Implementation Status
- [ ] Media element display reset
- [ ] Vertical alignment reset
- [ ] Responsive image system
- [ ] Aspect ratio preservation

### 🧪 Test Cases
```html
<!-- Block display test -->
<img src="image.jpg" alt="Should be block by default" />
<img src="image.jpg" alt="Should be inline" class="inline" />

<!-- Responsive test -->
<div class="w-64">
  <img src="large-image.jpg" alt="Should not overflow container" />
</div>

<!-- Override responsive -->
<img src="image.jpg" alt="Can overflow" class="max-w-none" />
```

---

## 4. Form Element Reset
**Priority: Medium | Items: 8/8**

### 4.1 Input Reset
- [ ] **Input Font Inheritance** - `input { font: inherit; }`
- [ ] **Input Color Inheritance** - `input { color: inherit; }`
- [ ] **Input Margin Reset** - `input { margin: 0; }`

### 4.2 Button Reset
- [ ] **Button Font Inheritance** - `button { font: inherit; }`
- [ ] **Button Color Inheritance** - `button { color: inherit; }`
- [ ] **Button Background** - `button { background: transparent; }`
- [ ] **Button Border Reset** - `button { border: 0; }`

### 4.3 Form Control Reset
- [ ] **Textarea Reset** - `textarea { font: inherit; color: inherit; }`
- [ ] **Select Reset** - `select { font: inherit; color: inherit; }`

### 4.4 Implementation Status
- [ ] Input element reset
- [ ] Button element reset
- [ ] Form control consistency

### 🧪 Test Cases
```html
<!-- Form element inheritance -->
<form class="text-lg font-bold text-blue-600">
  <input type="text" placeholder="Should inherit font and color" />
  <button>Should inherit font and color</button>
  <textarea>Should inherit font and color</textarea>
</form>
```

---

## 5. Modern CSS Features
**Priority: Medium | Items: 12/12**

### 5.1 CSS Custom Properties Support
- [ ] **Theme Variables** - CSS variables 지원
- [ ] **Runtime Theming** - 동적 테마 변경
- [ ] **Cascade Layer Support** - `@layer` 지원

### 5.2 Modern Normalize Integration
- [ ] **Modern Normalize Base** - Latest normalize.css 기반
- [ ] **CSS Grid Support** - 그리드 레이아웃 정규화
- [ ] **Flexbox Support** - 플렉스 레이아웃 정규화
- [ ] **Custom Properties** - CSS 변수 정규화

### 5.3 Progressive Enhancement
- [ ] **Feature Detection** - `@supports` 쿼리 지원
- [ ] **Graceful Degradation** - 구형 브라우저 대응
- [ ] **Vendor Prefix Handling** - 자동 벤더 프리픽스

### 5.4 Implementation Status
- [ ] Modern CSS feature support
- [ ] Progressive enhancement
- [ ] Browser compatibility
- [ ] Feature detection

### 🧪 Test Cases
```html
<!-- Modern CSS features -->
<div class="grid grid-cols-3 gap-4">Should work with CSS Grid</div>
<div class="flex justify-center">Should work with Flexbox</div>
```

---

## 6. Layer System Integration
**Priority: High | Items: 8/8**

### 6.1 CSS Layers
- [ ] **Base Layer** - `@layer base` 내 Preflight 배치
- [ ] **Layer Order** - `@layer theme, base, components, utilities`
- [ ] **Cascade Control** - 계층적 스타일 우선순위

### 6.2 Import System
- [ ] **Automatic Import** - `@import "tailwindcss"` 시 자동 포함
- [ ] **Manual Import** - `@import "tailwindcss/preflight.css" layer(base)`
- [ ] **Selective Import** - 필요한 부분만 선택적 임포트

### 6.3 Disable Options
- [ ] **Complete Disable** - Preflight 완전 비활성화
- [ ] **Partial Disable** - 특정 부분만 비활성화
- [ ] **Custom Base Styles** - 사용자 정의 기본 스타일

### 6.4 Implementation Status
- [ ] Layer system integration
- [ ] Import mechanism
- [ ] Disable functionality
- [ ] Custom base style support

### 🧪 Test Cases
```css
/* Automatic import */
@import "tailwindcss";

/* Manual import without Preflight */
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);

/* Custom base styles */
@layer base {
  h1 { font-size: var(--text-2xl); }
  a { color: var(--color-blue-600); }
}
```

---

## 7. Third-Party Integration
**Priority: Medium | Items: 10/10**

### 7.1 Library Compatibility
- [ ] **Google Maps** - 지도 라이브러리 호환성
- [ ] **Chart Libraries** - 차트 라이브러리 호환성
- [ ] **Widget Integration** - 서드파티 위젯 호환성

### 7.2 Override Mechanisms
- [ ] **Selective Override** - 특정 요소 Preflight 무효화
- [ ] **Namespace Isolation** - 네임스페이스 기반 격리
- [ ] **Component Boundaries** - 컴포넌트 경계 보호

### 7.3 Custom Overrides
```css
@layer base {
  .google-map * {
    border-style: none;
  }
  
  .chart-container * {
    box-sizing: content-box;
  }
  
  .legacy-widget {
    all: revert;
  }
}
```

### 7.4 Implementation Status
- [ ] Third-party compatibility
- [ ] Override system
- [ ] Isolation mechanisms
- [ ] Legacy support

### 🧪 Test Cases
```html
<!-- Third-party integration -->
<div class="google-map">
  <!-- Google Maps API should work without conflicts -->
</div>

<div class="chart-container">
  <!-- Chart.js should work without box-sizing issues -->
</div>
```

---

## 8. Parser Implementation
**Priority: Critical | Items: 15/15**

### 8.1 Preflight Detection
- [ ] **Auto-injection** - Tailwind import 시 자동 Preflight 포함
- [ ] **Manual Control** - 수동 Preflight 제어
- [ ] **Conditional Loading** - 조건부 Preflight 로딩

### 8.2 CSS Generation
- [ ] **Modern Normalize** - normalize.css 생성
- [ ] **Reset Styles** - 리셋 스타일 생성
- [ ] **Base Utilities** - 기본 유틸리티 생성

### 8.3 Runtime Integration
- [ ] **Dynamic Injection** - 런타임 Preflight 주입
- [ ] **SSR Support** - 서버사이드 렌더링 지원
- [ ] **Hydration** - 클라이언트 하이드레이션

### 8.4 cssma-v3 Integration
- [ ] **Figma Compatibility** - Figma 스타일과 호환성
- [ ] **Style Override** - Figma 기본값 우선순위
- [ ] **Reset Handling** - 리셋과 Figma 스타일 조합

### 8.5 Implementation Status
- [ ] Preflight parser implementation
- [ ] CSS generation system
- [ ] Runtime integration
- [ ] Figma compatibility
- [ ] Override mechanisms

### 🧪 Test Cases
```typescript
// cssma-v3 Preflight integration test
const parser = new CSSParser(config);
const styles = parser.parseWithPreflight('border bg-blue-500');

expect(styles).toInclude({
  // Preflight styles
  boxSizing: 'border-box',
  margin: '0',
  padding: '0',
  border: '0 solid',
  
  // Utility styles
  borderWidth: '1px',
  backgroundColor: 'rgb(59 130 246)'
});
```

---

## 9. Configuration Options
**Priority: Medium | Items: 8/8**

### 9.1 Enable/Disable
- [ ] **Global Enable** - Preflight 전역 활성화
- [ ] **Global Disable** - Preflight 전역 비활성화
- [ ] **Selective Enable** - 특정 부분만 활성화
- [ ] **Component-level Control** - 컴포넌트별 제어

### 9.2 Customization
- [ ] **Custom Reset Values** - 사용자 정의 리셋 값
- [ ] **Additional Base Styles** - 추가 기본 스타일
- [ ] **Override Patterns** - 오버라이드 패턴

### 9.3 Implementation Status
- [ ] Configuration system
- [ ] Enable/disable controls
- [ ] Customization options
- [ ] Override mechanisms

### 🧪 Test Cases
```typescript
// Configuration test
const config: Config = {
  preflight: {
    enabled: true,
    customReset: {
      'h1, h2, h3': { fontWeight: 'bold' },
      'button': { cursor: 'pointer' }
    },
    exclude: ['.legacy-component *']
  }
};
```

---

## 🎯 Implementation Priority

### Phase 1: Core Reset (Critical)
1. ✅ Universal reset (margin, padding, box-sizing)
2. ✅ Border reset system
3. ❌ Typography reset (headings, lists)
4. ❌ Media element reset

### Phase 2: Integration (High)
1. ❌ Layer system integration
2. ❌ Import/disable mechanisms
3. ❌ cssma-v3 compatibility
4. ❌ Runtime injection

### Phase 3: Advanced Features (Medium)
1. ❌ Third-party compatibility
2. ❌ Configuration system
3. ❌ Custom overrides
4. ❌ Modern CSS features

---

## 🔗 Related Files

- [Preflight Implementation](../../packages/cssma-v3/src/core/preflight.ts)
- [Parser Integration](../../packages/cssma-v3/src/core/parser.ts)
- [CSS Generation](../../packages/cssma-v3/src/core/generator.ts)

---

## 📊 완성도 추적

**전체 Preflight 시스템: 0% (0/65 완료)**

- Core Reset: 0/15 ❌
- Typography: 0/12 ❌
- Media Elements: 0/10 ❌
- Form Elements: 0/8 ❌
- Modern Features: 0/12 ❌
- Layer System: 0/8 ❌
- Third-party: 0/10 ❌
- Parser Implementation: 0/15 ❌ 