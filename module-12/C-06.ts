// =====================================================
// 📌 Users Routes - GET
// =====================================================

import { Request, Response } from "express";
import { pool } from "./db"; // ধরছি pool আগেই define করা হয়েছে

// =====================================================
// 1️⃣ GET /users - সব users fetch করা
// =====================================================
app.get("/users", async (req: Request, res: Response) => {
  try {
    // ------------------------------
    // ডাটাবেজ থেকে সব users select করা
    // ------------------------------
    const result = await pool.query("SELECT * FROM users");

    // ------------------------------
    // Response পাঠানো
    // ------------------------------
    res.status(200).json({
      success: true, // কাজ সফল
      message: "Users retrieved successfully", // success message
      data: result.rows, // সব users array আকারে পাঠানো
    });
  } catch (err: any) {
    // ------------------------------
    // Error Handling
    // ------------------------------
    res.status(500).json({
      success: false, // কাজ ব্যর্থ
      message: err.message, // error message
      details: err, // সম্পূর্ণ error object (ডিবাগের জন্য)
    });
  }
});

// =====================================================
// 2️⃣ GET /users/:id - নির্দিষ্ট user fetch করা
// =====================================================

/*
Route এর কাজ:

1️⃣ URL এর :id অংশ থেকে userId নেওয়া (/users/5 → req.params.id = "5")  
2️⃣ Database query চালানো → parameterized query ব্যবহার করে SQL injection থেকে রক্ষা  
3️⃣ যদি row না পাওয়া যায় → 404 response  
4️⃣ যদি row পাওয়া যায় → 200 response + user data  
5️⃣ কোনো runtime বা query error হলে → 500 response
*/

app.get("/users/:id", async (req: Request, res: Response) => {
  // ------------------------------
  // 1️⃣ Request থেকে parameter নেওয়া
  // ------------------------------
  const userId = req.params.id;

  try {
    // ------------------------------
    // 2️⃣ Database query
    // ------------------------------
    // $1 = parameterized query placeholder
    // parameter injection attack থেকে রক্ষা করে
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    // ------------------------------
    // 3️⃣ Check if user exists
    // ------------------------------
    if (result.rows.length === 0) {
      // ------------------------------
      // row পাওয়া যায়নি
      // result.rows কোথা থেকে আসে?
      // ------------------------------
      // pool.query() থেকে পাওয়া object এর rows property
      // PostgreSQL database query execute করে যেটা return করে তাকে pg library array of objects হিসেবে রাখে
      // প্রতিটি object = table row (column: value)
      res.status(404).json({
        success: false, // কাজ ব্যর্থ
        message: "User not found", // message
      });
    } else {
      // ------------------------------
      // row পাওয়া গেছে → response
      // ------------------------------
      res.status(200).json({
        success: true, // কাজ সফল
        message: "User fetched successfully", // message
        data: result.rows[0], // প্রথম row object
      });
    }
  } catch (err: any) {
    // ------------------------------
    // 4️⃣ Error handling
    // ------------------------------
    // query fail বা অন্য runtime error
    res.status(500).json({
      success: false, // কাজ ব্যর্থ
      message: err.message, // error message
    });
  }
});
