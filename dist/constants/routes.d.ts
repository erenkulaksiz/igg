import login from "../routes/login";
import getSelfProfile from "../routes/getSelfProfile";
import saveFollowers from "../routes/saveFollowers";
declare const routes: {
    readonly API_LOGIN: {
        readonly route: `${string}/login`;
        readonly action: typeof login;
    };
    readonly API_GETSELFPROFILE: {
        readonly route: `${string}/getSelfProfile`;
        readonly action: typeof getSelfProfile;
    };
    readonly API_SAVEFOLLOWERS: {
        readonly route: `${string}/saveFollowers`;
        readonly action: typeof saveFollowers;
    };
};
export default routes;
//# sourceMappingURL=routes.d.ts.map