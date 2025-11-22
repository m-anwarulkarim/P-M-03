// 1.Static & Dynamic Website 2.Templates Engines 3.API 4.JavaScript Invent 5.JavaScript Engine Workflow

// ===============================
// 1. Static Website (স্ট্যাটিক ওয়েবসাইট)
// ===============================

/*
কাকে বলে:
স্ট্যাটিক ওয়েবসাইট হল এমন ওয়েবসাইট যেখানে প্রতিটি পেজের কন্টেন্ট ফিক্সড থাকে।
ইউজার কী সার্ভারে রিকোয়েস্ট পাঠায় না কেন, সার্ভার একই HTML/CSS/JS ফাইল পাঠাবে।

বৈশিষ্ট্য:
- কন্টেন্ট বদলায় না।
- সাধারণত HTML + CSS দিয়ে বানানো হয়।
- সার্ভার থেকে সরাসরি ফাইল সার্ভ করা হয়।
- ব্যাকএন্ড লজিক বা ডাটাবেস লাগে না।

উদাহরণ:
- পার্সোনাল পোর্টফোলিও ওয়েবসাইট
- ছোট বিজনেস ওয়েবসাইট
- Company info pages
*/

// ===============================
// 2. Dynamic Website (ডাইনামিক ওয়েবসাইট)
// ===============================

/*
কাকে বলে:
ডাইনামিক ওয়েবসাইট হল এমন ওয়েবসাইট যেখানে পেজের কন্টেন্ট ইউজারের রিকোয়েস্ট বা ডাটাবেসের তথ্য অনুযায়ী পরিবর্তিত হয়।

বৈশিষ্ট্য:
- ডাটাবেসের উপর ভিত্তি করে কন্টেন্ট পরিবর্তিত হয়।
- ব্যাকএন্ড লজিক (PHP, Node.js, Python ইত্যাদি) থাকে।
- ইউজারের ইন্টারঅ্যাকশন অনুযায়ী পেজ রেন্ডার হয়।

উদাহরণ:
- Facebook, Gmail
- ই-কমার্স ওয়েবসাইট (Amazon, Daraz)
- নিউজ পোর্টাল
*/

// ======= Templates Engines =======

// 1️⃣ EJS (Embedded JavaScript Templates)
/*
কাকে বলে:
EJS হলো একটি Template Engine যা HTML এর মধ্যে সরাসরি JavaScript কোড এমবেড করতে দেয়।
ইউজারের ডাটা নিয়ে HTML তৈরি করতে ব্যবহার হয়.
*/

// 2️⃣ HBS (Handlebars.js)
/*
কাকে বলে:
HBS হলো Handlebars.js এর Express ভার্সন।
এটি Template Engine যা HTML এর মধ্যে “Handlebars syntax” ব্যবহার করে ডাইনামিক কন্টেন্ট রেন্ডার করে।
*/

// 3️⃣ Pug (আগে Jade)
/*
কাকে বলে:
Pug হলো Node.js এর জন্য একটি Template Engine যা ইনডেন্টেশন (indentation) নির্ভর সিনট্যাক্স ব্যবহার করে HTML তৈরি করে
*/

// ======= API =======

/*
API = Application Programming Interface
এটি হলো দুই সফটওয়্যার বা অ্যাপ্লিকেশনকে একে অপরের সঙ্গে কথা বলার নিয়ম।
সংক্ষেপে, API হলো মধ্যস্থ মাধ্যম যা ডেটা বা ফাংশনালিটি শেয়ার করতে দেয়।

সুবিধা:
1️⃣ একই ব্যাকএন্ড(server) দিয়ে সব প্ল্যাটফর্ম ব্যবহার করা যায় | মোবাইল, ওয়েব বা ডেস্কটপ অ্যাপ একই API ব্যবহার করে। ফলে আলাদা লজিক লিখতে হয় না।

2️⃣ ডেটা শেয়ার করা সহজ | সার্ভার থেকে ডেটা ক্লায়েন্ট বা অন্য অ্যাপ্লিকেশন ব্যবহার করতে পারে।
   উদাহরণ: ফেসবুক API দিয়ে অন্য ওয়েবসাইটে পোস্ট দেখানো।

3️⃣ ফাংশনালিটি ব্যবহার সহজ | অন্যের তৈরি ফিচার বা সিস্টেম ব্যবহার করা যায়।
   উদাহরণ: Payment Gateway API (Bkash, Stripe) দিয়ে পেমেন্ট ইন্টিগ্রেশন।

4️⃣ ডাইনামিক অ্যাপ্লিকেশন তৈরি করা যায় | API এর মাধ্যমে ক্লায়েন্ট সার্ভার থেকে নতুন ডেটা নিয়ে UI আপডেট করতে পারে।
   উদাহরণ: নিউজ অ্যাপ বা ই-কমার্স ওয়েবসাইটে প্রোডাক্ট লিস্ট।

5️⃣ বিভিন্ন অ্যাপ্লিকেশন একত্রিত করা সহজ | একাধিক সার্ভিস সংযুক্ত করে একসাথে কাজ করানো যায়।
   উদাহরণ: Google Maps API দিয়ে ওয়েবসাইটে মানচিত্র দেখানো।
*/

