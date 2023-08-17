import fs from "fs";
import type { IgApiClient } from "instagram-private-api";

export async function saveCookie(cookie: any, username: string): Promise<void> {
  await fs.writeFileSync(
    `./cookies/${username}.json`,
    JSON.stringify({ content: cookie })
  );
}

export async function getCookie(username: string): Promise<void | string> {
  const exist = await fs.existsSync(`./cookies/${username}.json`);
  if (!exist) {
    return;
  }
  const cookie = await fs.readFileSync(`./cookies/${username}.json`);
  return JSON.parse(cookie.toString()).content;
}

export async function removeCookie(username: string): Promise<void> {
  const exist = await fs.existsSync(`./cookies/${username}.json`);
  if (!exist) {
    return;
  }
  await fs.unlinkSync(`./cookies/${username}.json`);
}

export async function checkCookie(
  ig: IgApiClient,
  username?: string
): Promise<{ shouldLogin: boolean }> {
  const cookie = await getCookie(
    username ? username : process.env.IG_USERNAME || ""
  );

  if (cookie) {
    await ig.state.deserialize(cookie);
    try {
      const loggedInUser = await ig.account.currentUser();
    } catch (err) {
      console.log(err);
      return { shouldLogin: true };
    }
    return { shouldLogin: false };
  }

  return { shouldLogin: true };
}
