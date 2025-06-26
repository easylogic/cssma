import { describe, it, expect } from "vitest";
import { parseFontFamily } from "../../src/parser/utilities/fontFamily";

describe("parseFontFamily", () => {
  it("parses preset font families", () => {
    expect(parseFontFamily("font-sans")).toEqual({ type: "font-family", value: "var(--font-sans)", raw: "font-sans", arbitrary: false });
    expect(parseFontFamily("font-serif")).toEqual({ type: "font-family", value: "var(--font-serif)", raw: "font-serif", arbitrary: false });
    expect(parseFontFamily("font-mono")).toEqual({ type: "font-family", value: "var(--font-mono)", raw: "font-mono", arbitrary: false });
  });

  it("parses custom property font-(family-name:--my-font)", () => {
    expect(parseFontFamily("font-(family-name:my-font)")).toEqual({ type: "font-family", value: "var(--my-font)", raw: "font-(family-name:my-font)", arbitrary: true });
    expect(parseFontFamily("font-(family-name:display)")).toEqual({ type: "font-family", value: "var(--display)", raw: "font-(family-name:display)", arbitrary: true });
  });

  it("parses arbitrary value font-[<value>]", () => {
    expect(parseFontFamily("font-[Open_Sans]")).toEqual({ type: "font-family", value: "Open_Sans", raw: "font-[Open_Sans]", arbitrary: true });
    expect(parseFontFamily("font-[family-name:var(--my-font)]")).toEqual({ type: "font-family", value: "family-name:var(--my-font)", raw: "font-[family-name:var(--my-font)]", arbitrary: true });
  });

  it("returns null for invalid input", () => {
    expect(parseFontFamily("font-")).toBeNull();
    expect(parseFontFamily("font")).toBeNull();
    expect(parseFontFamily("font-sans-serif")).toBeNull();
    expect(parseFontFamily("font-monospace")).toBeNull();
  });
});
