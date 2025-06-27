import { describe, it, expect } from "vitest";
import { parseTextWrap } from "../../src/parser/utilities/textWrap";

describe("parseTextWrap", () => {
  it("parses text-wrap", () => {
    expect(parseTextWrap("text-wrap")).toEqual({ type: "text-wrap", preset: "wrap", raw: "text-wrap", arbitrary: false });
  });
  it("parses text-nowrap", () => {
    expect(parseTextWrap("text-nowrap")).toEqual({ type: "text-wrap", preset: "nowrap", raw: "text-nowrap", arbitrary: false });
  });
  it("parses text-balance", () => {
    expect(parseTextWrap("text-balance")).toEqual({ type: "text-wrap", preset: "balance", raw: "text-balance", arbitrary: false });
  });
  it("parses text-pretty", () => {
    expect(parseTextWrap("text-pretty")).toEqual({ type: "text-wrap", preset: "pretty", raw: "text-pretty", arbitrary: false });
  });
  it("returns null for invalid values", () => {
    expect(parseTextWrap("text-wraps")).toBeNull();
    expect(parseTextWrap("text-")).toBeNull();
    expect(parseTextWrap("wrap")).toBeNull();
    expect(parseTextWrap("text-wrap-pretty")).toBeNull();
    expect(parseTextWrap("text-wrap-[custom]")).toBeNull();
  });
}); 