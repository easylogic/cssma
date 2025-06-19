# CSSMA Preset System Design

## 🎯 Overview

CSSMA의 preset 시스템은 Tailwind CSS와 완벽 호환되면서도 Figma 특화 기능을 제공하는 설정 시스템입니다.

## 🏗️ Architecture

### Core Preset Interface

```typescript
interface CSSMAPreset {
  // 기본 토큰 정의
  colors?: Record<string, FigmaColor>;
  spacing?: Record<string, number>;
  typography?: {
    fontSizes?: Record<string, number>;
    fontWeights?: Record<string, FontWeight>;
    fontFamilies?: Record<string, string>;
  };
  
  // Figma 특화 설정
  figma?: {
    autoLayout?: boolean;
    constraints?: boolean;
    variables?: Record<string, string>;
  };
  
  // 호환성 설정
  compatibility?: {
    tailwind?: 'v3' | 'v4';
    strictMode?: boolean;
  };
  
  // 확장 설정
  extend?: Partial<CSSMAPreset>;
}
```

## 📦 Preset Packages

### 1. cssma-preset-tailwind-v3
```javascript
// @cssma/preset-tailwind-v3
module.exports = {
  colors: {
    // Tailwind v3 전체 색상 팔레트
    'red-50': { r: 0.971, g: 0.013, b: 17.38 },
    'red-100': { r: 0.936, g: 0.032, b: 17.717 },
    // ... 전체 색상
  },
  spacing: {
    // Tailwind v3 spacing scale
    '0': 0, 'px': 1, '0.5': 2, '1': 4, '1.5': 6,
    '2': 8, '2.5': 10, '3': 12, '3.5': 14, '4': 16,
    // ... 전체 spacing
  },
  compatibility: {
    tailwind: 'v3',
    strictMode: true
  }
}
```

### 2. cssma-preset-tailwind-v4
```javascript
// @cssma/preset-tailwind-v4
module.exports = {
  colors: {
    // v4 oklch 색상 시스템
    'red-50': 'oklch(0.971 0.013 17.38)',
    'red-100': 'oklch(0.936 0.032 17.717)',
    // ...
  },
  spacing: {
    // v4 직관적 spacing (16 = 16px)
    '0': 0, '1': 1, '2': 2, '4': 4, '8': 8,
    '12': 12, '16': 16, '20': 20, '24': 24,
    // ...
  },
  compatibility: {
    tailwind: 'v4',
    strictMode: false // v4는 더 유연함
  }
}
```

### 3. cssma-preset-minimal
```javascript
// @cssma/preset-minimal
module.exports = {
  colors: {
    'white': { r: 1, g: 1, b: 1 },
    'black': { r: 0, g: 0, b: 0 },
    'gray': { r: 0.5, g: 0.5, b: 0.5 },
    'primary': { r: 0.2, g: 0.4, b: 1 },
    'secondary': { r: 0.8, g: 0.2, b: 0.4 }
  },
  spacing: {
    'xs': 4, 'sm': 8, 'md': 16, 'lg': 24, 'xl': 32
  },
  typography: {
    fontSizes: {
      'sm': 12, 'base': 16, 'lg': 20, 'xl': 24
    }
  }
}
```

### 4. cssma-preset-figma-optimized
```javascript
// @cssma/preset-figma-optimized
module.exports = {
  // Figma Auto Layout에 최적화된 설정
  spacing: {
    // 8px 그리드 시스템 (Figma 권장)
    '0': 0, '1': 8, '2': 16, '3': 24, '4': 32,
    '5': 40, '6': 48, '8': 64, '10': 80, '12': 96
  },
  figma: {
    autoLayout: true,
    constraints: true,
    variables: {
      'spacing-unit': '8px',
      'border-radius-base': '8px'
    }
  },
  compatibility: {
    strictMode: false // Figma 친화적 유연성
  }
}
```

## 🔧 Usage Examples

### Basic Usage
```javascript
// cssma.config.js
module.exports = {
  preset: '@cssma/preset-tailwind-v3'
}
```

### Multiple Presets
```javascript
// cssma.config.js
module.exports = {
  presets: [
    '@cssma/preset-tailwind-v3',
    '@cssma/preset-figma-optimized'
  ]
}
```

### Custom Extension
```javascript
// cssma.config.js
module.exports = {
  preset: '@cssma/preset-tailwind-v3',
  extend: {
    colors: {
      'brand-primary': { r: 0.2, g: 0.4, b: 1 },
      'brand-secondary': { r: 0.8, g: 0.2, b: 0.4 }
    },
    spacing: {
      '18': 72, // 18 * 4px = 72px
      '22': 88  // 22 * 4px = 88px
    }
  }
}
```

### Company Preset
```javascript
// @acme/cssma-preset
module.exports = {
  preset: '@cssma/preset-tailwind-v3',
  colors: {
    // Acme 브랜드 색상
    'acme-blue': { r: 0.1, g: 0.3, b: 0.8 },
    'acme-red': { r: 0.9, g: 0.1, b: 0.2 },
    'acme-gray': { r: 0.5, g: 0.5, b: 0.5 }
  },
  typography: {
    fontFamilies: {
      'brand': 'Acme Sans, sans-serif'
    }
  }
}
```

## 🔄 Migration Strategy

### Phase 1: Core System
1. Preset loader 구현
2. 기본 merge 로직 구현
3. Tailwind v3 preset 패키지 생성

### Phase 2: Ecosystem
1. Tailwind v4 preset 추가
2. Figma 최적화 preset 추가
3. 커뮤니티 preset 템플릿 제공

### Phase 3: Advanced Features
1. 동적 preset 로딩
2. 프리셋 검증 시스템
3. 마이그레이션 도구

## 🎯 Benefits

### For Developers
- **완벽한 Tailwind 호환성**: 기존 지식 그대로 활용
- **점진적 마이그레이션**: 기존 프로젝트 쉽게 전환
- **팀 일관성**: 회사/팀 표준 preset 공유

### For Teams
- **브랜드 일관성**: 단일 소스 진실
- **개발 속도**: 설정 재사용으로 빠른 시작
- **유지보수성**: 중앙화된 디자인 토큰 관리

### For Ecosystem
- **생태계 확장**: 커뮤니티 preset 생성 가능
- **표준화**: 업계 표준 preset 제공
- **혁신**: Figma 특화 기능으로 차별화 