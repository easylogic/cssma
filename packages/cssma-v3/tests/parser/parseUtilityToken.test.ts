import { describe, it, expect } from "vitest";
import { parseUtilityToken } from "../../src/parser/utils";

describe("parseUtilityToken", () => {
  const prefixes = [
    "border",
    "border-t",
    "border-b",
    "border-l",
    "border-r",
    "border-x",
    "border-y",
    "m",
    "mx",
    "my",
    "mt",
    "mb",
    "ml",
    "mr",
    "p",
    "px",
    "py",
    "pt",
    "pb",
    "pl",
    "pr",
    "bg",
    "text",
    "rounded",
    "rounded-tl",
    "shadow",
    "flex",
    "items",
    "justify",
    "gap",
    "gap-x",
    "gap-y",
    "col-span",
    "w",
    "h",
  ];

  it("parses prefix/value correctly", () => {
    expect(parseUtilityToken("border", prefixes)).toEqual({
      raw: "border",
      prefix: "border",
      value: "",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("border-2", prefixes)).toEqual({
      raw: "border-2",
      prefix: "border",
      value: "2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("border-x", prefixes)).toEqual({
      raw: "border-x",
      prefix: "border-x",
      value: "",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("border-x-4", prefixes)).toEqual({
      raw: "border-x-4",
      prefix: "border-x",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("border-x-[2vw]", prefixes)).toEqual({
      raw: "border-x-[2vw]",
      prefix: "border-x",
      value: "2vw",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: undefined,
      arbitraryValue: "2vw",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("border-[10px]", prefixes)).toEqual({
      raw: "border-[10px]",
      prefix: "border",
      value: "10px",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: undefined,
      arbitraryValue: "10px",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("m-4", prefixes)).toEqual({
      raw: "m-4",
      prefix: "m",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("-m-4", prefixes)).toEqual({
      raw: "-m-4",
      prefix: "m",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: true,
      important: false,
    });
    expect(parseUtilityToken("!m-4", prefixes)).toEqual({
      raw: "!m-4",
      prefix: "m",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: true,
    });
    expect(parseUtilityToken("!-m-4", prefixes)).toEqual({
      raw: "!-m-4",
      prefix: "m",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: true,
      important: true,
    });
    expect(parseUtilityToken("m-!4", prefixes)).toEqual({
      raw: "m-!4",
      prefix: "m",
      value: "!4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("mx-auto", prefixes)).toEqual({
      raw: "mx-auto",
      prefix: "mx",
      value: "auto",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("p-[10px]", prefixes)).toEqual({
      raw: "p-[10px]",
      prefix: "p",
      value: "10px",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: undefined,
      arbitraryValue: "10px",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("bg-red-500", prefixes)).toEqual({
      raw: "bg-red-500",
      prefix: "bg",
      value: "red-500",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("!bg-red-500", prefixes)).toEqual({
      raw: "!bg-red-500",
      prefix: "bg",
      value: "red-500",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: true,
    });
    expect(parseUtilityToken("bg-!important", prefixes)).toEqual({
      raw: "bg-!important",
      prefix: "bg",
      value: "!important",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("-bg-!important", prefixes)).toEqual({
      raw: "-bg-!important",
      prefix: "bg",
      value: "!important",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: true,
      important: false,
    });
    expect(parseUtilityToken("text-lg", prefixes)).toEqual({
      raw: "text-lg",
      prefix: "text",
      value: "lg",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("rounded-tl-md", prefixes)).toEqual({
      raw: "rounded-tl-md",
      prefix: "rounded-tl",
      value: "md",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("shadow-xl", prefixes)).toEqual({
      raw: "shadow-xl",
      prefix: "shadow",
      value: "xl",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("flex", prefixes)).toEqual({
      raw: "flex",
      prefix: "flex",
      value: "",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("items-center", prefixes)).toEqual({
      raw: "items-center",
      prefix: "items",
      value: "center",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("justify-between", prefixes)).toEqual({
      raw: "justify-between",
      prefix: "justify",
      value: "between",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("gap-x-4", prefixes)).toEqual({
      raw: "gap-x-4",
      prefix: "gap-x",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("col-span-3", prefixes)).toEqual({
      raw: "col-span-3",
      prefix: "col-span",
      value: "3",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("w-[calc(100%-2rem)]", prefixes)).toEqual({
      raw: "w-[calc(100%-2rem)]",
      prefix: "w",
      value: "calc(100%-2rem)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "calc",
      arbitraryValue: "100%-2rem",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
  });

  it("returns null for invalid", () => {
    expect(parseUtilityToken("foo-bar", prefixes)).toBeNull();
    expect(parseUtilityToken("border-x-", prefixes)).toBeNull();
    expect(parseUtilityToken("border-", prefixes)).toBeNull();
  });

  it("parses various Tailwind-like utilities", () => {
    // 숫자, 테마 키, 임의 값, custom property, 특수문자 등
    expect(parseUtilityToken("p-0", prefixes)).toEqual({
      raw: "p-0",
      prefix: "p",
      value: "0",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("p-1.5", prefixes)).toEqual({
      raw: "p-1.5",
      prefix: "p",
      value: "1.5",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("p-[3.5rem]", prefixes)).toEqual({
      raw: "p-[3.5rem]",
      prefix: "p",
      value: "3.5rem",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: undefined,
      arbitraryValue: "3.5rem",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("m-auto", prefixes)).toEqual({
      raw: "m-auto",
      prefix: "m",
      value: "auto",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("mx-[calc(100%-2rem)]", prefixes)).toEqual({
      raw: "mx-[calc(100%-2rem)]",
      prefix: "mx",
      value: "calc(100%-2rem)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "calc",
      arbitraryValue: "100%-2rem",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("gap-y-2", prefixes)).toEqual({
      raw: "gap-y-2",
      prefix: "gap-y",
      value: "2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("rounded-tl-[10px]", prefixes)).toEqual({
      raw: "rounded-tl-[10px]",
      prefix: "rounded-tl",
      value: "10px",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: undefined,
      arbitraryValue: "10px",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("w-full", prefixes)).toEqual({
      raw: "w-full",
      prefix: "w",
      value: "full",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("h-screen", prefixes)).toEqual({
      raw: "h-screen",
      prefix: "h",
      value: "screen",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("col-span-12", prefixes)).toEqual({
      raw: "col-span-12",
      prefix: "col-span",
      value: "12",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("bg-[#ff0]", prefixes)).toEqual({
      raw: "bg-[#ff0]",
      prefix: "bg",
      value: "#ff0",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "hex",
      arbitraryValue: "#ff0",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("bg-[#123456]", prefixes)).toEqual({
      raw: "bg-[#123456]",
      prefix: "bg",
      value: "#123456",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "hex",
      arbitraryValue: "#123456",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("bg-[#12345678]", prefixes)).toEqual({
      raw: "bg-[#12345678]",
      prefix: "bg",
      value: "#12345678",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "hex",
      arbitraryValue: "#12345678",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(
      parseUtilityToken("bg-[url(https://foo.bar/img.png)]", prefixes)
    ).toEqual({
      raw: "bg-[url(https://foo.bar/img.png)]",
      prefix: "bg",
      value: "url(https://foo.bar/img.png)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "url",
      arbitraryValue: "https://foo.bar/img.png",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("text-[theme(spacing.1)]", prefixes)).toEqual({
      raw: "text-[theme(spacing.1)]",
      prefix: "text",
      value: "theme(spacing.1)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "theme",
      arbitraryValue: "spacing.1",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("border-[var(--my-border)]", prefixes)).toEqual({
      raw: "border-[var(--my-border)]",
      prefix: "border",
      value: "var(--my-border)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "var",
      arbitraryValue: "--my-border",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("border-(--my-border)", prefixes)).toEqual({
      raw: "border-(--my-border)",
      prefix: "border",
      value: "--my-border",
      slash: undefined,
      customProperty: true,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("border-x-(length:--foo)", prefixes)).toEqual({
      raw: "border-x-(length:--foo)",
      prefix: "border-x",
      value: "length:--foo",
      slash: undefined,
      customProperty: true,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    // 중첩 prefix, 잘못된 조합
    expect(parseUtilityToken("border-xx-2", prefixes)).toEqual({
      raw: "border-xx-2",
      prefix: "border",
      value: "xx-2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("border-xy-2", prefixes)).toEqual({
      raw: "border-xy-2",
      prefix: "border",
      value: "xy-2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("border-x-x-2", prefixes)).toEqual({
      raw: "border-x-x-2",
      prefix: "border-x",
      value: "x-2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    // 특수문자, 공백 등
    expect(parseUtilityToken("bg-[rgba(0,0,0,0.5)]", prefixes)).toEqual({
      raw: "bg-[rgba(0,0,0,0.5)]",
      prefix: "bg",
      value: "rgba(0,0,0,0.5)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "rgba",
      arbitraryValue: "0,0,0,0.5",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("text-[theme(spacing.1)]", prefixes)).toEqual({
      raw: "text-[theme(spacing.1)]",
      prefix: "text",
      value: "theme(spacing.1)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "theme",
      arbitraryValue: "spacing.1",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("w-[length:calc(100%-1rem)]", prefixes)).toEqual({
      raw: "w-[length:calc(100%-1rem)]",
      prefix: "w",
      value: "length:calc(100%-1rem)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: undefined,
      arbitraryValue: "length:calc(100%-1rem)",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    // 빈 값, 하이픈만 있는 경우
    expect(parseUtilityToken("m-", prefixes)).toBeNull();
    expect(parseUtilityToken("gap-x-", prefixes)).toBeNull();
    expect(parseUtilityToken("bg-", prefixes)).toBeNull();
  });

  it("parses additional edge cases", () => {
    // 공백 포함
    expect(parseUtilityToken(" m-4", prefixes)).toBeNull(); // 앞에 공백(매칭 불가)
    expect(parseUtilityToken("m-4 ", prefixes)).toEqual({
      raw: "m-4 ",
      prefix: "m",
      value: "4 ",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    }); // 뒤에 공백은 value에 포함
    expect(parseUtilityToken("m -4", prefixes)).toBeNull(); // 중간에 공백(매칭 불가)
    // 숫자/문자 혼합
    expect(parseUtilityToken("m-4a", prefixes)).toEqual({
      raw: "m-4a",
      prefix: "m",
      value: "4a",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("m-a4", prefixes)).toEqual({
      raw: "m-a4",
      prefix: "m",
      value: "a4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    // 이중 하이픈
    expect(parseUtilityToken("m--4", prefixes)).toEqual({
      raw: "m--4",
      prefix: "m",
      value: "-4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("border--2", prefixes)).toEqual({
      raw: "border--2",
      prefix: "border",
      value: "-2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    // prefix 중복
    expect(parseUtilityToken("border-border-2", prefixes)).toEqual({
      raw: "border-border-2",
      prefix: "border",
      value: "border-2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    // 특수문자 value
    expect(parseUtilityToken("bg-!important", prefixes)).toEqual({
      raw: "bg-!important",
      prefix: "bg",
      value: "!important",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("text-@media", prefixes)).toEqual({
      raw: "text-@media",
      prefix: "text",
      value: "@media",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    // 대소문자 구분
    expect(parseUtilityToken("Bg-red-500", prefixes)).toBeNull(); // 대소문자 구분
    expect(parseUtilityToken("BG-red-500", prefixes)).toBeNull();
    // 유사 prefix
    expect(parseUtilityToken("borderx-2", prefixes)).toBeNull(); // borderx는 prefix에 없음
    expect(parseUtilityToken("border_x-2", prefixes)).toBeNull(); // 언더스코어
    // 하이픈 위치
    expect(parseUtilityToken("-m-4", prefixes)).toEqual({
      raw: "-m-4",
      prefix: "m",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: true,
      important: false,
    }); // prefix 앞에 하이픈
    expect(parseUtilityToken("m4", prefixes)).toBeNull(); // 하이픈 없이 붙은 경우
    // 빈 문자열
    expect(parseUtilityToken("", prefixes)).toBeNull();
    // prefix만 있고 value가 없는 경우(정확히 일치)
    expect(parseUtilityToken("gap", prefixes)).toEqual({
      raw: "gap",
      prefix: "gap",
      value: "",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    // prefix만 있고 value가 없는 경우(정확히 일치하지 않음)
    expect(parseUtilityToken("gap-", prefixes)).toBeNull();
    // 하이픈만 value인 경우
    expect(parseUtilityToken("gap--", prefixes)).toEqual({
      raw: "gap--",
      prefix: "gap",
      value: "-",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    // prefix가 value에 포함된 경우
    expect(parseUtilityToken("gap-gap", prefixes)).toEqual({
      raw: "gap-gap",
      prefix: "gap",
      value: "gap",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    // 숫자 prefix
    expect(parseUtilityToken("w-100", prefixes)).toEqual({
      raw: "w-100",
      prefix: "w",
      value: "100",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    // value가 하이픈으로 시작하는 경우
    expect(parseUtilityToken("w--100", prefixes)).toEqual({
      raw: "w--100",
      prefix: "w",
      value: "-100",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
  });

  it("parses customProperty/arbitrary/numeric/preset flags", () => {
    // customProperty
    expect(parseUtilityToken("border-(--my-border)", prefixes)).toEqual({
      raw: "border-(--my-border)",
      prefix: "border",
      value: "--my-border",
      slash: undefined,
      customProperty: true,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("border-x-(length:--foo)", prefixes)).toEqual({
      raw: "border-x-(length:--foo)",
      prefix: "border-x",
      value: "length:--foo",
      slash: undefined,
      customProperty: true,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    // arbitrary
    expect(parseUtilityToken("w-[calc(100%-2rem)]", prefixes)).toEqual({
      raw: "w-[calc(100%-2rem)]",
      prefix: "w",
      value: "calc(100%-2rem)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "calc",
      arbitraryValue: "100%-2rem",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("bg-[#ff0]", prefixes)).toEqual({
      raw: "bg-[#ff0]",
      prefix: "bg",
      value: "#ff0",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "hex",
      arbitraryValue: "#ff0",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    // numeric
    expect(parseUtilityToken("m-4", prefixes)).toEqual({
      raw: "m-4",
      prefix: "m",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("gap-x--2", prefixes)).toEqual({
      raw: "gap-x--2",
      prefix: "gap-x",
      value: "-2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("p-1.5", prefixes)).toEqual({
      raw: "p-1.5",
      prefix: "p",
      value: "1.5",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    // preset
    expect(parseUtilityToken("bg-red-500", prefixes)).toEqual({
      raw: "bg-red-500",
      prefix: "bg",
      value: "red-500",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("text-lg", prefixes)).toEqual({
      raw: "text-lg",
      prefix: "text",
      value: "lg",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("rounded-tl-md", prefixes)).toEqual({
      raw: "rounded-tl-md",
      prefix: "rounded-tl",
      value: "md",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("m-auto", prefixes)).toEqual({
      raw: "m-auto",
      prefix: "m",
      value: "auto",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
  });

  it("parses slash and arbitraryType/arbitraryValue correctly", () => {
    expect(parseUtilityToken("bg-red-500/50", prefixes)).toEqual({
      raw: "bg-red-500/50",
      prefix: "bg",
      value: "red-500",
      slash: "50",
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("bg-[rgba(0,0,0,0.5)]/20", prefixes)).toEqual({
      raw: "bg-[rgba(0,0,0,0.5)]/20",
      prefix: "bg",
      value: "rgba(0,0,0,0.5)",
      slash: "20",
      customProperty: false,
      arbitrary: true,
      arbitraryType: "rgba",
      arbitraryValue: "0,0,0,0.5",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("w-[calc(100%-2rem)]", prefixes)).toEqual({
      raw: "w-[calc(100%-2rem)]",
      prefix: "w",
      value: "calc(100%-2rem)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "calc",
      arbitraryValue: "100%-2rem",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("border-[var(--foo)]", prefixes)).toEqual({
      raw: "border-[var(--foo)]",
      prefix: "border",
      value: "var(--foo)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "var",
      arbitraryValue: "--foo",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(
      parseUtilityToken("bg-[url(https://foo.bar/img.png)]", prefixes)
    ).toEqual({
      raw: "bg-[url(https://foo.bar/img.png)]",
      prefix: "bg",
      value: "url(https://foo.bar/img.png)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "url",
      arbitraryValue: "https://foo.bar/img.png",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseUtilityToken("text-[theme(spacing.1)]", prefixes)).toEqual({
      raw: "text-[theme(spacing.1)]",
      prefix: "text",
      value: "theme(spacing.1)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "theme",
      arbitraryValue: "spacing.1",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
  });

  it('parses arbitrary value and returns inner value', () => {
    expect(parseUtilityToken('bg-[url(https://foo)]', ['bg'])).toMatchObject({
      prefix: 'bg',
      value: 'url(https://foo)',
      arbitrary: true,
      arbitraryType: 'url',
      arbitraryValue: 'https://foo',
      slash: undefined,
    });
    expect(parseUtilityToken('w-[calc(100%-2rem)]', ['w'])).toMatchObject({
      prefix: 'w',
      value: 'calc(100%-2rem)',
      arbitrary: true,
      arbitraryType: 'calc',
      arbitraryValue: '100%-2rem',
      slash: undefined,
    });
    expect(parseUtilityToken('border-[length:var(--foo)]/50', ['border'])).toMatchObject({
      prefix: 'border',
      value: 'length:var(--foo)',
      arbitrary: true,
      arbitraryType: undefined,
      arbitraryValue: 'length:var(--foo)',
      slash: '50',
    });
    expect(parseUtilityToken('bg-[rgba(0,0,0,0.5)]/10', ['bg'])).toMatchObject({
      prefix: 'bg',
      value: 'rgba(0,0,0,0.5)',
      arbitrary: true,
      arbitraryType: 'rgba',
      arbitraryValue: '0,0,0,0.5',
      slash: '10',
    });
  });

  it('parses custom property and returns inner value', () => {
    expect(parseUtilityToken('bg-(--foo)', ['bg'])).toMatchObject({
      prefix: 'bg',
      value: '--foo',
      customProperty: true,
      slash: undefined,
    });
    expect(parseUtilityToken('bg-(--foo)/20', ['bg'])).toMatchObject({
      prefix: 'bg',
      value: '--foo',
      customProperty: true,
      slash: '20',
    });
  });

  it('parses preset value and slash', () => {
    expect(parseUtilityToken('bg-red-500/50', ['bg'])).toMatchObject({
      prefix: 'bg',
      value: 'red-500',
      preset: true,
      slash: '50',
    });
    expect(parseUtilityToken('bg-red-500', ['bg'])).toMatchObject({
      prefix: 'bg',
      value: 'red-500',
      preset: true,
      slash: undefined,
    });
  });

  it('respects hasSlash option: false disables slash splitting', () => {
    // preset value with slash, but hasSlash: false
    expect(parseUtilityToken('bg-red-500/50', ['bg'], false)).toMatchObject({
      prefix: 'bg',
      value: 'red-500/50',
      slash: undefined,
      preset: true,
    });
    // arbitrary value with slash inside, hasSlash: false
    expect(parseUtilityToken('bg-[rgba(0,0,0,0.5)]/10', ['bg'], false)).toMatchObject({
      prefix: 'bg',
      value: '[rgba(0,0,0,0.5)]/10',
      slash: undefined,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
    });
    // customProperty with slash, hasSlash: false
    expect(parseUtilityToken('border-(--my-border)/20', ['border'], false)).toMatchObject({
      prefix: 'border',
      value: '(--my-border)/20',
      slash: undefined,
      customProperty: false,
    });
    // arbitrary value, hasSlash: false, no slash in value
    expect(parseUtilityToken('w-[calc(100%-2rem)]', ['w'], false)).toMatchObject({
      prefix: 'w',
      value: 'calc(100%-2rem)',
      arbitrary: true,
      slash: undefined,
    });
    // customProperty, hasSlash: false, no slash in value
    expect(parseUtilityToken('bg-(--foo)', ['bg'], false)).toMatchObject({
      prefix: 'bg',
      value: '--foo',
      customProperty: true,
      slash: undefined,
    });
  });
});
