# 🌙 다크모드 사용 가이드

CSSMA v2는 Tailwind CSS와 유사한 다크모드 시스템을 제공합니다. 이 가이드에서는 다크모드를 설정하고 사용하는 방법을 설명합니다.

## 목차

- [기본 개념](#기본-개념)
- [설정 방법](#설정-방법)
- [다크모드 클래스 사용하기](#다크모드-클래스-사용하기)
- [다크모드 유틸리티 함수](#다크모드-유틸리티-함수)
- [커스텀 다크모드 설정](#커스텀-다크모드-설정)
- [다크모드 예제](#다크모드-예제)

## 기본 개념

CSSMA v2의 다크모드는 두 가지 전략을 지원합니다:

1. **클래스 기반 다크모드 (`'class'`)**:
   - HTML 요소에 `.dark` 클래스가 있을 때 다크모드 스타일이 적용됩니다.
   - 사용자가 직접 다크모드를 토글할 수 있습니다.
   - 기본 설정입니다.

2. **미디어 쿼리 기반 다크모드 (`'media'`)**:
   - 사용자의 시스템 설정(`prefers-color-scheme: dark`)에 따라 자동으로 다크모드가 적용됩니다.
   - 사용자가 브라우저나 운영체제에서 다크모드를 활성화했을 때 자동으로 적용됩니다.

## 설정 방법

### 기본 설정 (클래스 기반)

```typescript
import { createPreset } from 'cssma-v2';

const myPreset = createPreset({
  // 다른 설정들...
  darkMode: {
    enabled: true,
    strategy: 'class',
    className: 'dark' // 기본값
  }
});
```

### 미디어 쿼리 기반 설정

```typescript
import { createPreset } from 'cssma-v2';

const myPreset = createPreset({
  // 다른 설정들...
  darkMode: {
    enabled: true,
    strategy: 'media'
  }
});
```

### 자동 감지 설정 (클래스 기반 + 시스템 설정 감지)

```typescript
import { createPreset } from 'cssma-v2';

const myPreset = createPreset({
  // 다른 설정들...
  darkMode: {
    enabled: true,
    strategy: 'class',
    className: 'dark',
    autoDetect: true,
    fallback: 'light' // 'light' 또는 'dark'
  }
});
```

## 다크모드 클래스 사용하기

다크모드 클래스는 `dark:` 접두사를 사용하여 정의합니다.

```html
<div class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
  이 요소는 라이트 모드에서는 흰색 배경에 어두운 텍스트를 가지며,
  다크 모드에서는 어두운 배경에 흰색 텍스트를 가집니다.
</div>
```

## 다크모드 유틸리티 함수

CSSMA v2는 다크모드를 쉽게 관리할 수 있는 유틸리티 함수를 제공합니다.

### 다크모드 초기화

```typescript
import { initDarkMode } from 'cssma-v2';

// 기본 설정으로 초기화
initDarkMode();

// 커스텀 설정으로 초기화
initDarkMode({
  className: 'night-mode', // 기본값: 'dark'
  storageKey: 'my-theme', // 기본값: 'cssma-theme'
  defaultMode: 'system' // 'light', 'dark', 'system' 중 하나
});
```

### 다크모드 토글

```typescript
import { toggleDarkMode } from 'cssma-v2';

// 다크모드 토글
toggleDarkMode('toggle');

// 다크모드로 설정
toggleDarkMode('dark');

// 라이트모드로 설정
toggleDarkMode('light');

// 시스템 설정에 따라 자동 설정
toggleDarkMode('system');

// 커스텀 클래스명 사용
toggleDarkMode('dark', { className: 'night-mode' });
```

### 다크모드 상태 확인

```typescript
import { isDarkMode } from 'cssma-v2';

if (isDarkMode()) {
  // 다크모드일 때 수행할 작업
}
```

## 커스텀 다크모드 설정

### 커스텀 클래스명 사용하기

기본값인 `.dark` 대신 다른 클래스명을 사용할 수 있습니다.

```typescript
// 프리셋 설정에서 클래스명 변경
const myPreset = createPreset({
  // 다른 설정들...
  darkMode: {
    enabled: true,
    strategy: 'class',
    className: 'night-mode' // 'dark' 대신 'night-mode' 사용
  }
});

// 다크모드 유틸리티 함수에서 클래스명 지정
initDarkMode({ className: 'night-mode' });
toggleDarkMode('dark', { className: 'night-mode' });
```

## 다크모드 예제

### 기본 다크모드 토글 구현

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>다크모드 예제</title>
  <script src="path/to/cssma.min.js"></script>
  <style>
    /* 라이트 모드 스타일 */
    body {
      background-color: #ffffff;
      color: #333333;
    }
    
    /* 다크 모드 스타일 */
    .dark body {
      background-color: #121212;
      color: #ffffff;
    }
  </style>
</head>
<body>
  <h1>다크모드 예제</h1>
  <button id="toggle-dark-mode">다크모드 토글</button>
  
  <script>
    // 다크모드 초기화
    cssma.initDarkMode();
    
    // 토글 버튼 이벤트 리스너
    document.getElementById('toggle-dark-mode').addEventListener('click', function() {
      cssma.toggleDarkMode('toggle');
    });
  </script>
</body>
</html>
```

### 시스템 설정 기반 다크모드 구현

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>시스템 설정 기반 다크모드</title>
  <script src="path/to/cssma.min.js"></script>
  <style>
    /* 스타일 정의 */
  </style>
</head>
<body>
  <h1>시스템 설정 기반 다크모드</h1>
  <div id="mode-display"></div>
  
  <script>
    // 시스템 설정 기반으로 다크모드 초기화
    cssma.initDarkMode({ defaultMode: 'system' });
    
    // 현재 모드 표시
    const modeDisplay = document.getElementById('mode-display');
    modeDisplay.textContent = `현재 모드: ${cssma.isDarkMode() ? '다크' : '라이트'}`;
    
    // 시스템 설정 변경 감지
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      if (localStorage.getItem('cssma-theme') === null) { // 사용자가 직접 설정하지 않은 경우에만
        cssma.toggleDarkMode('system');
        modeDisplay.textContent = `현재 모드: ${cssma.isDarkMode() ? '다크' : '라이트'}`;
      }
    });
  </script>
</body>
</html>
```

## 고급 다크모드 팁

### 다크모드 전환 애니메이션

부드러운 전환 효과를 위해 CSS 전환(transition)을 추가할 수 있습니다.

```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.card {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
```

### 다크모드 이미지 처리

다크모드에서 이미지를 다르게 표시하려면 다음과 같이 할 수 있습니다.

```html
<img src="light-logo.png" class="dark:hidden">
<img src="dark-logo.png" class="hidden dark:block">
```

### 다크모드 SVG 색상 변경

SVG 아이콘의 색상을 다크모드에 맞게 변경할 수 있습니다.

```html
<svg class="fill-gray-900 dark:fill-white" viewBox="0 0 24 24">
  <!-- SVG 내용 -->
</svg>
```

## 결론

CSSMA v2의 다크모드 시스템은 Tailwind CSS와 유사한 방식으로 작동하며, 클래스 기반 또는 미디어 쿼리 기반 다크모드를 쉽게 구현할 수 있습니다. 다크모드 유틸리티 함수를 사용하면 다크모드를 더 쉽게 관리할 수 있습니다.

더 많은 예제는 `examples/dark-mode-demo.html` 파일을 참조하세요. 