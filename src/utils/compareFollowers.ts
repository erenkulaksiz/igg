import fs from "fs";
import type { AccountFollowersFeedResponseUsersItem } from "instagram-private-api";
import type { Local } from "../types/local";

export default async function compareFollowers(
  updatedFollowers: AccountFollowersFeedResponseUsersItem[],
  username: string
): Promise<void> {
  const fileExist = await fs.existsSync(`./followers/${username}.json`);
  if (!fileExist) return;

  const localFollowers = await fs.readFileSync(
    `./followers/${username}.json`,
    "utf-8"
  );

  const followers: AccountFollowersFeedResponseUsersItem[] = (
    JSON.parse(localFollowers) as Local
  ).followers;

  const unfollowers = followers.filter(
    (item) => !updatedFollowers.some((i) => i.pk === item.pk)
  );

  if (unfollowers.length > 0) {
    console.log(`Unfollowers: ${unfollowers.length}`);
    console.log(unfollowers.map((item) => item.username).join(", "));
  }

  console.log(`Total followers: ${updatedFollowers.length}`);
}
