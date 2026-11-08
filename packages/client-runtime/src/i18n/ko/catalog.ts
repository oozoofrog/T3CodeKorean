import { koMessages as interfaceMessages } from "./interface.ts";
import { koMessages as appA } from "./appA.ts";
import { koMessages as appB } from "./appB.ts";
import { koMessages as chat } from "./chat.ts";
import { koMessages as chatUi } from "./chatUi.ts";
import { koMessages as device } from "./device.ts";
import { koMessages as diffs } from "./diffs.ts";
import { koMessages as general } from "./general.ts";
import { koMessages as misc } from "./misc.ts";
import { koMessages as review } from "./review.ts";
import { koMessages as runtime } from "./runtime.ts";
import { koMessages as settingsCode } from "./settingsCode.ts";
import { koMessages as settingsNav } from "./settingsNav.ts";
import { koMessages as settingsProviders } from "./settingsProviders.ts";
import { koMessages as settingsSystem } from "./settingsSystem.ts";
import { koMessages as threads } from "./threads.ts";
import { koMessages as typography } from "./typography.ts";
import { koMessages as voiceChat } from "./voiceChat.ts";
import { koMessages as voiceSettings } from "./voiceSettings.ts";
import { koMessages as voiceSpeech } from "./voiceSpeech.ts";

export const koCatalog: Record<string, string> = {
  ...interfaceMessages,
  ...appA,
  ...appB,
  ...chat,
  ...chatUi,
  ...device,
  ...diffs,
  ...general,
  ...misc,
  ...review,
  ...runtime,
  ...settingsCode,
  ...settingsNav,
  ...settingsProviders,
  ...settingsSystem,
  ...threads,
  ...typography,
  ...voiceChat,
  ...voiceSettings,
  ...voiceSpeech,
};
