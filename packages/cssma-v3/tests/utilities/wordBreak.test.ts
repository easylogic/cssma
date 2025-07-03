import { describe, it, expect } from "vitest";
import { parseTypography } from '../../src/parser/utilities/typography';

describe("parseWordBreak", () => {
  it("parses break-normal", () => {
    expect(parseTypography("break-normal")).toEqual({ type: "word-break", preset: "normal", raw: "break-normal", arbitrary: false });
  });
  it("parses break-all", () => {
    expect(parseTypography("break-all")).toEqual({ type: "word-break", preset: "all", raw: "break-all", arbitrary: false });
  });
  it("parses break-keep", () => {
    expect(parseTypography("break-keep")).toEqual({ type: "word-break", preset: "keep", raw: "break-keep", arbitrary: false });
  });
  it("returns null for invalid values", () => {
    expect(parseTypography("word-break-normal")).toBeNull();
    expect(parseTypography("break-foo")).toBeNull();
    expect(parseTypography("wordbreakall")).toBeNull();
  });
}); 