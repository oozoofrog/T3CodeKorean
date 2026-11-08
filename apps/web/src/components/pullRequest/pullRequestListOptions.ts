import type { MessageKey } from "@t3tools/client-runtime/i18n";
import type { PullRequestInvolvement, PullRequestListState } from "@t3tools/contracts";
import {
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  ClockIcon,
  EyeIcon,
  LayersIcon,
  ListChecksIcon,
  Maximize2Icon,
  Minimize2Icon,
  PenLineIcon,
  UserLockIcon,
} from "lucide-react";

import type { PullRequestFilterOption } from "./PullRequestListFilters";
import type { PullRequestListSort } from "./pullRequestListPreferences";
import { PullRequestGlyph } from "./pullRequestIcons";

export const INVOLVEMENT_TABS = [
  {
    value: "all",
    labelKey: "review.extra.all",
    Icon: LayersIcon,
  },
  {
    value: "reviewing",
    labelKey: "review.extra.reviewing",
    Icon: EyeIcon,
  },
  {
    value: "authored",
    labelKey: "review.extra.authored",
    Icon: PenLineIcon,
  },
] as const satisfies ReadonlyArray<
  Omit<PullRequestFilterOption<PullRequestInvolvement>, "label"> & { labelKey: MessageKey }
>;

export const STATE_TABS = [
  {
    value: "all",
    labelKey: "review.extra.all",
    Icon: LayersIcon,
  },
  {
    value: "open",
    labelKey: "review.extra.open",
    Icon: PullRequestGlyph.pullRequest,
  },
  {
    value: "closed",
    labelKey: "review.extra.closed",
    Icon: PullRequestGlyph.closed,
  },
  {
    value: "merged",
    labelKey: "review.extra.merged",
    Icon: PullRequestGlyph.merged,
  },
] as const satisfies ReadonlyArray<
  Omit<PullRequestFilterOption<PullRequestListState>, "label"> & { labelKey: MessageKey }
>;

export const SORT_OPTIONS = [
  {
    value: "ready",
    labelKey: "review.extra.merge.readiness",
    Icon: ListChecksIcon,
  },
  {
    value: "blocked",
    labelKey: "review.extra.blocked.on.me",
    Icon: UserLockIcon,
  },
  {
    value: "updated",
    labelKey: "review.extra.recently.updated",
    Icon: ClockIcon,
  },
  {
    value: "newest",
    labelKey: "review.extra.newest.shown",
    Icon: CalendarArrowDownIcon,
  },
  {
    value: "oldest",
    labelKey: "review.extra.oldest.shown",
    Icon: CalendarArrowUpIcon,
  },
  {
    value: "largest",
    labelKey: "review.extra.largest.shown",
    Icon: Maximize2Icon,
  },
  {
    value: "smallest",
    labelKey: "review.extra.smallest.shown",
    Icon: Minimize2Icon,
  },
] as const satisfies ReadonlyArray<
  Omit<PullRequestFilterOption<PullRequestListSort>, "label"> & { labelKey: MessageKey }
>;
