import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "../data/users.json");

export const readUser = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

export const writeUser = (user: any) => {
  fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
};
