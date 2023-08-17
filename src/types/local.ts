import type { AccountFollowersFeedResponseUsersItem } from "instagram-private-api";

export interface Local {
  followers: AccountFollowersFeedResponseUsersItem[];
  ts: number;
  username: string;
}
