import { Request, Response } from "express";
import { userService } from "./user.service.js";

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json({
      success: false,
      message: "Data Instered Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//  get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser();
    res.status(200).json({
      success: false,
      message: "Users Retrived Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get single user
const getSingelUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getSingelUser(req.params.id as string);
    if (result.rows.length === 0) {
      return res.status(500).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Users Retrived Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update users
const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.updateUser(
      req.body,
      req.params.id as string
    );
    console.log(req);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deletUser(req.params.id as string);
    if (result.rows.length === 0) {
      return res.status(500).json({
        success: false,
        message: " user not found",
      });
    }
    {
      res.status(200).json({
        success: true,
        message: " user deletede successfully ",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// /Export all router
export const userController = {
  createUser,
  getUsers,
  getSingelUser,
  updateUser,
  deletUser,
};
