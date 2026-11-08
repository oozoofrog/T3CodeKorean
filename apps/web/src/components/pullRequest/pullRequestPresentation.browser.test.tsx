import { DEFAULT_CLIENT_SETTINGS } from "@t3tools/contracts/settings";
import { expect, it } from "vite-plus/test";

import { act, render } from "../../../test/render";
import { replaceClientSettingsSnapshot } from "../../hooks/clientSettingsStore";
import { PullRequestStateGlyph } from "./pullRequestPresentation";

it("updates a pull request label when only the device language changes", async () => {
  replaceClientSettingsSnapshot(DEFAULT_CLIENT_SETTINGS);
  await using screen = await render(<PullRequestStateGlyph state="open" isDraft={false} />);
  try {
    await expect.element(screen.getByRole("img", { name: "Open" })).toBeVisible();
    await act(() =>
      replaceClientSettingsSnapshot({ ...DEFAULT_CLIENT_SETTINGS, uiLanguage: "zh-Hans" }),
    );
    await expect.element(screen.getByRole("img", { name: "打开" })).toBeVisible();
  } finally {
    await act(() => replaceClientSettingsSnapshot(DEFAULT_CLIENT_SETTINGS));
  }
});
