import { describe, it, expect } from "vitest";
import { parseWhiteSpace } from "../../src/parser/utilities/whiteSpace";

describe("parseWhiteSpace", () => {
  it("parses whitespace-normal", () => {
    expect(parseWhiteSpace("whitespace-normal")).toEqual({ type: "white-space", preset: "normal", raw: "whitespace-normal", arbitrary: false });
  });
  it("parses whitespace-nowrap", () => {
    expect(parseWhiteSpace("whitespace-nowrap")).toEqual({ type: "white-space", preset: "nowrap", raw: "whitespace-nowrap", arbitrary: false });
  });
  it("parses whitespace-pre", () => {
    expect(parseWhiteSpace("whitespace-pre")).toEqual({ type: "white-space", preset: "pre", raw: "whitespace-pre", arbitrary: false });
  });
  it("parses whitespace-pre-line", () => {
    expect(parseWhiteSpace("whitespace-pre-line")).toEqual({ type: "white-space", preset: "pre-line", raw: "whitespace-pre-line", arbitrary: false });
  });
  it("parses whitespace-pre-wrap", () => {
    expect(parseWhiteSpace("whitespace-pre-wrap")).toEqual({ type: "white-space", preset: "pre-wrap", raw: "whitespace-pre-wrap", arbitrary: false });
  });
  it("parses whitespace-break-spaces", () => {
    expect(parseWhiteSpace("whitespace-break-spaces")).toEqual({ type: "white-space", preset: "break-spaces", raw: "whitespace-break-spaces", arbitrary: false });
  });
  it("returns null for invalid values", () => {
    expect(parseWhiteSpace("white-space-normal")).toBeNull();
    expect(parseWhiteSpace("whitespace-foo")).toBeNull();
    expect(parseWhiteSpace("whitespace-prewrap")).toBeNull();
  });
}); 