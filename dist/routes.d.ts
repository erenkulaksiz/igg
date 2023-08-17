import login from "./routes/login";
import getSelfProfile from "./routes/getSelfProfile";
import saveFollowers from "./routes/saveFollowers";
import getUnfollowers from "./routes/getUnfollowers";
import getPendingRequests from "./routes/getPendingRequests";
import getBlocked from "./routes/getBlocked";
import setBlocked from "./routes/setBlocked";
declare const routes: {
    readonly API_LOGIN: {
        readonly route: `${string}/login`;
        readonly action: typeof login;
    };
    readonly API_GETSELFPROFILE: {
        readonly route: `${string}/getSelfProfile`;
        readonly action: typeof getSelfProfile;
    };
    readonly API_GETUNFOLLOWERS: {
        readonly route: `${string}/getUnfollowers`;
        readonly action: typeof getUnfollowers;
    };
    readonly API_SAVEFOLLOWERS: {
        readonly route: `${string}/saveFollowers`;
        readonly action: typeof saveFollowers;
    };
    readonly API_GETPENDINGREQUESTS: {
        readonly route: `${string}/getPendingRequests`;
        readonly action: typeof getPendingRequests;
    };
    readonly API_GETBLOCKED: {
        readonly route: `${string}/getBlocked`;
        readonly action: typeof getBlocked;
    };
    readonly API_SETBLOCKED: {
        readonly route: `${string}/setBlocked`;
        readonly action: typeof setBlocked;
    };
};
export default routes;
//# sourceMappingURL=routes.d.ts.map