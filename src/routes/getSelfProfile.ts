import { Request, Response } from "express";
import { IgApiClient } from "instagram-private-api";
import { checkCookie } from "../utils/cookie";
import type { UserData } from "../types/userdata";

export default async function getSelfProfile(req: Request, res: Response) {
  console.log("path: getSelfProfile");
  const ig = new IgApiClient();

  const { username } = req.body as {
    username: UserData["username"];
  };

  ig.state.generateDevice(username);
  ig.state.proxyUrl = process.env.IG_PROXY || "";

  const { shouldLogin } = await checkCookie(ig, username);

  if (shouldLogin) {
    return res.status(401).json({
      error: "login pls",
    });
  }

  const user = await ig.user.info(ig.state.cookieUserId);

  return res.status(200).json({
    user,
  });
}
