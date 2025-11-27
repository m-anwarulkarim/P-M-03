import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { route, RouteHandeler } from "./config/helpers/RoyteHandeler";
import "./routes";

const findDynamicRoute = (method: string, url: string) => {
  const mathodMap = route.get(method);
  if (!mathodMap) null;
  for (const [routePath, handler] of mathodMap?.entries()) {
    const routeParts = routePath.split("/");
    const urlParts = url.split("/");
    if (routeParts.length !== urlParts.length) continue;
    const params = {};
    let matched = true;
  }
};

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
      res.setHeader("Content-Type", "application/json");
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
