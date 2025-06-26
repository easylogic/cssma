import { describe, it, expect } from "vitest";
import { parseOverflowWrap } from "../../src/parser/utilities/overflowWrap";

describe("parseOverflowWrap", () => {
  it("parses wrap-break-word", () => {
    expect(parseOverflowWrap("wrap-break-word")).toEqual({ type: "overflow-wrap", preset: "wrap-break-word", raw: "wrap-break-word", arbitrary: false });
  });
  it("parses wrap-anywhere", () => {
    expect(parseOverflowWrap("wrap-anywhere")).toEqual({ type: "overflow-wrap", preset: "wrap-anywhere", raw: "wrap-anywhere", arbitrary: false });
  });
  it("parses wrap-normal", () => {
    expect(parseOverflowWrap("wrap-normal")).toEqual({ type: "overflow-wrap", preset: "wrap-normal", raw: "wrap-normal", arbitrary: false });
  });
  it("parses arbitrary value", () => {
    expect(parseOverflowWrap("wrap-[custom]")).toEqual({ type: "overflow-wrap", preset: "custom", raw: "wrap-[custom]", arbitrary: true });
    expect(parseOverflowWrap("wrap-[break-all]")).toEqual({ type: "overflow-wrap", preset: "break-all", raw: "wrap-[break-all]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseOverflowWrap("overflow-wrap-break-word")).toBeNull();
    expect(parseOverflowWrap("wrap-foo")).toBeNull();
    expect(parseOverflowWrap("wrapanywhere")).toBeNull();
  });
}); 