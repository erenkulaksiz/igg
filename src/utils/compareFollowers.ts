import fs from "fs";
import type { AccountFollowersFeedResponseUsersItem } from "instagram-private-api";
import type { Local } from "../types/local";

export default async function compareFollowers(
  updatedFollowers: AccountFollowersFeedResponseUsersItem[],
  username: string
): Promise<void | AccountFollowersFeedResponseUsersItem[]> {
  const fileExist = await fs.existsSync(`./followers/${username}.json`);

  if (!fileExist) return;

  const localFollowers = JSON.parse(
    await fs.readFileSync(`./followers/${username}.json`, "utf-8")
  ) as Local;

  console.log("localfollowers", localFollowers?.followers.length);

  const unfollowers = localFollowers.followers.filter(
    (item) => !updatedFollowers.some((i) => i.pk === item.pk)
  );

  if (unfollowers.length > 0) {
    console.log(`Unfollowers: ${unfollowers.length}`);
    console.log(unfollowers.map((item) => item.username).join(", "));
  }

  console.log(`Total followers: ${updatedFollowers.length}`);

  return unfollowers;
}
