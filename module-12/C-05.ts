// ------------------------------
// 📌 POST /users Route
// ------------------------------

// "/users" এ POST request handle করা হচ্ছে
app.post("/users", async (req: Request, res: Response) => {
  // ক্লায়েন্ট থেকে name এবং email নিয়ে আসা
  const { name, email } = req.body;

  try {
    // ডাটাবেজে নতুন user insert করা
    const result = await pool.query(
      `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
      [name, email] // $1 = name, $2 = email
    );

    // সফল হলে response পাঠানো
    res.status(201).json({
      success: true, // কাজ সফল
      message: "Data Inserted Successfully", // success message
      data: result.rows[0], // Insert হওয়া নতুন user data
    });
  } catch (err: any) {
    // Error হলে response পাঠানো
    res.status(500).json({
      success: false, // কাজ ব্যর্থ
      message: err.message, // error message
    });
  }
});
