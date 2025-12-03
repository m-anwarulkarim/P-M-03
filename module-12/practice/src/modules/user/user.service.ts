import { pool } from "../../config/db.js";
import { Paylode } from "../../interface/req&resType.js";

const createUser = async (paylode: Paylode) => {
  const { name, email } = paylode;
  const result = await pool.query(
    `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
    [name, email]
  );
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
    SET name = $1, email = $2 
    WHERE id = $3 
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
