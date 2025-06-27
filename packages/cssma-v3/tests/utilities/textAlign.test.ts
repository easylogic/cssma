import { describe, it, expect } from "vitest";
import { parseTextAlign } from "../../src/parser/utilities/textAlign";

describe("parseTextAlign", () => {
  it("parses text-left", () => {
    expect(parseTextAlign("text-left")).toEqual({ type: "text-align", preset: "left", raw: "text-left", arbitrary: false });
  });
  it("parses text-center", () => {
    expect(parseTextAlign("text-center")).toEqual({ type: "text-align", preset: "center", raw: "text-center", arbitrary: false });
  });
  it("parses text-right", () => {
    expect(parseTextAlign("text-right")).toEqual({ type: "text-align", preset: "right", raw: "text-right", arbitrary: false });
  });
  it("parses text-justify", () => {
    expect(parseTextAlign("text-justify")).toEqual({ type: "text-align", preset: "justify", raw: "text-justify", arbitrary: false });
  });
  it("parses text-start", () => {
    expect(parseTextAlign("text-start")).toEqual({ type: "text-align", preset: "start", raw: "text-start", arbitrary: false });
  });
  it("parses text-end", () => {
    expect(parseTextAlign("text-end")).toEqual({ type: "text-align", preset: "end", raw: "text-end", arbitrary: false });
  });
  it("parses arbitrary value", () => {
    expect(parseTextAlign("text-[center]")).toEqual({ type: "text-align", preset: "center", raw: "text-[center]", arbitrary: true });
    expect(parseTextAlign("text-[justify-all]")).toEqual({ type: "text-align", preset: "justify-all", raw: "text-[justify-all]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTextAlign("text-middle")).toBeNull();
    expect(parseTextAlign("text-align-left")).toBeNull();
    expect(parseTextAlign("text-foo")).toBeNull();
  });
}); 