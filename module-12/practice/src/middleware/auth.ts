import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const auth = (...role: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    if (!token) {
      return res.status(401).json({ message: "Token malformed" });
    }

    try {
      const secret = "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      // req.user = decoded as JwtPayload;

      next();
    } catch (error: any) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

export default auth;
