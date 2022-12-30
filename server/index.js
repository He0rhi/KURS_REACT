import express from "express";
import cors from "cors";
import UserRoute from "./route/user.route.js";
import ProductRoute from "./route/product.route.js";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// MIDDLEWARES
app.use(cors()); //запросы с других доменов
app.use(express.json());
app.use(fileUpload()); //Простое промежуточное программное обеспечение Express для загрузки файлов.



// ROUTES
app.use("/api", UserRoute);
app.use("/api", ProductRoute);

app.use("/uploads", express.static("uploads"));
app.use(express.static("uplouds"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// по запросу hhttp://localhost:3001 будем отдавать статические файлы из папки uploads

//#endregion

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
