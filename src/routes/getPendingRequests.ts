import { Request, Response } from "express";
import { IgApiClient } from "instagram-private-api";
import { checkCookie } from "../utils/cookie";
import type { UserData } from "../types/userdata";

export default async function getPendingRequests(
  req: Request,
  res: Response
): Promise<Response> {
  console.log("path: getPendingRequests");

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
    const pendingRequests = await ig.feed.pendingFriendships().items();

    return res.status(200).json({
      pendingRequests,
    });
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      error: "error-occurred",
    });
  }
}
