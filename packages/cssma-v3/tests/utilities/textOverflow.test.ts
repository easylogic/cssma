import { describe, it, expect } from "vitest";
import { parseTypography } from '../../src/parser/utilities/typography';

describe("parseTextOverflow", () => {
  it("parses truncate", () => {
    expect(parseTypography("truncate")).toEqual({ type: "text-overflow", preset: "truncate", raw: "truncate", arbitrary: false });
  });
  it("parses text-ellipsis", () => {
    expect(parseTypography("text-ellipsis")).toEqual({ type: "text-overflow", preset: "text-ellipsis", raw: "text-ellipsis", arbitrary: false });
  });
  it("parses text-clip", () => {
    expect(parseTypography("text-clip")).toEqual({ type: "text-overflow", preset: "text-clip", raw: "text-clip", arbitrary: false });
  });
  it("parses arbitrary value", () => {
    expect(parseTypography("text-overflow-[fade]")).toEqual({ type: "text-overflow", preset: "fade", raw: "text-overflow-[fade]", arbitrary: true });
    expect(parseTypography("text-overflow-[custom]")).toEqual({ type: "text-overflow", preset: "custom", raw: "text-overflow-[custom]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTypography("overflow-ellipsis")).toBeNull();
    expect(parseTypography("text-overflow-foo")).toBeNull();
    expect(parseTypography("truncate-text")).toBeNull();
  });
}); 