import { describe, it, expect } from "vitest";
import { parseWordBreak } from "../../src/parser/utilities/wordBreak";

describe("parseWordBreak", () => {
  it("parses break-normal", () => {
    expect(parseWordBreak("break-normal")).toEqual({ type: "word-break", preset: "normal", raw: "break-normal", arbitrary: false });
  });
  it("parses break-all", () => {
    expect(parseWordBreak("break-all")).toEqual({ type: "word-break", preset: "all", raw: "break-all", arbitrary: false });
  });
  it("parses break-keep", () => {
    expect(parseWordBreak("break-keep")).toEqual({ type: "word-break", preset: "keep", raw: "break-keep", arbitrary: false });
  });
  it("returns null for invalid values", () => {
    expect(parseWordBreak("word-break-normal")).toBeNull();
    expect(parseWordBreak("break-foo")).toBeNull();
    expect(parseWordBreak("wordbreakall")).toBeNull();
  });
}); 