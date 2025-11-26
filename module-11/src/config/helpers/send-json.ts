import { ServerResponse } from "http";

const sendJson = (res: ServerResponse, statusCode: number, data: any) => {
  res.statusCode = statusCode;
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify(data));
};

export default sendJson;
