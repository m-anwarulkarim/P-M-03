/*
========================================================
Express + TypeScript + PostgreSQL: JSON, Form Data, Pool
========================================================
*/

/*
১. Import libraries
--------------------------------------------------------
- express → main framework
- Request, Response → TypeScript type annotations
- pg → PostgreSQL Node.js library
*/
import express, { Request, Response } from "express";
import { Pool } from "pg";

/*
২. App instance & port
--------------------------------------------------------
- express() call করলে একটি server instance পাওয়া যায়
- app হলো central object, route ও middleware handle করে
*/
const app = express();
const port = 5000;

/*
৩. Middleware: JSON parse
--------------------------------------------------------
🔹 কেন লিখি app.use(express.json())?
- Express default-এ POST বা PUT request এর body parse করে না
- "parse" মানে হলো data কে analyze করে machine-readable structure বা format-এ রূপান্তর করা
- express.json() middleware JSON data parse করে এবং req.body তে রাখে

🔹 কী হয়:
- Client POST request পাঠালে যেমন: { "name": "Anwar", "age": 17 }
- Middleware parse করে: req.body = { name: "Anwar", age: 17 }
- Route function-এ req.body.name ব্যবহার করা যায়

🔹 ভুল এড়ানোর টিপস:
- middleware না দিলে req.body হবে undefined
- সব route-এর আগে middleware declare করতে হবে
*/
app.use(express.json());

/*
৪. Middleware: URL-encoded Form Data parse
--------------------------------------------------------
🔹app.use(express.urlencoded({ extended: true })) কেন ব্যবহার করি?
- HTML form সাধারণত POST method দিয়ে data পাঠায় URL-encoded format এ
  যেমন: name=Anwar&age=17
- express.urlencoded() সেই data parse করে object আকারে req.body তে রাখে

🔹 কীভাবে কাজ করে:
- Client form পাঠায়:
<form method="POST" action="/submit">
  <input name="name" value="Anwar">
  <input name="age" value="17">
  <button type="submit">Send</button>
</form>
- Middleware parse করে:
req.body = { name: "Anwar", age: "17" }
- Route function-এ সহজে ব্যবহার করা যায়

🔹 ভুল এড়ানোর টিপস:
- সব POST route এর আগে app.use(express.urlencoded({ extended: true })) declare করতে হবে
- extended: true → nested objects parse করা যায়
- extended: false → simple key-value parse হয়

🔹 নতুনদের জন্য সহজ ভাষায়:
- Client form পাঠাচ্ছে → express.urlencoded() middleware খুলে বুঝে req.body তে দেয়
*/
app.use(express.urlencoded({ extended: true }));

/*
৫. Example route: GET "/"
--------------------------------------------------------
- req → client request এর তথ্য ধারণ করে
- res → server response পাঠানোর জন্য
*/
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

/*
৬. PostgreSQL + Pool setup
--------------------------------------------------------
- npm install pg দিয়ে PostgreSQL Node.js library install করা হয়
- Data cloud DB তে রাখলে যেমন Neon DB
  - Neon DB account → project create → connection string পাবো
- Connection string example:
  postgres://username:password@host:port/database

🔹 Pool কি?
- Pool = fixed number of connections যা request গুলো share করে
- Pool না থাকলে:
  - প্রতিটি request এ নতুন connection খোলা হবে → slow, resource heavy, possible crash
- Pool থাকলে:
  - Connection reuse হয়, latency কমে, multiple request efficiently handle হয়
*/
const connectionString = "postgres://username:password@host:port/database";

const pool = new Pool({
  connectionString, // DB connect info
  max: 10, // maximum 10 connections in pool
});

/*
৭. Query example
--------------------------------------------------------
- Pool ব্যবহার করে DB query করা হয়
- async/await দিয়ে query handle করা হয়
- result.rows → query result
*/
async function getUsers() {
  const result = await pool.query("SELECT * FROM users");
  console.log(result.rows);
}

getUsers();

/*
৮. Server start
--------------------------------------------------------
- app.listen → server run করে
- callback → server start হলে console log
*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
