// ======================================================
// 📌 config.ts
// ======================================================
//
// এই ফাইলের উদ্দেশ্য:
// এখানে আমরা আমাদের প্রয়োজনীয় environment বা configuration এর
// সব গুরুত্বপূর্ণ বিষয়গুলো একটি centralized object এ রাখছি।
// যাতে প্রয়োজনে project এর যেকোনো জায়গা থেকে সহজে access করতে পারি।
//
// উদাহরণস্বরূপ:
//  - সার্ভারের port
//  - environment mode (development, production)
//  - অন্য কোনো গুরুত্বপূর্ণ key বা setting
//
// Advantages:
// 1️⃣ Centralized config → সব জায়গায় একইভাবে access করা যায়
// 2️⃣ Default value সেট করা যায় → কোনো variable define না থাকলেও crash হবে না
// 3️⃣ Project maintain করা সহজ হয়
// ======================================================

import { Server } from "http";

// Config object declare
const config = {
  // Environment: NODE_ENV থেকে নেওয়া হবে, না থাকলে "my app" হবে default
  env: process.env.NODE_ENV || "my app",

  // Server Port: PORT environment variable থেকে নেওয়া হবে, না থাকলে 5000 default
  port: process.env.PORT || 5000,

  // পরবর্তীতে এখানে অন্য important configuration যোগ করা যাবে
  // যেমন: database URL, API keys, secret keys ইত্যাদি
};

// Export করে দেওয়া হচ্ছে যাতে project এর যেকোনো ফাইল থেকে import করা যায়
export default config;

// =======================================================
// 📌 server.ts
// =======================================================

import http, { IncomingMessage, ServerResponse } from "http";
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

//উপরের বিষয়ের আলোচনা C-01.ts এর ভিতর গেসে
// এখানে আমাদের HTTP server কে একটি নির্দিষ্ট PORT এ listen করানো হচ্ছে,
// যাতে client (browser, postman, mobile app) থেকে request পাঠালে
// server সেই request receive করতে পারে।
//
// server.listen() এর কাজ:
// 1️⃣ সার্ভারকে নির্দিষ্ট PORT এ চালু করা
// 2️⃣ সফলভাবে server চালু হলে callback function run করা
//
// কেন config.port ব্যবহার করা হয়েছে?
// ✅ যাতে PORT dynamic হয়
// ✅ .env file থেকে PORT নেওয়া যায়
// ✅ hosting server (Vercel / Render / Railway) যেই PORT দেয় সেটাও কাজ করে
//
// উদাহরণ:
// http://localhost:5000

// ✅ server কে listen করানো হচ্ছে
server.listen(config.port, () => {
  // ✅ server সফলভাবে চালু হলে এই message দেখাবে
  console.log(`✅ Server is running on port ${config.port}`);
});
