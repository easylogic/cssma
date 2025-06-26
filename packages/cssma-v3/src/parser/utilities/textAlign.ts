export function parseTextAlign(token: string) {
  // Tailwind v4.1 text-align utilities
  // https://tailwindcss.com/docs/text-align
  switch (token) {
    case "text-left":
      return { textAlign: "left" };
    case "text-center":
      return { textAlign: "center" };
    case "text-right":
      return { textAlign: "right" };
    case "text-justify":
      return { textAlign: "justify" };
    case "text-start":
      return { textAlign: "start" };
    case "text-end":
      return { textAlign: "end" };
    default:
      // Arbitrary value: text-[value]
      const arbitrary = token.match(/^text-\[(.+)]$/);
      if (arbitrary) {
        return { textAlign: arbitrary[1] };
      }
      return null;
  }
} 