/* 
===========================================
 Node.js Built-in Core Modules: fs & path
===========================================

------------------------------------------------
1️. const fs = require("fs");
------------------------------------------------
fs = File System module
- Node.js এর সাথে default আসে
- আলাদা install করতে হয় না
- require("fs") দিয়ে ব্যবহার করা হয়

==> fs দিয়ে কী করা যায়?
মূলত ফাইল ও ফোল্ডার নিয়ে কাজ করার জন্য।

| কাজ                  | উদাহরণ / function                                      |
|----------------------|--------------------------------------------------------|
| ফাইল পড়া            | fs.readFileSync("file.txt", "utf-8") <br> fs.readFile("file.txt", "utf-8", callback) |
| ফাইল লেখা            | fs.writeFileSync("file.txt", "Hello") <br> fs.writeFile("file.txt", "Hello", callback) |
| ফাইল মুছে ফেলা      | fs.unlinkSync("file.txt")                              |
| ফোল্ডার তৈরি         | fs.mkdirSync("folder")                                  |
| ফোল্ডার মুছে ফেলা   | fs.rmdirSync("folder")                                  |
| ফাইলের info / stats  | fs.statSync("file.txt")                                 |
| ফাইল copy করা        | fs.copyFileSync("src.txt", "dest.txt")                 |

==>: Sync vs Async
- Sync → Blocking, কোড থেমে থাকে
- Async → Non-blocking, callback বা Promise ব্যবহার করা হয়

উদাহরণ:

// Sync
const data = fs.readFileSync("text.txt", "utf-8");

// Async
fs.readFile("text.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

------------------------------------------------
2️. const path = require("path");
------------------------------------------------
path = File & Directory Path Module
- Node.js এর সাথে default আসে
- আলাদা install করতে হয় না
- require("path") দিয়ে ব্যবহার করা হয়

==> path দিয়ে কী করা যায়?
মূলত ফাইল এবং ফোল্ডারের path handle করার জন্য।

| কাজ                     | Function / Example |
|-------------------------|------------------|
| Directory বের করা        | path.dirname("/home/user/file.txt") → /home/user |
| Filename বের করা         | path.basename("/home/user/file.txt") → file.txt |
| Extension বের করা        | path.extname("file.txt") → .txt |
| Extension ছাড়া Filename | path.basename("file.txt", path.extname("file.txt")) → file |
| Path join করা           | path.join("/home", "user", "file.txt") → /home/user/file.txt |
| Path parse করা          | path.parse("/home/user/file.txt") → { root, dir, base, ext, name } |
| Object → Path বানানো    | path.format({dir:"/home/user", base:"file.txt"}) → /home/user/file.txt |

==> কেন দরকার?
- Windows → `\`  
- Linux / Mac → `/`  
- Cross-platform compatibility এর জন্য path module ব্যবহার করা হয়।
*/
