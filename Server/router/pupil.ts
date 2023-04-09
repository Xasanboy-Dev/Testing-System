import { Router } from "express";
import {
  GetPupils,
  UpdatePupil,
  createPupil,
  getOnePupil,
  removePupil,
} from "../controller/pupil";
const router = Router();

router.get("/all", GetPupils);
router.get("/:id", getOnePupil);
router.post("/", createPupil);
router.put("/", UpdatePupil);
router.delete("/:id", removePupil);

export default router;
