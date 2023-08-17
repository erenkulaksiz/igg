import type { Feed } from "instagram-private-api";

export default async function getAllItemsFromFeed<T>(
  feed: Feed<any, T>
): Promise<T[]> {
  let items = [] as any[];
  do {
    items = items.concat(await feed.items());
  } while (feed.isMoreAvailable());
  return items;
}
