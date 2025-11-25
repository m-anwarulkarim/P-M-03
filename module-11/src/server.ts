import http, { IncomingMessage, Server, ServerResponse } from "http";
import { StatusCodes } from "http-status-codes";
import config from "./config";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running.....");
    //  root rout
    if (req.url == "/" && req.method == "GET") {
      res.writeHead(StatusCodes.OK, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "hello from noode js with typescript ",
          path: req.url,
        })
      );
    }
    //  health rout
    if (req.url == "/api" && req.method == "GET") {
      res.writeHead(StatusCodes.OK, { "content-type": "application" });
      res.end(
        JSON.stringify({
          message: "Health status ook ",
          path: req.url,
        })
      );
    }
    //  users rout
    if (req.url == "/api/users" && req.method == "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        try {
          const pearsBody = JSON.parse(body);
          console.log(pearsBody);
          res.end(JSON.stringify(pearsBody));
        } catch (error: any) {
          console.log(error.message);
        }
      });
    }
  }
);

server.listen(config.port, () => {
  console.log(`server is running on ${config.port}`);
});
