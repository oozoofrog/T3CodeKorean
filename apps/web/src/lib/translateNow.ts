import {
  translateMessage,
  type MessageKey,
  type TranslateParams,
} from "@t3tools/client-runtime/i18n";

import { getUiLocale } from "../hooks/useI18n";

export function translateNow(key: MessageKey, params?: TranslateParams): string {
  return translateMessage(getUiLocale(), key, params);
}
