# CSSMA Preset 시스템 실제 사용 가이드 🎯

## 📋 현재 상황과 적용 방법

### **1. 지금 당장 할 수 있는 것들**

#### ✅ **기본 사용법 (이미 구현됨)**
```typescript
// packages/cssma/examples/preset-usage.ts에서 확인 가능
import { presetLoader } from '../src/config/preset-loader';

// 1. Tailwind v3 호환 preset 사용
const preset = await presetLoader.loadPreset('@cssma/preset-tailwind-v3');
console.log(preset.colors['red-500']); // { r: 0.937, g: 0.267, b: 0.267 }

// 2. Figma 최적화 preset 사용  
const figmaPreset = await presetLoader.loadPreset('@cssma/preset-figma-optimized');
console.log(figmaPreset.spacing['1']); // 8 (8px grid system)

// 3. 커스텀 확장
const customConfig = await presetLoader.loadConfig({
  preset: '@cssma/preset-minimal',
  extend: {
    colors: {
      'brand': { r: 0.2, g: 0.4, b: 1.0 }
    }
  }
});
```

### **2. 다음 단계: 기존 시스템에 통합**

#### 🔄 **현재 진행 중인 Bridge System과 통합**

**현재 상황**: `docs/todos/bridge-system.md`에서 Tailwind config를 Figma로 변환하는 시스템을 개발 중

**Preset 통합 방법**:
```typescript
// 기존 Bridge System에 Preset 지원 추가
import { presetLoader } from '../config/preset-loader';

// 1. Tailwind config 대신 CSSMA preset 사용
const bridge = new TailwindFigmaBridge();

// Before: Tailwind config 직접 파싱
await bridge.parseConfig(tailwindConfig);

// After: Preset을 통한 표준화된 파싱
const preset = await presetLoader.loadPreset('@cssma/preset-tailwind-v3');
await bridge.parseFromPreset(preset);
```

#### 🎯 **즉시 적용 가능한 개선사항**

**1. 현재 Parser들의 하드코딩된 값들을 Preset으로 교체**

```typescript
// packages/cssma/src/parser/class-names/spacing.ts (현재)
const SPACING_MAP = {
  "0": 0, "1": 4, "2": 8, "3": 12, "4": 16, "5": 20
  // ... 하드코딩된 값들
};

// 개선 후: Preset 기반
import { presetLoader } from '../../config/preset-loader';

export class SpacingParser {
  private spacingTokens: Record<string, number> = {};
  
  async initialize(config: CSSMAConfig = {}) {
    const preset = await presetLoader.loadConfig({
      preset: '@cssma/preset-tailwind-v3',
      ...config
    });
    this.spacingTokens = preset.spacing;
  }
  
  parseClassName(className: string): ParsedClassName | null {
    // this.spacingTokens 사용 (하드코딩 대신)
    const value = this.spacingTokens[spacingKey];
    return value ? { property: 'padding', value } : null;
  }
}
```

### **3. 실제 프로젝트에서 사용하는 방법**

#### 📁 **프로젝트 설정**

**Step 1: Configuration 파일 생성**
```javascript
// 프로젝트 루트에 cssma.config.js 생성
module.exports = {
  // 기본: Tailwind v3 완전 호환
  preset: '@cssma/preset-tailwind-v3',
  
  // 또는 Figma 최적화 (8px grid)
  // preset: '@cssma/preset-figma-optimized',
  
  // 커스텀 확장
  extend: {
    colors: {
      // 회사 브랜드 컬러
      'primary': { r: 0.2, g: 0.4, b: 1.0 },
      'secondary': { r: 0.8, g: 0.2, b: 0.4 }
    },
    spacing: {
      // 특별한 간격
      '18': 72,  // 18 * 4px
      '22': 88   // 22 * 4px  
    }
  }
};
```

**Step 2: 코드에서 사용**
```typescript
// React 컴포넌트에서
import { useCssma } from 'cssma-react';

function MyComponent() {
  // 자동으로 cssma.config.js 설정 적용
  const styles = useCssma('p-4 bg-primary text-white');
  
  return <div style={styles}>Hello World</div>;
}

// 또는 직접 파서 사용
import { CSSMAParser } from 'cssma';

const parser = new CSSMAParser();
// 설정 파일 자동 로드
await parser.initialize();

const result = parser.parseClassName('p-primary'); // 커스텀 spacing 사용
```

### **4. 팀/회사 표준 Preset 만들기**

#### 🏢 **회사 표준 Preset 패키지**

