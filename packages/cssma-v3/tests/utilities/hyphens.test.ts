import { describe, it, expect } from "vitest";
import { parseTypography } from '../../src/parser/utilities/typography';

describe("parseHyphens", () => {
  it("parses hyphens-none", () => {
    expect(parseTypography("hyphens-none")).toEqual({ type: "hyphens", preset: "none", raw: "hyphens-none", arbitrary: false });
  });
  it("parses hyphens-manual", () => {
    expect(parseTypography("hyphens-manual")).toEqual({ type: "hyphens", preset: "manual", raw: "hyphens-manual", arbitrary: false });
  });
  it("parses hyphens-auto", () => {
    expect(parseTypography("hyphens-auto")).toEqual({ type: "hyphens", preset: "auto", raw: "hyphens-auto", arbitrary: false });
  });
  it("returns null for invalid values", () => {
    expect(parseTypography("hyphen-none")).toBeNull();
    expect(parseTypography("hyphens-foo")).toBeNull();
    expect(parseTypography("hyphensauto")).toBeNull();
  });
}); 