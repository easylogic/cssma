import { describe, it, expect } from "vitest";
import { parseMisc } from '../../src/parser/utilities/misc';

describe("parseOverflowWrap", () => {
  it("parses overflow-wrap-break-word", () => {
    expect(parseMisc("overflow-wrap-break-word")).toEqual({ type: "overflow-wrap", preset: "break-word", raw: "overflow-wrap-break-word", arbitrary: false });
  });
  it("parses overflow-wrap-anywhere", () => {
    expect(parseMisc("overflow-wrap-anywhere")).toEqual({ type: "overflow-wrap", preset: "anywhere", raw: "overflow-wrap-anywhere", arbitrary: false });
  });
  it("parses overflow-wrap-normal", () => {
    expect(parseMisc("overflow-wrap-normal")).toEqual({ type: "overflow-wrap", preset: "normal", raw: "overflow-wrap-normal", arbitrary: false });
  });
  it("returns null for invalid values", () => {
    expect(parseMisc("wrap-break-word")).toBeNull();
    expect(parseMisc("overflow-wrap-foo")).toBeNull();
    expect(parseMisc("overflowwrapanywhere")).toBeNull();
  });
}); 