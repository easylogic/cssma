# Layout - Tailwind CSS v4.1 구현 체크리스트

## 📋 개요
Layout 카테고리는 요소의 레이아웃, 배치, 크기 조정을 제어하는 유틸리티들을 포함합니다.
**참조**: Tailwind CSS v4.1 공식 문서 (2025.01.04 기준)

## ✅ Aspect Ratio ✅

### 🔍 Classes to Implement
- [x] **기본 Aspect Ratio** ✅
  - [x] `aspect-auto` → `aspect-ratio: auto` ✅
  - [x] `aspect-square` → `aspect-ratio: 1 / 1` ✅
  - [x] `aspect-video` → `aspect-ratio: var(--aspect-ratio-video)` (16 / 9) ✅

- [x] **Custom Properties Support** ✅
  - [x] `aspect-(<custom-property>)` → `aspect-ratio: var(<custom-property>)` ✅

- [x] **Arbitrary Values** ✅
  - [x] `aspect-[<value>]` → `aspect-ratio: <value>` ✅
  - [x] `aspect-[4/3]` → `aspect-ratio: 4 / 3` ✅
  - [x] `aspect-[2.35/1]` → `aspect-ratio: 2.35 / 1` ✅

### 🧪 Test Cases
```html
<!-- 기본 aspect ratios -->
<div class="aspect-auto">Auto aspect ratio</div>
<div class="aspect-square">Square</div>
<div class="aspect-video">Video (16:9)</div>

<!-- Arbitrary values -->
<div class="aspect-[4/3]">4:3 ratio</div>
<div class="aspect-[2.35/1]">Cinema ratio</div>
```

---

## ✅ Columns ✅

### 🔍 Classes to Implement
- [x] **Numeric Columns** ✅
  - [x] `columns-1` to `columns-12` → `columns: 1` to `columns: 12` ✅
  - [x] Arbitrary: `columns-[15]` → `columns: 15` ✅

- [x] **Width-based Columns** ✅
  - [x] `columns-3xs` → `columns: 16rem` ✅
  - [x] `columns-2xs` → `columns: 18rem` ✅
  - [x] `columns-xs` → `columns: 20rem` ✅
  - [x] `columns-sm` → `columns: 24rem` ✅
  - [x] `columns-md` → `columns: 28rem` ✅
  - [x] `columns-lg` → `columns: 32rem` ✅
  - [x] `columns-xl` → `columns: 36rem` ✅
  - [x] `columns-2xl` → `columns: 42rem` ✅
  - [x] `columns-3xl` → `columns: 48rem` ✅
  - [x] `columns-4xl` → `columns: 56rem` ✅
  - [x] `columns-5xl` → `columns: 64rem` ✅
  - [x] `columns-6xl` → `columns: 72rem` ✅
  - [x] `columns-7xl` → `columns: 80rem` ✅

- [x] **Auto Columns** ✅
  - [x] `columns-auto` → `columns: auto` ✅

### 🧪 Test Cases
```html
<!-- Numeric columns -->
<div class="columns-2">Two columns</div>
<div class="columns-3">Three columns</div>

<!-- Width-based columns -->
<div class="columns-xs">Extra small columns</div>
<div class="columns-lg">Large columns</div>

<!-- Auto columns -->
<div class="columns-auto">Auto columns</div>
```

---

## ✅ Break After ✅

### 🔍 Classes to Implement
- [x] **Page Breaks** ✅
  - [x] `break-after-auto` → `break-after: auto` ✅
  - [x] `break-after-avoid` → `break-after: avoid` ✅
  - [x] `break-after-all` → `break-after: all` ✅
  - [x] `break-after-avoid-page` → `break-after: avoid-page` ✅
  - [x] `break-after-page` → `break-after: page` ✅
  - [x] `break-after-left` → `break-after: left` ✅
  - [x] `break-after-right` → `break-after: right` ✅
  - [x] `break-after-column` → `break-after: column` ✅

