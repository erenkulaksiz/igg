import { Request, Response } from "express";
import { IgApiClient } from "instagram-private-api";
import { checkCookie } from "../utils/cookie";
import getAllItemsFromFeed from "../utils/getAllItemsFromFeed";
import { writeLocalFollowers } from "../utils/followers";
import type { UserData } from "../types/userdata";

export default async function saveFollowers(
  req: Request,
  res: Response
): Promise<Response> {
  console.log("path: saveFollowers");

  const ig = new IgApiClient();

  const { username } = req.body as {
    username: UserData["username"];
  };

  ig.state.generateDevice(username);
  ig.state.proxyUrl = process.env.IG_PROXY || "";

  const { shouldLogin } = await checkCookie(ig, username);

  if (shouldLogin) {
    return res.status(401).json({
      error: "auth-required",
    });
  }

  try {
    const followersFeed = ig.feed.accountFollowers(ig.state.cookieUserId);
    const followers = await getAllItemsFromFeed(followersFeed);

    await writeLocalFollowers(followers, username);

    return res.status(200).send();
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      error: "error-occurred",
    });
  }
}
