import { Router } from "express";
const router = Router()
import test from "./test"
import pupil from "./user"
import admin from "./admin"

router.use("/pupil", pupil)
router.use("/admin", admin)


export default router