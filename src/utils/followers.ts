import fs from "fs";
import type { AccountFollowersFeedResponseUsersItem } from "instagram-private-api";
import type { Local } from "../types/local";

export async function writeLocalFollowers(
  followers: AccountFollowersFeedResponseUsersItem[],
  username: string
): Promise<void> {
  if (!username) {
    throw new Error("Username is required to write followers");
  }
  const data = JSON.stringify({ followers, ts: Date.now(), username } as Local);
  await fs.writeFileSync(`./followers/${username}.json`, data);
}

export async function getLocalFollowers(
  username: string
): Promise<AccountFollowersFeedResponseUsersItem[] | void> {
  if (!username) return;
  const data = fs.readFileSync(`./followers/${username}.json`, "utf8");
  return (JSON.parse(data) as Local).followers;
}
