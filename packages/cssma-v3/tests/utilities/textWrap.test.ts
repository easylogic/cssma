import { describe, it, expect } from "vitest";
import { parseTextWrap } from "../../src/parser/utilities/textWrap";

describe("parseTextWrap", () => {
  it("parses text-wrap", () => {
    expect(parseTextWrap("text-wrap")).toEqual({ type: "text-wrap", preset: "text-wrap", raw: "text-wrap", arbitrary: false });
  });
  it("parses text-nowrap", () => {
    expect(parseTextWrap("text-nowrap")).toEqual({ type: "text-wrap", preset: "text-nowrap", raw: "text-nowrap", arbitrary: false });
  });
  it("parses text-balance", () => {
    expect(parseTextWrap("text-balance")).toEqual({ type: "text-wrap", preset: "text-balance", raw: "text-balance", arbitrary: false });
  });
  it("parses text-pretty", () => {
    expect(parseTextWrap("text-pretty")).toEqual({ type: "text-wrap", preset: "text-pretty", raw: "text-pretty", arbitrary: false });
  });
  it("parses arbitrary value", () => {
    expect(parseTextWrap("text-wrap-[custom]")).toEqual({ type: "text-wrap", preset: "custom", raw: "text-wrap-[custom]", arbitrary: true });
    expect(parseTextWrap("text-wrap-[foo-bar]")).toEqual({ type: "text-wrap", preset: "foo-bar", raw: "text-wrap-[foo-bar]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTextWrap("wrap-text")).toBeNull();
    expect(parseTextWrap("text-wrap-foo")).toBeNull();
    expect(parseTextWrap("text-balance-wrap")).toBeNull();
  });
}); 