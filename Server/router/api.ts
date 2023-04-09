import { Router } from "express";
const router = Router();
import pupil from "./pupil";
import admin from "./teacher";

router.use("/pupil", pupil);
router.use("/techer", admin);

export default router;
