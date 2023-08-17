"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var login_1 = __importDefault(require("../routes/login"));
var getSelfProfile_1 = __importDefault(require("../routes/getSelfProfile"));
var saveFollowers_1 = __importDefault(require("../routes/saveFollowers"));
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
    API_SAVEFOLLOWERS: {
        route: "".concat(API_BASE, "/saveFollowers"),
        action: saveFollowers_1.default,
    },
};
exports.default = routes;