```typescript
// @company/cssma-preset/index.ts
import { CSSMAPreset } from 'cssma';

export const companyPreset: CSSMAPreset = {
  colors: {
    // 회사 브랜드 가이드라인
    'brand-primary': { r: 0.2, g: 0.4, b: 1.0 },
    'brand-secondary': { r: 0.8, g: 0.2, b: 0.4 },
    'brand-neutral': { r: 0.5, g: 0.5, b: 0.5 },
    
    // 기존 Tailwind 색상도 포함
    ...tailwindColors
  },
  spacing: {
    // 8px 기반 디자인 시스템
    '1': 8, '2': 16, '3': 24, '4': 32,
    
    // 특별한 간격들
    'header': 64,
    'section': 96,
    'container': 1200
  },
  typography: {
    fontFamily: {
      'sans': ['Inter', 'system-ui', 'sans-serif'],
      'brand': ['Poppins', 'sans-serif']
    }
  },
  figma: {
    // Figma Auto Layout 최적화
    useAutoLayout: true,
    gridSize: 8
  }
};
```

**팀에서 사용**:
```javascript
// cssma.config.js
module.exports = {
  preset: '@company/cssma-preset',
  extend: {
    // 프로젝트별 추가 설정
  }
};
```

### **5. 마이그레이션 전략**

#### 🔄 **기존 프로젝트에서 점진적 적용**

**Phase 1: 기본 설정 (Breaking Change 없음)**
```javascript
// cssma.config.js 추가만 하면 됨
module.exports = {
  preset: '@cssma/preset-tailwind-v3' // 기존과 100% 동일
};
```

**Phase 2: 점진적 최적화**
```javascript
// Figma 최적화로 전환 (일부 spacing 값 변경됨)
module.exports = {
  preset: '@cssma/preset-figma-optimized',
  
  // 기존 코드 호환성을 위한 override
  extend: {
    spacing: {
      '1': 4, // 기존 프로젝트에서 p-1이 4px이었다면
      '2': 8  // 점진적으로 8px grid로 전환
    }
  }
};
```

**Phase 3: 완전 최적화**
```javascript
// 회사 표준 preset 적용
module.exports = {
  preset: '@company/design-system-preset'
};
```

### **6. 개발 워크플로우에 통합**

#### 🛠️ **현재 개발 계획과의 통합**

**즉시 실행 가능한 작업** (docs/HOW-TO-PROCEED.md 기반):

```bash
# 1. 현재 feature/issue-55-bridge-system 브랜치에서
git status

# 2. Preset 통합 작업 추가
# - Bridge System에 Preset 지원 추가
# - 기존 Parser들을 Preset 기반으로 변경

# 3. 테스트 실행
pnpm test

# 4. 예제 코드로 검증
node packages/cssma/examples/preset-usage.ts
```

**다음 릴리즈에 포함될 내용**:
- ✅ Preset 시스템 (이미 구현됨)
- 🔄 Bridge System + Preset 통합 (진행 중)
- 📋 Configuration 파일 지원 (다음 단계)

### **7. 실제 사용 시나리오**

#### 🎨 **디자이너-개발자 협업**

**시나리오 1: 디자인 시스템 표준화**
```javascript
// 디자인팀에서 정의한 표준
// design-system.config.js
module.exports = {
  preset: '@cssma/preset-figma-optimized',
  extend: {
    colors: {
      'primary-50': { r: 0.95, g: 0.97, b: 1.0 },
      'primary-500': { r: 0.2, g: 0.4, b: 1.0 },
      'primary-900': { r: 0.1, g: 0.2, b: 0.5 }
    }
  }
};

// 개발자가 사용
const styles = useCssma('bg-primary-500 text-white p-4');
// → Figma에서 정확히 동일한 색상과 간격으로 렌더링
```

**시나리오 2: 다중 브랜드 지원**
```javascript
// Brand A
const brandAConfig = {
  preset: '@company/brand-a-preset'
};

// Brand B  
const brandBConfig = {
  preset: '@company/brand-b-preset'
};

// 런타임에 브랜드 전환
const parser = new CSSMAParser();
await parser.initialize(currentBrand === 'A' ? brandAConfig : brandBConfig);
```

## 🎯 **결론: 지금 바로 시작하는 방법**

### **1단계: 현재 브랜치에서 테스트**
```bash
# 이미 구현된 preset 시스템 테스트
cd packages/cssma
node examples/preset-usage.ts
```

### **2단계: Bridge System에 통합**
```bash
# docs/todos/preset-system-integration.md 따라서 구현
# 예상 소요시간: 3-4일
```

### **3단계: 프로덕션 적용**
```bash
# cssma.config.js 생성하여 팀 표준 적용
# 기존 코드 변경 없이 점진적 적용 가능
```

**핵심**: Preset 시스템은 이미 완성되어 있고, 이제 **기존 시스템들과 통합**하는 단계입니다! 🚀 