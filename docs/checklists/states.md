# State Variants - Tailwind CSS v4.1 구현 체크리스트

## 📋 개요
State Variants는 다양한 상태와 조건에서 스타일을 적용하는 기능들을 포함합니다.
**참조**: [Hover, Focus, & Other States](https://tailwindcss.com/docs/hover-focus-and-other-states) 문서

## ✅ Interactive States

### 🔍 Hover & Focus

#### Hover States
- [ ] **Hover**
  - [ ] `hover:*` → `&:hover { * }`
  - [ ] `@media (hover: hover)` 조건부 적용

- [ ] **Group Hover**
  - [ ] `group-hover:*` → `.group:hover &`
  - [ ] Nested groups 지원

- [ ] **Peer Hover**
  - [ ] `peer-hover:*` → `.peer:hover ~ &`
  - [ ] 형제 요소 hover 감지

#### Focus States
- [ ] **Focus**
  - [ ] `focus:*` → `&:focus`
  - [ ] `focus-within:*` → `&:focus-within`
  - [ ] `focus-visible:*` → `&:focus-visible`

- [ ] **Group Focus**
  - [ ] `group-focus:*` → `.group:focus &`
  - [ ] `group-focus-within:*` → `.group:focus-within &`
  - [ ] `group-focus-visible:*` → `.group:focus-visible &`

- [ ] **Peer Focus**
  - [ ] `peer-focus:*` → `.peer:focus ~ &`
  - [ ] `peer-focus-within:*` → `.peer:focus-within ~ &`
  - [ ] `peer-focus-visible:*` → `.peer:focus-visible ~ &`

#### Active States
- [ ] **Active**
  - [ ] `active:*` → `&:active`
  - [ ] `group-active:*` → `.group:active &`
  - [ ] `peer-active:*` → `.peer:active ~ &`

### 🧪 Test Cases

```html
<!-- Basic hover/focus -->
<button class="bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
  Interactive Button
</button>

<!-- Group interactions -->
<div class="group">
  <img class="group-hover:scale-110" src="image.jpg" />
  <h3 class="group-hover:text-blue-600">Title</h3>
</div>

<!-- Peer interactions -->
<input type="checkbox" class="peer" />
<label class="peer-focus:ring-2 peer-checked:text-blue-600">Label</label>
```

---

## ✅ Form States

### 🔍 Basic Form States

#### Input States
- [ ] **Required/Optional**
  - [ ] `required:*` → `&:required`
  - [ ] `optional:*` → `&:optional`

- [ ] **Valid/Invalid**
  - [ ] `valid:*` → `&:valid`
  - [ ] `invalid:*` → `&:invalid`

- [ ] **In Range/Out of Range**
  - [ ] `in-range:*` → `&:in-range`
  - [ ] `out-of-range:*` → `&:out-of-range`

#### User Interaction States (NEW in v4.1)
- [ ] **User Valid/Invalid**
  - [ ] `user-valid:*` → `&:user-valid`
  - [ ] `user-invalid:*` → `&:user-invalid`

- [ ] **Placeholder Shown**
  - [ ] `placeholder-shown:*` → `&:placeholder-shown`

#### Checkbox & Radio States
- [ ] **Checked/Unchecked**
  - [ ] `checked:*` → `&:checked`
  - [ ] `indeterminate:*` → `&:indeterminate`

- [ ] **Default**
  - [ ] `default:*` → `&:default`

#### Disabled States
- [ ] **Disabled/Enabled**
  - [ ] `disabled:*` → `&:disabled`
  - [ ] `enabled:*` → `&:enabled`

- [ ] **Read Only/Write**
  - [ ] `read-only:*` → `&:read-only`
  - [ ] `read-write:*` → `&:read-write`

#### Autofill States
- [ ] **Autofill**
  - [ ] `autofill:*` → `&:autofill`
  - [ ] 브라우저 자동완성 시 스타일

### 🧪 Test Cases

```html
<!-- Form validation states -->
<input class="border-gray-300 valid:border-green-500 invalid:border-red-500" />

<!-- User interaction states -->
<input class="user-invalid:border-red-500 user-invalid:ring-1 user-invalid:ring-red-500" />

<!-- Checkbox states -->
<input type="checkbox" class="checked:bg-blue-600 indeterminate:bg-gray-500" />

<!-- Disabled states -->
<button class="bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed" disabled>
  Disabled Button
</button>
```

---

## ✅ Element States

### 🔍 Selection States

#### Selection
- [ ] **Selection**
  - [ ] `selection:*` → `&::selection`
  - [ ] 텍스트 선택 시 스타일

#### Target
- [ ] **Target**
  - [ ] `target:*` → `&:target`
  - [ ] URL fragment target 요소

#### Visited
- [ ] **Visited**
  - [ ] `visited:*` → `&:visited`
  - [ ] 방문한 링크 스타일

### 🔍 Content States

#### Empty/Not Empty
- [ ] **Empty**
  - [ ] `empty:*` → `&:empty`
  - [ ] 빈 요소 스타일

#### Only Child
- [ ] **Only Child**
  - [ ] `only:*` → `&:only-child`
  - [ ] 유일한 자식 요소

#### First/Last
- [ ] **First/Last**
  - [ ] `first:*` → `&:first-child`
  - [ ] `last:*` → `&:last-child`

- [ ] **First/Last of Type**
  - [ ] `first-of-type:*` → `&:first-of-type`
  - [ ] `last-of-type:*` → `&:last-of-type`

- [ ] **Only of Type**
  - [ ] `only-of-type:*` → `&:only-of-type`

#### Odd/Even
- [ ] **Odd/Even**
  - [ ] `odd:*` → `&:nth-child(odd)`
  - [ ] `even:*` → `&:nth-child(even)`

#### Nth-Child Variants
- [ ] **Specific Positions**
  - [ ] `nth-3:*` → `&:nth-child(3)`
  - [ ] `nth-[3n+1]:*` → `&:nth-child(3n+1)`
  - [ ] 임의 nth-child 표현식 지원

- [ ] **Nth-Last-Child**
  - [ ] `nth-last-3:*` → `&:nth-last-child(3)`
  - [ ] `nth-last-[3n+1]:*` → `&:nth-last-child(3n+1)`

- [ ] **Nth-Of-Type**
  - [ ] `nth-of-type-3:*` → `&:nth-of-type(3)`
  - [ ] `nth-of-type-[3n+1]:*` → `&:nth-of-type(3n+1)`

- [ ] **Nth-Last-Of-Type**
  - [ ] `nth-last-of-type-3:*` → `&:nth-last-of-type(3)`
  - [ ] `nth-last-of-type-[3n+1]:*` → `&:nth-last-of-type(3n+1)`

### 🧪 Test Cases

```html
<!-- Selection styling -->
<p class="selection:bg-pink-300 selection:text-pink-900">
  Selectable text
</p>

<!-- Target styling -->
<div id="section1" class="target:bg-yellow-100">
  Content section
</div>

<!-- Child position -->
<ul>
  <li class="first:font-bold">First item</li>
  <li class="odd:bg-gray-100">Regular item</li>
  <li class="last:border-b-0">Last item</li>
</ul>
```

---

## ✅ Pseudo-elements

### 🔍 Content Pseudo-elements

#### Before & After
- [ ] **Before**
  - [ ] `before:*` → `&::before`
  - [ ] Content 생성 및 스타일링

- [ ] **After**
  - [ ] `after:*` → `&::after`
  - [ ] Content 생성 및 스타일링

#### Placeholder
- [ ] **Placeholder**
  - [ ] `placeholder:*` → `&::placeholder`
  - [ ] Input placeholder 스타일링

#### File Input
- [ ] **File Input Button**
  - [ ] `file:*` → `&::file-selector-button`
  - [ ] 파일 선택 버튼 스타일링

#### List Marker
- [ ] **Marker**
  - [ ] `marker:*` → `&::marker`
  - [ ] 리스트 마커 스타일링

#### Text Selection
- [ ] **Selection**
  - [ ] `selection:*` → `&::selection`
  - [ ] 텍스트 선택 시 스타일

#### First Line & Letter
- [ ] **First Line**
  - [ ] `first-line:*` → `&::first-line`
  - [ ] 첫 번째 라인 스타일링

- [ ] **First Letter**
  - [ ] `first-letter:*` → `&::first-letter`
  - [ ] 첫 번째 글자 스타일링

#### Backdrop
- [ ] **Backdrop**
  - [ ] `backdrop:*` → `&::backdrop`
  - [ ] Dialog, fullscreen backdrop 스타일링

### 🧪 Test Cases

```html
<!-- Before/After content -->
<div class="before:content-['★'] before:text-yellow-400">
  Rating
</div>

<!-- Placeholder styling -->
<input class="placeholder:text-gray-400 placeholder:italic" placeholder="Enter text..." />

<!-- File input styling -->
<input type="file" class="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700" />

<!-- Marker styling -->
<ul class="marker:text-blue-500">
  <li>First item</li>
  <li>Second item</li>
</ul>

<!-- Selection styling -->
<p class="selection:bg-pink-200 selection:text-pink-900">
  Select this text
</p>

<!-- First line/letter -->
<p class="first-line:font-bold first-letter:text-2xl first-letter:float-left">
  Lorem ipsum dolor sit amet...
</p>

<!-- Dialog backdrop -->
<dialog class="backdrop:bg-black/50">
  Modal content
</dialog>
```

---

## ✅ Media & Environment States

### 🔍 Print Media
- [ ] **Print**
  - [ ] `print:*` → `@media print`
  - [ ] 인쇄 시 스타일

### 🔍 Reduced Motion
- [ ] **Motion Preferences**
  - [ ] `motion-reduce:*` → `@media (prefers-reduced-motion: reduce)`
  - [ ] `motion-safe:*` → `@media (prefers-reduced-motion: no-preference)`

### 🔍 High Contrast (NEW in v4.1)
- [ ] **Contrast Preferences**
  - [ ] `contrast-more:*` → `@media (prefers-contrast: more)`
  - [ ] `contrast-less:*` → `@media (prefers-contrast: less)`

### 🔍 Inverted Colors (NEW in v4.1)
- [ ] **Inverted Colors**
  - [ ] `inverted-colors:*` → `@media (inverted-colors: inverted)`

### 🔍 Script Support (NEW in v4.1)
- [ ] **Script States**
  - [ ] `noscript:*` → `@media (scripting: none)`

### 🔍 Orientation & Display
- [ ] **Orientation**
  - [ ] `portrait:*` → `@media (orientation: portrait)`
  - [ ] `landscape:*` → `@media (orientation: landscape)`

### 🔍 Feature Support
- [ ] **Supports Queries**
  - [ ] `supports-[backdrop-filter]:*` → `@supports (backdrop-filter: blur())`
  - [ ] `supports-[display:grid]:*` → `@supports (display: grid)`
  - [ ] Arbitrary @supports queries

### 🔍 Starting Style (NEW)
- [ ] **Starting Style**
  - [ ] `starting:*` → `@starting-style`
  - [ ] 요소 진입 시 초기 애니메이션 상태

### 🧪 Test Cases

```html
<!-- Print styles -->
<div class="hidden print:block">
  Print-only content
</div>

<!-- Motion preferences -->
<div class="transition-transform motion-reduce:transition-none">
  Animated element
</div>

<!-- High contrast -->
<button class="border border-gray-300 contrast-more:border-black">
  High contrast button
</button>

<!-- Script detection -->
<div class="block noscript:hidden">
  JavaScript required
</div>
```

---

## ✅ Advanced States (NEW in v4.1)

### 🔍 Dialog States
- [ ] **Open**
  - [ ] `open:*` → `&[open]`
  - [ ] `&:popover-open` for popovers

### 🔍 Details States
- [ ] **Details Content (NEW)**
  - [ ] `details-content:*` → `details[open] &`
  - [ ] Details 요소 열린 상태의 콘텐츠

### 🔍 Starting Styles (NEW)
- [ ] **Starting Style**
  - [ ] `starting:*` → `@starting-style`
  - [ ] 요소 진입 시 초기 스타일

### 🔍 Has Pseudo Class
- [ ] **Has Child Selector**
  - [ ] `has-*:*` → `&:has(*)`
  - [ ] 자식 요소 기반 스타일
  - [ ] `has-[input]:*` → `&:has(input)`
  - [ ] `has-[.active]:*` → `&:has(.active)`
  - [ ] `has-[:focus]:*` → `&:has(:focus)`

### 🔍 Not Variant (NEW)
- [ ] **Not Selector**
  - [ ] `not-*:*` → `&:not(*)`
  - [ ] 조건 부정 스타일
  - [ ] `not-disabled:*` → `&:not(:disabled)`
  - [ ] `not-first:*` → `&:not(:first-child)`
  - [ ] `not-[.active]:*` → `&:not(.active)`

### 🧪 Test Cases

```html
<!-- Dialog states -->
<dialog class="hidden open:block">
  Modal content
</dialog>

<!-- Details content -->
<details>
  <summary>Summary</summary>
  <div class="details-content:animate-slide-down">
    Collapsible content
  </div>
</details>

<!-- Starting styles -->
<div class="starting:opacity-0 starting:scale-95 transition-all">
  Animated entry
</div>

<!-- Has selector -->
<div class="has-[input:focus]:ring-2">
  <input type="text" />
</div>

<!-- Not variant -->
<button class="not-disabled:hover:bg-blue-700 disabled:opacity-50">
  Conditional hover
</button>
```

---

## ✅ Data Attributes

### 🔍 Boolean Data Attributes
- [ ] **Boolean Attributes**
  - [ ] `data-*:*` → `&[data-*]`
  - [ ] 자동 data attribute 인식

### 🔍 Value-Based Data Attributes  
- [ ] **Value Attributes**
  - [ ] `data-state-open:*` → `&[data-state="open"]`
  - [ ] `data-size-lg:*` → `&[data-size="lg"]`

### 🔍 ARIA States
- [ ] **ARIA Attributes**
  - [ ] `aria-checked:*` → `&[aria-checked="true"]`
  - [ ] `aria-disabled:*` → `&[aria-disabled="true"]`
  - [ ] `aria-expanded:*` → `&[aria-expanded="true"]`
  - [ ] `aria-hidden:*` → `&[aria-hidden="true"]`
  - [ ] `aria-pressed:*` → `&[aria-pressed="true"]`
  - [ ] `aria-readonly:*` → `&[aria-readonly="true"]`
  - [ ] `aria-required:*` → `&[aria-required="true"]`
  - [ ] `aria-selected:*` → `&[aria-selected="true"]`

### 🔍 Directional Support
- [ ] **RTL Support**
  - [ ] `rtl:*` → `[dir="rtl"] &`
  - [ ] `ltr:*` → `[dir="ltr"] &`
  - [ ] Right-to-left 언어 지원

### 🔍 Element States  
- [ ] **Open/Closed**
  - [ ] `open:*` → `&[open]`
  - [ ] `closed:*` → `&:not([open])`
  - [ ] Details, dialog 요소 상태

- [ ] **Inert Elements**
  - [ ] `inert:*` → `&[inert]`
  - [ ] 비활성화된 요소 스타일

### 🧪 Test Cases

```html
<!-- Boolean data attributes -->
<div data-loading class="opacity-50 data-loading:animate-pulse">
  Loading content
</div>

<!-- Value-based data attributes -->
<button data-state="open" class="data-state-open:bg-blue-600">
  Toggle button
</button>

<div data-size="lg" class="data-size-lg:text-xl data-size-sm:text-sm">
  Sized content
</div>
```

---

## ✅ Group & Peer Variants

### 🔍 Group Variants

#### Basic Group
- [ ] **Group Base**
  - [ ] `.group` 클래스 인식
  - [ ] `group-*:*` variants

#### Named Groups
- [ ] **Named Groups**
  - [ ] `.group/{name}` 클래스
  - [ ] `group-hover/{name}:*` variants

#### Nested Groups
- [ ] **Nested Group Support**
  - [ ] 중첩된 `.group` 요소 처리
  - [ ] 가장 가까운 group 우선

### 🔍 Peer Variants

#### Basic Peer
- [ ] **Peer Base**
  - [ ] `.peer` 클래스 인식
  - [ ] `peer-*:*` variants

#### Named Peers
- [ ] **Named Peers**
  - [ ] `.peer/{name}` 클래스
  - [ ] `peer-focus/{name}:*` variants

#### Multiple Peers
- [ ] **Multiple Peer Support**
  - [ ] 여러 `.peer` 요소 처리
  - [ ] 명시적 peer 선택

### 🧪 Test Cases

```html
<!-- Named groups -->
<div class="group/card">
  <h3 class="group-hover/card:text-blue-600">Card Title</h3>
  <div class="group/button">
    <button class="group-hover/button:bg-gray-100">Button</button>
  </div>
</div>

<!-- Named peers -->
<input class="peer/email" type="email" />
<input class="peer/password" type="password" />
<button class="peer-invalid/email:opacity-50 peer-invalid/password:opacity-50">
  Submit
</button>

<!-- Multiple conditions -->
<input class="peer/required" required />
<input class="peer/optional" />
<div class="peer-invalid/required:text-red-500 peer-valid/optional:text-green-500">
  Status message
</div>
```

---

## ✅ Child Selectors

### 🔍 Direct Children
- [ ] **Direct Child Selector**
  - [ ] `*:*` → `& > *`
  - [ ] 직접 자식 요소만 타겟

### 🔍 All Descendants
- [ ] **Descendant Selector**
  - [ ] `**:*` → `& *`
  - [ ] 모든 후손 요소 타겟

### 🧪 Test Cases

```html
<!-- Style direct children -->
<div class="*:p-4 *:border">
  <div>Direct child 1</div>
  <div>Direct child 2</div>
</div>

<!-- Style all descendants -->
<div class="**:text-blue-600">
  <div>
    <p>Nested paragraph</p>
    <span>Nested span</span>
  </div>
</div>
```

---

## ✅ Arbitrary Variants

### 🔍 Arbitrary Pseudo Classes
- [ ] **Custom Pseudo Classes**
  - [ ] `[&:nth-child(3)]:*`
  - [ ] `[&:not(:first-child)]:*`

### 🔍 Arbitrary Selectors
- [ ] **Complex Selectors**
  - [ ] `[&>img]:*` → `& > img`
  - [ ] `[&+*]:*` → `& + *`

### 🔍 At-Rules
- [ ] **Media Queries**
  - [ ] `[@media(min-width:400px)]:*`
  - [ ] `[@supports(backdrop-filter:blur())]:*`

### 🧪 Test Cases

```html
<!-- Complex nth-child -->
<div class="[&:nth-child(3n+1)]:bg-red-100">
  Every 3n+1 child
</div>

<!-- Custom selectors -->
<div class="[&>img]:rounded-lg [&+p]:mt-4">
  Container with child rules
</div>

<!-- Custom media queries -->
<div class="[@media(max-height:600px)]:text-sm">
  Height-based sizing
</div>
```

---

## 📊 Implementation Priority

### Phase 1: Core States
1. ✅ Hover, focus, active states
2. ✅ Group and peer modifiers
3. ✅ Form states (valid, invalid, checked)
4. ✅ Disabled and enabled states

### Phase 2: Element States
1. ✅ First, last, odd, even
2. ✅ Target, visited, selection
3. ✅ Empty, only-child
4. ✅ Data attributes

### Phase 3: Advanced States (v4.1)
1. ✅ User-valid, user-invalid
2. ✅ Details-content, starting
3. ✅ Has and not selectors
4. ✅ Browser states (noscript, inverted-colors)

### Phase 4: Environment States
1. ✅ Print, motion preferences
2. ✅ Contrast preferences
3. ✅ Arbitrary variants
4. ✅ Complex selectors

---

## 🎯 State Variants Success Criteria

### ✅ Interactive States Complete
- [ ] 모든 hover/focus variants 지원
- [ ] Group/peer 완전 구현
- [ ] Named groups/peers 지원
- [ ] 중첩 상황 올바른 처리

### ✅ Form States Complete
- [ ] 기본 form states 지원
- [ ] v4.1 새로운 user-* states
- [ ] 모든 input types 지원
- [ ] Accessibility 고려

### ✅ Advanced Features
- [ ] Arbitrary variants 완전 지원
- [ ] Complex selectors 처리
- [ ] CSS selector 생성 정확성
- [ ] Performance 최적화

**State Variants 완성도: 0% (0/125 항목 완료)**

## 🎯 Tailwind CSS v4.1 State Variants 완전 구현

이 체크리스트는 [Tailwind CSS v4.1 Hover, Focus, and Other States](https://tailwindcss.com/docs/hover-focus-and-other-states) 공식 문서의 모든 기능을 포함합니다:

### ✅ 포함된 주요 기능들:
- **Pseudo-classes**: 모든 hover, focus, form states
- **Pseudo-elements**: before, after, placeholder, marker, selection 등
- **Media queries**: responsive, dark mode, motion preferences
- **Attribute selectors**: ARIA states, data attributes, RTL support
- **Child selectors**: direct children (`*:`), descendants (`**:`)
- **Advanced features**: :has(), :not(), @supports, @starting-style
- **v4.1 새로운 기능**: user-valid, user-invalid, details-content 등 