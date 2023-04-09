import { Router } from "express";
import {
  createTeacher,
  deleteTeacher,
  getAllteachers,
  getOneTeacher,
  updateTeacher,
} from "../controller/teacher";
const router = Router();

router.get("/all", getAllteachers);
router.get("/:id", getOneTeacher);
router.post("/", createTeacher);
router.put("/", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
