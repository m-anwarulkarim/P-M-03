//1.__filename 2.__dirname 3.path.dirname(path) 4.path.basename(path) 5.path.extname(path) 6.path.basename(path, ext) 7.path.parse(path) 8.path.format(object)

/*
📘 Introduction to the Path Module (Node.js)
===========================================

Node.js এ ফাইলের path নিয়ে কাজ করার জন্য ব্যবহৃত হয় **path module**।
এটি দিয়ে আপনি directory, file name, extension, এবং full path—সবকিছু বিশ্লেষণ করতে পারবেন।
*/

const path = require("path");

/*
===========================================
1️⃣ Current File Info — __filename & __dirname
===========================================
__filename → বর্তমান ফাইলের full absolute path
__dirname  → বর্তমান ফাইল যে folder এ আছে তার path
*/

console.log("Current file Info:\n");
console.log("filename:", __filename); // Output উদাহরণ: /Users/anwarul/projects/pathExample.ts
console.log("Directory:", __dirname); // Output উদাহরণ: /Users/anwarul/projects

console.log("\n" + "-".repeat(50) + "\n");

/*
===========================================
2️⃣ Example Path String
===========================================
এখানে আমরা একটি উদাহরণ path ব্যবহার করছি:
*/

const filePath = "/shafayat/documents/nextLevel.pdf";
console.log("Analyzing Path:", filePath, "\n");

/*
===========================================
3️⃣ Directory Name — path.dirname()
===========================================
ফাইল কোন folder এর ভিতরে আছে, সেটাই দেয়
*/
console.log("Directory:", path.dirname(filePath));
// Output: /shafayat/documents

/*
===========================================
4️⃣ File Name — path.basename()
===========================================
full path থেকে শুধু file name (extension সহ) নেয়
*/
console.log("Base name:", path.basename(filePath));
// Output: nextLevel.pdf

/*
===========================================
5️⃣ File Extension — path.extname()
===========================================
শুধু extension দেয়
*/
console.log("File Extension:", path.extname(filePath));
// Output: .pdf

/*
===========================================
6️⃣ Extension ছাড়া File Name — basename(name, ext)
===========================================
extension বাদ দিয়ে file নাম দেয়
*/
console.log("File Name:", path.basename(filePath, path.extname(filePath)));
// Output: nextLevel

console.log("\n" + "-".repeat(50) + "\n");

/*
===========================================
7️⃣ Full Path কে Object এ ভাঙা — path.parse()
===========================================
parse() → path কে অংশভাগে ভাগ করে object রিটার্ন করে
*/
const parsed = path.parse(filePath);
console.log("Parsed path object:", parsed);

/* Output:
{
  root: '/',
  dir: '/shafayat/documents',
  base: 'nextLevel.pdf',
  ext: '.pdf',
  name: 'nextLevel'
}
*/

console.log("\n" + "-".repeat(50) + "\n");

/*
===========================================
8️⃣ Object থেকে Full Path বানানো — path.format()
===========================================
format() → parse() করা object থেকে আবার একটি valid path তৈরি করে
*/
console.log("Formatted path:", path.format(parsed));
// Output: /shafayat/documents/nextLevel.pdf

/*
===========================================
🎯 Summary
===========================================

নিচে সব শেখা method গুলো **এক লাইনে:

* `__filename` → বর্তমান ফাইলের full path।
* `__dirname` → বর্তমান ফাইলের folder path।
* `path.dirname(path)` → ফাইল কোন folder-এ আছে।
* `path.basename(path)` → file name (extensionসহ)।
* `path.extname(path)` → file extension।
* `path.basename(path, ext)` → extension ছাড়া file name।
* `path.parse(path)` → path কে object আকারে ভাঙে।
* `path.format(object)` → object থেকে full path বানায়।

*/
