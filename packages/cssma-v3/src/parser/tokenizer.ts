// Tailwind class string을 modifier/utility로 토큰화

export interface Token {
  type: 'modifier' | 'utility';
  value: string;
}

function splitClassName(input: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let depth = 0;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    // 1. escape 문자 처리
    if (c === '\\' && i + 1 < input.length) {
      current += c + input[i + 1];
      i++; // 다음 문자까지 skip
      continue;
    }
    // 2. 대괄호 처리
    if (c === '[') {
      if (depth === 0 && current.trim()) {
        // 직전 current가 utility prefix라면, 대괄호까지 합쳐서 하나의 토큰으로 처리
        // 예: bg-[...], w-[...], text-[...]
        // 뒤에 붙는 대괄호가 utility의 일부인지 확인
        // (단순하게, current가 -로 끝나면 prefix로 간주)
        if (current.trim().endsWith('-')) {
          current += c;
          depth++;
          continue;
        } else {
          tokens.push(current.trim());
          current = '';
        }
      }
      depth++;
      current += c;
      continue;
    }
    if (c === ']') {
      current += c;
      depth--;
      if (depth === 0) {
        tokens.push(current.trim());
        current = '';
        continue;
      }
      continue;
    }
    if (c === ':' && depth === 0) {
      if (current.trim()) {
        tokens.push(current.trim());
        current = '';
      }
    } else {
      current += c;
    }
  }
  if (current.trim()) tokens.push(current.trim());

  // 마지막 두 토큰이 "prefix-", "[...something...]" 형태라면 합쳐서 하나의 토큰으로 만듦
  if (
    tokens.length >= 2 &&
    /^.+-$/.test(tokens[tokens.length - 2]) &&
    /^\[.*\]$/.test(tokens[tokens.length - 1])
  ) {
    const merged = tokens[tokens.length - 2] + tokens[tokens.length - 1];
    tokens.splice(tokens.length - 2, 2, merged);
  }

  // 마지막 두 토큰이 [...something...] 또는 utility + '!'라면 합침
  if (
    tokens.length >= 2 &&
    tokens[tokens.length - 1] === '!' &&
    (/^.+$/.test(tokens[tokens.length - 2]) || /^\[.*\]$/.test(tokens[tokens.length - 2]))
  ) {
    const merged = tokens[tokens.length - 2] + '!';
    tokens.splice(tokens.length - 2, 2, merged);
  }

  return tokens;
}

export function tokenize(input: string): Token[] {
  const segments = splitClassName(input.trim());
  if (segments.length === 0) return [];
  const tokens: Token[] = [];
  for (let i = 0; i < segments.length; i++) {
    let value = segments[i];
    // 마지막 토큰이 !로 끝나면 important로 간주하여 utility value에 !를 포함
    if (i === segments.length - 1) {
      // 만약 value가 !로 끝나고, !가 대괄호 내부가 아니라면
      if (value.endsWith('!')) {
        tokens.push({ type: 'utility', value });
        continue;
      }
      tokens.push({ type: 'utility', value });
    } else {
      tokens.push({ type: 'modifier', value });
    }
  }
  return tokens;
} 