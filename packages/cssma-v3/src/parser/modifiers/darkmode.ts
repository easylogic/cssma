// darkmode modifier 파서 (예: dark, light)

export function parseDarkmodeModifier(token: string) {
  if (token === 'dark' || token === 'light') {
    return { type: 'darkmode', mode: token };
  }
  return null;
} 