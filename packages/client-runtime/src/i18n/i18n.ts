import type { UiLanguage } from "@t3tools/contracts";

import { koMessages } from "./koMessages.ts";

import { enMessages as chatEn, zhHansMessages as chatZh } from "./messagesChat.ts";
import { enMessages as diffsEn, zhHansMessages as diffsZh } from "./messagesDiffs.ts";
import { enMessages as generalEn, zhHansMessages as generalZh } from "./messagesGeneral.ts";
import { enMessages as threadsEn, zhHansMessages as threadsZh } from "./messagesThreads.ts";
import {
  enMessages as settingsProvidersEn,
  zhHansMessages as settingsProvidersZh,
} from "./messagesSettingsProviders.ts";
import {
  enMessages as settingsCodeEn,
  zhHansMessages as settingsCodeZh,
} from "./messagesSettingsCode.ts";
import {
  enMessages as settingsSystemEn,
  zhHansMessages as settingsSystemZh,
} from "./messagesSettingsSystem.ts";
import { enMessages as chatUiEn, zhHansMessages as chatUiZh } from "./messagesChatUi.ts";
import { enMessages as appAEn, zhHansMessages as appAZh } from "./messagesAppA.ts";
import { enMessages as appBEn, zhHansMessages as appBZh } from "./messagesAppB.ts";
import { enMessages as reviewEn, zhHansMessages as reviewZh } from "./messagesReview.ts";
import { enMessages as deviceEn, zhHansMessages as deviceZh } from "./messagesDevice.ts";
import {
  enMessages as voiceSettingsEn,
  zhHansMessages as voiceSettingsZh,
} from "./messagesVoiceSettings.ts";
import { enMessages as voiceChatEn, zhHansMessages as voiceChatZh } from "./messagesVoiceChat.ts";
import {
  enMessages as voiceSpeechEn,
  zhHansMessages as voiceSpeechZh,
} from "./messagesVoiceSpeech.ts";
import { enMessages as miscEn, zhHansMessages as miscZh } from "./messagesMisc.ts";
import { enMessages as runtimeEn, zhHansMessages as runtimeZh } from "./messagesRuntime.ts";
import { enMessages as interfaceEn, zhHansMessages as interfaceZh } from "./messages.ts";
import { enMessages as navEn, zhHansMessages as navZh } from "./messagesSettingsNav.ts";
import {
  enMessages as typographyEn,
  zhHansMessages as typographyZh,
} from "./messagesTypography.ts";

/** Locales with shipped translations. English is the fallback for missing keys. */
export type UiLocale = Exclude<UiLanguage, "system">;

// Message catalogs are grouped by domain file, one per owning feature, so
// extraction work on separate panels never edits the same dictionary.
const enCatalog = {
  ...interfaceEn,
  ...generalEn,
  ...chatEn,
  ...diffsEn,
  ...threadsEn,
  ...runtimeEn,
  ...settingsProvidersEn,
  ...settingsCodeEn,
  ...settingsSystemEn,
  ...chatUiEn,
  ...appAEn,
  ...appBEn,
  ...reviewEn,
  ...deviceEn,
  ...voiceSettingsEn,
  ...voiceChatEn,
  ...voiceSpeechEn,
  ...miscEn,
  ...navEn,
  ...typographyEn,
};

export type MessageKey = keyof typeof enCatalog;

const zhCatalog: Partial<Record<MessageKey, string>> = {
  ...interfaceZh,
  ...generalZh,
  ...chatZh,
  ...diffsZh,
  ...threadsZh,
  ...runtimeZh,
  ...settingsProvidersZh,
  ...settingsCodeZh,
  ...settingsSystemZh,
  ...chatUiZh,
  ...appAZh,
  ...appBZh,
  ...reviewZh,
  ...deviceZh,
  ...voiceSettingsZh,
  ...voiceChatZh,
  ...voiceSpeechZh,
  ...miscZh,
  ...navZh,
  ...typographyZh,
};

export const uiLocales = {
  en: { name: "English", language: "en", script: null, messages: enCatalog },
  ko: { name: "한국어", language: "ko", script: null, messages: koMessages },
  "zh-Hans": { name: "简体中文", language: "zh", script: "Hans", messages: zhCatalog },
} satisfies Record<
  UiLocale,
  {
    name: string;
    language: string;
    script: string | null;
    messages: Partial<Record<MessageKey, string>>;
  }
>;

export function isUiLocale(value: unknown): value is UiLocale {
  return typeof value === "string" && Object.hasOwn(uiLocales, value);
}

export const localeMessages = Object.fromEntries(
  Object.entries(uiLocales).map(([id, registration]) => [id, registration.messages]),
) as Record<UiLocale, Partial<Record<MessageKey, string>>>;

export type TranslateParams = Record<string, string | number>;

export type TranslateFn = (key: MessageKey, params?: TranslateParams) => string;

export function resolveUiLocale(language: UiLanguage, systemLocale: string): UiLocale {
  if (language !== "system") {
    return isUiLocale(language) ? language : "en";
  }
  try {
    const locale = new Intl.Locale(systemLocale.replaceAll("_", "-")).maximize();
    for (const [id, registration] of Object.entries(uiLocales)) {
      if (
        locale.language === registration.language &&
        (registration.script === null || locale.script === registration.script)
      ) {
        return id as UiLocale;
      }
    }
  } catch {
    // Invalid host locale tags use the English fallback.
  }
  return "en";
}

export function translateMessage(
  locale: UiLocale,
  key: MessageKey,
  params?: TranslateParams,
): string {
  const template = localeMessages[locale]?.[key] ?? enCatalog[key];
  if (params === undefined) {
    return template;
  }
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.hasOwn(params, name) ? String(params[name]) : match,
  );
}

export function createTranslator(locale: UiLocale): TranslateFn {
  return (key, params) => translateMessage(locale, key, params);
}
