import { Request, Response } from "express";
import { authSevices } from "./auth.service.js";

const authLogin = async (req: Request, res: Response) => {
  try {
    const result = await authSevices.authLogin(
      req.body.email,
      req.body.password
    );
    // console.log(result);
    res.status(200).json({
      success: true,
      message: "login successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  authLogin,
};
