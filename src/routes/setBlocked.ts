import { Request, Response } from "express";
import { IgApiClient } from "instagram-private-api";
import { checkCookie } from "../utils/cookie";
import type { UserData } from "../types/userdata";

export default async function setBlocked(
  req: Request,
  res: Response
): Promise<Response> {
  console.log("path: setBlocked");

  const ig = new IgApiClient();

  const { username } = req.body as {
    username: UserData["username"];
    block: UserData["username"];
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
    const userId = await ig.user.getIdByUsername(username);
    await ig.friendship.block(userId);

    return res.status(200).json();
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      error: "error-occurred",
    });
  }
}
