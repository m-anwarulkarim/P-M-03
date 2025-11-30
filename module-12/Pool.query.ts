// =====================================================
// 📌 pool.query() কি এবং কী কাজ করে
// =====================================================

/*

1️⃣ Query কি?

- "query" শব্দটি মূলত SQL command চালানোর জন্য তৈরি হয়েছে।
- এটি একটি function/method যা database এ কমান্ড execute করে।
- উদাহরণ:
    pool.query("SELECT * FROM users")
    এখানে "SELECT * FROM users" হলো SQL command
    আর query() হলো সেই command চালানোর method।

2️⃣ pool.query() কি করে?

- SQL command execute করে।
- SQL command ছাড়া অন্য কোনো কাজ নিজে করতে পারে না।
- pool.query() দিয়ে সব ধরনের SQL command চালানো যায়:
    • Data read: SELECT
    • Data write: INSERT, UPDATE, DELETE
    • Table management: CREATE, ALTER, DROP, TRUNCATE
    • Transactions, Index, Constraints, JOIN ইত্যাদি

3️⃣ pool.query() দিয়ে অন্য কাজ করা যায় কি?

- সরাসরি না। এটা শুধুমাত্র database operations এর জন্য।
- অন্য কাজ যেমন ফাইল পড়া, calculation, API call – Node.js/TypeScript code দিয়ে আলাদা handle করতে হবে।
- অর্থাৎ pool.query() = database কমান্ড execute করার tool

*/

// =====================================================
// 📌 PostgreSQL connection
// =====================================================
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.CONNECTION_STR,
});

// =====================================================
// 1️⃣ SELECT – ডাটা পড়া
// =====================================================
pool.query("SELECT * FROM users");
// Database থেকে ডাটা fetch করতে ব্যবহার হয়।
// WHERE, ORDER BY, LIMIT, GROUP BY ব্যবহার করে filter বা sort করা যায়।

// =====================================================
// 2️⃣ INSERT – নতুন ডাটা যোগ করা
// =====================================================
pool.query("INSERT INTO users(name,email) VALUES($1,$2) RETURNING *", [
  "Anwar",
  "a@gmail.com",
]);
// নতুন row তৈরি করা হয়।
// RETURNING * → নতুন row ফেরত দেয়।

// =====================================================
// 3️⃣ UPDATE – ডাটা পরিবর্তন করা
// =====================================================
pool.query("UPDATE users SET name=$1 WHERE id=$2 RETURNING *", ["Karim", 5]);
// existing row update করতে ব্যবহার হয়।
// RETURNING * → আপডেট হওয়া row দেখায়।

// =====================================================
// 4️⃣ DELETE – ডাটা মুছে ফেলা
// =====================================================
pool.query("DELETE FROM users WHERE id=$1", [7]);
// নির্দিষ্ট row মুছে ফেলা।
// সতর্ক থাকতে হবে, কারণ ডিলিট হলে data হারাবে।

// =====================================================
// 5️⃣ CREATE TABLE – নতুন table তৈরি
// =====================================================
pool.query(`
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
  )
`);
// নতুন table তৈরি করা হয়।
// IF NOT EXISTS → table আগে থেকেই থাকলে error দেয় না।

// =====================================================
// 6️⃣ ALTER TABLE – table পরিবর্তন
// =====================================================
pool.query("ALTER TABLE users ADD COLUMN age INT");
// table structure পরিবর্তন করা যায়।
// Column add, drop বা modify করা সম্ভব।

// =====================================================
// 7️⃣ DROP TABLE – table মুছে ফেলা
// =====================================================
pool.query("DROP TABLE users");
// সম্পূর্ণ table remove করে।
// সতর্ক থাকতে হবে, সব ডাটা হারাবে।

// =====================================================
// 8️⃣ TRUNCATE TABLE – table খালি করা
// =====================================================
pool.query("TRUNCATE TABLE users");
// table থেকে সব row মুছে দেয়।
// table structure থাকে।

// =====================================================
// 9️⃣ JOIN – একাধিক table থেকে ডাটা একত্র করা
// =====================================================
pool.query(`
  SELECT users.name, todos.title
  FROM users
  JOIN todos ON users.id = todos.user_id
`);
// একাধিক table কে link করে ডাটা আনা।
// INNER JOIN, LEFT JOIN, RIGHT JOIN সব ব্যবহার করা যায়।

// =====================================================
// 🔟 TRANSACTION – একসাথে multiple query safeভাবে চালানো
// =====================================================
async function runTransaction() {
  try {
    await pool.query("BEGIN"); // transaction start
    await pool.query("INSERT INTO users(name) VALUES('Anwar')");
    await pool.query("INSERT INTO todos(title) VALUES('Task')");
    await pool.query("COMMIT"); // transaction complete
  } catch (err) {
    await pool.query("ROLLBACK"); // error হলে সব revert
    console.error("Transaction failed:", err);
  }
}
// একাধিক query একসাথে চালানো।
// কোনো error হলে ROLLBACK করা যায়।

// =====================================================
// 1️⃣1️⃣ CONSTRAINTS & INDEX – database structure ও performance control
// =====================================================
pool.query("CREATE UNIQUE INDEX idx_email ON users(email)");
pool.query("ALTER TABLE users ADD CONSTRAINT chk_age CHECK(age > 0)");
// UNIQUE, CHECK, PRIMARY KEY, FOREIGN KEY constraint enforce করা হয়।
// Index দিয়ে query fast করা যায়।

// =====================================================
// 1️⃣2️⃣ DROP / RENAME / TRUNCATE DATABASE OBJECTS
// =====================================================
pool.query("DROP INDEX idx_email");
pool.query("ALTER TABLE users RENAME TO members");
// Index, table বা column rename/drop করা যায়।

// =====================================================
// 🔹 সংক্ষেপে
// =====================================================
// pool.query() দিয়ে PostgreSQL এর সব ধরনের SQL command চালানো সম্ভব:
// - Data Manipulation (SELECT, INSERT, UPDATE, DELETE)
// - Table Management (CREATE, ALTER, DROP, TRUNCATE)
// - Relationship & Constraints
// - Transactions
// - Index & Performance Commands
// - JOIN / Query Optimization