### 🧪 Test Cases
```html
<!-- Page breaks -->
<div class="break-after-auto">Auto break after</div>
<div class="break-after-avoid">Avoid break after</div>
<div class="break-after-page">Page break after</div>
<div class="break-after-column">Column break after</div>
```

---

## ✅ Break Before ✅

### 🔍 Classes to Implement
- [x] **Page Breaks** ✅
  - [x] `break-before-auto` → `break-before: auto` ✅
  - [x] `break-before-avoid` → `break-before: avoid` ✅
  - [x] `break-before-all` → `break-before: all` ✅
  - [x] `break-before-avoid-page` → `break-before: avoid-page` ✅
  - [x] `break-before-page` → `break-before: page` ✅
  - [x] `break-before-left` → `break-before: left` ✅
  - [x] `break-before-right` → `break-before: right` ✅
  - [x] `break-before-column` → `break-before: column` ✅

### 🧪 Test Cases
```html
<!-- Page breaks -->
<div class="break-before-auto">Auto break before</div>
<div class="break-before-avoid">Avoid break before</div>
<div class="break-before-page">Page break before</div>
<div class="break-before-column">Column break before</div>
```

---

## ✅ Break Inside ✅

### 🔍 Classes to Implement
- [x] **Page Breaks** ✅
  - [x] `break-inside-auto` → `break-inside: auto` ✅
  - [x] `break-inside-avoid` → `break-inside: avoid` ✅
  - [x] `break-inside-avoid-page` → `break-inside: avoid-page` ✅
  - [x] `break-inside-avoid-column` → `break-inside: avoid-column` ✅

### 🧪 Test Cases
```html
<!-- Page breaks -->
<div class="break-inside-auto">Auto break inside</div>
<div class="break-inside-avoid">Avoid break inside</div>
<div class="break-inside-avoid-page">Avoid page break inside</div>
<div class="break-inside-avoid-column">Avoid column break inside</div>
```

---

## ✅ Box Decoration Break ✅

### 🔍 Classes to Implement
- [x] **Box Decoration Break** ✅
  - [x] `box-decoration-clone` → `box-decoration-break: clone` ✅
  - [x] `box-decoration-slice` → `box-decoration-break: slice` ✅

### 🧪 Test Cases
```html
<!-- Box decoration break -->
<span class="box-decoration-clone bg-gradient-to-r from-blue-500 to-purple-500">
  Multi-line text with<br>
  cloned decoration
</span>
<span class="box-decoration-slice bg-gradient-to-r from-blue-500 to-purple-500">
  Multi-line text with<br>
  sliced decoration
</span>
```

---

## ✅ Box Sizing ✅

### 🔍 Classes to Implement
- [x] **Box Sizing** ✅
  - [x] `box-border` → `box-sizing: border-box` ✅
  - [x] `box-content` → `box-sizing: content-box` ✅

### 🧪 Test Cases
```html
<!-- Box sizing -->
<div class="box-border w-32 p-4 border-2">Border box</div>
<div class="box-content w-32 p-4 border-2">Content box</div>
```

---

## ✅ Display ✅

### 🔍 Classes to Implement
- [x] **Basic Display** ✅
  - [x] `block` → `display: block` ✅
  - [x] `inline` → `display: inline` ✅
  - [x] `inline-block` → `display: inline-block` ✅
  - [x] `flow-root` → `display: flow-root` ✅
  - [x] `contents` → `display: contents` ✅
  - [x] `list-item` → `display: list-item` ✅
  - [x] `hidden` → `display: none` ✅

- [x] **Flex & Grid** ✅
  - [x] `flex` → `display: flex` ✅
  - [x] `inline-flex` → `display: inline-flex` ✅
  - [x] `grid` → `display: grid` ✅
  - [x] `inline-grid` → `display: inline-grid` ✅

