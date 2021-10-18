import { CuratedItem, CuratedStatus, NewTabFeedSchedule } from '@prisma/client';

export type PaginationInput = {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
};

export type CuratedItemFilter = {
  language?: string;
  status?: CuratedStatus;
  title?: string;
  topic?: string;
  url?: string;
};

/**
 * These properties are the same for both createCuratedItem and updateCuratedItem
 * mutations.
 */
type CuratedItemRequiredInput = {
  url: string;
  title: string;
  excerpt: string;
  status: CuratedStatus;
  language: string;
  imageUrl: string;
  topic: string;
  isCollection: boolean;
  isShortLived: boolean;
  isSyndicated: boolean;
};

export type CreateCuratedItemInput = CuratedItemRequiredInput & {
  scheduledDate?: string;
  newTabFeedExternalId?: string;
};

export type UpdateCuratedItemInput = {
  externalId: string;
} & CuratedItemRequiredInput;

export type NewTabFeedScheduledItem = NewTabFeedSchedule & {
  curatedItem: CuratedItem;
};

export type NewTabFeedScheduledItemsResult = {
  items: NewTabFeedSchedule[];
};

export type NewTabFeedScheduleFilterInput = {
  newTabExternalId: string;
  startDate: string;
  endDate: string;
};

export type DeleteNewTabFeedScheduledItemInput = {
  externalId: string;
};

export type CreateNewTabFeedScheduledItemInput = {
  curatedItemExternalId: string;
  newTabFeedExternalId: string;
  scheduledDate: string;
};
