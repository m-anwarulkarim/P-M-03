import { readUser, writeUser } from "../config/helpers/fileDB";
import parseBody from "../config/helpers/parseBody";
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

addRoutes("POST", "/api/users", async (req, res) => {
  const body = await parseBody(req);
  const users = readUser();
  const newUser = {
    ...body,
  };
  users.push(newUser);

  writeUser(users);
  sendJson(res, 200, body);
});
