import { describe, expect, it } from "vite-plus/test";

import { localeMessages, resolveUiLocale, translateMessage } from "./i18n.ts";

describe("resolveUiLocale", () => {
  it.each([
    ["ko", "ko"],
    ["ko-KR", "ko"],
    ["ko_KR", "ko"],
    ["KO-kr", "ko"],
    ["en-US", "en"],
    ["zh-CN", "zh-Hans"],
    ["zh_SG", "zh-Hans"],
    ["ZH-Hans-CN", "zh-Hans"],
    ["zh-TW", "en"],
    ["zh-Hant", "en"],
    ["zh-Hant-CN", "en"],
    ["zh-HK", "en"],
    ["zh-MO", "en"],
    ["fr", "en"],
    ["", "en"],
    ["not a locale", "en"],
  ])("resolves system tag %s to %s", (system, expected) => {
    expect(resolveUiLocale("system", system)).toBe(expected);
  });

  it("honors an explicit selection regardless of the system locale", () => {
    expect(resolveUiLocale("en", "ko-KR")).toBe("en");
    expect(resolveUiLocale("zh-Hans", "zh-TW")).toBe("zh-Hans");
  });
});

describe("translateMessage", () => {
  it("uses a translation or falls back to English for missing keys", () => {
    expect(translateMessage("ko", "settings.nav.appearance")).toBe(
      localeMessages.ko["settings.nav.appearance"],
    );
    expect(translateMessage("ko", "settings.nav.appearance")).not.toBe(
      localeMessages.en["settings.nav.appearance"],
    );
    const key = "settings.interface.chatWidth.wide";
    const original = localeMessages.ko[key];
    delete localeMessages.ko[key];
    try {
      expect(translateMessage("ko", key)).toBe(localeMessages.en[key]);
    } finally {
      if (original !== undefined) localeMessages.ko[key] = original;
    }
  });

  it("substitutes values literally without translating user content or missing parameters", () => {
    const key = "settings.commandPalette.sectionDescription";
    expect(translateMessage("en", key, { section: "{other} $& /tmp/한국어.ts" })).toBe(
      "Settings · {other} $& /tmp/한국어.ts",
    );
    expect(translateMessage("en", key, { other: "x" })).toBe("Settings · {section}");
  });

  it.each(["ko", "zh-Hans"] as const)(
    "keeps %s keys and placeholders aligned with English",
    (locale) => {
      const placeholders = (value: string) =>
        [...value.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
      for (const key of Object.keys(localeMessages.en) as Array<keyof typeof localeMessages.en>) {
        expect(localeMessages[locale][key], key).toBeDefined();
        expect(placeholders(localeMessages[locale][key]!), key).toEqual(
          placeholders(localeMessages.en[key]!),
        );
      }
    },
  );
});
