// ============================
// sendJson.ts
// ============================

// 🔹 Node.js থেকে ServerResponse import করা হলো
// আমরা TypeScript ব্যবহার করছি তাই type define করতে হবে
import { ServerResponse } from "http";

// 🔹 sendJson helper function declare
// এই function আমাদের response পাঠানো অনেক সহজ করে দেয়
// আমরা তিনটি parameter দিচ্ছি:
// 1️⃣ res → Response object (ServerResponse type)
// 2️⃣ statusCode → HTTP status code (200, 404, 500 ইত্যাদি)
// 3️⃣ data → যেকোনো data যা client-কে পাঠাতে চাই
const sendJson = (res: ServerResponse, statusCode: number, data: any) => {
  // 🔹 Response এর status code set করা হচ্ছে
  res.statusCode = statusCode;

  // 🔹 Response header set করা হচ্ছে → আমরা JSON পাঠাচ্ছি
  res.setHeader("Content-Type", "application/json");

  // 🔹 Data কে JSON string এ convert করে response পাঠানো
  // res.end() call করলে response শেষ হয়ে যায়
  res.end(JSON.stringify(data));
};

/*
🔹 এখানে কি হচ্ছে:
1. res আসলেই Node.js এর ServerResponse object
2. আমরা statusCode, content-type set করি
3. তারপর client-কে data পাঠাই
4. এই helper function প্রতিটি route এ reuse করা যাবে
5. TypeScript আমাদের নিশ্চিত করে যে প্রথম argument অবশ্যই ServerResponse হতে হবে
*/

// 🔹 Export করা হলো যাতে অন্য ফাইল থেকে import করে ব্যবহার করা যায়
export default sendJson;

// ============================
// routes.ts
// ============================

import addRoutes from "../config/helpers/RoyteHandeler";
import sendJson from "../config/helpers/sendJson";

// 🔹 Home route ("/")
addRoutes("GET", "/", (req, res) => {
  sendJson(res, 200, {
    message: "hello from Node.js with TypeScript",
    path: req.url,
  });
});

// 🔹 API health check route ("/api")
addRoutes("GET", "/api", (req, res) => {
  sendJson(res, 200, {
    message: "health status",
    path: req.url,
  });
});

/*
🔹 Route বা API endpoint-এ শুধু sendJson(res, statusCode, data) কল করলেই response পাঠানো হয়ে যাবে
🔹 আর statusCode + header + JSON.stringify বারবার লিখতে হবে না
*/

// ============================
// server.ts
// ============================
// 🔹 সমস্ত route import করা হলো
import "./routes";
