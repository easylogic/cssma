import { describe, it, expect } from "vitest";
import { parseTextAlign } from "../../src/parser/utilities/textAlign";

describe("parseTextAlign", () => {
  it("parses text-left", () => {
    expect(parseTextAlign("text-left")).toEqual({ textAlign: "left" });
  });
  it("parses text-center", () => {
    expect(parseTextAlign("text-center")).toEqual({ textAlign: "center" });
  });
  it("parses text-right", () => {
    expect(parseTextAlign("text-right")).toEqual({ textAlign: "right" });
  });
  it("parses text-justify", () => {
    expect(parseTextAlign("text-justify")).toEqual({ textAlign: "justify" });
  });
  it("parses text-start", () => {
    expect(parseTextAlign("text-start")).toEqual({ textAlign: "start" });
  });
  it("parses text-end", () => {
    expect(parseTextAlign("text-end")).toEqual({ textAlign: "end" });
  });
  it("parses arbitrary value", () => {
    expect(parseTextAlign("text-[center]")).toEqual({ textAlign: "center" });
    expect(parseTextAlign("text-[justify-all]")).toEqual({ textAlign: "justify-all" });
  });
  it("returns null for invalid values", () => {
    expect(parseTextAlign("text-middle")).toBeNull();
    expect(parseTextAlign("text-align-left")).toBeNull();
    expect(parseTextAlign("text-foo")).toBeNull();
  });
}); 