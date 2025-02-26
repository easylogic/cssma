# @figma-tokens/css-to-figma

Tailwind CSS 스타일을 Figma 스타일로 변환하는 라이브러리입니다.

## 설치

```bash
npm install @figma-tokens/css-to-figma
```

## 사용법

```typescript
import { convertStyles } from '@figma-tokens/css-to-figma';

// 단일 속성 변환
const styles = convertStyles('bg-blue-500');
console.log(styles);
// {
//   fills: [{
//     type: 'SOLID',
//     color: { r: 0.24, g: 0.47, b: 0.95 }
//   }]
// }

// 여러 속성 변환
const cardStyles = convertStyles('flex flex-col rounded-lg shadow-md p-4 bg-white');
console.log(cardStyles);
// {
//   layout: {
//     layoutMode: 'VERTICAL',
//     layoutWrap: 'NO_WRAP',
//     paddingTop: 16,
//     paddingRight: 16,
//     paddingBottom: 16,
//     paddingLeft: 16
//   },
//   geometry: {
//     cornerRadius: 8
//   },
//   effects: [{
//     type: 'DROP_SHADOW',
//     color: { r: 0, g: 0, b: 0, a: 0.1 },
//     offset: { x: 0, y: 4 },
//     radius: 6,
//     spread: -2,
//     visible: true,
//     blendMode: 'NORMAL'
//   }],
//   fills: [{
//     type: 'SOLID',
//     color: { r: 1, g: 1, b: 1 }
//   }]
// }
```

## 지원하는 속성

### 레이아웃
- Flex 방향: `flex-row`, `flex-col`
- Flex 줄바꿈: `flex-wrap`, `flex-nowrap`
- 정렬: `justify-start`, `justify-center`, `justify-end`, `justify-between`
- 교차축 정렬: `items-start`, `items-center`, `items-end`, `items-baseline`
- 간격: `gap-{size}`, `gap-x-{size}`, `gap-y-{size}`
- 패딩: `p-{size}`, `px-{size}`, `py-{size}`, `pt-{size}`, `pr-{size}`, `pb-{size}`, `pl-{size}`

### 타이포그래피
- 글꼴 크기: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`
- 글꼴 두께: `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- 텍스트 정렬: `text-left`, `text-center`, `text-right`, `text-justify`
- 행간: `leading-none`, `leading-tight`, `leading-normal`, `leading-relaxed`
- 자간: `tracking-tighter`, `tracking-tight`, `tracking-normal`, `tracking-wide`
- 텍스트 장식: `underline`, `line-through`, `no-underline`

### 효과
- 그림자: `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`
- 내부 그림자: `shadow-inner`
- 색상 그림자: `shadow-{color}-{opacity}`
- 블러: `blur-sm`, `blur`, `blur-md`, `blur-lg`
- 배경 블러: `backdrop-blur-{size}`

### 기하학적 속성
- 모서리 반경: `rounded-sm`, `rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`
- 개별 모서리: `rounded-{t|r|b|l}-{size}`, `rounded-{tl|tr|br|bl}-{size}`
- 테두리 두께: `border`, `border-{width}`
- 테두리 위치: `stroke-inside`, `stroke-center`, `stroke-outside`

## 라이선스

MIT
