// 1.crypto module
// 2.aes-256-cbc
// 3.key = crypto.randomBytes(32)
// 4. iv = crypto.randomBytes(16);
// 5.crypto.createCipheriv()
// 6.cipher.update()
// 7.cipher.final()
// 8.crypto.createDecipheriv()
// 9.decipher.update()
// 10.decipher.final()
//11.crypto.randomBytes(32/16 or 256/128 bits )

// ✅ ১) crypto module নিয়ে
// crypto = Node.js এর built-in টুল, যেটা দিয়ে আমরা data নিরাপদ করতে পারি
const crypto = require("crypto");

// ✅ ২) কোন ধরনের encryption ব্যবহার করবো
// "aes-256-cbc" = একটি খুব নিরাপদ encryption system
// 256-bit key ব্যবহার করে
const algorithm = "aes-256-cbc";

// ✅ ৩) encryption key তৈরি করছি
// key = আমাদের গোপন চাবি 🔑
// এই key ছাড়া decrypt করা যাবে না
const key = crypto.randomBytes(32); // 32 bytes = 256 bits

// ✅ ৪) IV তৈরি করছি
// IV = Initialization Vector
// এটা extra randomness বা extra নিরাপত্তা যোগ করে (লবণের মতো)
// যেন একই data encrypt করলেও output একই না হয়
const iv = crypto.randomBytes(16); // 16 bytes = 128 bits

// ✅ ৫) Encrypt Function
// কাজ: normal text → লুকানো/encrypted text বানানো
function encrypt(text) {
  // ✅ encryption শুরু করার জন্য cipher তৈরি বা cipher মেশিন তৈরি 🔐 যা text কে encrypted text বানায় 💥
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  // ✅ text কে encrypt করছি
  // "utf-8" → আমাদের লেখা যেমন থাকে (normal readable text) ঃ Hello
  // "hex" → encrypt হওয়ার পর যেভাবে দেখাবে (random কোডের মতো) 5f7a3c2b9d...
  let encrypted = cipher.update(text, "utf-8", "hex");

  // ✅ encryption শেষ করা
  encrypted += cipher.final("hex");

  // ✅ encrypted text return করছি
  // সাথে IV ও পাঠাচ্ছি, কারণ decrypt করার সময় দরকার হবে
  return {
    iv: iv.toString("hex"), // IV কে readable hex format এ পাঠাচ্ছি
    encryptedData: encrypted, // এটা হলো গুলানো/encrypted text
  };
}

// ✅ ৬) Decrypt Function
// কাজ: encrypted data → আবার normal text বানানো
function decrypt(encryptedData, ivHex) {
  // ✅ decrypt process শুরু করার জন্য decipher তৈরি
  // Buffer.from() = IV কে hex থেকে normal binary এ নেয়
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(ivHex, "hex")
  );

  // ✅ encrypted data decrypt করা
  let decrypted = decipher.update(encryptedData, "hex", "utf-8");

  // ✅ decrypt শেষ করা
  // আর আমরা চাই update() + final() মিলিয়ে একসাথে complete decrypted text পাই
  decrypted += decipher.final("utf-8");

  // ✅ original text ফেরত দেওয়া
  return decrypted;
}

// ✅ ৭) এখন test করি সব ঠিকমতো কাজ করছে কিনা
console.log("Encrypted Data : ");

// ✅ যে data আমরা লুকাতে চাই
const sensitiveData = "My credit card: 4242 4242 4242 4242";
console.log("original data : ", sensitiveData);

// ✅ encryption call
const encrypted = encrypt(sensitiveData);
console.log("Encrypted : ", encrypted);

// ✅ decryption call
console.log("Decrypted data : ");
const decrypted = decrypt(encrypted.encryptedData, encrypted.iv);
console.log("Decrypted : ", decrypted);

// ✅ original data এবং decrypted data একই কিনা চেক করি
console.log("match : ", sensitiveData === decrypted);

/*!SECTION
crypto module → Node.js built-in module, data নিরাপদ করার জন্য।

aes-256-cbc → secure encryption algorithm, 256-bit key ব্যবহার করে।

key → গোপন চাবি, যেটা ছাড়া decrypt সম্ভব নয়।

iv (Initialization Vector) → extra randomness, একই data encrypt করলে output ভিন্ন হয়।

crypto.createCipheriv() → encryption শুরু করার জন্য cipher তৈরি করে।

cipher.update(text, "utf-8", "hex") → text কে encrypted hex string এ রূপান্তর করে।

cipher.final("hex") → encryption শেষ করে।

crypto.createDecipheriv() → encrypted data decrypt করার জন্য decipher তৈরি করে।

decipher.update(encryptedData, "hex", "utf-8") → decrypt process শুরু।

decipher.final("utf-8") → decrypt শেষ করে।

encrypt() → normal text → encrypted text + IV তৈরি করে।

decrypt() → encrypted text + IV → original text পুনরুদ্ধার করে।

original data vs decrypted data → match check করা শেখানো হয়েছে।
*/
