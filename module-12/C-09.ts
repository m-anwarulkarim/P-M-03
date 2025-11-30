// =====================================================
// 📌 Logger Middleware
// =====================================================
// প্রতিটি incoming request এর তথ্য console এ দেখাবে,
// তারপর next() দিয়ে request পরবর্তী route বা middleware এ যাবে।

const logger = (req: Request, res: Response, next: NextFunction) => {
  // ----------------------------------------------------
  // 📝 Request Log:
  // new Date().toISOString() → current timestamp
  // req.method → request type (GET/POST/PUT/DELETE)
  // req.originalUrl → পুরো URL path (req.path থেকেও বেশি নির্ভুল)
  // ----------------------------------------------------

  console.log(
    `[${new Date().toISOString()}] -> ${req.method} ${req.originalUrl}`
  );

  // ----------------------------------------------------
  // 🔁 next()
  // ----------------------------------------------------
  // next() বলে: “এই middleware এর কাজ শেষ,
  // request কে এখন পরের middleware বা route handler এ পাঠাও”
  next();
};

// =====================================================
// 📌 Route-level Middleware হিসেবে Logger ব্যবহার
// =====================================================
// "/" route এ hit করলে:
// Step 1: logger middleware চলবে
// Step 2: তারপর route handler response পাঠাবে
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});

// =====================================================
// 📌 Default 404 Route Handler
// =====================================================
// যেকোনো ভুল route এলে এখানে আসবে
// যেমন: /abc /xyz /wrong-url
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path, // কোন path ভুল ছিল তা দেখায়
  });
});
