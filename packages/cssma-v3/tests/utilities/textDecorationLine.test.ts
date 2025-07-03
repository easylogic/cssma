import { describe, it, expect } from "vitest";
import { parseTypography } from '../../src/parser/utilities/typography';

describe("parseTextDecorationLine", () => {
  it("parses underline", () => {
    expect(parseTypography("underline")).toEqual({ type: "text-decoration-line", preset: "underline", raw: "underline", arbitrary: false });
  });
  it("parses overline", () => {
    expect(parseTypography("overline")).toEqual({ type: "text-decoration-line", preset: "overline", raw: "overline", arbitrary: false });
  });
  it("parses line-through", () => {
    expect(parseTypography("line-through")).toEqual({ type: "text-decoration-line", preset: "line-through", raw: "line-through", arbitrary: false });
  });
  it("parses no-underline as none", () => {
    expect(parseTypography("no-underline")).toEqual({ type: "text-decoration-line", preset: "none", raw: "no-underline", arbitrary: false });
  });
  it("returns null for invalid", () => {
    expect(parseTypography("text-underline")).toBeNull();
    expect(parseTypography("underline-overline")).toBeNull();
    expect(parseTypography("text-decoration-line-foo")).toBeNull();
    expect(parseTypography("text-decoration-line-[underline]")).toBeNull();
  });
}); 