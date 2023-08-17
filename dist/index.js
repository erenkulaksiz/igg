"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = __importDefault(require("./routes"));
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
function registerRoutes() {
    Object.values(routes_1.default).forEach(function (route) {
        app.post(route.route, route.action);
    });
    console.log("Registered routes");
}
registerRoutes();
