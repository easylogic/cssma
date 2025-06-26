// Tailwind 4.1+ container query variant 파서
// @md, @max-md, @container/main, @min-[475px], @sm/main, @sm:@max-md, @min-[475px], @max-[960px] 등 지원

export function parseContainerModifier(token: string) {
  if (!token || !token.startsWith('@')) return null;

  // @min-[475px], @max-[960px] 등 arbitrary value
  const minMaxArb = token.match(/^@(min|max)-\[(.+)\]$/);
  if (minMaxArb) {
    if (!minMaxArb[2]) return null; // 값이 비어 있으면 null
    return { type: 'container', variant: minMaxArb[1], value: minMaxArb[2] };
  }

  // @container/main, @sm/main 등 이름 지정
  const named = token.match(/^@([a-z0-9-]+)\/([a-zA-Z0-9_-]+)$/);
  if (named) {
    const variant = named[1];
    const name = named[2];
    if (variant === 'container') {
      return { type: 'container', variant: 'container', name };
    }
    return { type: 'container', variant, name };
  }

  // @max-md, @md 등 (단, 하이픈으로 끝나면 무효)
  const maxOrNormal = token.match(/^@((max-)?[a-z0-9-]+)$/);
  if (maxOrNormal) {
    const variant = maxOrNormal[1];
    if (variant.endsWith('-')) return null;
    return { type: 'container', variant };
  }

  return null;
} 