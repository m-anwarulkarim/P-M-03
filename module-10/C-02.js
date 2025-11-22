/*  
===========================================
📘 Writing & Appending Files with the fs Module
===========================================

Node.js এ fs মডিউল দিয়ে তুমি করতে পারো—
✔ ফাইল তৈরি (Write)
✔ ফাইলে নতুন লেখা যোগ (Append)
✔ পুরনো কনটেন্ট Replace
✔ Async / Sync দুইভাবে কাজ করা

*/

/*
===========================================
✍️ Part–1: Writing Files (ফাইল লেখা)
===========================================

Writing মানে—
👉 নতুন ফাইল তৈরি করা
👉 অথবা পুরনো ফাইলের কনটেন্ট পুরোপুরি Replace করা
*/

// 🔥 1) Synchronous Way — fs.writeFileSync()
// ------------------------------------------

const fs = require("fs");

fs.writeFileSync("note.txt", "This is a new file!");
console.log("File created and written successfully!");

/*
📌 ব্যাখ্যা:
- note.txt না থাকলে → নতুন ফাইল তৈরি হবে
- note.txt থাকলে → পুরনো লেখা মুছে নতুন লেখা বসবে
- এটি synchronous → Node.js এই লাইন পর্যন্ত থেমে থাকবে
*/

// 🔥 2) Asynchronous Way — fs.writeFile()
// ---------------------------------------

fs.writeFile("note.txt", "Hello from async write!", (err) => {
  if (err) {
    console.log("❌ Error:", err);
    return;
  }
  console.log("Async: File written!");
});

/*
📌 ব্যাখ্যা:
- callback ব্যবহার হয়
- ভুল হলে err এ আসে
- Non-blocking — অন্য কোড meantime চলতে থাকে
*/

// 🔥 3) Promise / async–await — fs.promises.writeFile()
// -----------------------------------------------------

const fsPromise = require("fs").promises;

async function writeFile() {
  try {
    await fsPromise.writeFile("note.txt", "Writing with promises!");
    console.log("Promise: File written!");
  } catch (error) {
    console.log("❌ Error:", error);
  }
}

writeFile();

/*
===========================================
➕ Part–2: Appending Files 
(পুরনো ফাইলের শেষে নতুন লেখা যোগ)
===========================================

Appending মানে—
👉 ফাইলের শেষে নতুন কনটেন্ট যোগ করা
👉 পুরনো কনটেন্ট মুছে যায় না
*/

// 🔥 1) Synchronous — fs.appendFileSync()
// ---------------------------------------

fs.appendFileSync("note.txt", "\nNew line added!");
console.log("Sync append complete!");

/*
📌 ব্যাখ্যা:
- "\n" মানে নতুন লাইন
- শেষে নতুন লেখা যোগ হবে
- note.txt না থাকলে → নতুন ফাইল তৈরি হবে
*/

// 🔥 2) Asynchronous — fs.appendFile()
// -----------------------------------

fs.appendFile("note.txt", "\nAsync line added!", (err) => {
  if (err) {
    console.log("❌ Error:", err);
    return;
  }
  console.log("Async append complete!");
});

// 🔥 3) Promise-based — fs.promises.appendFile()
// ----------------------------------------------

async function append() {
  try {
    await fsPromise.appendFile("note.txt", "\nPromise append!");
    console.log("Promise append done!");
  } catch (error) {
    console.log("❌ Error:", error);
  }
}

append();

/*
===========================================
🧠 Summary (সহজ সারাংশ)
===========================================

✔ নতুন লেখা দিতে চাইলে → 
   fs.writeFile, fs.writeFileSync, fs.promises.writeFile  
   → পুরনো কনটেন্ট Replace হবে

✔ পুরনো লেখার শেষে নতুন লেখা যোগ করতে চাইলে → 
   fs.appendFile, fs.appendFileSync, fs.promises.appendFile  
   → পুরনো লেখা থাকবে, শেষে যোগ হবে

✔ বাস্তব প্রজেক্টে সবচেয়ে Best → 
   Promise + async/await  
   (Clean ও Modern Approach)
*/
