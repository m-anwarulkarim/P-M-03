/* 🏆 সবচেয়ে বেশি ব্যবহৃত 4টি req property & method
1️⃣ req.method

✔ কোন HTTP method এসেছে তা জানতে
(GET, POST, PUT, DELETE)

console.log(req.method);


এটা router/logic লিখতে সবচেয়ে প্রয়োজনীয়।

2️⃣ req.url

✔ কোন path বা route hit করেছে তা জানতে

console.log(req.url);


ইহাই route matching করার মূল জিনিস।

3️⃣ req.headers

✔ ক্লায়েন্ট কী header পাঠিয়েছে তা জানতে
(যেমন: content-type, authorization token)

console.log(req.headers["content-type"]);


API request বুঝতে headers জানা জরুরি।

4️⃣ req.on("data") & req.on("end")

✔ POST/PUT request-এর body পড়ার জন্য

let body = "";
req.on("data", chunk => body += chunk);
req.on("end", () => {
  console.log("Body:", body);
});


API লিখলে body পড়া বাধ্যতামূলক, তাই এই দুটো event সবচেয়ে বেশি ব্যবহৃত।

*/
/*!SECTION

🏆 সবচেয়ে বেশি ব্যবহৃত 3টি res method
1️⃣ res.setHeader()

response-এর Content-Type সেট করার জন্য সবচেয়ে বেশি ব্যবহার হয়।

res.setHeader("Content-Type", "application/json");

2️⃣ res.statusCode

status code পাঠানোর জন্য lightweight উপায়।

res.statusCode = 200;

3️⃣ res.end()

✔ response পাঠানো শেষ করার জন্য সবচেয়ে বেশি ব্যবহৃত method
এটা না দিলে response শেষই হবে না।

res.end("Hello World");


👉 res.end() হলো সবচেয়ে গুরুত্বপূর্ণ ও বেশি ব্যবহৃত।

🔥 অনেক Dev যেভাবে কম্বিনেশনে ব্যবহার করে:
res.statusCode = 200;
res.setHeader("Content-Type", "application/json");
res.end(JSON.stringify({ message: "Success" }));


//  res.writeHead()
*/
