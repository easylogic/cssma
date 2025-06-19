# Core Concepts - Tailwind CSS v4.1 구현 체크리스트

## 📋 개요
Core Concepts는 Tailwind CSS v4.1의 핵심 개념과 사용법을 다룹니다.
**참조**: [Utility-First Fundamentals](https://tailwindcss.com/docs/utility-first) 및 관련 Core Concepts 문서

## ✅ Utility-First Approach

### 🔍 Classes to Implement

#### 기본 Utility Class 지원
- [ ] **Display Utilities**
  - [ ] `flex`, `grid`, `block`, `inline`, `hidden` 등
  - [ ] 모든 display 값 지원

- [ ] **Layout Utilities**
  - [ ] `max-w-*`, `mx-auto`, `p-*`, `gap-*` 등
  - [ ] 완전한 spacing scale 지원

- [ ] **Typography Utilities**
  - [ ] `text-*`, `font-*`, `leading-*` 등
  - [ ] 전체 typography scale 지원

- [ ] **Color Utilities**
  - [ ] `bg-*`, `text-*`, `border-*` 등
  - [ ] P3 color palette (OKLCH) 지원

### 🎯 State Variants

#### Hover, Focus, Active States
- [ ] **Hover States**
  - [ ] `hover:*` 모든 유틸리티 지원
  - [ ] `@media (hover: hover)` 조건부 적용

- [ ] **Focus States**  
  - [ ] `focus:*`, `focus-within:*`, `focus-visible:*`
  - [ ] 접근성 고려된 focus 스타일

- [ ] **Active States**
  - [ ] `active:*` 모든 유틸리티 지원

#### Group & Peer Modifiers
- [ ] **Group Modifiers**
  - [ ] `group` 클래스 인식
  - [ ] `group-hover:*`, `group-focus:*` 등
  - [ ] Nested groups 지원

- [ ] **Peer Modifiers**
  - [ ] `peer` 클래스 인식
  - [ ] `peer-focus:*`, `peer-checked:*` 등
  - [ ] 형제 요소 상태 기반 스타일링

### 🧪 Test Cases

```html
<!-- 기본 utility-first 패턴 -->
<div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg">
  <img class="size-12 shrink-0" src="/logo.svg" alt="Logo" />
  <div>
    <div class="text-xl font-medium text-black">Title</div>
    <p class="text-gray-500">Description</p>
  </div>
</div>

<!-- State variants -->
<button class="bg-sky-500 hover:bg-sky-700 focus:ring-2 focus:ring-sky-500">
  Save changes
</button>

<!-- Group modifiers -->
<a href="#" class="group rounded-lg p-8">
  <span class="group-hover:underline">Read more…</span>
</a>

<!-- Peer modifiers -->
<input type="checkbox" class="peer" />
<label class="peer-checked:text-blue-600">Option</label>
```

---

## ✅ Responsive Design

### 🔍 Breakpoint System

#### Mobile-First Breakpoints
- [ ] **Default Breakpoints**
  - [ ] `sm:*` (40rem / 640px)
  - [ ] `md:*` (48rem / 768px)  
  - [ ] `lg:*` (64rem / 1024px)
  - [ ] `xl:*` (80rem / 1280px)
  - [ ] `2xl:*` (96rem / 1536px)

- [ ] **Custom Breakpoints**
  - [ ] `--breakpoint-*` theme variables 지원
  - [ ] 동적 breakpoint 생성

#### Max-Width Variants
- [ ] **Max Breakpoints**
  - [ ] `max-sm:*`, `max-md:*`, `max-lg:*`
  - [ ] `max-xl:*`, `max-2xl:*`

#### Breakpoint Ranges
- [ ] **Range Targeting**
  - [ ] `md:max-xl:*` (range 지원)
  - [ ] `md:max-lg:*` (single breakpoint)

### 🎯 Container Queries

#### Basic Container Queries
- [ ] **Container Setup**
  - [ ] `@container` 클래스
  - [ ] Container context 인식

- [ ] **Container Variants**
  - [ ] `@sm:*`, `@md:*`, `@lg:*` 등
  - [ ] 모든 container sizes 지원

- [ ] **Max-Width Container Queries**
  - [ ] `@max-sm:*`, `@max-md:*` 등

#### Named Containers
- [ ] **Named Container Support**
  - [ ] `@container/{name}` 클래스
  - [ ] `@sm/{name}:*` variants

#### Container Size Reference
- [ ] **Default Container Sizes**
  - [ ] `@3xs` (16rem), `@2xs` (18rem), `@xs` (20rem)
  - [ ] `@sm` (24rem), `@md` (28rem), `@lg` (32rem)
  - [ ] `@xl` (36rem), `@2xl` (42rem), `@3xl` (48rem)
  - [ ] `@4xl` (56rem), `@5xl` (64rem), `@6xl` (72rem), `@7xl` (80rem)

### 🎯 Pointer Variants (NEW in v4.1)

#### Pointer Precision
- [ ] **Fine Pointer** (`pointer-fine:`)
  - [ ] 마우스, 트랙패드 등 정밀한 포인터
  - [ ] 작은 UI 요소 최적화

- [ ] **Coarse Pointer** (`pointer-coarse:`)
  - [ ] 터치스크린 등 부정확한 포인터
  - [ ] 큰 터치 영역 최적화

#### Any-Pointer Variants
- [ ] **Any Fine Pointer** (`any-pointer-fine:`)
- [ ] **Any Coarse Pointer** (`any-pointer-coarse:`)

### 🧪 Test Cases

```html
<!-- Responsive grid -->
<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
  <!-- items -->
</div>

<!-- Container queries -->
<div class="@container">
  <div class="flex flex-col @md:flex-row">
    <!-- content -->
  </div>
</div>

<!-- Pointer variants -->
<button class="px-3 py-1 pointer-coarse:px-5 pointer-coarse:py-3">
  Submit
</button>

<!-- Breakpoint ranges -->
<div class="hidden md:max-xl:block">
  <!-- Only visible between md and xl -->
</div>
```

---

## ✅ Dark Mode Support

### 🔍 Dark Mode Variants

#### Media Query Approach
- [ ] **Automatic Dark Mode**
  - [ ] `@media (prefers-color-scheme: dark)` 지원
  - [ ] `dark:*` variants

#### Class-Based Approach
- [ ] **Manual Dark Mode**
  - [ ] `.dark` 클래스 기반
  - [ ] `dark:*` variants with class strategy

#### CSS Variables Approach
- [ ] **Theme Variables Integration**
  - [ ] `--color-*` variables 다크모드 지원
  - [ ] `light-dark()` CSS function 지원

### 🧪 Test Cases

```html
<!-- Dark mode variants -->
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <h1 class="text-2xl text-black dark:text-white">Title</h1>
  <p class="text-gray-600 dark:text-gray-400">Description</p>
</div>

<!-- CSS variables approach -->
<div style="background-color: var(--color-primary)">
  <!-- Uses theme variable that changes in dark mode -->
</div>
```

---

## ✅ Arbitrary Values

### 🔍 Arbitrary Value Support

#### Basic Arbitrary Values
- [ ] **Color Values**
  - [ ] `bg-[#316ff6]`, `text-[rgb(255,0,0)]`
  - [ ] CSS color formats 지원

- [ ] **Size Values**
  - [ ] `w-[calc(100%-2rem)]`, `h-[50vh]`
  - [ ] CSS calc(), units 지원

- [ ] **Grid Values**
  - [ ] `grid-cols-[24rem_2.5rem_minmax(0,1fr)]`
  - [ ] 복잡한 grid template 지원

#### CSS Variables in Arbitrary Values
- [ ] **Variable References**
  - [ ] `max-h-[calc(100dvh-(--spacing(6)))]`
  - [ ] Theme variables in calc()

- [ ] **Custom Properties**
  - [ ] `[--gutter-width:1rem]` 설정
  - [ ] CSS custom property 생성

### 🧪 Test Cases

```html
<!-- Arbitrary colors -->
<button class="bg-[#316ff6] hover:bg-[#2563eb]">
  Facebook Blue
</button>

<!-- Arbitrary sizing -->
<div class="w-[calc(100%-2rem)] max-h-[50vh]">
  Custom sizing
</div>

<!-- CSS variables -->
<div class="[--gutter:1rem] lg:[--gutter:2rem] gap-[var(--gutter)]">
  Variable gaps
</div>
```

---

## ✅ Advanced Features

### 🔍 Complex Selectors

#### Stacked Variants
- [ ] **Multiple Conditions**
  - [ ] `dark:lg:hover:bg-indigo-600`
  - [ ] 복합 조건 지원

#### Arbitrary Variants
- [ ] **Custom Selectors**
  - [ ] `[&>[data-active]+span]:text-blue-600`
  - [ ] 임의 selector 지원

### 🔍 Class Composition

#### Filter Composition
- [ ] **Multiple Filters**
  - [ ] `blur-sm grayscale` 조합
  - [ ] CSS variables로 필터 합성

#### Transform Composition
- [ ] **Multiple Transforms**
  - [ ] `rotate-45 scale-110` 조합
  - [ ] Transform 함수 결합

### 🧪 Test Cases

```html
<!-- Complex selectors -->
<button class="dark:lg:data-current:hover:bg-indigo-600">
  Complex state
</button>

<!-- Arbitrary variants -->
<div class="[&>[data-active]+span]:text-blue-600">
  <span data-active>Active</span>
  <span>This will be blue</span>
</div>

<!-- Filter composition -->
<img class="blur-sm grayscale contrast-125" src="photo.jpg" />
```

---

## ✅ Performance Features

### 🔍 Dynamic Values

#### Spacing Scale
- [ ] **Dynamic Spacing**
  - [ ] `--spacing` 기반 동적 생성
  - [ ] `w-17`, `mt-23` 등 임의 숫자 지원

#### Grid Columns
- [ ] **Dynamic Grid**
  - [ ] `grid-cols-15` 등 임의 컬럼 수
  - [ ] 자동 grid template 생성

#### Data Attributes
- [ ] **Boolean Data Attributes**
  - [ ] `data-current:opacity-100`
  - [ ] 자동 data attribute 인식

### 🔍 CSS Variables Integration

#### Theme Variables
- [ ] **Automatic CSS Variables**
  - [ ] 모든 theme variables가 CSS variables로 생성
  - [ ] `var(--color-blue-500)` 접근 가능

### 🧪 Test Cases

```html
<!-- Dynamic spacing -->
<div class="w-17 h-23 p-15">
  Dynamic sizing
</div>

<!-- Dynamic grid -->
<div class="grid grid-cols-15">
  <!-- 15 columns -->
</div>

<!-- Data attributes -->
<div data-current class="opacity-75 data-current:opacity-100">
  Data attribute styling
</div>

<!-- CSS variables -->
<div style="background: var(--color-primary); padding: var(--spacing-4)">
  Theme variables
</div>
```

---

## 📊 Implementation Priority

### Phase 1: Core Utilities
1. ✅ Basic utility classes (display, spacing, colors)
2. ✅ State variants (hover, focus, active)
3. ✅ Responsive breakpoints
4. ✅ Dark mode support

### Phase 2: Advanced Features  
1. ✅ Container queries
2. ✅ Arbitrary values
3. ✅ Complex selectors
4. ✅ Pointer variants

### Phase 3: Performance
1. ✅ Dynamic utility values
2. ✅ CSS variables integration
3. ✅ Class composition
4. ✅ Theme variables

---

## 🎯 Core Concepts Success Criteria

### ✅ Utility-First Complete
- [ ] 모든 기본 utilities 지원
- [ ] State variants 완전 지원
- [ ] Responsive design 완전 구현
- [ ] Component abstraction 가이드

### ✅ Modern CSS Features
- [ ] Container queries 지원
- [ ] CSS variables 통합
- [ ] OKLCH color space
- [ ] Dynamic utilities

### ✅ Developer Experience
- [ ] TypeScript 완전 지원
- [ ] IntelliSense autocomplete
- [ ] Error handling
- [ ] Performance optimization

**Core Concepts 완성도: 0% (0/45 항목 완료)** 