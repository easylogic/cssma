# Responsive Design - Tailwind CSS v4.1 구현 체크리스트

## 📋 개요
Responsive Design은 다양한 화면 크기와 컨테이너 크기에 따라 스타일을 적용하는 기능들을 포함합니다.
**참조**: [Tailwind CSS v4.1 Responsive Design](https://tailwindcss.com/docs/responsive-design) 문서

## ✅ Breakpoint System

### 🔍 Default Breakpoints

#### Mobile-First Breakpoints
- [ ] **Small (sm)**
  - [ ] `sm:*` → `@media (width >= 40rem) { ... }`
  - [ ] 640px (40rem) 이상

- [ ] **Medium (md)**
  - [ ] `md:*` → `@media (width >= 48rem) { ... }`
  - [ ] 768px (48rem) 이상

- [ ] **Large (lg)**
  - [ ] `lg:*` → `@media (width >= 64rem) { ... }`
  - [ ] 1024px (64rem) 이상

- [ ] **Extra Large (xl)**
  - [ ] `xl:*` → `@media (width >= 80rem) { ... }`
  - [ ] 1280px (80rem) 이상

- [ ] **2X Large (2xl)**
  - [ ] `2xl:*` → `@media (width >= 96rem) { ... }`
  - [ ] 1536px (96rem) 이상

### 🔍 Max-Width Breakpoints

#### Max-Width Variants
- [ ] **Max Small**
  - [ ] `max-sm:*` → `@media (width < 40rem) { ... }`
  - [ ] 640px 미만

- [ ] **Max Medium**
  - [ ] `max-md:*` → `@media (width < 48rem) { ... }`
  - [ ] 768px 미만

- [ ] **Max Large**
  - [ ] `max-lg:*` → `@media (width < 64rem) { ... }`
  - [ ] 1024px 미만

- [ ] **Max Extra Large**
  - [ ] `max-xl:*` → `@media (width < 80rem) { ... }`
  - [ ] 1280px 미만

- [ ] **Max 2X Large**
  - [ ] `max-2xl:*` → `@media (width < 96rem) { ... }`
  - [ ] 1536px 미만

### 🔍 Breakpoint Ranges

#### Range Targeting
- [ ] **Single Breakpoint Range**
  - [ ] `md:max-lg:*` → `@media (width >= 48rem) and (width < 64rem)`
  - [ ] 특정 범위에서만 적용

- [ ] **Multi-Breakpoint Ranges**
  - [ ] `sm:max-xl:*` → `@media (width >= 40rem) and (width < 80rem)`
  - [ ] 더 넓은 범위 타겟팅

### 🧪 Test Cases

```html
<!-- Mobile-first responsive -->
<div class="w-16 md:w-32 lg:w-48">
  Responsive width
</div>

<!-- Max-width variants -->
<div class="block max-md:hidden lg:block">
  Hidden on medium and below
</div>

<!-- Breakpoint ranges -->
<div class="hidden md:max-lg:block">
  Only visible between md and lg
</div>

<!-- Complex responsive layout -->
<div class="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
  <div class="md:flex">
    <div class="md:shrink-0">
      <img class="h-48 w-full object-cover md:h-full md:w-48" src="/img/building.jpg" />
    </div>
    <div class="p-8">
      <div class="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
        Company retreats
      </div>
      <a href="#" class="mt-1 block text-lg leading-tight font-medium text-black hover:underline">
        Incredible accommodation for your team
      </a>
      <p class="mt-2 text-gray-500">
        Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine?
      </p>
    </div>
  </div>
</div>
```

---

## ✅ Custom Breakpoints

### 🔍 Theme Customization

#### Custom Breakpoint Variables
- [ ] **Theme Variables**
  - [ ] `--breakpoint-*` theme variable 지원
  - [ ] `--breakpoint-xs: 30rem` 새 breakpoint 생성
  - [ ] `--breakpoint-3xl: 120rem` 추가 breakpoint

- [ ] **Breakpoint Updates**
  - [ ] `--breakpoint-2xl: 100rem` 기존 breakpoint 수정
  - [ ] rem 단위 일관성 유지

#### Removing Breakpoints
- [ ] **Single Breakpoint Removal**
  - [ ] `--breakpoint-2xl: initial` 특정 breakpoint 제거

- [ ] **All Breakpoints Reset**
  - [ ] `--breakpoint-*: initial` 모든 기본 breakpoint 제거
  - [ ] 완전 커스텀 breakpoint 시스템

### 🔍 Arbitrary Breakpoints

#### Min/Max Arbitrary Values
- [ ] **Min Width**
  - [ ] `min-[320px]:*` → `@media (width >= 320px)`
  - [ ] `min-[40rem]:*` → `@media (width >= 40rem)`

- [ ] **Max Width**
  - [ ] `max-[600px]:*` → `@media (width < 600px)`
  - [ ] `max-[50rem]:*` → `@media (width < 50rem)`

### 🧪 Test Cases

```css
/* Custom theme configuration */
@import "tailwindcss";
@theme {
  --breakpoint-xs: 30rem;
  --breakpoint-2xl: 100rem;
  --breakpoint-3xl: 120rem;
}
```

```html
<!-- Custom breakpoints usage -->
<div class="grid xs:grid-cols-2 3xl:grid-cols-6">
  Custom breakpoint grid
</div>

<!-- Arbitrary breakpoints -->
<div class="max-[600px]:bg-sky-300 min-[320px]:text-center">
  One-off breakpoints
</div>
```

---

## ✅ Container Queries

### 🔍 Basic Container Queries

#### Container Setup
- [ ] **Container Class**
  - [ ] `@container` 클래스로 컨테이너 마킹
  - [ ] Container context 생성

#### Container Size Variants
- [ ] **Extra Small Containers**
  - [ ] `@3xs:*` → `@container (width >= 16rem)` (256px)
  - [ ] `@2xs:*` → `@container (width >= 18rem)` (288px)
  - [ ] `@xs:*` → `@container (width >= 20rem)` (320px)

- [ ] **Small to Medium Containers**
  - [ ] `@sm:*` → `@container (width >= 24rem)` (384px)
  - [ ] `@md:*` → `@container (width >= 28rem)` (448px)
  - [ ] `@lg:*` → `@container (width >= 32rem)` (512px)

- [ ] **Large Containers**
  - [ ] `@xl:*` → `@container (width >= 36rem)` (576px)
  - [ ] `@2xl:*` → `@container (width >= 42rem)` (672px)
  - [ ] `@3xl:*` → `@container (width >= 48rem)` (768px)

- [ ] **Extra Large Containers**
  - [ ] `@4xl:*` → `@container (width >= 56rem)` (896px)
  - [ ] `@5xl:*` → `@container (width >= 64rem)` (1024px)
  - [ ] `@6xl:*` → `@container (width >= 72rem)` (1152px)
  - [ ] `@7xl:*` → `@container (width >= 80rem)` (1280px)

### 🔍 Max-Width Container Queries

#### Max Container Variants
- [ ] **Max Container Sizes**
  - [ ] `@max-3xs:*` → `@container (width < 16rem)`
  - [ ] `@max-2xs:*` → `@container (width < 18rem)`
  - [ ] `@max-xs:*` → `@container (width < 20rem)`
  - [ ] `@max-sm:*` → `@container (width < 24rem)`
  - [ ] `@max-md:*` → `@container (width < 28rem)`
  - [ ] `@max-lg:*` → `@container (width < 32rem)`
  - [ ] `@max-xl:*` → `@container (width < 36rem)`
  - [ ] `@max-2xl:*` → `@container (width < 42rem)`
  - [ ] `@max-3xl:*` → `@container (width < 48rem)`
  - [ ] `@max-4xl:*` → `@container (width < 56rem)`
  - [ ] `@max-5xl:*` → `@container (width < 64rem)`
  - [ ] `@max-6xl:*` → `@container (width < 72rem)`
  - [ ] `@max-7xl:*` → `@container (width < 80rem)`

### 🔍 Container Query Ranges

#### Range Targeting
- [ ] **Container Ranges**
  - [ ] `@sm:@max-md:*` → `@container (width >= 24rem) and (width < 28rem)`
  - [ ] 특정 컨테이너 크기 범위 타겟팅

### 🔍 Named Containers

#### Named Container Support
- [ ] **Named Container Class**
  - [ ] `@container/{name}` 클래스로 컨테이너 이름 지정
  - [ ] 중첩된 컨테이너 구분

- [ ] **Named Container Variants**
  - [ ] `@sm/{name}:*` → `@container {name} (width >= 24rem)`
  - [ ] `@md/{name}:*` → `@container {name} (width >= 28rem)`
  - [ ] 모든 container sizes에 대한 named variants

### 🔍 Custom Container Sizes

#### Theme Customization
- [ ] **Container Theme Variables**
  - [ ] `--container-*` theme variables 지원
  - [ ] `--container-8xl: 96rem` 새 container size

#### Arbitrary Container Values
- [ ] **Arbitrary Container Queries**
  - [ ] `@min-[475px]:*` → `@container (width >= 475px)`
  - [ ] `@max-[960px]:*` → `@container (width < 960px)`

### 🔍 Container Query Units

#### CQ Units Support
- [ ] **Container Query Length Units**
  - [ ] `cqw` (container query width) 단위 지원
  - [ ] `cqh` (container query height) 단위 지원
  - [ ] `cqi` (container query inline-size) 단위 지원
  - [ ] `cqb` (container query block-size) 단위 지원
  - [ ] `cqmin` (container query minimum) 단위 지원
  - [ ] `cqmax` (container query maximum) 단위 지원

### 🧪 Test Cases

```html
<!-- Basic container queries -->
<div class="@container">
  <div class="flex flex-col @md:flex-row">
    Container responsive layout
  </div>
</div>

<!-- Max-width container queries -->
<div class="@container">
  <div class="flex flex-row @max-md:flex-col">
    Container max-width behavior
  </div>
</div>

<!-- Container query ranges -->
<div class="@container">
  <div class="flex flex-row @sm:@max-md:flex-col">
    Container range targeting
  </div>
</div>

<!-- Named containers -->
<div class="@container/main">
  <div class="flex flex-row @sm/main:flex-col">
    <div class="@container/sidebar">
      <div class="hidden @lg/sidebar:block">
        Nested named container
      </div>
    </div>
  </div>
</div>

<!-- Container query units -->
<div class="@container">
  <div class="w-[50cqw] h-[25cqh]">
    Container relative sizing
  </div>
</div>

<!-- Arbitrary container values -->
<div class="@container">
  <div class="flex flex-col @min-[475px]:flex-row">
    Custom container breakpoint
  </div>
</div>
```

---

## ✅ Mobile-First Strategy

### 🔍 Mobile-First Principles

#### Base Styles (Mobile)
- [ ] **Unprefixed Utilities**
  - [ ] 기본 스타일은 모바일을 위한 것
  - [ ] `uppercase` → 모든 화면 크기에 적용

#### Progressive Enhancement
- [ ] **Breakpoint Progression**
  - [ ] `sm:` → 작은 화면 **이상**에서 적용
  - [ ] `md:` → 중간 화면 **이상**에서 적용
  - [ ] 점진적 향상 방식

### 🔍 Targeting Strategies

#### Mobile Targeting
- [ ] **Mobile Styles**
  - [ ] Unprefixed utilities for mobile
  - [ ] `sm:` is NOT for mobile - it's for small breakpoint and up

#### Desktop-First (When Needed)
- [ ] **Max-Width Approach**
  - [ ] `max-sm:` for true mobile-only styles
  - [ ] Reverse targeting when necessary

### 🧪 Test Cases

```html
<!-- Mobile-first approach -->
<div class="text-sm sm:text-base lg:text-lg">
  <!-- text-sm on mobile, text-base on sm+, text-lg on lg+ -->
  Progressive text sizing
</div>

<!-- Mobile-only styles -->
<div class="block sm:hidden">
  <!-- Only visible on mobile -->
  Mobile-only content
</div>

<!-- Progressive enhancement -->
<div class="stack sm:grid sm:grid-cols-2 lg:grid-cols-3">
  <!-- Stacked on mobile, 2 cols on sm+, 3 cols on lg+ -->
  Progressive grid layout
</div>
```

---

## ✅ Advanced Features

### 🔍 Viewport Meta Tag
- [ ] **Required Meta Tag**
  - [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
  - [ ] 반응형 동작을 위한 필수 설정

### 🔍 Stacked Variants
- [ ] **Multiple Conditions**
  - [ ] `dark:md:hover:bg-blue-600` 
  - [ ] Responsive + dark mode + hover 조합

### 🔍 Responsive Performance
- [ ] **CSS Optimization**
  - [ ] Mobile-first로 CSS 크기 최적화
  - [ ] 불필요한 media queries 제거

### 🧪 Test Cases

```html
<!-- Complex stacked variants -->
<button class="bg-blue-500 sm:bg-green-500 md:hover:bg-red-500 dark:lg:bg-purple-500">
  Complex responsive behavior
</button>

<!-- Performance optimized -->
<div class="p-4 sm:p-6 md:p-8 lg:p-12">
  <!-- Progressively larger padding -->
  Optimized progressive enhancement
</div>
```

---

## 📊 Implementation Priority

### Phase 1: Core Responsive
1. ✅ Default breakpoints (sm, md, lg, xl, 2xl)
2. ✅ Mobile-first system
3. ✅ Max-width variants
4. ✅ Breakpoint ranges

### Phase 2: Container Queries  
1. ✅ Basic container queries (@sm, @md, etc.)
2. ✅ Named containers
3. ✅ Container query ranges
4. ✅ Container query units

### Phase 3: Advanced Features
1. ✅ Custom breakpoints
2. ✅ Arbitrary breakpoints
3. ✅ Custom container sizes
4. ✅ Performance optimization

### Phase 4: Integration
1. ✅ Theme customization
2. ✅ Stacked variants
3. ✅ CSS variable integration
4. ✅ TypeScript support

---

## 🎯 Responsive Design Success Criteria

### ✅ Breakpoint System Complete
- [ ] 모든 기본 breakpoints 지원
- [ ] Max-width variants 완전 구현
- [ ] Breakpoint ranges 지원
- [ ] Custom breakpoints 시스템

### ✅ Container Queries Complete
- [ ] 모든 container sizes 지원
- [ ] Named containers 완전 구현
- [ ] Container query units 지원
- [ ] Mobile-first container approach

### ✅ Mobile-First Strategy
- [ ] Progressive enhancement 구현
- [ ] Mobile-first best practices
- [ ] Performance 최적화
- [ ] Accessibility 고려

### ✅ Advanced Features
- [ ] Arbitrary values 완전 지원
- [ ] Stacked variants 처리
- [ ] Theme customization 완전 지원
- [ ] CSS generation 최적화

**Responsive Design 완성도: 0% (0/75 항목 완료)**

## 🎯 Tailwind CSS v4.1 Responsive Design 완전 구현

이 체크리스트는 [Tailwind CSS v4.1 Responsive Design](https://tailwindcss.com/docs/responsive-design) 공식 문서의 모든 기능을 포함합니다:

### ✅ 포함된 주요 기능들:
- **Breakpoint System**: 완전한 mobile-first 시스템
- **Container Queries**: v4.1의 first-class container query 지원
- **Custom Breakpoints**: theme variables를 통한 완전한 커스터마이제이션
- **Max-width Variants**: 역방향 타겟팅 지원
- **Breakpoint Ranges**: 특정 범위 타겟팅
- **Named Containers**: 복잡한 레이아웃을 위한 named container 시스템
- **Container Query Units**: cqw, cqh 등 모든 CQ 단위 지원
- **Arbitrary Values**: 일회성 breakpoint 및 container query 지원 