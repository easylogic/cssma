import { describe, it, expect } from "vitest";
import { parseHyphens } from "../../src/parser/utilities/hyphens";

describe("parseHyphens", () => {
  it("parses hyphens-none", () => {
    expect(parseHyphens("hyphens-none")).toEqual({ type: "hyphens", preset: "hyphens-none", raw: "hyphens-none", arbitrary: false });
  });
  it("parses hyphens-manual", () => {
    expect(parseHyphens("hyphens-manual")).toEqual({ type: "hyphens", preset: "hyphens-manual", raw: "hyphens-manual", arbitrary: false });
  });
  it("parses hyphens-auto", () => {
    expect(parseHyphens("hyphens-auto")).toEqual({ type: "hyphens", preset: "hyphens-auto", raw: "hyphens-auto", arbitrary: false });
  });
  it("parses arbitrary value", () => {
    expect(parseHyphens("hyphens-[custom]")).toEqual({ type: "hyphens", preset: "custom", raw: "hyphens-[custom]", arbitrary: true });
    expect(parseHyphens("hyphens-[all]")).toEqual({ type: "hyphens", preset: "all", raw: "hyphens-[all]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseHyphens("hyphen-none")).toBeNull();
    expect(parseHyphens("hyphens-foo")).toBeNull();
    expect(parseHyphens("hyphensauto")).toBeNull();
  });
}); 