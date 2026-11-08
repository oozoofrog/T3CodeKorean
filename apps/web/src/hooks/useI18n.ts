import {
  createTranslator,
  resolveUiLocale,
  type TranslateFn,
  type UiLocale,
} from "@t3tools/client-runtime/i18n";
import { useSyncExternalStore } from "react";

import { getClientSettings, subscribeClientSettings } from "./clientSettingsStore";

function readSystemLanguage(): string {
  try {
    // Packaged Electron pins navigator.language; its bridge supplies the OS display language.
    const preferred =
      typeof window === "undefined"
        ? undefined
        : window.desktopBridge?.getPreferredSystemLanguages?.()[0];
    if (preferred) return preferred;
  } catch {
    // An unavailable desktop bridge falls back to the browser locale.
  }
  return (typeof navigator === "undefined" ? undefined : navigator.language) ?? "en";
}

let systemLocale = resolveUiLocale("system", readSystemLanguage());
const localeListeners = new Set<() => void>();

function onLanguageChange(): void {
  systemLocale = resolveUiLocale("system", readSystemLanguage());
  for (const listener of localeListeners) listener();
}

export function getUiLocale(): UiLocale {
  const language = getClientSettings().uiLanguage;
  return language === "system" ? systemLocale : resolveUiLocale(language, "");
}

export function subscribeUiLocale(listener: () => void): () => void {
  if (localeListeners.size === 0 && typeof window !== "undefined") {
    systemLocale = resolveUiLocale("system", readSystemLanguage());
    window.addEventListener("languagechange", onLanguageChange);
  }
  localeListeners.add(listener);
  const unsubscribeSettings = subscribeClientSettings(listener);
  return () => {
    unsubscribeSettings();
    localeListeners.delete(listener);
    if (localeListeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("languagechange", onLanguageChange);
    }
  };
}

export function startDocumentLanguage(): () => void {
  const apply = () => {
    document.documentElement.lang = getUiLocale();
  };
  const unsubscribe = subscribeUiLocale(apply);
  apply();
  return unsubscribe;
}

// Stable translator identities avoid rerunning effects for unrelated settings changes.
const translators = new Map<UiLocale, TranslateFn>();

function getTranslator(locale: UiLocale): TranslateFn {
  let translator = translators.get(locale);
  if (translator === undefined) {
    translator = createTranslator(locale);
    translators.set(locale, translator);
  }
  return translator;
}

export function useT(): TranslateFn {
  return getTranslator(useSyncExternalStore(subscribeUiLocale, getUiLocale, () => "en"));
}
