/*!SECTION
 Node.js + TypeScript + dotenv Setup Guide
======================================================
1️⃣ npm init -y
   → প্রোজেক্টে package.json তৈরি করে

2️⃣ npm install -D typescript ts-node @types/node
   → typescript → TypeScript কোড compile করার জন্য
   → ts-node → .ts ফাইল সরাসরি run করার জন্য
   → @types/node → Node.js এর type support (error যেন না আসে)

3️⃣ npx tsc --init
   → প্রোজেক্টে tsconfig.json ফাইল তৈরি করে, যেখানে TypeScript settings থাকবে

4️⃣ npm i dotenv
   → dotenv .env ফাইলের secret/config data Node.js এ load করে দেয়
*/

/* SECTION
⚡ TypeScript + .env setup class note
- tsconfig.json তৈরি করা হয়ে গেছে
- dotenv দিয়ে environment variables ব্যবহার করা হবে
*/

import dotenv from "dotenv"; // ✅ dotenv import
import path from "path"; // ✅ path module import

// ===========================================================
// 🌱 dotenv setup
// ===========================================================
dotenv.config({
  /* dotenv.config() মূলত .env ফাইলটা ওপেন করছে
   process.cwd() → project এর বর্তমান folder বোঝাচ্ছে
   ".env" → root folder এ .env ফাইল এর সাথে connect করা হলো*/
  path: path.join(process.cwd(), ".env"),
});

// ✅ এখন .env এর variable access করা যাবে
console.log("PORT =", process.env.PORT);
console.log("SECRET =", process.env.SECRET);

// ===========================================================
// 🌐 Node.js modules import
// ===========================================================
import http, { IncomingMessage, Server, ServerResponse } from "http"; // Node HTTP server
import { join } from "path"; // path join function

// ===========================================================
// 🏗️ Server তৈরি করা
// ===========================================================
const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log(" New request received!");

    /* =======================================================
 🔎 Request check
  =======================================================
 ==>:req-এর ভিতরে কী থাকে? : 1 URL 2.method (GET, POST ....) 3.headers 4.body 5.query

 ==>:req.url → কোন path hit হয়েছে
 ==>:req.method → কোন HTTP method ব্যবহার হয়েছে (GET, POST ইত্যাদি)
*/
    if (req.url === "/" && req.method === "GET") {
      /* =======================================================
    📤 Response header set
    =======================================================
   res-এর ভিতরে কী থাকে? 1.res.statusCode 2.res.end() : res শেষ করে 
   3.res.headersSent (): header already পাঠানো হয়েছে কিনা check করে 
   4.res.setHeader() 5,res.getHeader()
    6.res.writeHead() :একসাথে: status code, headers send করে| 7.res.write()


    200 OK status
    content-type → JSON format */
      res.writeHead(200, { "content-type": "application/json" });

      // =======================================================
      // 📦 Response body
      // =======================================================
      res.end(
        JSON.stringify({
          message: " Hello from Node.js with TypeScript!",
          path: req.url,
        })
      );
    }
  }
);

// ===========================================================
// 🎯 Server run
// ===========================================================
server.listen(5000, () => {
  console.log("🔥 Server is running on http://localhost:5000");
});

/* ==========================================================
💡 Notes:
- .env file use করে PORT, SECRET ইত্যাদি values load করা হয়
- process.env.PORT এর মতো variable এখন কোডে access করা যাবে
- Future: PORT dotenv থেকে load করে server.listen(process.env.PORT) করা যাবে
========================================================== */