- [x] **Table Display** ✅
  - [x] `table` → `display: table` ✅
  - [x] `inline-table` → `display: inline-table` ✅
  - [x] `table-caption` → `display: table-caption` ✅
  - [x] `table-cell` → `display: table-cell` ✅
  - [x] `table-column` → `display: table-column` ✅
  - [x] `table-column-group` → `display: table-column-group` ✅
  - [x] `table-footer-group` → `display: table-footer-group` ✅
  - [x] `table-header-group` → `display: table-header-group` ✅
  - [x] `table-row-group` → `display: table-row-group` ✅
  - [x] `table-row` → `display: table-row` ✅

- [x] **Screen Reader Only** ✅
  - [x] `sr-only` → 스크린 리더 전용 (position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0) ✅
  - [x] `not-sr-only` → 스크린 리더 전용 해제 (position: static; width: auto; height: auto; padding: 0; margin: 0; overflow: visible; clip: auto; white-space: normal) ✅

### 🧪 Test Cases
```html
<!-- Basic display -->
<div class="block">Block element</div>
<span class="inline">Inline element</span>
<span class="inline-block">Inline-block element</span>
<div class="flex">Flex container</div>
<div class="grid">Grid container</div>
<div class="hidden">Hidden element</div>

<!-- Table display -->
<div class="table">Table display</div>
<div class="table-row">Table row</div>
<div class="table-cell">Table cell</div>
```

---

## ✅ Float ✅

### 🔍 Classes to Implement
- [x] **Float Direction** ✅
  - [x] `float-start` → `float: inline-start` ✅
  - [x] `float-end` → `float: inline-end` ✅
  - [x] `float-right` → `float: right` ✅
  - [x] `float-left` → `float: left` ✅
  - [x] `float-none` → `float: none` ✅

### 🧪 Test Cases
```html
<!-- Float -->
<div class="float-left">Float left</div>
<div class="float-right">Float right</div>
<div class="float-start">Float start</div>
<div class="float-end">Float end</div>
<div class="float-none">No float</div>
```

---

## ✅ Clear ✅

### 🔍 Classes to Implement
- [x] **Clear Floats** ✅
  - [x] `clear-start` → `clear: inline-start` ✅
  - [x] `clear-end` → `clear: inline-end` ✅
  - [x] `clear-left` → `clear: left` ✅
  - [x] `clear-right` → `clear: right` ✅
  - [x] `clear-both` → `clear: both` ✅
  - [x] `clear-none` → `clear: none` ✅

### 🧪 Test Cases
```html
<!-- Clear -->
<div class="clear-left">Clear left</div>
<div class="clear-right">Clear right</div>
<div class="clear-both">Clear both</div>
<div class="clear-start">Clear start</div>
<div class="clear-end">Clear end</div>
<div class="clear-none">No clear</div>
```

---

## ✅ Isolation ✅

### 🔍 Classes to Implement
- [x] **Isolation** ✅
  - [x] `isolate` → `isolation: isolate` ✅
  - [x] `isolation-auto` → `isolation: auto` ✅

### 🧪 Test Cases
```html
<!-- Isolation -->
<div class="isolate">Isolated stacking context</div>
<div class="isolation-auto">Auto isolation</div>
```

---

## ✅ Object Fit ✅

### 🔍 Classes to Implement
- [x] **Object Fit** ✅
  - [x] `object-contain` → `object-fit: contain` ✅
  - [x] `object-cover` → `object-fit: cover` ✅
  - [x] `object-fill` → `object-fit: fill` ✅
  - [x] `object-none` → `object-fit: none` ✅
  - [x] `object-scale-down` → `object-fit: scale-down` ✅

### 🧪 Test Cases
```html
<!-- Object fit -->
<img class="object-contain" src="image.jpg" alt="Contain">
<img class="object-cover" src="image.jpg" alt="Cover">
<img class="object-fill" src="image.jpg" alt="Fill">
<img class="object-none" src="image.jpg" alt="None">
<img class="object-scale-down" src="image.jpg" alt="Scale down">
```

---

## ✅ Object Position ✅

