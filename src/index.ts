import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

function registerRoutes() {
  Object.values(routes).forEach((route) => {
    app.post(route.route, route.action);
  });
  console.log("Registered routes");
}

registerRoutes();
