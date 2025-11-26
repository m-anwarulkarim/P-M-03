// 🔹 নতুন একটি Route রেজিস্টার করছি (GET "/")
// addRoutes ফাংশন আমাদের global route Map-এর ভেতর data যোগ করে
addRoutes("GET", "/", (req, res) => {
  // 🔹 Response status code manually set করছি
  res.statusCode = 200;

  // 🔹 বলছি আমরা JSON data পাঠাবো
  res.setHeader("Content-Type", "application/json");

  // 🔹 Response body পাঠাচ্ছি (JSON এ convert করে)
  res.end(
    JSON.stringify({
      messsage: "hello from node js with typescript",
      path: req.url, // 🔹 client কোন URL এ hit করেছে সেটা দেখাবে
    })
  );
});

// 🔥 এখন মূল সার্ভার তৈরি করছি
const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("server is running.....");

    // 1️⃣ ক্লায়েন্ট কোন method পাঠিয়েছে? (GET, POST, etc.)
    // req.method undefined হতে পারে, তাই optional chaining
    // uppercase করলাম যাতে সবসময় কনসিসটেন্ট থাকে
    const mathod = req.method?.toUpperCase() || "";

    // 2️⃣ ক্লায়েন্ট কোন path এ request করেছে? ("/", "/user", "/login")
    const path = req.url || "";

    // 3️⃣ আমাদের global route Map থেকে matching method ("GET") এর ভেতরকার map বের করছি
    //   উদাহরণ: route.get("GET") → Map { "/" => handler }
    const mathodMap = route.get(mathod);

    // 4️⃣ সেই method-এর ভেতরে path মিলিয়ে handler function বের করছি
    //   উদাহরণ: mathodMap.get("/") => handler function
    const handeler: RouteHandeler | undefined = mathodMap?.get(path);

    // 5️⃣ handler পাওয়া গেলে সেটাই execute হবে
    if (handeler) {
      handeler(req, res);
    } else {
      // ❌ handler না পাওয়া মানে route match হয়নি → 404
      res.statusCode = 404;
      res.setHeader("content-type", "application/json");

      res.end(
        JSON.stringify({
          message: "route not found",
          success: false,
          path: path, // কোন path not found হলো তা দেখাবে
        })
      );
    }
  }
);