### 🔍 Classes to Implement
- [x] **Predefined Positions** ✅
  - [x] `object-bottom` → `object-position: bottom` ✅
  - [x] `object-center` → `object-position: center` ✅
  - [x] `object-left` → `object-position: left` ✅
  - [x] `object-left-bottom` → `object-position: left bottom` ✅
  - [x] `object-left-top` → `object-position: left top` ✅
  - [x] `object-right` → `object-position: right` ✅
  - [x] `object-right-bottom` → `object-position: right bottom` ✅
  - [x] `object-right-top` → `object-position: right top` ✅
  - [x] `object-top` → `object-position: top` ✅

- [x] **Custom Properties & Arbitrary Values** ✅
  - [x] `object-(<custom-property>)` → `object-position: var(<custom-property>)` ✅
  - [x] `object-[<value>]` → `object-position: <value>` ✅
  - [x] `object-[25%_75%]` → `object-position: 25% 75%` ✅

### 🧪 Test Cases
```html
<!-- Object position -->
<img class="object-top" src="image.jpg" alt="Top position">
<img class="object-center" src="image.jpg" alt="Center position">
<img class="object-bottom" src="image.jpg" alt="Bottom position">
<img class="object-left-top" src="image.jpg" alt="Left top position">
<img class="object-[25%_75%]" src="image.jpg" alt="Custom position">
```

---

## ✅ Overflow ✅

### 🔍 Classes to Implement
- [x] **General Overflow** ✅
  - [x] `overflow-auto` → `overflow: auto` ✅
  - [x] `overflow-hidden` → `overflow: hidden` ✅
  - [x] `overflow-clip` → `overflow: clip` ✅
  - [x] `overflow-visible` → `overflow: visible` ✅
  - [x] `overflow-scroll` → `overflow: scroll` ✅

- [x] **X-axis Overflow** ✅
  - [x] `overflow-x-auto` → `overflow-x: auto` ✅
  - [x] `overflow-x-hidden` → `overflow-x: hidden` ✅
  - [x] `overflow-x-clip` → `overflow-x: clip` ✅
  - [x] `overflow-x-visible` → `overflow-x: visible` ✅
  - [x] `overflow-x-scroll` → `overflow-x: scroll` ✅

- [x] **Y-axis Overflow** ✅
  - [x] `overflow-y-auto` → `overflow-y: auto` ✅
  - [x] `overflow-y-hidden` → `overflow-y: hidden` ✅
  - [x] `overflow-y-clip` → `overflow-y: clip` ✅
  - [x] `overflow-y-visible` → `overflow-y: visible` ✅
  - [x] `overflow-y-scroll` → `overflow-y: scroll` ✅

### 🧪 Test Cases
```html
<!-- General overflow -->
<div class="overflow-auto h-32">Auto overflow</div>
<div class="overflow-hidden h-32">Hidden overflow</div>
<div class="overflow-scroll h-32">Scroll overflow</div>

<!-- Axis-specific overflow -->
<div class="overflow-x-auto overflow-y-hidden h-32">X auto, Y hidden</div>
<div class="overflow-x-scroll overflow-y-auto h-32">X scroll, Y auto</div>
```

---

## ✅ Overscroll Behavior ✅

### 🔍 Classes to Implement
- [x] **General Overscroll** ✅
  - [x] `overscroll-auto` → `overscroll-behavior: auto` ✅
  - [x] `overscroll-contain` → `overscroll-behavior: contain` ✅
  - [x] `overscroll-none` → `overscroll-behavior: none` ✅

- [x] **X-axis Overscroll** ✅
  - [x] `overscroll-x-auto` → `overscroll-behavior-x: auto` ✅
  - [x] `overscroll-x-contain` → `overscroll-behavior-x: contain` ✅
  - [x] `overscroll-x-none` → `overscroll-behavior-x: none` ✅

- [x] **Y-axis Overscroll** ✅
  - [x] `overscroll-y-auto` → `overscroll-behavior-y: auto` ✅
  - [x] `overscroll-y-contain` → `overscroll-behavior-y: contain` ✅
  - [x] `overscroll-y-none` → `overscroll-behavior-y: none` ✅

