import { describe, it, expect } from "vitest";
import { parseTextDecorationLine } from "../../src/parser/utilities/textDecorationLine";

describe("parseTextDecorationLine", () => {
  it("parses underline", () => {
    expect(parseTextDecorationLine("underline")).toEqual({ type: "text-decoration-line", preset: "underline", raw: "underline", arbitrary: false });
  });
  it("parses overline", () => {
    expect(parseTextDecorationLine("overline")).toEqual({ type: "text-decoration-line", preset: "overline", raw: "overline", arbitrary: false });
  });
  it("parses line-through", () => {
    expect(parseTextDecorationLine("line-through")).toEqual({ type: "text-decoration-line", preset: "line-through", raw: "line-through", arbitrary: false });
  });
  it("parses no-underline as none", () => {
    expect(parseTextDecorationLine("no-underline")).toEqual({ type: "text-decoration-line", preset: "none", raw: "no-underline", arbitrary: false });
  });
  it("returns null for invalid", () => {
    expect(parseTextDecorationLine("text-underline")).toBeNull();
    expect(parseTextDecorationLine("underline-overline")).toBeNull();
    expect(parseTextDecorationLine("text-decoration-line-foo")).toBeNull();
    expect(parseTextDecorationLine("text-decoration-line-[underline]")).toBeNull();
  });
}); 