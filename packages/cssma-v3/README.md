# cssma-v3: Next-Gen Tailwind CSS Parser

## 목표
- 최신 Tailwind CSS class string을 정확하게 파싱
- modifier chain의 순서 보존 및 확장성
- 다양한 출력 포맷 지원 (CSS, JS, Figma 등)

## Tokenizer 지원 문법

### 지원하는 Tailwind CSS class string 문법

- **modifier chain**: `sm:hover:bg-blue-500`
- **arbitrary variant**: `[&>*]:bg-red-500`, `[data-state=open]:block`
- **중첩 arbitrary variant**: `group-[.foo_&]:hover:bg-red-500`, `[&:not(:first-child)]:text-blue-500`
- **arbitrary value**: `bg-[rgb(34,197,94)]`, `w-[calc(100%-1rem)]`
- **core utility에 슬래시/점/괄호**: `bg-blue-500/50`, `text-[length:1.5rem]`, `bg-[hsl(var(--color-primary)/0.5)]`
- **여러 attribute selector**: `[data-state=open][aria-selected=true]:bg-blue-500`
- **escape 문자**: `hover:bg-\[red\]`
- **공백/탭/개행 무시**: `  md:\tfocus:bg-blue-500\n` → `md:focus:bg-blue-500`
- **잘못된/닫히지 않은 괄호도 허용**: `md:[data-state=open:bg-blue-500`

### 토큰화 규칙
- 콜론(`:`)은 괄호(`[]`, `()`, `{}`) 밖에서만 토큰 구분자로 동작
- 마지막 토큰은 항상 core utility로 간주
- 각 토큰의 양쪽 공백/개행/탭은 자동으로 trim
- 괄호 내부의 콜론/슬래시/점 등은 토큰 분리에 영향 없음

### 예시
| 입력 | 토큰화 결과 |
|------|-------------|
| `md:hover:bg-blue-500/50` | `[md, hover, bg-blue-500/50]` |
| `[&>*]:bg-red-500` | `[[&>*], bg-red-500]` |
| `dark:group-hover:[data-state=open]:bg-[rgb(34,197,94)]` | `[dark, group-hover, [data-state=open], bg-[rgb(34,197,94)]]` |
| `sm:focus-within:aria-checked:bg-blue-500` | `[sm, focus-within, aria-checked, bg-blue-500]` |
| `group-[.foo_&]:hover:bg-red-500` | `[group-[.foo_&], hover, bg-red-500]` |
| `bg-[url(data:image/svg+xml;utf8,<svg></svg>)]` | `[bg-[url(data:image/svg+xml;utf8,<svg></svg>)]]` |
| `  md:\tfocus:bg-blue-500\n` | `[md, focus, bg-blue-500]` |

### 한계/비고
- class string 내의 여러 공백/개행/탭은 무시됨
- 괄호가 닫히지 않아도 마지막까지 하나의 토큰으로 처리
- 실제 Tailwind CSS와 동일한 토큰화 규칙을 최대한 반영

## 디렉토리 구조

```
src/
  parser/
    index.ts           # 엔트리포인트, parseClassName 등
    tokenizer.ts       # 토큰 분리 (modifier, core, arbitrary 등)
    chain.ts           # modifier chain 파싱 및 순서 보존
    modifiers/
      responsive.ts
      state.ts
      darkmode.ts
      group.ts
      attribute.ts
      motion.ts
      ...etc
    core/
      color.ts
      spacing.ts
      typography.ts
      ...etc
    types.ts           # 모든 타입/인터페이스/유니언 정의
    utils.ts           # 공통 유틸리티
  generator/
    css.ts             # 파싱 결과를 CSS로 변환
    js.ts              # JS 객체 변환 등
    figma.ts           # Figma 스타일 변환 등
  tests/
    parser.test.ts
    modifiers.test.ts
    ...etc
```

## 개발 순서

1. **타입/인터페이스 설계** (`types.ts`)
2. **Tokenizer** 구현 (`tokenizer.ts`)
3. **Modifier Chain Parser** 구현 (`chain.ts`)
4. **각 Modifier 파서** 구현 (`modifiers/`)
5. **Core Utility 파서** 구현 (`core/`)
6. **Main Parser** 조립 (`index.ts`)
7. **Generator**(CSS 등) 구현 (`generator/`)
8. **테스트** 작성 (`tests/`)

---

## 진행상황 체크리스트

- [ ] 타입/인터페이스 설계
- [ ] Tokenizer 구현
- [ ] Modifier Chain Parser 구현
- [ ] Modifier 파서 구현
- [ ] Core Utility 파서 구현
- [ ] Main Parser 조립
- [ ] Generator 구현
- [ ] 테스트 작성 