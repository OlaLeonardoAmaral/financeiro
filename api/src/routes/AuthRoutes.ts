import { Router } from "express";
import * as SessionController from "../controllers/SessionController";
import * as UserController from "../controllers/UserController";
import isAuth from "../middleware/isAuth";

const router = Router();

router.post("/signup", UserController.store);

router.post("/login", SessionController.store);

router.post("/refresh_token", SessionController.update);

router.delete("/logout", isAuth, SessionController.remove);

export default router;
