import { describe, it, expect } from "vitest";
import { parseHyphens } from "../../src/parser/utilities/hyphens";

describe("parseHyphens", () => {
  it("parses hyphens-none", () => {
    expect(parseHyphens("hyphens-none")).toEqual({ type: "hyphens", preset: "none", raw: "hyphens-none", arbitrary: false });
  });
  it("parses hyphens-manual", () => {
    expect(parseHyphens("hyphens-manual")).toEqual({ type: "hyphens", preset: "manual", raw: "hyphens-manual", arbitrary: false });
  });
  it("parses hyphens-auto", () => {
    expect(parseHyphens("hyphens-auto")).toEqual({ type: "hyphens", preset: "auto", raw: "hyphens-auto", arbitrary: false });
  });
  it("returns null for invalid values", () => {
    expect(parseHyphens("hyphen-none")).toBeNull();
    expect(parseHyphens("hyphens-foo")).toBeNull();
    expect(parseHyphens("hyphensauto")).toBeNull();
  });
}); 