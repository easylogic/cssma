import { describe, it, expect } from "vitest";
import { parseOverflowWrap } from "../../src/parser/utilities/overflowWrap";

describe("parseOverflowWrap", () => {
  it("parses overflow-wrap-break-word", () => {
    expect(parseOverflowWrap("overflow-wrap-break-word")).toEqual({ type: "overflow-wrap", preset: "break-word", raw: "overflow-wrap-break-word", arbitrary: false });
  });
  it("parses overflow-wrap-anywhere", () => {
    expect(parseOverflowWrap("overflow-wrap-anywhere")).toEqual({ type: "overflow-wrap", preset: "anywhere", raw: "overflow-wrap-anywhere", arbitrary: false });
  });
  it("parses overflow-wrap-normal", () => {
    expect(parseOverflowWrap("overflow-wrap-normal")).toEqual({ type: "overflow-wrap", preset: "normal", raw: "overflow-wrap-normal", arbitrary: false });
  });
  it("returns null for invalid values", () => {
    expect(parseOverflowWrap("wrap-break-word")).toBeNull();
    expect(parseOverflowWrap("overflow-wrap-foo")).toBeNull();
    expect(parseOverflowWrap("overflowwrapanywhere")).toBeNull();
  });
}); 