// 1.dirname() 2.basename() 3.extname() 4.basename(name, ext) 5.parse() 6.format()

/*


📘 ⁡⁣⁣⁢Introduction to the Path Module (Node.js)⁡
===========================================

Node.js এ ফাইলের path নিয়ে কাজ করার জন্য ব্যবহৃত হয় **path module**।
এটি দিয়ে আপনি directory, file name, extension, এবং full path—সবকিছু বিশ্লেষণ করতে পারবেন।

🔥 Path Module Import (CommonJS)
-------------------------------------------
*/

const path = require("path");

/*
===========================================
✅ 1) ⁡⁣⁣⁢Current File Info জানা — __filename & __dirname⁡
===========================================
__filename → বর্তমান ফাইলের **full absolute path**
__dirname → বর্তমান ফাইল **যে folder এ আছে** সেই path
*/

console.log("Current file Info:\n");
console.log("filename:", __filename);
console.log("Directory:", __dirname);

// Divider Line (Output আলাদা দেখানোর জন্য)
console.log("\n" + "-".repeat(50) + "\n");

/*
===========================================
✅ 2) ⁡⁣⁣⁢Path String ঘোষণা⁡
===========================================
এখানে আমরা একটি উদাহরণ path ব্যবহার করছি যার উপর বিভিন্ন অপারেশন করব।
*/

const filePath = "/shafayat/documents/nextLevel.pdf";

console.log("Analyzing Path:", filePath, "\n");

/*
===========================================
✅ 3) ⁡⁣⁣⁢Directory Name বের করা — path.dirname()⁡
===========================================
*/

console.log("Directory:", path.dirname(filePath));

/*
===========================================
✅ 4) ⁡⁣⁣⁢File Name বের করা — path.basename()⁡
===========================================
basename() → full path থেকে শুধু file name (extension সহ)
*/

console.log("Base name:", path.basename(filePath));

/*
===========================================
✅ 5) ⁡⁣⁣⁢File Extension বের করা — path.extname()⁡
===========================================
extname() → শুধু extension ফেরত দেয়
*/

console.log("File Extension:", path.extname(filePath));

/*
===========================================
✅ 6) ⁡⁣⁣⁢Extension ছাড়া File Name — basename(name, ext)⁡
===========================================
*/

console.log("File Name:", path.basename(filePath, path.extname(filePath)));

// Divider Line
console.log("\n" + "-".repeat(50) + "\n");

/*
===========================================
✅ 7) ⁡⁣⁣⁢Full Path কে Object এ ভাঙা — path.parse()⁡
===========================================
parse() → path কে অংশভাগে ভাগ করে object রিটার্ন করে।
*/

const parsed = path.parse(filePath);
console.log("Parsed path object:", parsed);

// Divider Line
console.log("\n" + "-".repeat(50) + "\n");

/*
===========================================
✅ 8) ⁡⁣⁣⁢Object থেকে Full Path বানানো — path.format()⁡
===========================================
format() → parse() করা object থেকে আবার একটি valid path তৈরি করে।
*/

console.log("Formatted path:", path.format(parsed));

/*
===========================================
🎯 Summary — কী শিখলাম?
===========================================

✔ `dirname()` → directory path দেয়  
✔ `basename()` → file name (extensionসহ) দেয়  
✔ `extname()` → শুধু extension দেয়  
✔ `basename(name, ext)` → extension বাদ দিয়ে file নাম দেয়  
✔ `parse()` → path কে object আকারে ভেঙে দেয়  
✔ `format()` → object → আবার full path বানায়

*/
