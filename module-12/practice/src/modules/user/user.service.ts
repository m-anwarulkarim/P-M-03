import { pool } from "../../config/db.js";
import { Paylode } from "../../interface/req&resType.js";
import bcrypt from "bcryptjs";

const createUser = async (paylode: Paylode) => {
  const { name, email, password } = paylode;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const result = await pool.query(
    `INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *`,
    [name, email, hashPassword]
  );
  // delete result.rows[0].password;
  console.log(result);
  return result;
};

const getUser = async () => {
  const result = await pool.query(`
    SELECT * FROM users
    `);
  return result;
};

const getSingelUser = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE id = $1 
    `,
    [id]
  );

  return result;
};

const updateUser = async (paylode: Paylode, id: string) => {
  const { name, email } = paylode;

  const result = await pool.query(
    `
    UPDATE users 
    SET name = $1, email = $2 ,password = $3
    WHERE id = $4 
    RETURNING *;
    `,
    [name, email, id]
  );
  return result;
};

const deletUser = async (id: string) => {
  const result = await pool.query(
    `
DELETE FROM users WHERE id = $1 RETURNING *
`,
    [id]
  );
  return result;
};

export const userService = {
  createUser,
  getUser,
  getSingelUser,
  updateUser,
  deletUser,
};
