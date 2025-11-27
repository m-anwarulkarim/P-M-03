/* fs এটি node js এর built-in module
 fs দিয়ে আমরা করতে পা্রবো :

 file read
 file write
 file delete
 file rename
 folder create/remove
 file information check
 */

/*  

📘 ⁡⁣⁣⁢Reading Files with the fs Module⁡
===========================================

Node.js এ ফাইল পড়তে (read করতে) আমরা ব্যবহার করি fs (File System) মডিউল।
এই মডিউল দিয়ে যেকোনো ফাইল—TXT, JSON, HTML, ENV—সব পড়া যাবে।

🔥 fs Module Import (CommonJS)
-------------------------------------------
*/

const fs = require("fs");

/*
 ⁡⁣⁣⁢fs দিয়ে ফাইল পড়ার ৩টি জনপ্রিয় উপায় আছে:⁡ 

 ⁡⁢⁣⁡⁢⁣⁢আমদের class a এ শুধু ২ টা পড়িয়েছে ⁡
 
===========================================
✅ 1) ⁡⁣⁣⁢Synchronous file reading⁡ → fs.readFileSync()
===========================================

👉 এটি Blocking — মানে ফাইল না পড়া পর্যন্ত কোড থেমে থাকবে।
উদাহরণ:
*/

const dataSync = fs.readFileSync("text.txt", "utf-8");
console.log("📄 Sync Read:", dataSync);

/*
📝 ব্যাখ্যা:
"text.txt" → কোন ফাইল পড়বে
"utf-8" → Unicode string হিসেবে পড়বে
dataSync → পুরো ফাইলের কনটেন্ট
*/

/*
===========================================
✅ 2) ⁡⁣⁣⁢Asynchronous file reading ⁡→ fs.readFile()
===========================================

👉 এটি Non-blocking — অন্য কোড চলতে থাকে।
উদাহরণ:
*/

fs.readFile("text.txt", "utf-8", (err, dataAsync) => {
  if (err) {
    console.log("❌ Error reading file:", err);
    return;
  }
  console.log("📄 Async Read:", dataAsync);
});

/*
📝 ব্যাখ্যা:
err → কোনো ভুল থাকলে এখানে আসবে
dataAsync → ফাইল সঠিকভাবে পড়লে কনটেন্ট এখানে পাওয়া যাবে
*/

/*
===========================================
✅ 3) ⁡⁣⁣⁢Promise-based / async-await⁡ → fs.promises.readFile()
===========================================

👉 আধুনিক JavaScript এ সবচেয়ে clean ও বেশি ব্যবহৃত পদ্ধতি।
*/

const fsPromise = require("fs").promises;

async function readFile() {
  try {
    const data = await fsPromise.readFile("text.txt", "utf-8");
    console.log("📄 Promise Read:", data);
  } catch (error) {
    console.log("❌ Error:", error);
  }
}

readFile();

/*
===========================================
🎯 Summary — কী শিখলে?
===========================================

fs.readFileSync(path, encoding) → synchronousভাবে ফাইল পড়ে এবং string রিটার্ন করে।

fs.readFile(path, encoding, callback) → asynchronousভাবে ফাইল পড়ে (non-blocking)।

fs.promises.readFile(path, encoding) → Promise/async-await ব্যবহার করে modern ফাইল-রিডিং।

"utf-8" → ফাইলের কনটেন্ট string আকারে পড়তে ব্যবহৃত encoding।

(err, data) → callback ফাংশনে error ও ফাইলের data পাওয়া যায় (built-in convention)।

require("fs") → Node.js এর built-in fs module ইমপোর্ট করা।

fs.promises → fs মডিউলের promise-based function গুলোর collection।

async/await → asynchronous code cleanভাবে লেখার modern system।

try/catch → async কোডে error handle করার জন্য ব্যবহার হয়।

*/