// ======= JavaScript Invent =======

/*
JavaScript কেন Invent করা হলো?
- ওয়েব পেজকে Interactive করার জন্য
  1990-এর দশকে ওয়েব প্রায় সম্পূর্ণ Static ছিল।
  শুধুমাত্র HTML এবং CSS দিয়ে ওয়েব পেজ তৈরি হতো।
  উদাহরণ: কোন বাটনে ক্লিক করলে কিছু ঘটানো, ফর্ম ভ্যালিডেশন করা—এসব তখন সম্ভব ছিল না।
  সমাধান: একটি লাইটওয়েট স্ক্রিপ্টিং ভাষা যা ব্রাউজারের মধ্যে চলবে।

- Client-Side Logic চালানোর জন্য
  HTML + CSS শুধুমাত্র Structure & Style দেয়, কিন্তু Logic চালানোর ক্ষমতা নেই।
  JavaScript দিয়ে Client-Side এ ডাইনামিক আচরণ যোগ করা যায়।
  উদাহরণ: ড্রপডাউন মেনু, স্লাইডার, লিভ-ভ্যালিডেশন ইত্যাদি।

- ব্রাউজারে Run করার জন্য Designed
  JavaScript সরাসরি ব্রাউজারে চলে, Server এ না।
  ব্যবহারকারীর কম্পিউটারেই কোড Execute হয় → দ্রুত Response।

JavaScript এর ইতিহাস:
- Invented by: Brendan Eich
- Year: 1995
- Company: Netscape
- প্রথম নাম ছিল Mocha, পরে LiveScript, শেষমেশ JavaScript রাখা হলো।
- দ্রষ্টব্য: JavaScript এর নামের সাথে Java এর সরাসরি সম্পর্ক নেই। কেবল নামের মিল।
*/

// ======= JavaScript Engines =======

/*
| Engine                     | Developed By | ব্যবহার কোথায়            | বৈশিষ্ট্য                                          |
| -------------------------- | ------------ | ------------------------ | -------------------------------------------------- |
| V8                         | Google       | Chrome, Node.js          | Fast, Open Source, JIT Compilation, C++ তে লেখা    |
| SpiderMonkey               | Mozilla      | Firefox                  | প্রথম JavaScript Engine, JIT Compiler, C++ তে লেখা |
| JavaScriptCore / Nitro     | Apple        | Safari                   | Fast, Optimized for macOS/iOS, JIT Compiler        |
| Chakra                     | Microsoft    | Old Edge Browser         | JIT, Garbage Collection, Parallel Compilation      |
| ChakraCore                 | Microsoft    | Node-ChakraCore          | Open Source, Standalone                            |
*/

// ======= JavaScript Engine Workflow =======

/*
JavaScript Engine মূলত চারটি ধাপে কাজ করে:

1️⃣ Parsing (কোড পড়া)
- কোডকে tokens এ ভাগ করে Abstract Syntax Tree (AST) বানায়।
- উদাহরণ:
  let x = 10;
  console.log(x);

2️⃣ Compilation / Interpretation (কোড প্রস্তুত করা)
- AST কে Bytecode বা Machine Code-এ রূপান্তর করে।
- Modern Engines (যেমন V8) JIT ব্যবহার করে।
- Hot Code Optimize করে Machine Code এ রূপান্তর করে।

3️⃣ Execution (কোড চালানো)
- Variables ও Functions Memory-তে রাখে।
- Execution Context ও Call Stack ব্যবহার করে কোড Step by Step চালায়।
- উদাহরণ:
  let x = 10;
  console.log(x);

4️⃣ Garbage Collection (অপ্রয়োজনীয় Memory মুছে ফেলা)
- অপ্রয়োজনীয় Object Memory মুছে ফেলে।
- ফলে Memory Efficient থাকে।

Workflow Summary:
Code → Parsing → Compilation → Execution → Garbage Collection
অর্থাৎ, Engine কোডকে পড়ে → বুঝে → রূপান্তর করে → চালায় → অপ্রয়োজনীয় memory মুছে ফেলে।
*/
