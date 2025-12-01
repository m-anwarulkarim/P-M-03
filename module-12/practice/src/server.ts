import express, { Request, Response } from "express";
import { Pool } from "pg";

const app = express();
const port = 5000;

app.use(express.json());

const connectionString =
  "postgresql://neondb_owner:npg_fpWk5F6hmOza@ep-raspy-grass-ahova66u-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const pool = new Pool({
  connectionString,
  max: 10,
});

const initDb = async () => {
  try {
    await pool.query(`
     CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
    `);

    await pool.query(`
       CREATE TABLE IF NOT EXISTS todos(
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(200) NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT false,
            due_date DATE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
    `);

    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Database init error:", error);
  }
};

initDb();
//

app.post("/user", async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  // const newUser = { name, email, phone };

  try {
    const result = await pool.query(
      `
  INSERT INTO users(name, email,phone)
  VALUES ($1,$2,$3)
  RETURNING *
  
  `,
      [name, email, phone]
    );

    res.status(201).json({
      seccess: true,
      message: "user created successfully",
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      seccess: false,
      message: "user coduen't create",
    });
  }
});

// get all users

app.get("/user", async (req, res) => {
  try {
    const result = await pool.query(
      `
    SELECT * FROM users
    `
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
});

// get singel user

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
 SELECT * FROM users WHERE id = $1
  `,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// delete user

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "item not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "user deleted successfully",
      deletItem: result.rows[0],
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
});

// update user
app.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const result = await pool.query(
      `
      UPDATE users SET name = $1, email = $2 , phone = $3 WHERE id = $4 RETURNING *
      `,
      [name, email, phone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "cuden't updated",
      });
    }
    res.status(200).json({
      success: true,
      message: "updated successfully",
      updatedData: result.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// by defult
app.use((req, res) => {
  res.status(400).json({
    success: false,
    message: "User not found or couldn't update",
    path: req.path,
  });
});

//

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
