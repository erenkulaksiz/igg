import login from "../routes/login";
import getSelfProfile from "../routes/getSelfProfile";
import saveFollowers from "../routes/saveFollowers";

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
  API_SAVEFOLLOWERS: {
    route: `${API_BASE}/saveFollowers`,
    action: saveFollowers,
  },
} as const;

export default routes;
