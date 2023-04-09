import { Router } from "express";
import { getAllAnswers } from "../controller/answer";
import { getOneAnswer } from "../database/answer";

const router = Router();

router.get("/all", getAllAnswers);
router.put("/");

export default router;