### 🧪 Test Cases
```html
<!-- General overscroll -->
<div class="overscroll-auto">Auto overscroll</div>
<div class="overscroll-contain">Contain overscroll</div>
<div class="overscroll-none">No overscroll</div>

<!-- Axis-specific overscroll -->
<div class="overscroll-x-contain overscroll-y-auto">X contain, Y auto</div>
```

---

## ✅ Position ✅

### 🔍 Classes to Implement
- [x] **Position Types** ✅
  - [x] `static` → `position: static` ✅
  - [x] `fixed` → `position: fixed` ✅
  - [x] `absolute` → `position: absolute` ✅
  - [x] `relative` → `position: relative` ✅
  - [x] `sticky` → `position: sticky` ✅

### 🧪 Test Cases
```html
<!-- Position -->
<div class="static">Static position</div>
<div class="relative">Relative position</div>
<div class="absolute">Absolute position</div>
<div class="fixed">Fixed position</div>
<div class="sticky">Sticky position</div>
```

---

## ✅ Top / Right / Bottom / Left ✅

### 🔍 Classes to Implement
- [x] **Inset (All Sides)** ✅
  - [x] `inset-<number>` → `inset: calc(var(--spacing) * <number>)` ✅
  - [x] `-inset-<number>` → `inset: calc(var(--spacing) * -<number>)` ✅
  - [x] `inset-<fraction>` → `inset: calc(<fraction> * 100%)` ✅
  - [x] `-inset-<fraction>` → `inset: calc(<fraction> * -100%)` ✅
  - [x] `inset-px` → `inset: 1px` ✅
  - [x] `-inset-px` → `inset: -1px` ✅
  - [x] `inset-full` → `inset: 100%` ✅
  - [x] `-inset-full` → `inset: -100%` ✅
  - [x] `inset-auto` → `inset: auto` ✅
  - [x] `inset-(<custom-property>)` → `inset: var(<custom-property>)` ✅
  - [x] `inset-[<value>]` → `inset: <value>` ✅

- [x] **Inset X (Horizontal)** ✅
  - [x] `inset-x-<number>` → `inset-inline: calc(var(--spacing) * <number>)` ✅
  - [x] `-inset-x-<number>` → `inset-inline: calc(var(--spacing) * -<number>)` ✅
  - [x] `inset-x-<fraction>` → `inset-inline: calc(<fraction> * 100%)` ✅
  - [x] `-inset-x-<fraction>` → `inset-inline: calc(<fraction> * -100%)` ✅
  - [x] `inset-x-px` → `inset-inline: 1px` ✅
  - [x] `-inset-x-px` → `inset-inline: -1px` ✅
  - [x] `inset-x-full` → `inset-inline: 100%` ✅
  - [x] `-inset-x-full` → `inset-inline: -100%` ✅
  - [x] `inset-x-auto` → `inset-inline: auto` ✅
  - [x] `inset-x-(<custom-property>)` → `inset-inline: var(<custom-property>)` ✅
  - [x] `inset-x-[<value>]` → `inset-inline: <value>` ✅

- [x] **Inset Y (Vertical)** ✅
  - [x] `inset-y-<number>` → `inset-block: calc(var(--spacing) * <number>)` ✅
  - [x] `-inset-y-<number>` → `inset-block: calc(var(--spacing) * -<number>)` ✅
  - [x] `inset-y-<fraction>` → `inset-block: calc(<fraction> * 100%)` ✅
  - [x] `-inset-y-<fraction>` → `inset-block: calc(<fraction> * -100%)` ✅
  - [x] `inset-y-px` → `inset-block: 1px` ✅
  - [x] `-inset-y-px` → `inset-block: -1px` ✅
  - [x] `inset-y-full` → `inset-block: 100%` ✅
  - [x] `-inset-y-full` → `inset-block: -100%` ✅
  - [x] `inset-y-auto` → `inset-block: auto` ✅
  - [x] `inset-y-(<custom-property>)` → `inset-block: var(<custom-property>)` ✅
  - [x] `inset-y-[<value>]` → `inset-block: <value>` ✅

