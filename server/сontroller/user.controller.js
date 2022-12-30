import pool from "../database/db.js";
import jwt from "jsonwebtoken";


class UserController {
  async Register(req, res) {
    try {
      const { name, surname, password } = req.body;
      const isUser = await pool.query("SELECT * FROM person WHERE name = $1", [
        name,
      ]);

      if (isUser.rows.length > 0) {
        return res.json({ message: "Пользователь уже существует" });
      }

      if (password.length < 6) {
        return res.json({ message: "Пароль должен состоять не менее чем из 6 символов" });
      }

      if (name.length < 3) {
        return res.json({ message: "Имя должно состоять не менее чем из 3 символов" });
      }
      const token = jwt.sign({ name: name }, "secret");

      if (!req.files) {
        const user = await pool.query(
          "INSERT INTO person (name, surname, password) VALUES ($1, $2, $3) RETURNING *",
          [name, surname, password]
        );
        return res.json({
          user: user.rows[0],
          token: token,
          message: "Регистрация прошла успешно!",
        });
      } 
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  }

  async Login(req, res) {
    try {
      const { name, password } = req.body;
      const user = await pool.query("SELECT * FROM person WHERE name = $1", [
        name,
      ]);

      if (!user) {
        return res.json({ message: "Такого пользователя не существует" });
      }

      if (user.rows[0].password !== password) {
        return res.json({ message: "Неверный пароль" });
      }
      const NewUser = await pool.query("SELECT * FROM person WHERE name = $1", [
        name,
      ]);

      const token = jwt.sign({ name: user.rows[0].name }, "secret");
      return res.json({
        user: NewUser.rows[0],
        token: token,
        message: "Вы вошли в систему",
      });
    } catch (err) {
      res.json({
        message: "Пользователь не найден",
      });
    }
  }

  async GetMe(req, res) {
    try {
      const user = await pool.query("SELECT name FROM person WHERE name = $1", [
        req.userData,
      ]);

      if (!user) {
        return res.json({ message: "Пользователь не найден" });
      }
      const NewUser = await pool.query("SELECT * FROM person WHERE name = $1", [
        req.userData,
      ]);

      const token = jwt.sign({ name: user.name }, "secret");
      res.json({
        user: NewUser.rows[0],
        token: token,
        message: "",
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  


  async getUsers(req, res) {
    try {
      const users = await pool.query("SELECT * FROM person");
      return res.json(users.rows);
    } catch (err) {
      res.json({
        message: "Неверные данные",
      });
    }
  }
}
export default new UserController();
