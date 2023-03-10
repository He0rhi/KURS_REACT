import { Router } from "express";
import UserController from "../сontroller/user.controller.js";
import { checkAuth } from "./../middleware/CheckAuth.js";

const router = Router();

router.post("/auth/register", UserController.Register);
router.post("/auth/login", UserController.Login);
router.get("/auth/getusers", UserController.getUsers);
router.get("/auth/getme", checkAuth, UserController.GetMe);

export default router;
