import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import routes from "./constants/routes";

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

app.post(routes.API_LOGIN.route, routes.API_LOGIN.action);
app.post(routes.API_GETSELFPROFILE.route, routes.API_GETSELFPROFILE.action);
app.post(routes.API_SAVEFOLLOWERS.route, routes.API_SAVEFOLLOWERS.action);
