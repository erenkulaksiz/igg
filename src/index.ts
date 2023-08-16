import "dotenv/config";
import { IgApiClient } from "instagram-private-api";
import { sample } from "lodash";
import connect from "./connect";
import { cookie, saveCookie } from "./cookie";
import type { UserData } from "./types/userdata";

const credentials = {
  username: process.env.IG_USERNAME || "",
  password: process.env.IG_PASSWORD || "",
} as UserData;

const ig = new IgApiClient();
ig.state.generateDevice(credentials.username);
ig.state.proxyUrl = process.env.IG_PROXY || "";

(async () => {
  ig.request.end$.subscribe(async () => {
    const serialized = await ig.state.serialize();
    delete serialized.constants;
    saveCookie(serialized);
  });

  await cookie(ig);

  const loggedInUser = await connect(ig, credentials);

  //process.nextTick(async () => await ig.simulate.postLoginFlow());

  const userFeed = ig.feed.user(loggedInUser.pk);
  const myPostsFirstPage = await userFeed.items();
  const myPostsSecondPage = await userFeed.items();

  console.log(myPostsFirstPage[0]);

  await ig.media.like({
    mediaId: sample([myPostsFirstPage[0].id, myPostsSecondPage[0].id]) || "",
    moduleInfo: {
      module_name: "profile",
      user_id: loggedInUser.pk,
      username: loggedInUser.username,
    },
    d: sample([0, 1]) ? 1 : 0,
  });
})();
