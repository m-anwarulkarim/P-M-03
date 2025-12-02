// app.ts server.ts config/ middleware/  modules/

// =====================================================
// Application Flow Summary
// =====================================================
// server.ts      ->   app.ts          ->   routes/userRoutes.ts
//   (start)         (setup)                 (endpoints)
//                          ->   controllers/userController.ts ->  services/userService.ts
//                                  (handle req)                     (logic/db)

/*

┌─────────────┐
│  server.ts  │   ← অ্যাপ চালু করা, 
└─────┬───────┘
      │                                                                                                 
      ▼
┌─────────────┐
│   app.ts    │   ← Express app তৈরি, 
└─────┬───────┘
      │
      ▼
┌─────────────────────┐
│ routes/userRoutes.ts│  ← API endpoints define, কোন controller call হবে
└─────────┬───────────┘
          │
          ▼
┌─────────────────────────────┐
│ controllers/userController.ts │  ← Request handle, service call, response
└─────────┬───────────────────┘
          │
          ▼
┌─────────────────────────────┐
│ services/userService.ts     │  ← Business logic, DB operations
└─────────────────────────────┘

*/

// =====================================================
// todo ==> :1
// server.ts
// =====================================================

// কাজ:
// অ্যাপ্লিকেশন চালু করা (listen on port)
// Environment variables load করা

// কেন ব্যবহার হয়:
// App logic এবং server start আলাদা রাখা যায়
// Testing / production environment সহজ হয়

import dotenv from "dotenv";
dotenv.config(); // .env file থেকে environment variables load করা

import app from "./app"; // app.ts থেকে Express app import

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// =====================================================
// todo ==> :2
// app.ts
// =====================================================

// কাজ:
// Express app তৈরি করা
// Middleware attach করা (logger, body parser, CORS)
// Routes attach করা

// কেন ব্যবহার হয়:
// Server logic এবং app logic আলাদা থাকে
// App কে test করা সহজ হয় (unit tests এর জন্য)

import express from "express";
import logger from "./middleware/logger";
import router from "./routes/userRoutes";

const app = express();

// Middleware
app.use(express.json()); // JSON body parse করার জন্য
app.use(logger); // Custom logger middleware

// Routes
app.use("/api/users", router); // API endpoints attach করা

export default app;

// =====================================================
// todo ==> :3
// routes/userRoutes.ts
// =====================================================

// কাজ:
// API endpoints define করা
// কোন route কোন controller call করবে সেটা নির্ধারণ করা

// কেন ব্যবহার হয়:
// Route management centralized হয়
// App clean & modular থাকে

import { Router } from "express";
import { getUsers, createUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers); // GET /api/users
router.post("/", createUser); // POST /api/users

export default router;

// =====================================================
// todo ==> :4
// controllers/userController.ts
// =====================================================

// কাজ:
// Request handle করা
// Response পাঠানো
// Service call করা

// কেন ব্যবহার হয়:
// Business logic controller এ রাখলে messy হয়ে যায়
// Controller শুধু HTTP request/response handle করে

import { Request, Response } from "express";
import { getAllUsers, addUser } from "../services/userService";

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers(); // service থেকে data fetch
  res.json(users); // response পাঠানো
};

export const createUser = async (req: Request, res: Response) => {
  const user = await addUser(req.body); // service call
  res.status(201).json(user); // response পাঠানো
};

// =====================================================
// todo ==> :5
// services/userService.ts
// =====================================================

// কাজ:
// Business logic handle করা
// Database operations করা

// কেন ব্যবহার হয়:
// Controller clean থাকে
// Logic reuse & testing সহজ হয়

interface User {
  id: number;
  name: string;
  email: string;
}

// Temporary in-memory storage
const users: User[] = [];

export const getAllUsers = async (): Promise<User[]> => {
  return users; // সকল user return
};

export const addUser = async (user: User): Promise<User> => {
  users.push(user); // নতুন user add
  return user;
};

// =====================================================
// todo ==> :6
// middleware/logger.ts
// =====================================================

// কাজ:
// প্রতিটি incoming request log করা
// Developer debugging সহজ হয়

// কেন ব্যবহার হয়:
// কোন request আসছে এবং কখন আসছে তা দেখতে সহজ হয়
// Request trace করতে সুবিধা হয়

import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next(); // পরবর্তী middleware / route এ পাঠানো
};

export default logger;

/*
┌──────────────────────────────┐
│          server.ts           │
│------------------------------│
│ • অ্যাপ চালু করা (listen)     │
│ • PORT & environment load করা │
│ • Server এবং App আলাদা রাখা │
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│           app.ts             │
│------------------------------│
│ • Express app তৈরি করা       │
│ • Middleware attach করা      │
│    - logger                  │
│    - body parser             │
│ • Routes attach করা (/api)  │
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│     routes/userRoutes.ts     │
│------------------------------│
│ • API endpoints define করা   │
│ • কোন route কোন controller call│
│   করবে তা নির্ধারণ করা        │
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│ controllers/userController.ts│
│------------------------------│
│ • HTTP Request handle করা    │
│ • Service call করা           │
│ • Response পাঠানো           │
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│    services/userService.ts   │
│------------------------------│
│ • Business logic handle করা  │
│ • Database operations করা    │
│   - db.ts import করে ব্যবহার │
│ • Controller কে clean রাখা    │
└─────────────┬────────────────┘
              │
              ▼
┌──────────────────────────────┐
│          db/db.ts            │
│------------------------------│
│ • Pool / Client তৈরি করা      │
│ • initDb() function          │
│ • সব SQL query centralize করা│
└──────────────────────────────┘




*/