- [x] **Start (Inline Start)** ✅
  - [x] `start-<number>` → `inset-inline-start: calc(var(--spacing) * <number>)` ✅
  - [x] `-start-<number>` → `inset-inline-start: calc(var(--spacing) * -<number>)` ✅
  - [x] `start-<fraction>` → `inset-inline-start: calc(<fraction> * 100%)` ✅
  - [x] `-start-<fraction>` → `inset-inline-start: calc(<fraction> * -100%)` ✅
  - [x] `start-px` → `inset-inline-start: 1px` ✅
  - [x] `-start-px` → `inset-inline-start: -1px` ✅
  - [x] `start-full` → `inset-inline-start: 100%` ✅
  - [x] `-start-full` → `inset-inline-start: -100%` ✅
  - [x] `start-auto` → `inset-inline-start: auto` ✅
  - [x] `start-(<custom-property>)` → `inset-inline-start: var(<custom-property>)` ✅
  - [x] `start-[<value>]` → `inset-inline-start: <value>` ✅

- [x] **End (Inline End)** ✅
  - [x] `end-<number>` → `inset-inline-end: calc(var(--spacing) * <number>)` ✅
  - [x] `-end-<number>` → `inset-inline-end: calc(var(--spacing) * -<number>)` ✅
  - [x] `end-<fraction>` → `inset-inline-end: calc(<fraction> * 100%)` ✅
  - [x] `-end-<fraction>` → `inset-inline-end: calc(<fraction> * -100%)` ✅
  - [x] `end-px` → `inset-inline-end: 1px` ✅
  - [x] `-end-px` → `inset-inline-end: -1px` ✅
  - [x] `end-full` → `inset-inline-end: 100%` ✅
  - [x] `-end-full` → `inset-inline-end: -100%` ✅
  - [x] `end-auto` → `inset-inline-end: auto` ✅
  - [x] `end-(<custom-property>)` → `inset-inline-end: var(<custom-property>)` ✅
  - [x] `end-[<value>]` → `inset-inline-end: <value>` ✅

- [x] **Top** ✅
  - [x] `top-<number>` → `top: calc(var(--spacing) * <number>)` ✅
  - [x] `-top-<number>` → `top: calc(var(--spacing) * -<number>)` ✅
  - [x] `top-<fraction>` → `top: calc(<fraction> * 100%)` ✅
  - [x] `-top-<fraction>` → `top: calc(<fraction> * -100%)` ✅
  - [x] `top-px` → `top: 1px` ✅
  - [x] `-top-px` → `top: -1px` ✅
  - [x] `top-full` → `top: 100%` ✅
  - [x] `-top-full` → `top: -100%` ✅
  - [x] `top-auto` → `top: auto` ✅
  - [x] `top-(<custom-property>)` → `top: var(<custom-property>)` ✅
  - [x] `top-[<value>]` → `top: <value>` ✅

- [x] **Right** ✅
  - [x] `right-<number>` → `right: calc(var(--spacing) * <number>)` ✅
  - [x] `-right-<number>` → `right: calc(var(--spacing) * -<number>)` ✅
  - [x] `right-<fraction>` → `right: calc(<fraction> * 100%)` ✅
  - [x] `-right-<fraction>` → `right: calc(<fraction> * -100%)` ✅
  - [x] `right-px` → `right: 1px` ✅
  - [x] `-right-px` → `right: -1px` ✅
  - [x] `right-full` → `right: 100%` ✅
  - [x] `-right-full` → `right: -100%` ✅
  - [x] `right-auto` → `right: auto` ✅
  - [x] `right-(<custom-property>)` → `right: var(<custom-property>)` ✅
  - [x] `right-[<value>]` → `right: <value>` ✅

