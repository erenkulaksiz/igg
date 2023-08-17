"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var login_1 = __importDefault(require("./routes/login"));
var getSelfProfile_1 = __importDefault(require("./routes/getSelfProfile"));
var saveFollowers_1 = __importDefault(require("./routes/saveFollowers"));
var getUnfollowers_1 = __importDefault(require("./routes/getUnfollowers"));
var getPendingRequests_1 = __importDefault(require("./routes/getPendingRequests"));
var getBlocked_1 = __importDefault(require("./routes/getBlocked"));
var setBlocked_1 = __importDefault(require("./routes/setBlocked"));
var API_BASE = process.env.API_BASE || "/api/v1";
var routes = {
    API_LOGIN: {
        route: "".concat(API_BASE, "/login"),
        action: login_1.default,
    },
    API_GETSELFPROFILE: {
        route: "".concat(API_BASE, "/getSelfProfile"),
        action: getSelfProfile_1.default,
    },
    API_GETUNFOLLOWERS: {
        route: "".concat(API_BASE, "/getUnfollowers"),
        action: getUnfollowers_1.default,
    },
    API_SAVEFOLLOWERS: {
        route: "".concat(API_BASE, "/saveFollowers"),
        action: saveFollowers_1.default,
    },
    API_GETPENDINGREQUESTS: {
        route: "".concat(API_BASE, "/getPendingRequests"),
        action: getPendingRequests_1.default,
    },
    API_GETBLOCKED: {
        route: "".concat(API_BASE, "/getBlocked"),
        action: getBlocked_1.default,
    },
    API_SETBLOCKED: {
        route: "".concat(API_BASE, "/setBlocked"),
        action: setBlocked_1.default,
    },
};
exports.default = routes;
