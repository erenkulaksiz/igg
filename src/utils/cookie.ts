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

export async function checkCookie(
  ig: IgApiClient,
  username?: string
): Promise<{ shouldLogin: boolean }> {
  const cookie = await getCookie(
    username ? username : process.env.IG_USERNAME || ""
  );

  if (cookie) {
    await ig.state.deserialize(cookie);
    return { shouldLogin: false };
  }

  return { shouldLogin: true };
}
