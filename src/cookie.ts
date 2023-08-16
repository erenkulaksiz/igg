import fs from "fs";
import type { IgApiClient } from "instagram-private-api";

export async function saveCookie(cookie: any) {
  await fs.writeFileSync("./cookie.json", JSON.stringify({ content: cookie }));
}

export async function getCookie() {
  const exist = await fs.existsSync("./cookie.json");
  if (!exist) {
    return null;
  }
  const cookie = await fs.readFileSync("./cookie.json");
  return JSON.parse(cookie.toString()).content;
}

export async function cookie(ig: IgApiClient) {
  const cookie = await getCookie();

  if (cookie) {
    await ig.state.deserialize(cookie);
  }
}
