import addRoutes from "../config/helpers/RoyteHandeler";
import sendJson from "../config/helpers/send-json";

addRoutes("GET", "/", (req, res) => {
  sendJson(res, 200, {
    messsage: "hello from noode js with typescript ",
    path: req.url,
  });
});

addRoutes("GET", "/api", (req, res) => {
  sendJson(res, 200, {
    message: " health status",
    path: req.url,
  });
});
