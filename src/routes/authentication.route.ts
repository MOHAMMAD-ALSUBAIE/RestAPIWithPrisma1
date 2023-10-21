import { Router } from "express";

import { login } from "../controllers/authentication.controller";
import { createUser } from "../controllers/user.controller";
const userRoute = Router();
userRoute.post("/login", login);

userRoute.post("/register", createUser);

userRoute.get("/authorize", (req, res, next) => {
    if (req.session.isAuth) {
        res.json({ massage: "you are already logged in", isAuth: true });
        return;
    }
    res.json({ massage: "you are not logged in", isAuth: false });
});

export default userRoute;
