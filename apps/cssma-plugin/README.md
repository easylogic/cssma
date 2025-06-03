# CSSMA Plugin

Figma와 TailwindCSS 간 양방향 변환을 지원하는 플러그인입니다.

## Features

- **CSS Converter**: Figma 요소를 CSS/TailwindCSS로 변환
- **Component Creator**: JSON 스펙에서 Figma 컴포넌트 생성
- **AI Generator**: Claude AI를 활용한 디자인 자동 생성

## AI 기능 사용을 위한 설정

AI Generator 탭을 사용하려면 Anthropic API 키가 필요합니다.

### 1. Anthropic API 키 발급
1. [Anthropic Console](https://console.anthropic.com/)에 접속
2. 계정 생성 또는 로그인
3. API Keys 메뉴에서 새 API 키 생성

### 2. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 다음과 같이 설정:

```bash
# .env 파일
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 3. 빌드 및 실행
```bash
pnpm install
pnpm run build
```

## 개발

```bash
# 개발 서버 실행
pnpm run dev

# 빌드
pnpm run build
```

## AI Generator 사용법

1. **AI Generator** 탭 클릭
2. 상단의 드롭다운에서 샘플 디자인 선택 또는
3. 하단 채팅창에 원하는 디자인 요청 입력
4. AI가 디자인을 생성하여 Figma 캔버스에 자동 배치

### 예시 프롬프트:
```
깔끔한 SaaS 랜딩 페이지를 만들어주세요.
히어로 섹션에는 큰 제목과 설명,
그 아래에는 3개의 주요 기능을 보여주는 카드 섹션,
마지막으로 고객 후기 섹션을 넣어주세요.
전체적으로 밝은 톤에 파란색 포인트를 사용하고,
여유로운 여백으로 가독성을 높여주세요.
``` 