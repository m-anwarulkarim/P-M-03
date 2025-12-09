import bcrypt from "bcryptjs";
import { pool } from "../../config/db.js";
import Jwt from "jsonwebtoken";

const authLogin = async (email: string, password: string) => {
  const result = await pool.query(
    `
        SELECT * FROM users WHERE email = $1
        `,
    [email]
  );
  const user = result.rows[0];
  if (!user) {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }
  // password end

  const secret = "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
  const token = Jwt.sign(
    { name: user.name, email: user.email },
    secret as string,
    {
      expiresIn: "1d",
    }
  );
  // delete user.password;
  // console.log(token);
  return {
    token,
    user,
  };
};

export const authSevices = { authLogin };
