"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = __importDefault(require("./constants/routes"));
/*
const credentials = {
  username: process.env.IG_USERNAME || "",
  password: process.env.IG_PASSWORD || "",
} as UserData;

const ig = new IgApiClient();

ig.state.generateDevice(credentials.username);
ig.state.proxyUrl = process.env.IG_PROXY || "";

const shouldWriteToLocal = false;

(async () => {
  ig.request.end$.subscribe(async () => {
    const serialized = await ig.state.serialize();
    delete serialized.constants;
    await saveCookie(serialized, credentials.username);
  });

  const { shouldLogin } = await cookie(ig);

  if (shouldLogin) {
    await connect(ig, credentials);
  }

  const followersFeed = ig.feed.accountFollowers(ig.state.cookieUserId);
  const followers = await getAllItemsFromFeed(followersFeed);

  if (shouldWriteToLocal) {
    await writeLocalFollowers(followers, credentials.username);
  }

  await compareFollowers(followers, credentials.username);
})();
*/
var app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json({
    type: ["application/json", "text/plain"],
}));
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Listening on port ".concat(port));
});
app.post(routes_1.default.API_LOGIN.route, routes_1.default.API_LOGIN.action);
app.post(routes_1.default.API_GETSELFPROFILE.route, routes_1.default.API_GETSELFPROFILE.action);
app.post(routes_1.default.API_SAVEFOLLOWERS.route, routes_1.default.API_SAVEFOLLOWERS.action);
