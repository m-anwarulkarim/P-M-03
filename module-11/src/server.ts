import http, { IncomingMessage, Server, ServerResponse } from "http";
import { StatusCodes } from "http-status-codes";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running.....");

    if (req.url == "/" && req.method == "GET") {
      res.writeHead(StatusCodes.OK, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "hello from noode js with typescript ",
          path: req.url,
        })
      );
    }
  }
);

server.listen(5000, () => {
  console.log("server is running....");
});
