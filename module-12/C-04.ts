// =====================================================
// 📌 Environment Variable Setup (dotenv + path)
// =====================================================

import dotenv from "dotenv"; // dotenv import করা
import path from "path"; // path module import করা

// .env ফাইল load করা
dotenv.config({ path: path.join(process.cwd(), ".env") });

/*


1️⃣ import dotenv from "dotenv";

dotenv হলো একটি npm প্যাকেজ।

কাজ: .env ফাইল থেকে environment variables পড়তে সাহায্য করে।
Environment variable = secret info / config, যেমন:

CONNECTION_STR=postgres://user:pass@localhost:5432/mydb
PORT=5000

Node.js এ ডাইরেক্টলি .env পড়ার কোনো বিল্ট-ইন সাপোর্ট নেই → এজন্য dotenv ব্যবহার করি。


2️⃣ import path from "path";

path হলো Node.js built-in module।

কাজ: ফাইল/ফোল্ডারের পথ ঠিকঠাক handle করা (cross-platform)

যেমন Windows & Linux এ path আলাদা → path.join এটা ঠিক করে দেয়।

3️⃣ dotenv.config({ path: path.join(process.cwd(), ".env") });

dotenv.config() → .env ফাইল load করে process.env এ।

{ path: path.join(process.cwd(), ".env") } অংশের মানে:

- process.cwd() → project root directory
- .env → env ফাইলের নাম
- path.join → দুইটা যোগ করে পুরো path তৈরি করে

ফলাফল:
.env ফাইলের ভেতরের সব variable Node.js এ process.env.VARIABLE_NAME হিসেবে পাওয়া যাবে।

🔹 উদাহরণ:

.env ফাইল:

CONNECTION_STR=postgres://user:pass@localhost:5432/mydb
PORT=5000

Node.js ফাইলে ব্যবহার:

console.log(process.env.CONNECTION_STR); // postgres://user:pass@localhost:5432/mydb
console.log(process.env.PORT);           // 5000

🔹 সংক্ষেপে:

- dotenv → .env থেকে secret/config load করে
- path → .env ফাইলের ঠিক জায়গা ঠিক করে দেয়
- config → environment variables process.env এ যোগ করে

*/

// =====================================================
// 📌 Actual TypeScript Code
// =====================================================
