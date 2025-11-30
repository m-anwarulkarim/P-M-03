/*
========================================================
Express + TypeScript: req & res সম্পূর্ণ ভিতরের বিষয়
========================================================
*/

import express, { Request, Response } from "express";

/*
২. App তৈরি
--------------------------------------------------------
- express() call করলে একটি server instance পাওয়া যায়
- app হলো central object, route ও middleware handle করে
*/
const app = express();
const PORT = 3000;

/*
========================================================
৩. Middleware: JSON body parse
--------------------------------------------------------
- express.json() → POST/PUT request এর JSON body কে parse করে req.body তে রাখে
- middleware না দিলে req.body undefined হয়
========================================================
*/
app.use(express.json());

/*
========================================================
৪. req object (Request) বিস্তারিত
--------------------------------------------------------
Express-এর req হলো client থেকে আসা request এর সব তথ্য ধারণকারী object

- req.method        → HTTP method (GET, POST, PUT, DELETE)
- req.url / req.path → URL path যা client hit করেছে
- req.headers       → client যে headers পাঠিয়েছে (authorization, content-type ইত্যাদি)
- req.query         → URL query parameters (e.g., ?name=karim&age=20) (ata GET mathod er shathe babohar hoi)
- req.params        → route parameters (e.g., /user/:id → req.params.id)
- req.body          → POST/PUT request body data
- req.ip            → client IP address
- req.cookies       → cookie-parser middleware ব্যবহার করলে cookies
- req.hostname      → domain name
- req.protocol      → "http" বা "https"
- req.route         → matched route info
- req.originalUrl   → full original URL including query string

⚠️ নতুনদের জন্য tips:
- req.body / req.query / req.params সব optional হতে পারে → check করে ব্যবহার করতে হবে
- req.params সব string, numeric দরকার হলে parseInt করতে হবে
- req.query সব সময় string | undefined → type assertion দরকার হতে পারে
========================================================
*/

/*
========================================================
৫. res object (Response) বিস্তারিত
--------------------------------------------------------
Express-এর res হলো server response পাঠানোর জন্য সব control ধারণকারী object

- res.send()        → text, HTML, Buffer, বা object পাঠানো
- res.json()        → JSON format এ response পাঠানো
- res.status()      → HTTP status code সেট করা
- res.set() / header() → headers set করা
- res.redirect()    → client কে অন্য URL এ redirect করা
- res.end()         → response শেষ করা
- res.cookie()      → cookie set করা
- res.clearCookie() → cookie remove করা
- res.download()    → file download করানো
- res.sendFile()    → file পাঠানো
- res.locals        → template/middleware data share করা

⚠️ নতুনদের জন্য tips:
- res.send() + res.json() একসাথে ব্যবহার করবেন না, conflict হতে পারে
- res.status() ছাড়া res.send() দিলে default 200 status পাঠানো হয়
========================================================
*/

/*
========================================================
৬. Example: Home route
--------------------------------------------------------
- GET "/" route
- req: client request
- res: server response
- line-by-line:
    1. req.method → client কোন method ব্যবহার করেছে
    2. req.path → কোন path hit হয়েছে
    3. res.send() → text response পাঠানো
========================================================
*/
app.get("/", (req: Request, res: Response) => {
  console.log("Client requested:", req.method, req.path);
  res.send("Server is running with Express + TypeScript 🚀");
});

/*
========================================================
৭. Example: Dynamic route with query
--------------------------------------------------------
- GET "/user/:id"
- req.params → route params
- req.query  → query params
- res.json() → JSON response পাঠানো
========================================================
*/
app.get("/user/:id", (req: Request, res: Response) => {
  const userId = req.params.id;
  const filter = req.query.filter;

  console.log("Params:", req.params);
  console.log("Query:", req.query);

  res.json({ userId, filter });
});

/*
========================================================
৮. Server start
--------------------------------------------------------
- app.listen → server run করে
- callback → server start হলে console log
========================================================
*/
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
