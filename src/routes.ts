import login from "./routes/login";
import getSelfProfile from "./routes/getSelfProfile";
import saveFollowers from "./routes/saveFollowers";
import getUnfollowers from "./routes/getUnfollowers";
import getPendingRequests from "./routes/getPendingRequests";
import getBlocked from "./routes/getBlocked";
import setBlocked from "./routes/setBlocked";

const API_BASE = process.env.API_BASE || "/api/v1";

const routes = {
  API_LOGIN: {
    route: `${API_BASE}/login`,
    action: login,
  },
  API_GETSELFPROFILE: {
    route: `${API_BASE}/getSelfProfile`,
    action: getSelfProfile,
  },
  API_GETUNFOLLOWERS: {
    route: `${API_BASE}/getUnfollowers`,
    action: getUnfollowers,
  },
  API_SAVEFOLLOWERS: {
    route: `${API_BASE}/saveFollowers`,
    action: saveFollowers,
  },
  API_GETPENDINGREQUESTS: {
    route: `${API_BASE}/getPendingRequests`,
    action: getPendingRequests,
  },
  API_GETBLOCKED: {
    route: `${API_BASE}/getBlocked`,
    action: getBlocked,
  },
  API_SETBLOCKED: {
    route: `${API_BASE}/setBlocked`,
    action: setBlocked,
  },
} as const;

export default routes;
