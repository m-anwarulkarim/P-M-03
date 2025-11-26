import http, { IncomingMessage, Server, ServerResponse } from "http";
import { StatusCodes } from "http-status-codes";
import config from "./config";
import addRoutes, {
  route,
  RouteHandeler,
} from "./config/helpers/RoyteHandeler";

addRoutes("GET", "/", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      messsage: "hello from noode js with typescript ",
      path: req.url,
    })
  );
});

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running.....");

    const mathod = req.method?.toUpperCase() || "";
    const path = req.url || "";
    const mathodMap = route.get(mathod);
    const handeler: RouteHandeler | undefined = mathodMap?.get(path);

    if (handeler) {
      handeler(req, res);
    } else {
      res.statusCode = 404;
      res.setHeader("content-type", "aplication/json");
      res.end(
        JSON.stringify({
          message: "route not found",
          success: false,
          path: path,
        })
      );
    }
  }
);

server.listen(config.port, () => {
  console.log(`server is running on ${config.port}`);
});
