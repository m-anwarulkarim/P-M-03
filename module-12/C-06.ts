app.get("/users", async (req: Request, res: Response) => {
  try {
    // ডাটাবেজ থেকে সব users select করা
    const result = await pool.query(`SELECT * FROM users`);

    // Response পাঠানো
    res.status(200).json({
      success: true, // কাজ সফল
      message: "Users retrieved successfully", // success message
      data: result.rows, // সব users array আকারে পাঠানো
    });
  } catch (err: any) {
    // Error Handling
    res.status(500).json({
      success: false, // কাজ ব্যর্থ
      message: err.message, // error message
      datails: err, // সম্পূর্ণ error object (ডিবাগের জন্য)
    });
  }
});

// =====================================================
// 📌 GET /users/:id Route
// =====================================================

/*

এই route এর কাজ:

1️⃣ ইউজারের id দিয়ে database থেকে নির্দিষ্ট user fetch করা।
2️⃣ যদি user না থাকে → 404 response।
3️⃣ যদি user থাকে → 200 response সহ data পাঠানো।
4️⃣ কোনো error হলে → 500 response পাঠানো।

*/

// =====================================================
// Route definition
// =====================================================
app.get("/users/:id", async (req: Request, res: Response) => {
  // ------------------------------
  // 1️⃣ Request থেকে parameter নেওয়া
  // ------------------------------
  //** ⁡⁣⁣⁢URL এর :id অংশটি req.params.id দিয়ে পাওয়া যায়⁡
  // উদাহরণ: /users/5 → req.params.id = "5"
  const userId = req.params.id;

  try {
    // ------------------------------
    // 2️⃣ Database query
    // ------------------------------
    // $1 = parameterized query
    // injection attack থেকে রক্ষা করে
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    // ------------------------------
    // 3️⃣ Check if user exists
    // ------------------------------
    if (result.rows.length === 0) {
      // user পাওয়া যায়নি
      res.status(404).json({
        success: false, // কাজ ব্যর্থ
        message: "User not found", // message
      });
    } else {
      // user পাওয়া গেছে
      res.status(200).json({
        success: true, // কাজ সফল
        message: "User fetched successfully", // message
        data: result.rows[0], // user data
      });
    }
  } catch (err: any) {
    // ------------------------------
    // 4️⃣ Error handling
    // ------------------------------
    // query fail বা অন্য কোনো runtime error
    res.status(500).json({
      success: false, // কাজ ব্যর্থ
      message: err.message, // error message
    });
  }
});
