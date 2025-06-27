export function parseTextAlign(token: string) {
  // Tailwind v4.1 text-align utilities
  // https://tailwindcss.com/docs/text-align
  switch (token) {
    case "text-left":
      return { type: "text-align", preset: "left", raw: token, arbitrary: false };
    case "text-center":
      return { type: "text-align", preset: "center", raw: token, arbitrary: false };
    case "text-right":
      return { type: "text-align", preset: "right", raw: token, arbitrary: false };
    case "text-justify":
      return { type: "text-align", preset: "justify", raw: token, arbitrary: false };
    case "text-start":
      return { type: "text-align", preset: "start", raw: token, arbitrary: false };
    case "text-end":
      return { type: "text-align", preset: "end", raw: token, arbitrary: false };
    default:
      return null;
  }
} 