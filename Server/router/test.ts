import { Router } from "express";
import {
  createTest,
  deleteTest,
  getAlltests,
  getOneTest,
  updateTest,
} from "../controller/test";
const router = Router();

router.get("/all", getAlltests);
router.get("/:id", getOneTest);
router.post("/", createTest);
router.put("/", updateTest);
router.delete("/:id", deleteTest);

export default router;
