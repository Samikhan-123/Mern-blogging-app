

import {authenticateWithGoogle,getAllUsers,registerUser,loginUser } from "../controller/userController.js";
import { Router } from "express";
import passwordAuth from "../middlewares/Admin.js";
// import verifyToken from "../middlewares/JsonWebAuth.js";

const userRouter = Router();

userRouter.get("/all-users", passwordAuth, getAllUsers);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.post("/auth/google", async (req, res) => {
    const { idToken } = req.body;

    const googleAuthResult = await authenticateWithGoogle(idToken);

    if (googleAuthResult.success) {
        res.status(200).json(googleAuthResult);
    } else {
        res.status(500).json(googleAuthResult);
    }
});

export default userRouter;