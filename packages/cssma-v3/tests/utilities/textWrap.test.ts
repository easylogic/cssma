import { describe, it, expect } from "vitest";
import { parseTypography } from '../../src/parser/utilities/typography';

describe("parseTextWrap", () => {
  it("parses text-wrap", () => {
    expect(parseTypography("text-wrap")).toEqual({ type: "text-wrap", preset: "wrap", raw: "text-wrap", arbitrary: false });
  });
  it("parses text-nowrap", () => {
    expect(parseTypography("text-nowrap")).toEqual({ type: "text-wrap", preset: "nowrap", raw: "text-nowrap", arbitrary: false });
  });
  it("parses text-balance", () => {
    expect(parseTypography("text-balance")).toEqual({ type: "text-wrap", preset: "balance", raw: "text-balance", arbitrary: false });
  });
  it("parses text-pretty", () => {
    expect(parseTypography("text-pretty")).toEqual({ type: "text-wrap", preset: "pretty", raw: "text-pretty", arbitrary: false });
  });
  it("returns null for invalid values", () => {
    expect(parseTypography("text-wraps")).toBeNull();
    expect(parseTypography("text-")).toBeNull();
    expect(parseTypography("wrap")).toBeNull();
    expect(parseTypography("text-wrap-pretty")).toBeNull();
    expect(parseTypography("text-wrap-[custom]")).toBeNull();
  });
}); 