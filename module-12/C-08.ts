// =====================================================
// 📌 DELETE /users/:id - নির্দিষ্ট user মুছে ফেলা
// =====================================================

import { Request, Response } from "express";
import { pool } from "./db";

/*
🧠 row vs rowCount — কেন DELETE এ rowCount ব্যবহার করা হয়?

🔸 SELECT query → result.rows ব্যবহার করা হয়  
    কারণ database থেকে data ফেরত আসে (array of objects)

🔸 UPDATE/DELETE query → সাধারণত কোনো ডাটা ফেরত আসে না  
    pg client তখন rows খালি array দেয়: result.rows = []

🔸 কিন্তু UPDATE/DELETE এ আসল দরকার →
    ❗ কয়টা row পরিবর্তন হলো বা মুছে গেল?

সেই সংখ্যা থাকে:
👉 result.rowCount

উদাহরণ:
DELETE FROM users WHERE id = 10

- যদি user থাকে → rowCount = 1
- যদি user না থাকে → rowCount = 0

সুতরাং DELETE route-এ:
✔ result.rows → খালি থাকে → কাজে আসে না  
✔ result.rowCount → user আছে/নেই সেটা জানায়
*/

app.delete("/users/:id", async (req: Request, res: Response) => {
  // ------------------------------
  // 1️⃣ URL parameter থেকে id নেওয়া
  // ------------------------------
  const userId = req.params.id;

  try {
    // ------------------------------
    // 2️⃣ Database query - delete user
    // ------------------------------
    // $1 = parameterized query → নিরাপদ
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [
      userId,
    ]);

    // ------------------------------
    // 3️⃣ Check if the user existed
    // ------------------------------

    // ❗ DELETE এর ক্ষেত্রে rowCount-ই গুরুত্বপূর্ণ
    if (result.rowCount === 0) {
      // user পাওয়া যায়নি
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      // user delete হয়েছে
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        // rows সাধারণত খালি → শুধু structure ধরে রাখার জন্য দেওয়া
        data: result.rows,
      });
    }
  } catch (err: any) {
    // ------------------------------
    // 4️⃣ Error handling
    // ------------------------------
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
