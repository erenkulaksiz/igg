import { Request, Response } from "express";
import { IgApiClient } from "instagram-private-api";
import { saveCookie, checkCookie } from "../utils/cookie";
import connect from "../utils/connect";
import type { UserData } from "../types/userdata";

export default async function login(req: Request, res: Response) {
  console.log("path: login");
  const ig = new IgApiClient();

  const { username, password } = req.body as {
    username: UserData["username"];
    password: UserData["password"];
  };

  ig.state.generateDevice(username);
  ig.state.proxyUrl = process.env.IG_PROXY || "";

  if (!username || !password)
    return res.status(400).json({ error: "Missing username or password" });

  ig.request.end$.subscribe(async () => {
    const serialized = await ig.state.serialize();
    delete serialized.constants;
    await saveCookie(serialized, username);
  });

  const { shouldLogin } = await checkCookie(ig, username);

  if (shouldLogin) {
    await connect(ig, { username, password }).catch((err) => {
      console.error(err);
      return res.status(400).json({ error: "Invalid username or password" });
    });
  }

  res.status(200).send();
}
