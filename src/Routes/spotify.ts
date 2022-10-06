import { Router } from "express";
import { Login, Callback } from "../Controllers/spotify";
const router = Router();

router.get("/login", Login);
router.get("/callback", Callback);

export default router;
