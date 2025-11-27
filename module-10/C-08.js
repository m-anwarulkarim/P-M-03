//  1. Hash 2. "md5" 3. "sha256" 4. "sha512" 5. crypto.createHash("md5") 6. update(password) 7.digest("hex")

// ======================================================
// কিছু বিষয়ের ব্যাখ্যা:
//
// 1️⃣ Hash মানে কি?
//    - Password বা text কে random code এ পরিবর্তন করা
//    - একবার hash করলে original password আর পাওয়া যাবে না
//
// 2️⃣ MD5
//    - পুরনো, দ্রুত
//    - নিরাপদ নয়, সহজে হ্যাক করা যায়
//
// 3️⃣ SHA-256
//    - আধুনিক এবং নিরাপদ
//    - অনেক ওয়েবসাইট ও apps ব্যবহার করে
//
// 4️⃣ SHA-512
//    - SHA-256 এর চেয়ে বড় এবং শক্তিশালী
//    - high-security কাজে ব্যবহার
//
// 5️⃣ digest("hex")
//    - Hash কে hexadecimal string এ রূপান্তর করে
//    - print বা store করা সহজ
//
// 6️⃣ update(password)
//    - কোন password বা message hash করতে হবে তা নির্ধারণ
// =======================================================
// 🔐 Node.js crypto module ব্যবহার করে password hash করা
// =======================================================
const crypto = require("crypto");

// আমাদের password:
const password = "password123"; // এই password কে hash করা হবে
// একবার hash করলে original password আর পাওয়া যাবে না

console.log("\n================ MD5 HASH =================");

// ================= MD5 HASH =================
// ✅ পুরনো এবং দ্রুত hash algorithm
// ❌ এখন নিরাপদ নয় (security purpose এর জন্য weak)
const md5Hash = crypto.createHash("md5").update(password).digest("hex");

// একই password আরেকবার hash করা
const md5Hash2 = crypto.createHash("md5").update(password).digest("hex");

console.log("Input password: ", password);
console.log("MD5 Hashed Password: ", md5Hash);
console.log("MD5 Hashed Password (again): ", md5Hash2);

console.log("\n================ SHA-256 HASH =================");

// ================= SHA-256 HASH =================
// ✅ আধুনিক এবং নিরাপদ
// Hash size = 256 bits (64 hex characters)
const sha256Hash = crypto.createHash("sha256").update(password).digest("hex");

console.log("Input password: ", password);
console.log("SHA-256 Hashed Password: ", sha256Hash);

console.log("\n================ SHA-512 HASH =================");

// ================= SHA-512 HASH =================
// ✅ SHA-512 আরও শক্তিশালী
// Hash size = 512 bits (128 hex characters)
const sha512Hash = crypto.createHash("sha512").update(password).digest("hex");

console.log("Input password: ", password);
console.log("SHA-512 Hashed Password: ", sha512Hash);

console.log("\n================ Example Calculation =================");

// ছোট calculation উদাহরণ
// 2 ** 32 / 10^9 = কত Giga operations হয়
console.log(2 ** 32 / 10 ** 9); // 4.294967296 → ~4.3

//
// 💡 Extra Tip:
//    - কখনো password plain text database এ রাখবেন না
//    - সবসময় SHA-256 বা SHA-512 + salt ব্যবহার করুন

/*
✅ এই অংশে নতুন যেগুলো শেখানো হয়েছে:

Hash → কোনো password/text কে স্থায়ীভাবে random কোডে রূপান্তর করা।
md5 → পুরনো ও দ্রুত hashing algorithm; নিরাপদ নয়।
sha256 → আধুনিক, নিরাপদ hashing algorithm (256-bit)।
sha512 → sha256 থেকে আরও শক্তিশালী hashing (512-bit)।
crypto.createHash() → কোন hashing algorithm ব্যবহার হবে তা নির্ধারণ করে।
update(password) → কোন data/password কে hash করবে তা সেট করে।
digest("hex") → hash result কে readable hexadecimal string আকারে দেয়।
md5Hash vs md5Hash2 → একই input দিলে hash সবসময় একই হবে, এটা শেখানো হয়েছে।
2 ** 32 / 10 ** 9 → simple calculation দেখানো হয়েছে hash-এর গতি বোঝাতে।
Extra tip → password কখনো plain text-এ রাখা যাবে না; SHA + salt ব্যবহার করতে হবে।
*/
