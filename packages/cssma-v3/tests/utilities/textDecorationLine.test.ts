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
  it("parses no-underline", () => {
    expect(parseTextDecorationLine("no-underline")).toEqual({ type: "text-decoration-line", preset: "no-underline", raw: "no-underline", arbitrary: false });
  });
  it("parses arbitrary value", () => {
    expect(parseTextDecorationLine("text-decoration-line-[underline_overline]")).toEqual({ type: "text-decoration-line", preset: "underline_overline", raw: "text-decoration-line-[underline_overline]", arbitrary: true });
    expect(parseTextDecorationLine("text-decoration-line-[none]")).toEqual({ type: "text-decoration-line", preset: "none", raw: "text-decoration-line-[none]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTextDecorationLine("text-underline")).toBeNull();
    expect(parseTextDecorationLine("underline-overline")).toBeNull();
    expect(parseTextDecorationLine("text-decoration-line-foo")).toBeNull();
  });
}); 