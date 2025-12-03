// src/middleware/logger.middleware.ts

/*
=======================================================
📌 Request Logger Middleware (Bangladesh Time)
-------------------------------------------------------
✔ Bangladesh Time (UTC+6) এ timestamp দেখাবে
✔ Format: DD-MM-YYYY HH:mm:ss AM/PM
=======================================================
*/

import { Request, Response, NextFunction } from "express";

const getBangladeshTime = () => {
  const date = new Date();

  // Bangladesh timezone এ convert
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;

    const timestamp = getBangladeshTime(); // 🕒 BD Time

    const log = `
============================================
📌 REQUEST LOG
--------------------------------------------
🕒 Time:         ${timestamp}
🔹 Method:       ${req.method}
🔹 URL:          ${req.originalUrl}
🔹 Status Code:  ${res.statusCode}
🔹 Duration:     ${duration}ms
============================================
    `;

    console.log(log);
  });

  next();
};
