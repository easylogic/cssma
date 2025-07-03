import { describe, it, expect } from "vitest";
import { parseMisc } from "../../src/parser/utilities/misc";

describe("parseWhiteSpace", () => {
  it("parses whitespace-normal", () => {
    expect(parseMisc("whitespace-normal")).toEqual({ type: "white-space", preset: "normal", raw: "whitespace-normal", arbitrary: false });
  });
  it("parses whitespace-nowrap", () => {
    expect(parseMisc("whitespace-nowrap")).toEqual({ type: "white-space", preset: "nowrap", raw: "whitespace-nowrap", arbitrary: false });
  });
  it("parses whitespace-pre", () => {
    expect(parseMisc("whitespace-pre")).toEqual({ type: "white-space", preset: "pre", raw: "whitespace-pre", arbitrary: false });
  });
  it("parses whitespace-pre-line", () => {
    expect(parseMisc("whitespace-pre-line")).toEqual({ type: "white-space", preset: "pre-line", raw: "whitespace-pre-line", arbitrary: false });
  });
  it("parses whitespace-pre-wrap", () => {
    expect(parseMisc("whitespace-pre-wrap")).toEqual({ type: "white-space", preset: "pre-wrap", raw: "whitespace-pre-wrap", arbitrary: false });
  });
  it("parses whitespace-break-spaces", () => {
    expect(parseMisc("whitespace-break-spaces")).toEqual({ type: "white-space", preset: "break-spaces", raw: "whitespace-break-spaces", arbitrary: false });
  });
  it("returns null for invalid values", () => {
    expect(parseMisc("white-space-normal")).toBeNull();
    expect(parseMisc("whitespace-foo")).toBeNull();
    expect(parseMisc("whitespace-prewrap")).toBeNull();
  });
}); 