- [x] **Bottom** ✅
  - [x] `bottom-<number>` → `bottom: calc(var(--spacing) * <number>)` ✅
  - [x] `-bottom-<number>` → `bottom: calc(var(--spacing) * -<number>)` ✅
  - [x] `bottom-<fraction>` → `bottom: calc(<fraction> * 100%)` ✅
  - [x] `-bottom-<fraction>` → `bottom: calc(<fraction> * -100%)` ✅
  - [x] `bottom-px` → `bottom: 1px` ✅
  - [x] `-bottom-px` → `bottom: -1px` ✅
  - [x] `bottom-full` → `bottom: 100%` ✅
  - [x] `-bottom-full` → `bottom: -100%` ✅
  - [x] `bottom-auto` → `bottom: auto` ✅
  - [x] `bottom-(<custom-property>)` → `bottom: var(<custom-property>)` ✅
  - [x] `bottom-[<value>]` → `bottom: <value>` ✅

- [x] **Left** ✅
  - [x] `left-<number>` → `left: calc(var(--spacing) * <number>)` ✅
  - [x] `-left-<number>` → `left: calc(var(--spacing) * -<number>)` ✅
  - [x] `left-<fraction>` → `left: calc(<fraction> * 100%)` ✅
  - [x] `-left-<fraction>` → `left: calc(<fraction> * -100%)` ✅
  - [x] `left-px` → `left: 1px` ✅
  - [x] `-left-px` → `left: -1px` ✅
  - [x] `left-full` → `left: 100%` ✅
  - [x] `-left-full` → `left: -100%` ✅
  - [x] `left-auto` → `left: auto` ✅
  - [x] `left-(<custom-property>)` → `left: var(<custom-property>)` ✅
  - [x] `left-[<value>]` → `left: <value>` ✅

### 🧪 Test Cases
```html
<!-- Inset -->
<div class="absolute inset-0">Full inset</div>
<div class="absolute inset-x-4 inset-y-2">X and Y inset</div>
<div class="absolute inset-4">All sides inset</div>

<!-- Individual sides -->
<div class="absolute top-4 right-4">Top right</div>
<div class="absolute bottom-0 left-0">Bottom left</div>
<div class="absolute start-4 end-4">Start and end</div>

<!-- Negative values -->
<div class="relative -top-2 -left-2">Negative positioning</div>

<!-- Arbitrary values -->
<div class="absolute top-[13px] left-[17px]">Custom position</div>
```

---

## ✅ Visibility ✅

### 🔍 Classes to Implement
- [x] **Visibility** ✅
  - [x] `visible` → `visibility: visible` ✅
  - [x] `invisible` → `visibility: hidden` ✅
  - [x] `collapse` → `visibility: collapse` ✅

### 🧪 Test Cases
```html
<!-- Visibility -->
<div class="visible">Visible element</div>
<div class="invisible">Invisible element</div>
<tr class="collapse">Collapsed table row</tr>
```

---

## ✅ Z-Index ✅

### 🔍 Classes to Implement
- [x] **Z-Index Values** ✅
  - [x] `z-<number>` → `z-index: <number>` ✅
  - [x] `z-auto` → `z-index: auto` ✅
  - [x] `z-[<value>]` → `z-index: <value>` ✅
  - [x] `z-(<custom-property>)` → `z-index: var(<custom-property>)` ✅

- [x] **Common Z-Index Values** (자동 지원) ✅
  - [x] `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50` ✅
  - [x] `z-[-1]`, `z-[999]`, `z-[9999]` ✅

### 🧪 Test Cases
```html
<!-- Z-index -->
<div class="z-0">Z-index 0</div>
<div class="z-10">Z-index 10</div>
<div class="z-50">Z-index 50</div>
<div class="z-auto">Auto z-index</div>

<!-- Arbitrary values -->
<div class="z-[999]">High z-index</div>
<div class="z-[-1]">Negative z-index</div>
```

---

## 🎯 구현 우선순위

### High Priority (Core Layout)
1. **Display** - 레이아웃의 핵심
2. **Position** - 요소 배치의 기본
3. **Top/Right/Bottom/Left** - 위치 조정
4. **Overflow** - 콘텐츠 넘침 처리
5. **Z-Index** - 레이어 관리

