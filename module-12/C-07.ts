// =====================================================
// 📌 PUT /users/:id - নির্দিষ্ট user update করা
// =====================================================

import { Request, Response } from "express";
import { pool } from "./db"; // ধরে নিই pool আগেই define করা হয়েছে

/*
Route এর কাজ:

1️⃣ URL এর :id অংশ থেকে userId নেওয়া (/users/5 → req.params.id = "5")  
2️⃣ Request body থেকে নতুন name ও email নেওয়া  
3️⃣ Database query চালানো → parameterized query ব্যবহার করে SQL injection থেকে রক্ষা  
4️⃣ যদি row না পাওয়া যায় → 404 response  
5️⃣ যদি row পাওয়া যায় → 200 response + আপডেট হওয়া user data  
6️⃣ কোনো runtime বা query error হলে → 500 response
*/

app.put("/users/:id", async (req: Request, res: Response) => {
  // ------------------------------
  // 1️⃣ Request থেকে parameter ও body নেওয়া
  // ------------------------------
  const userId = req.params.id; // URL থেকে :id
  const { name, email } = req.body; // Body থেকে নতুন data

  try {
    // ------------------------------
    // 2️⃣ Database query - update user
    // ------------------------------
    // $1, $2, $3 = parameterized placeholders → SQL injection থেকে রক্ষা
    const result = await pool.query(
      `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
      [name, email, userId]
    );

    // ------------------------------
    // 3️⃣ Check if user exists
    // ------------------------------
    if (result.rows.length === 0) {
      // row পাওয়া যায়নি → user নেই
      res.status(404).json({
        success: false, // কাজ ব্যর্থ
        message: "User not found", // message
      });
    } else {
      // row পাওয়া গেছে → response পাঠানো
      res.status(200).json({
        success: true, // কাজ সফল
        message: "User updated successfully", // message
        data: result.rows[0], // আপডেট হওয়া row
      });
    }
  } catch (err: any) {
    // ------------------------------
    // 4️⃣ Error handling
    // ------------------------------
    res.status(500).json({
      success: false, // কাজ ব্যর্থ
      message: err.message, // error message
    });
  }
});

/*

⁡⁣⁣⁢🔹 বোঝার জন্য হাইলাইটস⁡

req.params.id → URL থেকে user ID নেওয়া

req.body → PUT request body থেকে নতুন data নেওয়া

pool.query() → PostgreSQL এ SQL command execute করা

$1, $2, $3 → parameterized query → SQL injection safe

result.rows → database থেকে আসা row array

result.rows.length === 0 → row না থাকলে 404

result.rows[0] → প্রথম row object, যেটা response পাঠানো হয় 
*/
