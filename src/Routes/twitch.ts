import { Router } from "express";
const router = Router();
import { joinChannel, leaveChannel } from "../Controllers/twitch";

router.post("/join", joinChannel);

router.get("/leave", leaveChannel);

export default router;