### Medium Priority (Box Model)
6. **Box Sizing** - 박스 모델 제어
7. **Visibility** - 요소 표시/숨김
8. **Float & Clear** - 플로팅 레이아웃
9. **Aspect Ratio** - 비율 유지

### Lower Priority (Advanced)
10. **Columns** - 다단 레이아웃
11. **Break After/Before/Inside** - 페이지 나누기
12. **Box Decoration Break** - 장식 나누기
13. **Isolation** - 스택 컨텍스트
14. **Object Fit/Position** - 미디어 객체
15. **Overscroll Behavior** - 스크롤 동작

## 📝 구현 참고사항

### Spacing Values
- 기본 spacing scale: `0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96`
- `px` (1px), `full` (100%) 포함
- Negative values: `-` prefix 지원

### Responsive Support
- 모든 utilities는 responsive variants 지원
- `sm:`, `md:`, `lg:`, `xl:`, `2xl:` breakpoints

### State Variants
- `hover:`, `focus:`, `active:` 등 interactive states
- `group-*`, `peer-*` variants
- `first:`, `last:`, `odd:`, `even:` 등

### Container Queries (v4.1)
- `@` prefix variants: `@sm:`, `@md:`, `@lg:`, `@xl:`
- `@max-*` variants for max-width queries
- `@min-*` variants for min-width queries

### Arbitrary Value Support
- 모든 layout utilities는 arbitrary values 지원
- 예: `top-[13px]`, `inset-[50vh]`, `z-[9999]`

### V4.1 특이사항
- **Dynamic Spacing Scale**: `--spacing` 변수 기반으로 모든 spacing 값 자동 생성
- **Custom Properties**: `(<custom-property>)` 문법으로 CSS 변수 참조 가능
- **Fraction Support**: `1/2`, `1/3`, `2/3`, `1/4`, `3/4` 등 분수 값 지원
- **Modern CSS Features**: `inset-inline`, `inset-block` 등 논리적 속성 사용
- **Screen Reader**: `sr-only`, `not-sr-only` 유틸리티 포함

### 브라우저 호환성
- Modern browsers (Safari 16.4+, Chrome 109+, Firefox 109+)
- Legacy fallbacks 자동 제공 (Safari 15+에서도 기본 동작)
- Container queries, cascade layers 등 최신 CSS 기능 활용

---

## 🎯 Implementation Notes

### v4.1 New Features
- **Logical Properties**: `start-{value}`, `end-{value}` for international layouts
- **Enhanced Inset**: Improved positioning with logical direction support
- **Advanced Overflow**: `overflow-clip` for precise clipping control

### Performance Considerations
- Position utilities should leverage CSS custom properties for theme integration
- Inset utilities should support both physical and logical directions
- Z-index utilities should maintain a clear stacking context hierarchy

### Browser Support
- CSS Logical Properties: Modern browsers (IE support via fallbacks)
- CSS Positioning: Universal support
- CSS Multi-column: IE 10+ (with -ms- prefixes where needed)

---

## 🎯 Implementation Priority

### Phase 1: Core (Current)
1. ✅ Display utilities
2. 🚧 Position utilities
3. 🚧 Flexbox utilities

### Phase 2: Advanced
1. ❌ Grid utilities
2. ❌ Container utilities
3. ❌ Advanced gap features

### Phase 3: Polish
1. ❌ Performance optimization
2. ❌ Complete testing
3. ❌ Documentation

---

## 🔗 Related Files

- [Layout Parser](../../packages/cssma-v3/src/core/parsers/layout-parser.ts)
- [Position Parser](../../packages/cssma-v3/src/core/parsers/position-parser.ts)
- [Flexbox Parser](../../packages/cssma-v3/src/core/parsers/flexbox-grid-parser.ts)
- [Tests Directory](../../packages/cssma-v3/tests/)

---

**Next Review**: January 2025 