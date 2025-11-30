// ------------------------------
// 📌 PostgreSQL Pool Setup
// ------------------------------

// pg থেকে Pool ইমপোর্ট করি (Database connection manage করার জন্য)
import { Pool } from "pg";

// Pool হলো একটা Connection Manager
// এটা অনেকগুলো database connection ওপেন রাখে,
// এবং প্রতিটি query কে available connection দিয়ে execute করে।
const pool = new Pool({
  // .env ফাইল থেকে DB connection string নেওয়া হচ্ছে
  connectionString: `${process.env.CONNECTION_STR}`,
});

// ------------------------------
// 📌 Database Initialize Function
// ------------------------------
// এটি async কারণ এখানে আমরা query গুলো await দিয়ে চালাবো।
const initDB = async () => {
  // ---------------------------------------
  // 1️⃣ Users Table তৈরি
  // ---------------------------------------
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,             -- Auto-increment ID (1,2,3...) + Primary Key
      name VARCHAR(100) NOT NULL,        -- User name (সর্বোচ্চ 100 ক্যারেক্টার, ফাঁকা রাখা যাবে না)
      email VARCHAR(150) UNIQUE NOT NULL,-- Unique email (ডুপ্লিকেট হবে না, ফাঁকা হবে না)
      age INT,                           -- বয়স (সংখ্যা)
      phone VARCHAR(15),                 -- ফোন নম্বর
      address TEXT,                      -- বড় টেক্সট (Address)
      created_at TIMESTAMP DEFAULT NOW(),-- Row তৈরি হওয়ার সময় auto-set
      updated_at TIMESTAMP DEFAULT NOW() -- Row আপডেট হলে auto-set
    )
  `);

  // ---------------------------------------
  // 2️⃣ Todos Table তৈরি
  // ---------------------------------------
  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos(
      id SERIAL PRIMARY KEY,                     -- Auto-increment todo ID
      user_id INT REFERENCES users(id)           -- users টেবিলের id কে refer করছে (FK)
                ON DELETE CASCADE,               -- User delete হলে তার todos-ও delete হবে
      title VARCHAR(200) NOT NULL,               -- Todo title (ফাঁকা রাখা যাবে না)
      description TEXT,                          -- Todo details
      completed BOOLEAN DEFAULT false,           -- Default status = অসম্পূর্ণ
      due_date DATE,                             -- Date format (deadline)
      created_at TIMESTAMP DEFAULT NOW(),        -- তৈরি হওয়ার সময়
      updated_at TIMESTAMP DEFAULT NOW()         -- আপডেট হওয়ার সময়
    )
  `);
};

// ------------------------------
// 📌 রান করা: Database Initialize
// ------------------------------
// এই ফাংশন কল করলে উপরের দুইটা টেবিল তৈরি হয়ে যাবে (যদি আগে না থাকে)
initDB();
