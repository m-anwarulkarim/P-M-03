import express, { Request, Response } from "express";
const app = express();
const port = 5000;

app.use(express.json())
app.use(express.urlencoded())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


/*
🔹 কেন লিখি app.use(express.json())?

Express default-এ POST বা PUT request এর body parse করে না।

// ** "parse শব্দের মানে হলো কোনো জিনিসকে ছোট ছোট অংশে ভাগ করে তার মানে বা structure বোঝা। কম্পিউটারে, parse করার মানে হলো কোনো text বা data কে analyze করে machine-readable structure বা format-এ রূপান্তর করা।"

যদি তুমি client থেকে JSON পাঠাও, সেটাকে ব্যবহার করতে চাইলে middleware লাগবে।

express.json() সেই middleware যা request body কে JSON হিসেবে parse করে এবং তা req.body তে রাখে।

🔹 কী হয়

client POST request পাঠায়, যেমন:

{ "name": "Anwar", "age": 17 }


middleware express.json() সেই JSON data কে parse করে:

req.body = { name: "Anwar", age: 17 }


তুমি route function-এর ভিতরে req.body.name ব্যবহার করতে পারো।

🔹 ভুল এড়ানোর টিপস

যদি app.use(express.json()) না দাও → req.body হবে undefined

সব route-এর আগে middleware declare করতে হবে (উদাহরণ: app.use(express.json()) app.get() এর আগে)



// ********************************
app.use(express.urlencoded()) একটি middleware যা Express-এ ব্যবহার করা হয় HTML form data (URL-encoded data) parse করার জন্য। নিচে সহজভাবে ব্যাখ্যা করছি:

🔹 কেন ব্যবহার করি?

HTML form সাধারণত POST method দিয়ে data পাঠায় URL-encoded format এ, যেমন:

name=Anwar&age=17


Express default-এ এই ধরনের data parse করে না।

express.urlencoded() middleware সেই data কে object এ রূপান্তর করে req.body তে রাখে।

🔹 কীভাবে কাজ করে

Client form পাঠায়:

<form method="POST" action="/submit">
  <input name="name" value="Anwar">
  <input name="age" value="17">
  <button type="submit">Send</button>
</form>


Middleware parse করে:

req.body = { name: "Anwar", age: "17" }


তুমি route function-এ সহজে ব্যবহার করতে পারো:

app.post("/submit", (req, res) => {
  console.log(req.body.name); // "Anwar"
  console.log(req.body.age);  // "17"
});

🔹 ভুল এড়ানোর টিপস

সব POST route এর আগে app.use(express.urlencoded({ extended: true })) লিখতে হবে।

যদি middleware না দাও → req.body undefined হবে।

extended: true দিলে nested objects parse করা যায়, false হলে simple key-value parsing হয়।

🔹 নতুনদের জন্য সহজ ভাষায়

মনে করো client একটি ছোট form লিখে পাঠাচ্ছে।
express.urlencoded() হলো সেই middleware যা সেই form data খুলে বুঝে এবং req.body তে ব্যবহারযোগ্যভাবে রাখে।



১️⃣ PostgreSQL install করা

তুমি npm install pg দিয়ে PostgreSQL Node.js library install করেছ।

এটা Node.js থেকে PostgreSQL database এর সাথে connect হতে সাহায্য করে।

২️⃣ Data কোথায় রাখবো

তুমি cloud database ব্যবহার করবে, যেমন Neon DB।

Neon DB-তে account খোলা → project create করা → database ready → connection string পাওয়া যাবে।

Connection string হলো এমন একটা URL যা দিয়ে Node.js থেকে database-এ connect করা যায়।

উদাহরণ:

postgres://username:password@host:port/database

৩️⃣ Connection string ব্যবহার এবং pool

Pool হলো connection pool।

Neon বা অন্য cloud DB-তে অনেক request আসতে পারে → প্রতিটা request জন্য নতুন connection খোলা সময় এবং resource খরচ।

Pool ব্যবহার করলে fixed number of connections তৈরি থাকবে যা সব request share করবে।

Pool না থাকলে:

প্রতিটি request এ নতুন connection খুলতে হবে → slow performance, resource heavy, possible connection overload।

Server crash বা database limit exceed হওয়ার সম্ভাবনা বেশি।

Pool থাকলে:

একবারে অনেক request efficiently handle করা যায়।

Connection reuse হয়, latency কমে।

৪️⃣ Node.js + PostgreSQL Pool Example
import { Pool } from "pg";

// Neon DB বা অন্য cloud DB এর connection string
const connectionString = "postgres://username:password@host:port/database";

// Pool তৈরি করা
const pool = new Pool({
  connectionString,  // DB connect info
  max: 10,           // maximum 10 connections in pool
});

// Query example
async function getUsers() {
  const result = await pool.query("SELECT * FROM users");
  console.log(result.rows);
}

getUsers();


✅ এখানে pool:

১০টা connection তৈরি করে রাখে

যেকোনো request এ connection reuse করা যায়


কাজ শেষে connection pool এ ফেরত যায় → ready for next request