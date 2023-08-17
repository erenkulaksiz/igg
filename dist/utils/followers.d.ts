import type { AccountFollowersFeedResponseUsersItem } from "instagram-private-api";
export declare function writeLocalFollowers(followers: AccountFollowersFeedResponseUsersItem[], username: string): Promise<void>;
export declare function getLocalFollowers(username: string): Promise<AccountFollowersFeedResponseUsersItem[] | void>;
//# sourceMappingURL=followers.d.ts.map