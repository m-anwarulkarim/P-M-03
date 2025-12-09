import dotenv from "dotenv";
import path from "path";

// dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config();

const config = {
  connection_str: process.env.CONNECTION_STR,
  port: process.env.PORT,
  JWT_SECRET: process.env.SECRET_STR,
};

export default config;
