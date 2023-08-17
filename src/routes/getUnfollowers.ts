import { Request, Response } from "express";
import { IgApiClient } from "instagram-private-api";
import { checkCookie } from "../utils/cookie";
import compareFollowers from "../utils/compareFollowers";
import type { UserData } from "../types/userdata";

// await compareFollowers(followers, credentials.username);

export default async function getUnfollowers(
  req: Request,
  res: Response
): Promise<Response> {
  console.log("path: getUnfollowers");
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
    const followers = await ig.feed
      .accountFollowers(ig.state.cookieUserId)
      .items();

    const unfollowers = await compareFollowers(followers, username);

    if (!unfollowers) return res.status(200).json();

    return res.status(200).json({
      unfollowers: unfollowers.map((item) => item.username),
    });
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      error: "error-occurred",
    });
  }
}
