/*
========================================================
Express-এর ভিতর মুলত ৩ ধরনের কাজ আমরা করি
========================================================
*/

/*
১. Route / Endpoint তৈরি করা
--------------------------------------------------------
- Client কোথায় request পাঠাবে সেটা ঠিক করা।
- উদাহরণ: GET /users বা DELETE /users/:id
*/

/*
২. Request handle করা (res) / Response পাঠানো
--------------------------------------------------------
- Route function-এ success এবং error দুইটাই handle করা।
- Success → data বা message পাঠানো
- Error → error message বা status পাঠানো
*/

/*
৩. Action বা Decision নেওয়া
--------------------------------------------------------
- ঠিক করা কী কাজ হবে:
  - Data GET করা
  - Data DELETE করা
  - Data INSERT / POST করা
  - Data UPDATE / PUT করা
*/

/*
========================================================
৩ ধাপের Express workflow
========================================================
*/

/* ১️⃣ Route তৈরি করা
--------------------------------------------------------
- প্রথমে route ঠিক করতে হবে।
- Route হলো URL path যেখানে client request পাঠাবে।
*/
app.get("/users", (req: Request, res: Response) => {
  // Step 2 ও 3 এখানে handle হবে
});

/* ২️⃣ Response (res) handle করা
--------------------------------------------------------
- Route function-এ response ঠিক করা হয়।
- এখানে success এবং error দুইটাই handle করা হয়।
*/
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      // যদি user না থাকে
      return res.status(404).json({ message: "User not found" });
    }

    // Success হলে data পাঠাও
    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    // Error handle
    res.status(500).json({ message: "Server error", error });
  }
});

/* 
নোট:
- res.status() → HTTP status code set করে
- res.json() → JSON response পাঠায়
- try-catch দিয়ে error handle করা হয়
*/

/* ৩️⃣ Action বা decision: GET / DELETE / UPDATE / INSERT
--------------------------------------------------------
- এখানে ঠিক করা হয় কী কাজ হবে
*/

const actionExamples = `
Action   | কী করবে?     | Example
---------|--------------|----------------------------
GET      | Data fetch   | SELECT * FROM users
DELETE   | Data delete  | DELETE FROM users WHERE id = $1
POST     | Data insert  | INSERT INTO users(name, age) VALUES($1,$2)
PUT      | Data update  | UPDATE users SET name=$1 WHERE id=$2
`;

/* Example DELETE route */
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted", deletedUser: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
