
// import allData from "../controller/userController"

import {getAllUsers,registerUser,loginUser } from "../controller/userController.js";
import { Router } from "express";
import passwordAuth from "../middlewares/Admin.js";

const userRouter = Router();


userRouter.get("/all-users", passwordAuth, getAllUsers);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;